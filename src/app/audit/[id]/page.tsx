import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import type { AuditResult } from "@/lib/audit-engine"
import HeroSavings    from "@/components/results/HeroSavings"
import ToolBreakdown  from "@/components/results/ToolBreakdown"
import AISummary      from "@/components/results/AISummary"
import CredexCTA      from "@/components/results/CredexCTA"
import EmailCapture   from "@/components/results/EmailCapture"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps) {
  const { data } = await supabaseAdmin
    .from("audits")
    .select("result")
    .eq("id", params.id)
    .single()

  if (!data) return { title: "Audit not found" }

  const result  = data.result as AuditResult
  const savings = result.totalMonthlySavings
  const spend   = result.totalMonthlySpend
  const base    = process.env.NEXT_PUBLIC_BASE_URL

  const title = savings > 0
    ? `I found $${savings}/month in AI tool savings`
    : "My AI stack is already optimised"

  const desc = savings > 0
    ? `Spending $${spend}/mo on AI tools — could save $${savings}/mo ($${savings * 12}/yr). Free audit by SpendLens.`
    : `Spending $${spend}/mo with no major redundancies found. Free audit by SpendLens.`

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `${base}/audit/${params.id}`,
      siteName: "SpendLens",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: desc,
    },
  }
}

export default async function ResultsPage({ params }: PageProps) {
  const { data, error } = await supabaseAdmin
    .from("audits")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !data) notFound()

  const result  = data.result  as AuditResult
  const summary = data.ai_summary as string

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center
                      justify-between max-w-3xl mx-auto">
        <a href="/" className="font-semibold text-lg tracking-tight">
          SpendLens
        </a>
        <a href="/audit"
          className="text-sm text-slate-400 hover:text-white transition-colors">
          New audit
        </a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <HeroSavings result={result} />
        <AISummary   summary={summary} />
        <ToolBreakdown tools={result.tools} />
        {result.totalMonthlySavings > 500 && (
          <CredexCTA savings={result.totalMonthlySavings} />
        )}
        <EmailCapture
          auditId={params.id}
          totalSavings={result.totalMonthlySavings}
        />
      </div>
    </main>
  )
}