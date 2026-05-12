# Reflection

## 1. The hardest bug I hit this week

The hardest bug was the totalProjectedSpend miscalculation in the audit
engine. The symptom was that audits with mixed results — some tools flagged,
some optimal — were showing incorrect projected spend numbers.

My first hypothesis was that I was double-counting savings somewhere. I added
console.logs to each rule function and printed the results array after each
step. The results array looked correct — each finding had the right
monthlySavings value.

My second hypothesis was that the final calculation was wrong. I printed
totalMonthlySpend (sum of all tool inputs) and compared it to totalProjectedSpend
(which I was calculating as totalMonthlySpend - totalSavings). The numbers
didn't match what I expected on paper.

Then I realised the bug: my results array only contained tools THAT HAD
FINDINGS. Tools that were optimal had no entry in results. So when I
calculated totalProjectedSpend by subtracting savings from totalMonthlySpend,
I was only accounting for flagged tools — the optimal tools' spend was
disappearing from the projection entirely.

The fix was to sum ALL tools' input spend for totalMonthlySpend, and
separately sum only the monthlySavings from findings. totalProjectedSpend
= totalMonthlySpend - totalSavings. This was a 2-line fix but took
about 45 minutes to diagnose because the bug only appeared in mixed-result
audits, not single-tool tests.

---

## 2. A decision I reversed mid-week

I originally planned to build the audit engine using AI — send the user's
tool list to the Anthropic API and ask it to generate recommendations.

I reversed this by Day 2 after thinking through the assignment requirement:
"The audit math itself should use hardcoded rules — knowing when NOT to use
AI is part of the test."

The reason the reversal made sense technically: AI-generated audit logic
is non-deterministic. If two users with identical inputs get different
recommendations, the tool loses credibility. A finance person needs to
be able to verify the reasoning and agree with it. Hardcoded rules with
explicit reason strings are auditable. AI-generated advice is not.

I kept AI only for the summary paragraph — where creative, personalised
prose is the point and exact reproducibility doesn't matter.

---

## 3. What I would build in week 2

Three things in priority order:

First, a benchmark mode: "your AI spend per developer is $X — companies
your size average $Y." This requires collecting anonymised aggregate data
from completed audits, which I'd start doing from day 1. The benchmark
adds a second reason to share the results page — not just "I found savings"
but "I'm above/below average."

Second, an embeddable widget — a script tag a tech blogger or newsletter
writer could drop into their site. The widget would be a minimal version
of the form that embeds inline. Distribution via content creators is much
cheaper than paid ads.

Third, a PDF export of the full report. Several interview subjects mentioned
they'd want to bring the audit to a budget meeting. A downloadable PDF with
the tool's branding would turn the audit into a shareable artifact within
companies, not just between individuals.

---

## 4. How I used AI tools

I used Claude (claude.ai) for the majority of the coding work throughout
the week. Specifically I used it for: generating the initial component
structure and TypeScript types, writing the Tailwind class combinations for
the UI (tedious to write by hand), and drafting the markdown documentation
files as starting points that I then rewrote with real specifics.

I did NOT trust Claude for: the audit engine logic itself (I wrote and
reviewed every rule manually), the pricing data (verified every number from
official vendor pages myself), and the user interview content (real
conversations, not generated).

One specific time the AI was wrong: Claude initially suggested using
localStorage directly for form persistence instead of Zustand's persist
middleware. The localStorage approach would have required manual serialisation
and a useEffect on mount to restore state — more code and more bugs. I caught
this because I knew Zustand had a persistence plugin and checked the docs.
The AI wasn't catastrophically wrong, just suggesting a more complex solution.

---

## 5. Self-ratings

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Discipline | 8/10 | Committed daily but Day 5 ran long and compressed Day 6 |
| Code quality | 7/10 | TypeScript throughout, good abstractions, but audit engine rules could be more modular |
| Design sense | 6/10 | Functional and clean but not distinctive — I'd hire a designer for the real launch |
| Problem-solving | 8/10 | Diagnosed the totalProjectedSpend bug methodically; good instinct on audit engine architecture |
| Entrepreneurial thinking | 7/10 | Strong GTM and economics thinking; weaker on the actual distribution hustle |