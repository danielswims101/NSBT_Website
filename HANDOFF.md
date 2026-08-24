# NSBT public website — handoff for the website manager

**To:** Website manager (`nsbtorgwebsite@gmail.com`)  
**GitHub:** https://github.com/danielswims101/NSBT_Website  
**Public destination:** https://www.nsbt.org (apex `nsbt.org` should 301 to `www`)  
**This repo is:** the public graduate-school website only  
**This repo is not:** the administrators’ Populi desk

Grok Build’s work on this site ends when this repository is populated. From that moment, you own revisions, Vercel Pro, and DNS.

Read this file once before you change anything. Several pages are **intentionally unpublished**. Filling them from memory is a defect.

---

## 0. First hour — do these in order

1. Confirm this GitHub repo contains `src/`, `public/`, `package.json`, `HANDOFF.md`, and `README.md`. If the repo is still empty, the export from Grok Build has not landed. Stop and get the export completed into **this** repository (`danielswims101/NSBT_Website`), not a new one.
2. Do **not** connect Vercel until you have read §3 (framework) and §8 (what not to invent).
3. Clone the repo. Use **Node 22.x**. Run `npm ci`, then `npm run typecheck`, then `npm run build`.
4. Add yourself (`nsbtorgwebsite@gmail.com`) as a collaborator if you are not already the owner of `danielswims101`.
5. Create a Vercel **Pro** project from this GitHub repo. Settings are in §3. Do **not** use the Vite SPA template.
6. After a successful Vercel preview, attach custom domains `www.nsbt.org` and `nsbt.org` (redirect apex → www). See §4.
7. The administrators’ desk is a **second** product. DNS for `desk.nsbt.org` must **not** point at this Vercel project. See §6.

---

## 1. Two products — never merge them

| | Public website (this repo) | Administrators’ desk (other repo) |
|---|---|---|
| Host | `https://www.nsbt.org` | `https://desk.nsbt.org` |
| Audience | Anyone | Five named administrators only |
| Log in | Populi, Digital Theological Library, Google Workspace | School accounts (`it@nsbt.org` for IT, never `studentservices@nsbt.org`) |
| Student records | Never | Yes, behind the allowlist |
| Populi | Public links only (apply, courses sign-in, give) | Server-side API, **read-only** |
| Footer | Quiet line: “Administrators: Populi desk” | The desk itself |

This site already links the desk. It does not contain FERPA text, Populi API keys, worksheets, or the five-admin allowlist. Keep it that way.

Randy Whittaker is named only on `/students/records` as Director of Information Technology and Director of Student Records and Accounts. He signs into the **desk** as `it@nsbt.org`. The public mailbox remains the Office of Student Records and Accounts, `studentservices@nsbt.org`.

### Populi API for the desk (not this repo)

Someone who already **is** an Account Admin in Populi mints the key. The key itself must **not** be Account Admin.

In Populi: **Account & Settings → API → Keys**.

- Name the key `NSBT Help Desk (read)`.
- Give it **Academic Auditor** only at first (read courses, enrollment, grades, profiles except financial).
- Add **Admissions Auditor** or **Financial Auditor** only if the desk must answer those questions.
- Do **not** give the key Account Admin, Academic Admin, Registrar, or Financial Admin.
- Make `it@nsbt.org` a Log Viewer on that key.
- Put the token (`sk_…`) only in the **desk host’s** environment. Never in this GitHub repo. Never in a browser.

The desk application must only **read**. Even if a write role is later added in Populi by mistake, the desk still must not create, update, or delete records.

---

## 2. What the site already does

- Two graduate degrees, taught entirely online: Master of Arts in Christian Ministry and Master of Arts in Global Christian Leadership.
- Apply → Populi application: `https://nsbt.populiweb.com/router/admissions/onlineapplications/index?source=99355`
- Give → Populi donate page 2425, embedded on `/give`.
- Log in (`/login`) is a chooser, not a school SSO:
  - Populi: `https://nsbt.populiweb.com/`
  - Digital Theological Library: `https://dtl.primo.exlibrisgroup.com/nde/home?vid=01DTL_INST:DTL1`
  - Google Workspace: `https://accounts.google.com/AccountChooser?hd=nsbt.org`
- Header: **Log in** (top right) and **Apply**, on mobile and desktop.
- Ask NSBT answers from published page copy (keyword retrieval). It is **not** an AI product and needs **no** API key.
- Bookstore **Check out** 302s to a live Shopify shop (`279b96-ad.myshopify.com`). See §7.
- Canonical public origin in the code: `https://www.nsbt.org`.

`/portal` and `/signin/students` and `/signin/faculty` **redirect to `/login`**. They are leftovers of a preview campus. Do not rebuild them on the public host.

---

## 3. Vercel Pro — project settings

The build is **Nitro, Vercel preset**, not a static Vite SPA.

| Setting | Value |
|---|---|
| Framework | Other / Nitro. **Not** “Vite”. |
| Node | **22.x** (`package.json` `engines`) |
| Install | `npm ci` |
| Build | `npm run build` |
| Output directory | **Leave empty** (Nitro writes `.vercel/output`) |
| Root directory | repository root |

`npm run build` also runs `db:migrate`. If `DATABASE_URL` is **unset**, migrate skips and the build succeeds. If `DATABASE_URL` is set to a **wrong** URL, the **build fails**. Leave it unset unless you have a reachable Postgres and a reason to use it. The public site does not need a database.

### Environment variables

**Do not set**

- `XAI_API_KEY` — Ask NSBT does not use it.
- `GROK_AUTH_*`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — those belong to the old preview campus, not nsbt.org.
- `VITE_AUTH_ENABLED=false` is unnecessary. The public header always shows Log in → `/login`. Do not turn preview auth on.

**Optional**

- None required for the public site to render.

After the first Vercel deploy, open the preview URL and check:

- Home, About, Academics, Apply, Tuition, Contact, Login, Ask, Store
- Log in still offers three external doors
- Footer still has the accreditation disclaimer and “Administrators: Populi desk”
- No “Created with Grok” mark (see §5)

---

## 4. DNS — after Vercel is green

1. In Vercel, add domain `www.nsbt.org`.
2. Add domain `nsbt.org` and configure **redirect 301** `nsbt.org` → `https://www.nsbt.org`. The site’s canonical origin is www.
3. At the DNS host for `nsbt.org`, create the records Vercel shows (usually A / CNAME / AAAA). Do not point the domain at this GitHub repo.
4. `desk.nsbt.org` is a **separate** DNS record, on the desk’s host, not this project.
5. Leave `nsbt.populiweb.com` alone. That is Populi.

Cut DNS only after:

- Vercel preview looks like the school
- HTTPS is on
- You have decided whether the bookstore may charge cards (§7)
- Unpublished pages still say they are unpublished

---

## 5. Grok host chrome — remove on Vercel, not before

While a copy of the site still lives on grok.me, a small “Created with Grok” mark is injected by the host. Do not hide that mark with CSS on grok.me.

Once this repo is on **your** Vercel project, Grok branding must not ship on nsbt.org. After the first successful Vercel preview, delete or stop wiring:

| Path | Why |
|---|---|
| `scripts/grok-pwa-plugin.mjs` and `grokPwaPlugin()` in `vite.config.ts` | Injects the Grok script and share tags |
| `scripts/grok-pwa-shared.mjs` | Grok PWA/OG helper |
| `scripts/install-page.html` | Grok install tutorial |
| `server/middleware/grok-pwa.ts` | Same injector on the Vercel function |
| `public/__grok/` | Grok icons and install assets |
| `src/components/preview-host-bridge.tsx` and its import in `src/routes/__root.tsx` | Grok preview driver |

**Before** you delete the Grok PWA injector, put school share tags in `src/routes/__root.tsx` `head()`:

- `link rel="canonical"`
- `og:title`, `og:description`, `og:url`, `og:type=website`, `og:site_name`, `og:image` (`https://www.nsbt.org/og.jpg`, 1200×630)
- `twitter:card=summary_large_image` and matching title/description/image
- `link rel="manifest" href="/manifest.webmanifest"`

If you keep `scripts/nsbt-strip.mjs`, stop it from deleting `twitter:*` tags, or your own Twitter cards will vanish. The strip exists to rewrite grok.me HTML. On nsbt.org you can eventually remove it, after native canonical/OG are in the React head.

Keep `nitro({ preset: "vercel", serverDir: "./server" })` in `vite.config.ts`.

---

## 6. Desk.nsbt.org (other chat / other repo)

Exporting **this** website does not move the desk. The desk must be exported from its own project into its own GitHub repository, then hosted on its own Vercel project, then given the hostname `desk.nsbt.org`.

Until that is done, the footer link “Administrators: Populi desk” will not resolve. That is expected. Do not copy the desk into this repo to make the link work.

---

## 7. Bookstore / Shopify — live checkout

`/api/cart` sends the visitor to `https://279b96-ad.myshopify.com/cart/{variantId}:1`. That Shopify shop is public. **Check out can charge a card.**

Before nsbt.org goes live, Jimmy / the store owner must choose:

**A. Sales are open**

- Password-protect or put a custom domain on Shopify if you do not want the raw `myshopify.com` shop crawled.
- Blank the Vendor field in Shopify (hoodie vendor is still a printer name on Shopify).
- Post real shipping, returns, privacy, and terms. This site currently says those policies “will be posted.” Charging without them is a compliance hole.
- Set the Agosto book to require shipping if it is a physical book.

**B. Sales are not open**

- Take down **Check out** on this site, or password the Shopify shop, **before** DNS cutover.
- Do not leave “Checkout is completed on our secure order system” if checkout is closed.

This site does **not** invent store policy bodies. Do not draft them unless Jimmy supplies them.

Maroon hoodie is unavailable. Grey hoodie is for sale. Prices match Shopify.

---

## 8. Standing editorial rules (do not “finish” the school)

### Names

- **James Halek** only. Never James M. Halek, Dr. Halek, Jim Halek, Helek.
- Keep “real estate developer” on Halek’s biography.
- The only White is **Dr. Angela R. White**. Never Keith White.
- Do not publish Jacqueline Boswell, Dawn Bruce-Tagoe, Randall Pannell, or former offices as current.
- Do not use Registrar, Bursar, `registrar@`, CEO, or Associate Academic Dean.
- Public mailbox: **Office of Student Records and Accounts**, `studentservices@nsbt.org`.

### What NSBT is

- A **graduate school**, not a seminary. Other institutions in bios may be seminaries.
- Not accredited. Credits and degrees may not transfer. No Federal Student Aid.
- Florida CIE **religious exemption** under §1005.06(1)(f), through **30 November 2026**. An exemption is not accreditation.
- Fully online. `111 North Orange Avenue, Suite 800, Orlando, FL 32801` is an **administrative address**. Do not say Regus. Do not imply a residential campus. Do not say people come to Orlando for graduation. Commencement is at **Christian Cultural Center, Brooklyn**.

### Tuition (quote only these figures)

- Published: $500 / credit, $1,500 / three-credit course, $18,000 / degree.
- Current: “Tuition is currently $750 for a three-credit course, which is 50% off of the published rate of $1,500.” Also $250 / credit and $9,000 / degree.
- Application fee $50. Graduation fee $250. Transcript fee and continuation fee are charged; **do not invent dollar amounts** that are not in the Catalog.

### Closed published roster

| Person | Role | Path | Portrait |
|---|---|---|---|
| The Reverend Dr. A. R. Bernard, Sr. | Founding President and Chairperson of the Board of Trustees | `/about/founder` | yes |
| The Reverend Dr. Jimmy Lim | Executive Vice President | `/about/lim` | yes |
| Larry H. Weiss, Esq. | Secretary, Board of Trustees | `/about/trustees/weiss` | Portrait to follow |
| James Halek | Treasurer, Board of Trustees | `/about/trustees/halek` | Portrait to follow |
| Dr. Onorio Chaparro | Academic Dean and Director of Admissions | `/academics/faculty/chaparro` | yes |
| Dr. Dale T. Irvin | Director of Strategic Planning and Professor of World Christianity | `/academics/faculty/irvin` | yes |
| Dr. Angela R. White | Dean of Institutional Effectiveness and Academic Programs and Director of Field Education | `/academics/faculty/white` | yes |
| Pastor Jamaal Bernard, Sr. | Chairperson, Advisory Council | `/about/advisory/jamaal` | yes |
| Dr. Francine Hernandez | Member, Advisory Council | `/about/advisory/hernandez` | yes |
| Dr. Nickolas Spears Jr. | Member, Advisory Council | `/about/advisory/spears` | yes |
| Randy Whittaker | Director of IT and Director of Student Records and Accounts | `/students/records` only | no bio page |

Faculty = Chaparro, Irvin, Angela White. Trustees = Bernard, Weiss, Halek. Advisory = Jamaal, Hernandez, Spears, plus Chaparro as Faculty Liaison.

Do **not** generate or wire Weiss/Halek portraits. Files named `weiss.jpg` / `halek.jpg` were HTML dumps and have been removed.

Angela White: Director of Field Education since 2023; Dean on **6 June 2026**. Not “Dean since 2023.”

MAGL field education is **mentoring**, not supervision.

Bernard’s D.D.s are **honorary**.

### Unpublished pages — live, honest, out of the nav

These URLs exist and must stay out of the header and footer until Jimmy posts the real document:

- `/academics/catalog`
- `/students/handbook`
- `/students/career`
- `/about/effectiveness`
- `/academics/policies`
- `/students/chapel`
- `/admissions/ordination`
- `/students/integrity`
- `/store/shipping` `/store/returns` `/store/privacy` `/store/terms`

Do not invent a Catalog PDF, Handbook, Career office, or Effectiveness report and put it on the page.

Mailing-list **collection is off**. The Office of Student Records and Accounts owns the list. Do not add a subscribe form until Jimmy orders it.

Do not publish hours of operation. Do not put a website URL in contact blocks.

Ask NSBT and the desk footer link stay. Do not label them “AI” on the public site.

---

## 9. Stack (so you can work)

- Node 22, React 19, TanStack Start / Router, Tailwind v4, Vite, Nitro (`preset: "vercel"`)
- Public copy lives in `src/content/copy.ts`, `people.ts`, `site.ts`, `registry.ts`, `courses.ts`, `products.ts`, `ask-corpus.ts`
- Pages: `src/components/site/public-pages.tsx` (catch-all) and `src/routes/_site/index.tsx` (home)
- Chrome: `src/components/site/header.tsx`, `footer.tsx`
- Images: `public/images/` — use real NSBT / CCC commencement photographs; do not use Unsplash; do not caption generated chapel/library images as an NSBT campus
- One full-bleed hero per photograph. Courses uses generated `seminar.jpg` once. Library uses generated `hero-library.jpg` once, labeled GENERATED.

Useful commands:

```bash
npm ci
npm run dev          # local development
npm run typecheck
npm run build        # production / Vercel output
```

Do not commit `node_modules/`, `.vercel/`, `.env`, `artifacts/`, or `screenshots/`. `.gitignore` already lists them.

Source documents used to write the public copy are in `attachments/` (Catalog, Institutional Profile, resumes, DEAC handbook). Treat those as internal. Do not put FERPA or Populi API material on public pages.

---

## 10. Known leftovers you may handle after go-live

These are not blockers for the first nsbt.org cut. They are the next honest work.

- Replace `lim-official.jpg` with a **solo** clerical headshot if Jimmy supplies one. The current file is the official JPEG; confirm it is Lim alone before treating it as a portrait.
- Add real Weiss/Halek portraits only from Jimmy, never generated.
- Post Catalog / Handbook / store policies when the files exist; then you may return them to the nav.
- Shopify vendor, password, and shipping flag (§7).
- After Grok chrome is removed (§5), add canonical + Open Graph to `__root.tsx`.
- Favicon PNG is large; the SVG is the primary icon. You may add 32×32 / 192 / 512 icons to the manifest.
- `src/content/people.json` and `src/content/registry.json` are unused duplicates. Live sources are the `.ts` files. Do not edit the JSON expecting the site to change.
- Language picker was removed because it did not translate. English is the official text. If you add languages later, actually translate; do not set `html lang` to Spanish on English copy.

---

## 11. Contacts the public site may show

- Office of Student Records and Accounts — `studentservices@nsbt.org`
- Toll free `844-377-1900` · Local `321-999-7990` · Fax `321-999-7980`
- 111 North Orange Avenue, Suite 800, Orlando, FL 32801
- Dr. Lim’s operational email exists in source as `jlim@nsbt.org` but is **not** rendered. Do not add staff emails to public pages unless Jimmy asks.

Jimmy Lim is Executive Vice President. Editorial questions about unpublished documents go to him, not to this handoff.

---

## 12. Definition of done for nsbt.org

- `https://www.nsbt.org` serves this site over HTTPS
- `https://nsbt.org` redirects to www
- Apply, Give, Log in, Ask NSBT, Contact, and the accreditation disclaimer all work
- Catalog / Handbook / Career / Effectiveness remain out of the nav
- No Grok / Claude / xAI / “web developers” / “agents” on visitor-facing pages
- Desk link still points at `https://desk.nsbt.org` (even if that host is not live yet)
- Bookstore either charges honestly or is closed honestly

When those are true, Grok Build’s work on the public site is finished.
