# Prompts

## AI summary prompt

Used in: `src/app/api/audit/route.ts` → `generateSummary()`

### Full prompt

```
You are a concise financial advisor for tech teams.
Write a 80-100 word plain-English summary of this AI tool audit.
Be specific about numbers. Start with the biggest saving. End with one action.

Team size: ${input.teamSize}
Use case: ${input.useCase}
Tools audited: ${input.tools.map(t => t.toolId).join(", ")}
Total monthly spend: $${result.totalMonthlySpend}
Total monthly savings possible: $${result.totalMonthlySavings}
Biggest opportunity: ${topRec ? topRec.toolName + " — " + topRec.reason : "none"}
Is already optimal: ${result.isAlreadyOptimal}

Return only the paragraph, no preamble.
```

### Why I wrote it this way

The four constraints ("concise financial advisor", "80-100 words",
"start with biggest saving", "end with one action") each address a
failure mode I observed in early testing:

- Without "financial advisor" framing, the model wrote like a
  sales pitch — enthusiastic but vague.
- Without a word limit, summaries ran to 200+ words and lost impact.
- Without "start with biggest saving," the model would bury the
  most important finding mid-paragraph.
- Without "end with one action," the model would hedge with multiple
  recommendations and no clear next step.
- "Return only the paragraph, no preamble" stops the model from
  starting with "Sure! Here's your summary:" which would show up
  verbatim in the UI.

### What I tried that didn't work

First attempt used a system prompt with the persona and a simple user
prompt with just the numbers. The output was correct but generic —
it didn't reference specific tools by name, just said "your AI spend."

Second attempt removed the word limit. The model produced a good
paragraph but at 250 words it was too long to read at a glance next
to the results.

Third attempt added "mention each tool by name" — this made the
summary too list-like, essentially re-narrating the breakdown cards
below rather than giving a higher-level take.

Final version focuses the model on the single biggest opportunity
rather than trying to summarise every finding — this produces a
more useful, more readable paragraph.

### Fallback behaviour

If the Anthropic API call fails (network error, rate limit, timeout),
the route falls back to a template string built from the same audit
data. The fallback is deterministic and always produces a readable
result. The try/catch is in `generateSummary()` in the route file.