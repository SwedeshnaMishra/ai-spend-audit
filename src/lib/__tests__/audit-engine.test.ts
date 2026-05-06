import { describe, expect, test } from "vitest";
import { runAudit } from "@/lib/audit-engine";

describe("Audit Engine", () => {

  test("flags Cursor Business plan for a 2-person team", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor", planId: "business", monthlySpend: 80, seats: 2 },
      ],
      teamSize: 2,
      useCase: "coding",
    });
    expect(result.tools[0].recommendedAction).toBe("downgrade");
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  test("detects redundant coding editors (Cursor + Windsurf)", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor",   planId: "pro", monthlySpend: 20, seats: 1 },
        { toolId: "windsurf", planId: "pro", monthlySpend: 15, seats: 1 },
      ],
      teamSize: 1,
      useCase: "coding",
    });
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  test("does not invent savings for already-optimal spend", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor", planId: "pro", monthlySpend: 20, seats: 1 },
      ],
      teamSize: 1,
      useCase: "coding",
    });
    expect(result.isAlreadyOptimal).toBe(true);
  });

  test("calculates annual savings as exactly 12x monthly savings", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor", planId: "business", monthlySpend: 200, seats: 5 },
      ],
      teamSize: 5,
      useCase: "coding",
    });
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });

  test("totalMonthlySpend equals sum of all tool spend inputs", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor",         planId: "pro",        monthlySpend: 20, seats: 1 },
        { toolId: "github_copilot", planId: "individual", monthlySpend: 10, seats: 1 },
      ],
      teamSize: 1,
      useCase: "coding",
    });
    expect(result.totalMonthlySpend).toBe(30);
  });


  test("detects Claude Max overkill for a single user", () => {
    const result = runAudit({
      tools: [
        { toolId: "claude", planId: "max", monthlySpend: 100, seats: 1 },
      ],
      teamSize: 1,
      useCase: "writing",
    });
    expect(result.tools[0].recommendedAction).toBe("downgrade");
    expect(result.totalMonthlySavings).toBe(80);
  });

  test("detects paying for both Claude Pro and Anthropic API (redundant)", () => {
    const result = runAudit({
      tools: [
        { toolId: "claude",         planId: "pro",    monthlySpend: 20, seats: 1 },
        { toolId: "anthropic_api",  planId: "direct", monthlySpend: 50, seats: 1 },
      ],
      teamSize: 1,
      useCase: "coding",
    });
    expect(result.totalMonthlySavings).toBe(20);
  });

  test("totalProjectedSpend includes spend from tools with no findings", () => {
    const result = runAudit({
      tools: [
        { toolId: "cursor", planId: "pro", monthlySpend: 20, seats: 1 },
        { toolId: "github_copilot", planId: "enterprise", monthlySpend: 78, seats: 2 },
      ],
      teamSize: 2,
      useCase: "coding",
    });
    expect(result.totalProjectedSpend).toBe(58);
    expect(result.totalMonthlySavings).toBe(40);
  });

});