import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
const ROOT=path.resolve("dist/client"); const BASE="/NSBT_Website/";
const shell=fs.readFileSync(path.join(ROOT,"_shell.html"));
const types={".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".json":"application/json",".woff2":"font/woff2",".jpg":"image/jpeg",".png":"image/png",".webmanifest":"application/manifest+json"};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split("?")[0]);if(p.startsWith(BASE))p=p.slice(BASE.length-1);const f=path.join(ROOT,p);if(p!=="/"&&fs.existsSync(f)&&fs.statSync(f).isFile()){res.setHeader("content-type",types[path.extname(f)]||"application/octet-stream");res.end(fs.readFileSync(f));}else{res.setHeader("content-type","text/html");res.end(shell);}});
await new Promise(r=>server.listen(0,r));
const origin=`http://localhost:${server.address().port}`;
const outDir="/private/tmp/claude-501/-Users-castle-LLM/40dcf282-e7ad-4b58-9fc7-ed304e633b2f/scratchpad";
const routes=JSON.parse(process.env.ROUTES);
const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1280,height:1000}});
for(const [name,route] of routes){
  await page.goto(`${origin}${BASE}${route}`,{waitUntil:"networkidle"}); await page.waitForTimeout(700);
  await page.screenshot({path:`${outDir}/Q-${name}.png`,fullPage:true});
}
await b.close(); server.close(); console.log("DONE");
