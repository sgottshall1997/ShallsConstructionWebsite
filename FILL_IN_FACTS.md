# Fill-in facts (owner checklist)

Every company fact lives in `shared/company.ts` as `COMPANY`. Change a field there, rebuild, and redeploy. Do not hardcode facts in components.

| Ask the owners | Field in `shared/company.ts` | If left at default / empty |
| --- | --- | --- |
| Exact founding year | `foundingYear` (`number \| null`) | No "Since ####" anywhere |
| Years-in-business figure to print (e.g. `"25+"`, `"30+"`) | `yearsInBusiness` | Years claims disappear from hero/stats/About/SEO |
| Self-performed % (e.g. `100`) | `selfPerformedPercent` | Soft phrase only: "the majority of our work is performed by our own crews" |
| Preferred public email (recommend `@shallsconstruction.com`) | `email` | Stays `shallsconstructionllc@aol.com` |
| Where form leads should go | env `FORM_TO_EMAIL` (not in COMPANY) | Falls back to `COMPANY.email` |
| Street address | `address.street` | Footer/schema show city + state only |
| Postal code | `address.postalCode` | Omitted from schema |
| States served + license #s | `serviceStates`, `licenses[]` | Currently MD/VA/DC, no license numbers shown |
| Insurance one-liner | `insuranceLine` | Safety page asks visitors to request a COI |
| Response promise (one sentence) | `responsePromise` | Default: "24/7 on-call emergency response" |
| Family-owned? | `familyOwned` (`true`/`false`/`null`) | No family-business claims |
| 3–6 real projects (name, city, scope, photo path) | `projects[]` | Projects page shows empty state + quote CTA; sitemap omits project URLs |
| 2–3 real testimonials **with written permission** | `testimonials[]` (`permissionGranted: true`) | Testimonials section hidden on Home |
| Association memberships | `associations[]` | Memberships block hidden on About |
| LinkedIn company URL | `linkedInUrl` | Not shown; schema `sameAs` empty |
| Phone / fax confirm | `phone`, `fax` | Current numbers kept from the live site |

After filling facts: `npm run check && npm run build`, commit, redeploy on Railway.
