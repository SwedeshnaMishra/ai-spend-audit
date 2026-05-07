import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { nanoid } from "nanoid"
import { runAudit } from "@/lib/audit-engine"
import { supabaseAdmin } from "@/lib/supabase"
import type { AuditInput } from "@/lib/audit-engine"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tools, teamSize, useCase } = body as AuditInput

    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      return NextResponse.json(
        { error: "At least one tool is required" },
        { status: 400 }
      )
    }

    const result = runAudit({ tools, teamSize, useCase })

    const aiSummary = await generateSummary(result, { tools, teamSize, useCase })

    const auditId = nanoid(10)

    const { error: dbError } = await supabaseAdmin
      .from("audits")
      .insert({
        id: auditId,
        tools,
        team_size: teamSize,
        use_case: useCase,
        result,
        ai_summary: aiSummary,
      })

    if (dbError) {
      console.error("Supabase insert error:", dbError)
      return NextResponse.json(
        { error: "Failed to save audit" },
        { status: 500 }
      )
    }

    return NextResponse.json({ auditId, result, aiSummary })
  } catch (err) {
    console.error("Audit route error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

async function generateSummary(
  result: ReturnType<typeof runAudit>,
  input: AuditInput
): Promise<string> {
  const fallback = buildFallback(result)

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const topRec = result.tools
      .filter((t) => t.monthlySavings > 0)
      .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `You are a concise financial advisor for tech teams.
Write a 80-100 word plain-English summary of this AI tool audit.
Be specific about numbers. Start with the biggest saving. End with one action.

Team size: ${input.teamSize}
Use case: ${input.useCase}
Tools audited: ${input.tools.map((t) => t.toolId).join(", ")}
Total monthly spend: $${result.totalMonthlySpend}
Total monthly savings possible: $${result.totalMonthlySavings}
Biggest opportunity: ${topRec ? topRec.toolName + " — " + topRec.reason : "none"}
Is already optimal: ${result.isAlreadyOptimal}

Return only the paragraph, no preamble.`,
        },
      ],
    })

    const text = msg.content[0]
    if (text.type === "text") return text.text
    return fallback
  } catch (err) {
    console.error("Anthropic API failed, using fallback summary:", err)
    return fallback
  }
}

function buildFallback(result: ReturnType<typeof runAudit>): string {
  if (result.isAlreadyOptimal) {
    return `Your AI stack looks well-optimized. At $${result.totalMonthlySpend}/month across ${result.tools.length} tool${result.tools.length !== 1 ? "s" : ""}, you're not overpaying for your team size. Keep an eye on seat counts as you grow — plan thresholds shift quickly above 5 and 10 seats.`
  }
  const top = result.tools
    .filter((t) => t.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]
  return `We found $${result.totalMonthlySavings}/month ($${result.totalAnnualSavings.toLocaleString()}/year) in potential savings. Your biggest opportunity is ${top?.toolName ?? "across your stack"}: ${top?.reason ?? "consider reviewing your plans"}.`
}