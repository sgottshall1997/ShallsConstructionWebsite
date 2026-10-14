# Fill-in facts (owner checklist)

Every company fact lives in `shared/company.ts` as `COMPANY`. Change a field there, rebuild, and redeploy. Do not hardcode facts in components. Every default is tagged `// CONFIRM WITH PARENTS`.

| Ask the owners | Field in `shared/company.ts` | If left at default / empty |
| --- | --- | --- |
| Exact founding year | `foundedYear` (`number \| null`) | Never renders "since YEAR" |
| Years-in-business figure (e.g. `25`) | `yearsInBusiness` | Always rendered as `${yearsInBusiness}+ years` (currently `25+ years`) |
| Self-performed % (e.g. `95`) | `selfPerformedPercent` | Rendered via `inHouseText()` / `{{inHouse}}` |
| Preferred public email (recommend `@shallsconstruction.com`) | `email` | Stays `shallsconstructionllc@aol.com` |
| Where form leads should go | env `FORM_TO_EMAIL` (not in COMPANY) | Falls back to `COMPANY.email` |
| Street address | `address.street` | City/state/zip only; `streetAddress` omitted from JSON-LD |
| Postal code | `address.zip` | Currently `20895` |
| States served | `serviceStates` | Currently `["MD","VA","DC"]` |
| License numbers | `licenses[]` (`{state,number}`) | Empty → no license list; `/safety` stays hidden |
| Insurance one-liner | `insuranceLine` | Always shown on About (default: certificates upon request) |
| Response promise (one sentence) | `responsePromise` | Default: "We respond to all inquiries within one business day." Used on Home, Who We Serve, Contact banner, form success toast. No 24/7 claims. |
| Family-owned? | `familyBusinessClaim` (`true`/`false`) | `false` → no family-business claims |
| 3–6 real projects (name, city, scope, photo path, slug) | `projects[]` | Empty → `/projects` route, nav, footer, sitemap all omitted |
| 2–3 real testimonials **with written permission** | `testimonials[]` | Empty → testimonials section not rendered; no fetch |
| Association memberships | `associations[]` | Empty → Industry Partnerships / Memberships blocks hidden |
| Charities / leadership / safety stats / awards | `charities[]`, `leadership[]`, `safetyStats[]`, `awards[]` | Empty → sections and `/safety` stay hidden |
| LinkedIn company URL | `social.linkedin` | Empty → not shown; `sameAs` omitted from JSON-LD |
| Phone / fax confirm | `phone`, `phoneE164`, `fax` | Current numbers kept from the live site |
| Clients | `clients[]` | Four real logos already wired (Associa, Comsource, ACM, MMI) |

After filling facts: `npm run check && npm run build`, commit, redeploy on Railway.
