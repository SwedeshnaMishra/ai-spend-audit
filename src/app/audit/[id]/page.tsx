import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import type { AuditResult } from "@/lib/audit-engine"
import HeroSavings    from "@/components/results/HeroSavings"
import ToolBreakdown  from "@/components/results/ToolBreakdown"
import AISummary      from "@/components/results/AISummary"
import CredexCTA      from "@/components/results/CredexCTA"
import EmailCapture   from "@/components/results/EmailCapture"
import ShareButton from "@/components/results/ShareButton"

export const dynamic = 'force-dynamic'
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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-[#07111f] to-slate-950 text-white">
      <nav className="border-b border-slate-800/80 backdrop-blur-sm">
  <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

    <a
      href="/"
      className="flex items-center gap-2 font-semibold text-xl tracking-tight"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <span>SpendLens</span>
    </a>

    <a
      href="/audit"
      className="text-sm text-slate-400 hover:text-white transition-colors"
    >
      New audit
    </a>

  </div>
</nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <HeroSavings result={result} />
        <div className="flex justify-center -mt-4">
  <ShareButton auditId={params.id} />
</div>
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