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