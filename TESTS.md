# Tests

## How to run

```bash
npm test
```

All tests use Vitest with ts-vitest. No environment variables needed —
the audit engine is pure TypeScript with no external dependencies.

---

## Test file: src/lib/__tests__/audit-engine.test.ts

### How to run just this file
```bash
npx vitest audit-engine
```

### Tests

| # | Test name | What it covers |
|---|-----------|----------------|
| 1 | flags Cursor Business plan for a 2-person team | auditCursor() rule: Business plan is overkill for seats ≤ 3 |
| 2 | detects redundant coding editors (Cursor + Windsurf) | detectDuplicateCodingTools(): flags overlap when 2+ coding editors present |
| 3 | does not invent savings for already-optimal spend | isAlreadyOptimal is true when monthlySavings < $10 |
| 4 | calculates annual savings as exactly 12x monthly | totalAnnualSavings = totalMonthlySavings * 12 |
| 5 | totalMonthlySpend equals sum of all tool spend inputs | sum of all tool inputs regardless of findings |
| 6 | detects Claude Max overkill for a single user | auditClaude(): Max plan ($100) should downgrade to Pro ($20) |
| 7 | detects paying for both Claude Pro and Anthropic API | detectAPIOverlap(): Pro subscription is redundant if API is also paid |
| 8 | totalProjectedSpend includes spend from tools with no findings | bug regression: optimal tools' spend must not disappear from projection |

### Why these tests

Tests 1-5 cover the core happy paths — each major rule type and
the calculation correctness. Tests 6-7 extend coverage to tools
beyond Cursor. Test 8 is a regression test for the most significant
bug found during development: the totalProjectedSpend miscalculation
that dropped optimal tools from the projection entirely.

All tests use pure inputs and assert on pure outputs — no mocking,
no network calls, no database. The audit engine is intentionally
kept free of side effects so it can be tested this way.