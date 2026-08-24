# The New School of Biblical Theology — public website

Public site for **The New School of Biblical Theology** (`www.nsbt.org`).

This repository is the **public** school website only. The administrators’ Populi desk is a separate product at `https://desk.nsbt.org` and is **not** in this repo.

**Start here:** [HANDOFF.md](./HANDOFF.md) — written for the website manager (`nsbtorgwebsite@gmail.com`).

## Quick start

Node **22.x**.

```bash
npm ci
npm run dev
```

```bash
npm run typecheck
npm run build
```

The production build uses Nitro’s Vercel preset and writes `.vercel/output`. On Vercel, do **not** select the Vite SPA preset.

## What this site is

- Graduate-school public pages (About, Academics, Admissions, Students, Alumni, Bookstore, Ask NSBT)
- Log in is a chooser: Populi, Digital Theological Library, Google Workspace (`@nsbt.org`)
- Quiet footer link: Administrators: Populi desk → `https://desk.nsbt.org`

## What this site is not

- Not the Populi AI help desk
- Not a student records system
- Not a campus / Google SSO app (`/portal` and `/signin/*` redirect to `/login`)
