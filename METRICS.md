# Metrics

## North Star metric

Audits completed per week.

Why: an audit represents genuine product value delivered — the
user went through the whole flow and got a result. It's more
meaningful than visits (intent without action) and more
leading-indicator than email captures (which lag audits by
definition). For a B2B lead-gen tool at this stage, the funnel
starts with audit completion.

## Three input metrics that drive the North Star

1. Landing page → audit start rate
   Target: >35%. If below 25%, the hero copy or CTA is failing.

2. Audit start → audit completion rate
   Target: >60%. If below 50%, the form has too much friction —
   too many required fields or confusing tool/plan selectors.

3. Organic referral rate (audits from shared URLs / total audits)
   Target: >10% within 30 days. Each completed audit creates a
   shareable URL — if users share them, growth compounds.

## What to instrument first

In order of priority:
1. Audit completions (already tracked — every POST /api/audit
that returns 200 is a completion)
2. Form drop-off point — which step do users abandon?
   (add a simple event on each "add tool" click vs final submit)
3. Email capture rate per audit (leads.count / audits.count by week)
4. Referral source — add utm_source to the shared URL and log it

Use Vercel Analytics (free, already in Next.js) for page-level
traffic. Use a simple Supabase query for funnel metrics:
SELECT COUNT(*) FROM audits WHERE created_at > now() - interval '7 days'

## What number triggers a pivot decision

If after 4 weeks of active distribution:
- Audit completion rate < 40% → the form UX needs a redesign
- Email capture rate < 15% → the results page is not showing
  enough value to earn the email
- Zero consultation requests from high-savings audits → either
  the >$500 threshold is too high, or the Credex CTA copy is wrong

The single most important early signal: do users share their
audit URL without being asked? If yes, the product has
word-of-mouth. If no, the results page is not impressive enough.