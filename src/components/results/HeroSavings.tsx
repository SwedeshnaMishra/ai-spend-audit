import type { AuditResult } from "@/lib/audit-engine"

interface Props {
  result: AuditResult
}

export default function HeroSavings({ result }: Props) {
  const {
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    isAlreadyOptimal,
  } = result

  if (isAlreadyOptimal) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">
          Your stack looks optimised
        </h1>
        <p className="text-slate-400 max-w-sm mx-auto">
          You are spending ${totalMonthlySpend.toLocaleString()}/month
          with no significant redundancies or plan mismatches detected.
        </p>
      </div>
    )
  }

  const optimisedSpend = totalMonthlySpend - totalMonthlySavings

  return (
    <div className="bg-slate-900 border border-emerald-800 rounded-2xl p-10 text-center">
      <p className="text-emerald-400 text-xs font-semibold uppercase
                    tracking-widest mb-4">
        Potential savings found
      </p>

      <div className="flex items-end justify-center gap-1 mb-2">
        <span className="text-emerald-400 text-3xl font-bold pb-1">$</span>
        <span className="text-7xl font-black text-white leading-none">
          {totalMonthlySavings.toLocaleString()}
        </span>
        <span className="text-slate-400 text-2xl pb-1">/mo</span>
      </div>

      <p className="text-emerald-300 font-medium mb-8">
        ${totalAnnualSavings.toLocaleString()} per year
      </p>

      <div className="flex justify-center gap-10 text-sm border-t border-slate-800 pt-6">
        <div className="text-center">
          <p className="text-slate-500 mb-1 text-xs uppercase tracking-wide">
            Current spend
          </p>
          <p className="text-white font-semibold text-lg">
            ${totalMonthlySpend.toLocaleString()}/mo
          </p>
        </div>
        <div className="text-slate-700 self-center text-2xl">→</div>
        <div className="text-center">
          <p className="text-slate-500 mb-1 text-xs uppercase tracking-wide">
            After optimising
          </p>
          <p className="text-emerald-400 font-semibold text-lg">
            ${optimisedSpend.toLocaleString()}/mo
          </p>
        </div>
      </div>
    </div>
  )
}