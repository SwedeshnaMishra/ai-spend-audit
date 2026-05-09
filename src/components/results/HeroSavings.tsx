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
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-12 text-center">

        <div className="text-emerald-400 text-5xl mb-4">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Your stack looks optimised
        </h1>

        <p className="text-slate-400 max-w-md mx-auto leading-7">
          You are spending $
          {totalMonthlySpend.toLocaleString()}
          /month with no significant redundancies
          or plan mismatches detected.
        </p>

      </div>
    )
  }

  const optimisedSpend =
    totalMonthlySpend - totalMonthlySavings

  return (
    <div className="bg-slate-900 border border-emerald-800 rounded-2xl p-12 text-center">

      <p
        className="
          text-emerald-400
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
          mb-5
        "
      >
        Potential savings found
      </p>

      <div className="flex items-end justify-center gap-1 mb-3">

        <span className="text-emerald-400 text-4xl font-bold pb-2">
          $
        </span>

        <span className="text-8xl font-black text-white leading-none">
          {totalMonthlySavings.toLocaleString()}
        </span>

        <span className="text-slate-400 text-3xl pb-2">
          /mo
        </span>

      </div>

      <p className="text-emerald-300 font-medium text-lg mb-10">
        ${totalAnnualSavings.toLocaleString()} per year
      </p>

      <div className="flex justify-center gap-12 text-sm border-t border-slate-800 pt-8">

        <div className="text-center">
          <p className="text-slate-500 mb-1 text-xs uppercase tracking-wide">
            Current spend
          </p>

          <p className="text-white font-semibold text-2xl">
            ${totalMonthlySpend.toLocaleString()}/mo
          </p>
        </div>

        <div className="text-slate-700 self-center text-3xl">
          →
        </div>

        <div className="text-center">
          <p className="text-slate-500 mb-1 text-xs uppercase tracking-wide">
            After optimising
          </p>

          <p className="text-emerald-400 font-semibold text-2xl">
            ${optimisedSpend.toLocaleString()}/mo
          </p>
        </div>

      </div>

    </div>
  )
}