import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

// Pairs: [name, liveURL, myRoute]
const PAIRS = JSON.parse(process.env.PAIRS);
const W = Number(process.env.W || 1366);

const ROOT = path.resolve("dist/client");
const BASE = "/NSBT_Website/";
const shell = fs.readFileSync(path.join(ROOT, "_shell.html"));
const types = { ".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".json":"application/json",".woff2":"font/woff2",".jpg":"image/jpeg",".png":"image/png",".webmanifest":"application/manifest+json" };
const server = http.createServer((req,res)=>{ let p=decodeURIComponent(req.url.split("?")[0]); if(p.startsWith(BASE))p=p.slice(BASE.length-1); const f=path.join(ROOT,p); if(p!=="/"&&fs.existsSync(f)&&fs.statSync(f).isFile()){res.setHeader("content-type",types[path.extname(f)]||"application/octet-stream");res.end(fs.readFileSync(f));}else{res.setHeader("content-type","text/html");res.end(shell);} });
await new Promise(r=>server.listen(0,r));
const origin=`http://localhost:${server.address().port}`;
const outDir="/private/tmp/claude-501/-Users-castle-LLM/40dcf282-e7ad-4b58-9fc7-ed304e633b2f/scratchpad";
const b=await chromium.launch();
async function shot(url, file, lazy){
  const page=await b.newPage({viewport:{width:W,height:1000}});
  await page.goto(url,{waitUntil:"networkidle",timeout:45000}).catch(()=>{});
  if(lazy){ for(let y=0;y<14000;y+=800){ await page.evaluate(yy=>window.scrollTo(0,yy),y); await page.waitForTimeout(90);} await page.evaluate(()=>window.scrollTo(0,0)); }
  await page.waitForTimeout(900);
  await page.screenshot({path:`${outDir}/${file}`, fullPage:true});
  await page.close();
}
for(const [name, liveURL, myRoute] of PAIRS){
  await shot(liveURL, `L-${name}.png`, true);
  await shot(`${origin}${BASE}${myRoute}`, `M-${name}.png`, true);
  console.log("captured", name);
}
await b.close(); server.close(); console.log("DONE");
