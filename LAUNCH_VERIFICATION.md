# Launch verification: `launch-prep` branch

Audited against the authoritative briefs (`shalls-section1-fixes`, then Round 2 `shalls-round2`). Every commit, including each "N (fix)" follow-up, passed `npm ci && npm run check && npm run build` before it was made.

Script: `scripts/verify-launch.sh`. It starts a production server (`NODE_ENV=production`, port 5055) and a development server (port 5056, used for the no-key 201 path and the rate-limit test).

## Build

| Check | Result |
| --- | --- |
| `npm ci` | PASS |
| `npm run check` (`tsc`) | PASS |
| `npm run build` | PASS |

## Automated checks (46/46 PASS)

```
PASS  GET / -> 200
PASS  GET /about -> 200
PASS  GET /who-we-serve -> 200
PASS  GET /contact -> 200
PASS  GET /privacy-policy -> 200
PASS  GET /projects -> 404 (empty projects)
PASS  GET /safety -> 404 (empty safety)
PASS  GET /services/construction-remodeling -> 200
PASS  GET /services/handyman-services -> 200
PASS  GET /services/exterior-building-services -> 200
PASS  GET /services/parking-lot-services -> 200
PASS  GET /services/painting-services -> 200
PASS  GET /services/snow-removal -> 200
PASS  GET /services/unknown -> 404
PASS  GET /nonexistent -> 404
PASS  GET /api/nope -> 404 JSON
PASS  GET /api/health -> 200 {ok:true}
PASS  GET /og-image.png -> 200
PASS  GET /robots.txt -> 200
PASS  GET /sitemap.xml -> 200
PASS  sitemap has no /projects
PASS  sitemap has /privacy-policy
PASS  301 /what-we-do/ -> /services/construction-remodeling
PASS  301 /contact/ -> /contact
PASS  301 /privacy-policy/ -> /privacy-policy
PASS  301 /who-we-serve/ -> /who-we-serve
PASS  410 /wp-login.php
PASS  410 /wp-admin
PASS  410 /wp-admin/foo
PASS  file-ext path 404 plaintext
PASS  POST contact (prod, no key) -> 500 Form not configured
PASS  POST contact (dev, no key) -> 201
PASS  POST honeypot -> 200
PASS  rate limit 5/min (saw 429 among:  201 201 201 429 429 429)
PASS  one h1 marker per page component
PASS  final placeholder grep zero
PASS  API service titles == SERVICE_NAMES
PASS  API content: no 'That's why property managers'
PASS  API content: emergency line present
PASS  API content: no invented specifics
PASS  Source: "What's Included" heading
PASS  Source: emergencyLine on Home/Contact/ServiceCTA/About
PASS  Source: responsePromise used 4x (banner, 2 toast variants, Home FAQ)
PASS  Content: 'For {{years}}' at most twice
PASS  JSON: no seoTitle/seoDescription
PASS  Extended R2 grep zero (code)
--- SUMMARY pass=46 fail=0 ---
```

## Security headers (production)

`Strict-Transport-Security: max-age=31536000; includeSubDomains` · `X-Content-Type-Options: nosniff` · `X-Frame-Options: DENY` · `Referrer-Policy: strict-origin-when-cross-origin` · no `X-Powered-By`.

## Static meta

`client/index.html` has `og:url=https://shallsconstruction.com/` and `og:image=https://shallsconstruction.com/og-image.png`, and no `maximum-scale`. `og-image.png` is 1200x630 (sharp: logo centered on Tailwind primary `hsl(204 88% 53%)`). `logo.png` is 512x512.

## Contact form

- Production without `RESEND_API_KEY`: returns 500 `{"error":"Form not configured"}` and logs an error.
- Development without a key: logs the body and returns 201. The subject logged was `Website inquiry: quote — Test Co`. The body is plain text with every field, the timestamp and the IP; reply-to is the submitter.
- Honeypot `website` filled: returns 200 and sends nothing.
- Rate limit: 5 requests per minute per IP. The 4th through 6th rapid POSTs returned 429, after 2 earlier POSTs from the same IP in the same window.
- Success is reported only when Resend accepts the message (or in dev with no key).

## Source invariants

- One email: `COMPANY.email` (`shallsconstructionllc@aol.com`).
- Years are always shown as `${yearsInBusiness}+ years` (25+). `foundedYear` is null, so "since YEAR" never appears.
- `selfPerformedPercent` 95 is shown on Home and About.
- Response promise: "We respond to all inquiries within one business day." It appears only in the Contact banner, the Home FAQ answer and the form success toast.
- Emergency service (R2-A): `emergencyService: true` renders "24/7/365 emergency response — call (301) 933-6277 any time." on the Home hero and 4th stat tile, Contact banner, ServiceCTA and About "Always Reachable". It is not used as the response-time promise. Marked CONFIRM WITH PARENTS.
- `insuranceLine` is always shown on About.
- Projects, Safety and Testimonials are hidden while their data is empty. That covers routes, nav, footer, sitemap and Home sections.
- JSON-LD has exactly one Organization and one LocalBusiness, both from `client/lib/schema.ts`:
  - no openingHours, founder or AggregateRating
  - `sameAs` only when a social link is set
  - `areaServed` comes from `serviceAreas`
  - `streetAddress` is omitted while the street is empty
- One H1 per page component.
- Service names match the brief. The only CTAs are "Request a Quote" and "Call (301) 933-6277".
- Final placeholder grep returns zero hits, including `*.json`/`package-lock.json`, so there were no dependency false positives.

## Round 2 (A–F)

- A: emergency response restored; orphaned handyman/snow/exterior sentences repaired; handyman meta fixed.
- B: invented specifics removed (three weeks, sq ft figures, updated daily, crisp two years, weather monitoring/standby crews, permitting, after hours/weekends, timeline too tight, infection-control, compliant, exclusively); Home H1 uses `COMPANY.regionShort`; no DMV/Montgomery County/Mid-Atlantic; About title from `COMPANY.address`.
- C: "What's Included" heading with `<li>` items; `SERVICE_NAMES` is the H1 and storage title; JSON SEO fields deleted; `/projects` related link only when projects exist; nav/footer labels About/Contact/Safety; contact placeholders; privacy date, link and curly quotes; footer uses `COMPANY.tagline`; stars only when a rating exists.
- D: repetition trimmed; philosophies varied ("For {{years}}" twice); About value renamed "Made for How Property Managers Work".
- E: FILL_IN_FACTS.md is now a plain owner questionnaire; the field mapping lives in DEV_FACTS_MAP.md.
- F: extended grep (original + `DMV|Montgomery County|Mid-Atlantic|sq ft|three weeks|Services Services|That's why property managers`) has zero hits in client/, server/, shared/, public/, client/index.html and *.json.

## Not done / deferred to owners

- A real `RESEND_API_KEY` and a verified `FORM_FROM_EMAIL` (needs the Resend domain set up).
- The `FILL_IN_FACTS.md` fields: founding year, licenses, projects, testimonials, LinkedIn, company mailbox.
- Railway service creation, DNS cutover, GA4 and Search Console are documented in `DEPLOYMENT.md` but not executed (per the brief).
- Risk: `.replit`, `replit.md` and the Replit plugins were removed, so any Replit deploy of this repo will stop working. Railway is the intended host.
- Hero WebP is 1408px wide (the source is smaller than 1920; it was not upscaled).
