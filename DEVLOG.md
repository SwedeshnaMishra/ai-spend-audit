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