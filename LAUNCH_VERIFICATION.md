# Launch verification — `launch-prep` branch

Ran on the executor box after `npm ci && npm run check && npm run build` (all green on every commit). Production server: `NODE_ENV=production node dist/index.js` on port 5055.

## Build

| Check | Result |
| --- | --- |
| `npm ci` | PASS |
| `npm run check` (`tsc`) | PASS |
| `npm run build` | PASS |

## Routes (HTTP)

| Request | Expected | Actual |
| --- | --- | --- |
| `GET /` | 200 | 200 |
| `GET /about` | 200 | 200 |
| `GET /who-we-serve` | 200 | 200 |
| `GET /projects` | 200 | 200 |
| `GET /safety` | 200 | 200 |
| `GET /contact` | 200 | 200 |
| `GET /privacy` | 200 | 200 |
| `GET /services/construction-remodeling` | 200 | 200 |
| `GET /services/handyman-services` | 200 | 200 |
| `GET /services/exterior-building-services` | 200 | 200 |
| `GET /services/parking-lot-services` | 200 | 200 |
| `GET /services/painting-services` | 200 | 200 |
| `GET /services/snow-removal` | 200 | 200 |
| Footer/Nav hrefs (same as above + service links) | 200 | 200 |
| `GET /nonexistent` | 404 HTML | 404 |
| `GET /api/nope` | 404 JSON | 404 `{"error":"Not found"}` |
| `GET /what-we-do/` | 301 → `/services/construction-remodeling` | 301 |
| `GET /contact/` | 301 → `/contact` | 301 |
| `GET /privacy-policy/` | 301 → `/privacy` | 301 |
| `GET /sitemap.xml` | 200, only `.com` routed URLs | 200 (13 locs, no replit/blog/testimonials/service-areas) |
| `GET /robots.txt` | 200 | 200 |
| `GET /og-image.png` | 200 `image/png` | 200 |
| `GET /api/health` | 200 `{ok:true}` | 200 `{ok:true}` |

## Contact form

| Request | Expected | Actual |
| --- | --- | --- |
| `POST /api/contact` (valid, no Resend key) | 201; email body logged | 201; logged `[contact-email] Subject: … Verify Launch` |
| `POST /api/contact` with honeypot `website` filled | 200; nothing logged/sent | 200 `{ok:true}`; no email log for Bot Spam |

## Source invariants

- **One email:** only `COMPANY.email` (`shallsconstructionllc@aol.com`) — no second gmail/aol hardcode.
- **One years figure:** `COMPANY.yearsInBusiness = "25+"` via `yearsPhrase()`.
- **One canonical base:** `COMPANY.url = https://shallsconstruction.com` (SEO.tsx + schema).
- **One H1 per page** (page components each render a single `h1` / `text-page-title`).
- **Section-4 grep** for `replit.app`, `Example:`, bracket placeholders, Unsplash, 555-01xx, etc.: **zero hits**.

## Not done / deferred to owners

- Real `RESEND_API_KEY` + verified `FORM_FROM_EMAIL` (needs Resend domain setup).
- Filling `FILL_IN_FACTS.md` fields (founding year, licenses, insurance, projects, testimonials, LinkedIn, company mailbox).
- Railway service creation, DNS cutover, GA4/Search Console — documented in `DEPLOYMENT.md`, not executed (brief: do not touch Railway/DNS/live deploy).
- Risk: `.replit` / `replit.md` removed — any Replit Autoscale deploy of this repo will no longer work; Railway is the intended host.
