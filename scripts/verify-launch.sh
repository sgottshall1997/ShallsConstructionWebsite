#!/usr/bin/env bash
set -euo pipefail
cd /workspace/ShallsConstructionWebsite
PORT=5055
pkill -f "node dist/index.js" 2>/dev/null || true
sleep 0.5
NODE_ENV=production PORT=$PORT node dist/index.js >/tmp/shalls-server.log 2>&1 &
SPID=$!
cleanup(){ kill $SPID 2>/dev/null || true; }
trap cleanup EXIT
for i in $(seq 1 40); do
  if curl -sf "http://127.0.0.1:$PORT/api/health" >/dev/null; then break; fi
  sleep 0.25
done

pass=0; fail=0
check(){
  local name="$1"; shift
  if "$@"; then echo "PASS  $name"; pass=$((pass+1)); else echo "FAIL  $name"; fail=$((fail+1)); fi
}

base="http://127.0.0.1:$PORT"

code(){ curl -s -o /dev/null -w "%{http_code}" "$1"; }
code_loc(){ curl -s -o /dev/null -w "%{http_code} %{redirect_url}" -L --max-redirs 0 "$1" || true; }
redir(){ # expect exact Location
  local url="$1" expect="$2"
  local out; out=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" "$url")
  local c="${out%%|*}"; local loc="${out#*|}"
  # normalize absolute to path
  loc="${loc#http://127.0.0.1:$PORT}"
  [[ "$c" == "301" && "$loc" == "$expect" ]]
}

check "GET / -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/) == 200 ]]"
check "GET /about -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/about) == 200 ]]"
check "GET /who-we-serve -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/who-we-serve) == 200 ]]"
check "GET /contact -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/contact) == 200 ]]"
check "GET /privacy-policy -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/privacy-policy) == 200 ]]"
check "GET /projects -> 404 (empty projects)" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/projects) == 404 ]]"
check "GET /safety -> 404 (empty safety)" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/safety) == 404 ]]"
for s in construction-remodeling handyman-services exterior-building-services parking-lot-services painting-services snow-removal; do
  check "GET /services/$s -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/services/$s) == 200 ]]"
done
check "GET /services/unknown -> 404" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/services/does-not-exist) == 404 ]]"
check "GET /nonexistent -> 404" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/nonexistent) == 404 ]]"
check "GET /api/nope -> 404 JSON" bash -c "body=\$(curl -s -w '|%{http_code}' $base/api/nope); [[ \$body == *'Not found'* && \$body == *'|404' ]]"
check "GET /api/health -> 200 {ok:true}" bash -c "body=\$(curl -s $base/api/health); [[ \$body == '{\"ok\":true}' ]]"
check "GET /og-image.png -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/og-image.png) == 200 ]]"
check "GET /robots.txt -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/robots.txt) == 200 ]]"
check "GET /sitemap.xml -> 200" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/sitemap.xml) == 200 ]]"
check "sitemap has no /projects" bash -c "! curl -s $base/sitemap.xml | grep -q '/projects'"
check "sitemap has /privacy-policy" bash -c "curl -s $base/sitemap.xml | grep -q '/privacy-policy'"

check "301 /what-we-do/ -> /services/construction-remodeling" redir "$base/what-we-do/" "/services/construction-remodeling"
check "301 /contact/ -> /contact" redir "$base/contact/" "/contact"
check "301 /privacy-policy/ -> /privacy-policy" redir "$base/privacy-policy/" "/privacy-policy"
check "301 /who-we-serve/ -> /who-we-serve" redir "$base/who-we-serve/" "/who-we-serve"
check "410 /wp-login.php" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/wp-login.php) == 410 ]]"
check "410 /wp-admin" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/wp-admin) == 410 ]]"
check "410 /wp-admin/foo" bash -c "[[ \$(curl -s -o /dev/null -w '%{http_code}' $base/wp-admin/foo) == 410 ]]"
check "file-ext path 404 plaintext" bash -c "c=\$(curl -s -o /dev/null -w '%{http_code}' $base/missing.xyz); [[ \$c == 404 ]]"

# Contact form — valid (no key, non-prod NODE_ENV was production — wait, NODE_ENV=production so no key should 500)
# Brief: No key: prod 500; but verification historically expected 201 in logged mode.
# Our code: production without key => 500. For local verify we want to confirm that.
check "POST contact (prod, no key) -> 500 Form not configured" bash -c '
  body=$(curl -s -w "|%{http_code}" -X POST '"$base"'/api/contact -H "Content-Type: application/json" \
    -d "{\"inquiryType\":\"quote\",\"firstName\":\"Verify\",\"lastName\":\"Launch\",\"email\":\"verify@example.com\",\"message\":\"Launch verification test message\",\"website\":\"\"}");
  [[ "$body" == *"Form not configured"* && "$body" == *"|500" ]]
'

# Restart briefly in non-production for 201 path? Or set NODE_ENV unset for a second process.
# Better: spawn a second server on 5056 without NODE_ENV=production
PORT2=5056
NODE_ENV=development PORT=$PORT2 node dist/index.js >/tmp/shalls-server-dev.log 2>&1 &
SPID2=$!
for i in $(seq 1 40); do curl -sf "http://127.0.0.1:$PORT2/api/health" >/dev/null && break; sleep 0.25; done
check "POST contact (dev, no key) -> 201" bash -c '
  body=$(curl -s -w "|%{http_code}" -X POST http://127.0.0.1:'"$PORT2"'/api/contact -H "Content-Type: application/json" \
    -d "{\"inquiryType\":\"quote\",\"firstName\":\"Verify\",\"lastName\":\"Launch\",\"email\":\"verify@example.com\",\"message\":\"Launch verification test message\",\"company\":\"Test Co\",\"website\":\"\"}");
  [[ "$body" == *"|201" ]]
'
check "POST honeypot -> 200" bash -c '
  body=$(curl -s -w "|%{http_code}" -X POST http://127.0.0.1:'"$PORT2"'/api/contact -H "Content-Type: application/json" \
    -d "{\"inquiryType\":\"general\",\"firstName\":\"Bot\",\"lastName\":\"Spam\",\"email\":\"bot@example.com\",\"message\":\"spam spam spam spam\",\"website\":\"http://spam.example\"}");
  [[ "$body" == *"|200" ]]
'
# Rate limit: 6 rapid posts — 6th should be 429
rl_codes=""
for i in 1 2 3 4 5 6; do
  c=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1:$PORT2/api/contact -H "Content-Type: application/json" \
    -d "{\"inquiryType\":\"general\",\"firstName\":\"R\",\"lastName\":\"L\",\"email\":\"rl$i@example.com\",\"message\":\"rate limit test message\",\"website\":\"\"}")
  rl_codes="$rl_codes $c"
done
check "rate limit 5/min (saw 429 among: $rl_codes)" bash -c '[[ "'"$rl_codes"'" == *429* ]]'
kill $SPID2 2>/dev/null || true

# One H1 per page — count in built JS is hard; check source pages
check "one h1 marker per page component" bash -c '
  for f in client/src/pages/Home.tsx client/src/pages/About.tsx client/src/pages/WhoWeServe.tsx client/src/pages/Contact.tsx client/src/pages/Privacy.tsx client/src/pages/ServiceDetail.tsx client/src/pages/not-found.tsx; do
    n=$(rg -c "<h1" "$f" || true)
    [[ "${n:-0}" == "1" ]] || { echo "bad $f count=$n"; exit 1; }
  done
'

# Grep
check "final placeholder grep zero" bash -c '
  ! rg -n -P "\[Add|\[ADD|\[Input|\[X\]|\[Probably|\[Owner|\[Charity|\[Award|\[Logo|\[Photo|\[Chamber|\[Industry|\[AGC\]|\[BOMA\]|\[ABC\]|\(samples|Example:|555-01|490-2119|!4v1234567890|Did you forget|Michael Chen|Jennifer Martinez|Robert Thompson|Sarah Miller|Lisa Anderson|Patricia Williams|Metro Property Group|HealthFirst|Urban Development LLC|Sarah Johnson|David Martinez|Jennifer Lee|images.unsplash.com|replit|gmail.com|since 1988|since 1992|30\+|three generations|three decades|2-hour|2 hours|Delaware|\bDE\b" client/ server/ shared/ public/ *.json client/index.html 2>/dev/null
'

# Round 2 content checks
check "API service titles == SERVICE_NAMES" bash -c '
  t=$(curl -s '"$base"'/api/services | node -e "let s=\"\";process.stdin.on(\"data\",d=>s+=d).on(\"end\",()=>console.log(JSON.parse(s).map(x=>x.title).join(\"|\")))");
  [[ "$t" == "Construction & Remodeling|Handyman Services|Exterior Building Services|Parking Lot Asphalt & Concrete|Painting Services|Snow Removal" ]]
'
svc(){ curl -s "$base/api/services"; }
c_no_orphan(){ ! svc | grep -q "That's why property managers"; }
c_emerg(){ ! svc | grep -Eqi '24/7|emergency|365'; }
c_specifics(){ ! svc | grep -Eq 'sq ft|three weeks|Mid-Atlantic|Montgomery County|crisp two years|updated daily|initial permitting|timeline too tight|weather forecasts'; }
c_included(){ grep -q "What's Included" client/src/pages/ServiceDetail.tsx && ! grep -q 'Services Include:' client/src/pages/ServiceDetail.tsx; }
c_emerg_src(){ ! grep -rniEq "24/7|emergency|365" client shared server SERVICE_CONTENT_PRIMARY.json; }
c_promise(){ local n; n=$(rg -o 'COMPANY\.responsePromise' client/src | wc -l); [[ "$n" -eq 4 ]]; }
c_years(){ [[ $(grep -o 'For {{years}}' SERVICE_CONTENT_PRIMARY.json | wc -l) -le 2 ]]; }
c_noseo(){ ! grep -Eq 'seoTitle|seoDescription' SERVICE_CONTENT_PRIMARY.json; }
c_grep2(){ ! rg -n -P "$(cat scripts/r2-grep-pattern.txt)" client/ server/ shared/ public/ client/index.html *.json; }
check "API content: no 'That's why property managers'" c_no_orphan
check "API content: no emergency/24/7 text" c_emerg
check "API content: no invented specifics" c_specifics
check "Source: \"What's Included\" heading" c_included
check "Source: no 24/7|emergency|365 in client/shared/server/JSON" c_emerg_src
check "Source: responsePromise used 4x (banner, 2 toast variants, Home FAQ)" c_promise
check "Content: 'For {{years}}' at most twice" c_years
check "JSON: no seoTitle/seoDescription" c_noseo
check "Extended R2 grep zero (code)" c_grep2

echo "--- SUMMARY pass=$pass fail=$fail ---"
[[ $fail -eq 0 ]]
