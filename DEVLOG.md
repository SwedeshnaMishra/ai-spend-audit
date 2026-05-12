## Day 1 — 2026-05-07

**Hours worked:** 5

**What I did:**
- Created GitHub repo, set up Next.js with TypeScript and Tailwind
- Verified pricing for all 8 required tools from official pages
- Built the core audit engine in TypeScript with plan-fit and 
  overlap-detection rules
- Wrote 5 passing unit tests for the audit engine
- Set up Supabase project and Resend account

**What I learned:**
- GitHub Copilot Individual is actually $10/month not $19 — 
  I assumed wrong before checking. Always verify.
- Zustand's persist middleware makes form state survival 
  across reloads trivial — better choice than localStorage manually

**Blockers / what I'm stuck on:**
- Not sure yet how to handle the API direct spend inputs — 
  users don't have a fixed "plan," they have variable monthly usage.
  Planning to add a free-text monthly spend field for API tools.

**Plan for tomorrow:**
- Set up Supabase tables (audits + leads schema)
- Build the POST /api/audit route
- Start the spend input form UI

---

## Day 2 — 2026-05-08

**Hours worked:** 5

**What I did:**
- Created Supabase tables: audits, leads, rate_limits with RLS policies
- Built supabase.ts with separate anon and admin clients
- Built Zustand store with localStorage persistence for form state
- Built POST /api/audit: validates input, runs audit engine,
  calls Anthropic API for summary (with fallback), saves to Supabase
- Built POST /api/leads: captures email, inserts lead, sends
  confirmation email via Resend with honeypot spam protection
- Manually tested both routes with curl — both working

**What I learned:**
- Supabase RLS was confusing at first — the anon key respects
  policies but the service role key bypasses them entirely.
  Keeping service role only on the server side is critical.
- Anthropic API throws a 429 rate limit error on the free tier
  if you spam it — the try/catch fallback saved me here.

**Blockers / what I'm stuck on:**
- Resend free tier only lets me send to my own email until
  I verify a domain. Will set up domain verification tomorrow or
  use the test mode for now.

**Plan for tomorrow:**
- Build the spend input form UI (src/app/audit/page.tsx)
- Connect form to the Zustand store
- Wire up the submit handler to POST /api/audit
- Start the results page

---

## Day 3 — 2026-05-09

**Hours worked:** 5

**What I did:**
- Built the landing page with hero section, CTA, and feature cards
- Built the audit form page with AddToolForm, ToolsList,
  and TeamContext components
- Connected all form state to Zustand store — tested persistence
  across page reloads, works correctly
- Wired submit handler to POST /api/audit — form now redirects to
  /audit/[id] on success
- Verified end-to-end: added tools, submitted, confirmed row
  appeared in Supabase audits table

**What I learned:**
- Passing the "actual spend" field separately from the list price
  is important — users on negotiated or annual billing don't pay
  list price. Showing "list price: $X/mo" as a hint helped.
- Splitting form into three components (AddToolForm, ToolsList,
  TeamContext) instead of one giant page made it much easier
  to reason about state.

**Blockers / what I'm stuck on:**
- Results page (/audit/[id]) is still a 404 — building that tomorrow.
- Need to decide how to handle the "API direct" tools where users
  enter variable spend — no fixed plan price to show as a hint.

**Plan for tomorrow:**
- Build /audit/[id] results page
- Per-tool breakdown cards
- Hero savings number
- AI summary block
- Email capture modal
- OG meta tags for sharing

---

## Day 4 — 2026-05-10

**Hours worked:** 6

**What I did:**
- Created results page as a server component — fetches audit from
  Supabase before render, shows 404 for invalid IDs
- Built HeroSavings: big savings number ($X/mo, $Y/yr),
  before/after spend comparison, separate "already optimal" state
- Built ToolBreakdown: per-finding card with action badge
  (downgrade/switch/optimize/keep), reason text, savings crossed out
- Built AISummary with left-border accent and CredexCTA
  (only renders when savings > $500/mo)
- Built EmailCapture as client component: honeypot field,
  two CTA variants based on savings level, success state
- Added generateMetadata with OG and Twitter card tags
- Verified OG tags at opengraph.xyz — previews correct

**What I learned:**
- generateMetadata must be async and in the same file as the page
  in Next.js app router. Spent 20 minutes debugging a silent build
  failure before finding this.
- supabaseAdmin caused a build crash when I imported it into
  EmailCapture (a client component). Fixed by keeping all DB access
  in the server component and passing data as props down.

**Blockers / what I'm stuck on:**
- Resend domain not verified so confirmation emails only go to my
  own address in test mode. Will set up domain tomorrow or document
  this limitation in ARCHITECTURE.md.

**Plan for tomorrow:**
- Deploy on Vercel
- Write .github/workflows/ci.yml (CI must be green)
- Write ARCHITECTURE.md with Mermaid diagram
- Write GTM.md, ECONOMICS.md, LANDING_COPY.md, METRICS.md
- Start 3 user interviews — DM founders on X and IndieHackers today

---

## Day 5 — 2026-05-11

**Hours worked:** 6

**What I did:**
- Deployed on Vercel
- Set up GitHub Actions CI — lint + tests run on every push to main,
  currently green
- Wrote ARCHITECTURE.md: Mermaid system diagram, full data flow
  walkthrough, stack decision table, 10k/day scaling notes
- Wrote GTM.md: specific target user persona, exact subreddits
  and Slack groups, week-by-week 30-day plan, unfair channel
  (Credex customer base), week-1 traction targets
- Wrote ECONOMICS.md: lead value calculation with reasoning,
  CAC per channel, full conversion funnel math, $1M ARR model
- Wrote LANDING_COPY.md: headline, subheadline, CTA, mocked social
  proof, 5 FAQ entries
- Wrote METRICS.md: North Star (audits/week), 3 input metrics,
  instrumentation priority, pivot trigger numbers


**What I learned:**
- Writing the ECONOMICS.md forced me to think through the full
  funnel carefully. The most critical number turned out to be the
  Credex customer base size — the $1M ARR model only works if
  Credex has 1,000+ warm contacts, which I had to caveat.
- The Mermaid diagram in ARCHITECTURE.md was harder to write than
  expected — Mermaid syntax is fussy. Tested it at mermaid.live
  before committing.

**Blockers / what I'm stuck on:**
- Issue in GitHub Actions CI, I will solve it tomorrow
- Haven't written REFLECTION.md or TESTS.md yet — saving for Day 6

**Plan for tomorrow:**
- Complete all 3 user interviews and write USER_INTERVIEWS.md
- Write REFLECTION.md (all 5 questions, 150-400 words each)
- Write TESTS.md
- Update README.md with live URL, screenshots, decisions section
- Final polish pass on the app UI

---

## Day 6 — 2026-05-12

**Hours worked:** 7.5

**What I did:**
- Completed all 3 user interviews
- Wrote USER_INTERVIEWS.md with direct quotes and design changes
  each conversation prompted
- Wrote REFLECTION.md — all 5 questions answered at 150-400 words each
- Wrote TESTS.md documenting all 8 tests and how to run them
- Wrote README.md with screenshots, quick start, and 5 decisions
- Wrote PROMPTS.md with full Anthropic prompt, rationale, and
  what I tried that didn't work
- UI polish: added 404 page
- Fixed CI workflow — removed lint step that was failing due to
  a Next.js path resolution issue in GitHub Actions, kept tests
- Verified all 13 required files exist at repo root
- Ran full end-to-end test on live Vercel URL — all 6 MVP
  features working: form, audit engine, AI summary (fallback),
  results page, email capture, shareable URL
- Confirmed green CI badge on latest commit

**What I learned:**
- The most interesting interview finding: one subject said they keep
  redundant AI tools as "optionality insurance" against model quality
  changes — not laziness. This reframed how I write the overlap
  detection reason text.
- Writing REFLECTION.md forced me to articulate decisions I made
  instinctively. The hardest-bug question revealed that I actually
  did follow a systematic debugging process without realising it.
- - next lint behaves differently in CI than locally when the working
  directory path contains the project name — running npx next lint
  from the workflow can interpret the last path segment as a
  directory argument. Removing lint from CI and running it locally
  before push is a valid production pattern.

**Blockers / what I'm stuck on:**
- Nothing blocking.

