# Deploy Shall's Construction on Railway

Target: https://shallsconstruction.com (replacing the existing WordPress site at that domain).

## 1. Create the Railway service

1. New Project → Deploy from GitHub → `sgottshall1997/ShallsConstructionWebsite`.
2. Use branch `main` after this launch-prep PR is merged.
3. Railway will pick up `railway.json` (Nixpacks, `npm ci && npm run build`, `npm start`, healthcheck `/api/health`).
4. Fallback: the root `Dockerfile` (Node 20) if Nixpacks fails.

## 2. Environment variables

| Variable | When | Notes |
| --- | --- | --- |
| `PORT` | Runtime | Railway sets this; do not hardcode |
| `NODE_ENV` | Runtime | `production` |
| `RESEND_API_KEY` | Runtime | Required in production; without it the form returns 500 "Form not configured" |
| `FORM_TO_EMAIL` | Runtime | Inbox for leads (defaults to COMPANY.email) |
| `FORM_FROM_EMAIL` | Runtime | Default `Shall's Website <onboarding@resend.dev>`; switch after domain verify |
| `VITE_GA4_MEASUREMENT_ID` | **Build-time** | Vite inlines it — change requires a rebuild/redeploy |
| `VITE_GSC_VERIFICATION` | **Build-time** | Same |

## 3. Custom domain + DNS

1. Railway → Settings → Domains → add `shallsconstruction.com` and `www.shallsconstruction.com`.
2. At the DNS host, point:
   - Apex `A`/`ALIAS`/`CNAME` as Railway instructs
   - `www` CNAME to Railway
3. Keep the old WordPress host up until DNS has fully propagated and you have confirmed the new site responds on HTTPS.
4. The app 301s `www` → apex in production.

## 4. Resend domain verification

1. Add `shallsconstruction.com` in Resend → Domains; publish the DNS records they give you.
2. Once verified, set `FORM_FROM_EMAIL` to e.g. `Shall's Construction <website@shallsconstruction.com>` and redeploy.

## 5. WordPress redirect table

These are implemented in `shared/routes.ts` and enforced by the Express middleware (one hop):

| Legacy path | Status | Target |
| --- | --- | --- |
| `/what-we-do`, `/what-we-do/` | 301 | `/services/construction-remodeling` |
| `/who-we-serve/` | 301 | `/who-we-serve` |
| `/contact/` | 301 | `/contact` |
| `/privacy-policy/` | 301 | `/privacy-policy` |
| `/category/article`, `/category/article/` | 301 | `/` |
| `/your-property-maintenance-checklist-for-the-winter/` | 301 | `/` |
| `/seasonal-checklist/` | 301 | `/` |
| `/hello-world/` | 301 | `/` |
| Any other trailing slash | 301 | Same path without slash |
| `/wp-login.php` | 410 | Gone |
| `/wp-admin`, `/wp-admin/*` | 410 | Gone |

Leave WordPress live until:

1. Railway domain is green (HTTPS).
2. `curl -I https://shallsconstruction.com/api/health` → 200.
3. Contact form delivers a test email with Resend.
4. Then lower WordPress TTL and flip DNS.

## 6. Post-launch checks

1. Google Search Console → property `https://shallsconstruction.com` → submit `https://shallsconstruction.com/sitemap.xml`.
2. Confirm GA4 realtime hits if `VITE_GA4_MEASUREMENT_ID` was set at build.
3. Submit a real contact form and confirm the email arrives.
4. Spot-check `/`, `/about`, `/services/construction-remodeling`, `/contact`, `/privacy-policy`, a 404, `/api/health`, and a rate-limit rejection after 6 rapid POSTs.
