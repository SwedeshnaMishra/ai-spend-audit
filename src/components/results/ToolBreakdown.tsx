import type { ToolAuditResult } from "@/lib/audit-engine"

interface Props {
  tools: ToolAuditResult[]
}

const BADGE_STYLES: Record<string, string> = {
  downgrade: "bg-amber-950 text-amber-300 border border-amber-800",
  switch:    "bg-blue-950  text-blue-300  border border-blue-800",
  optimize:  "bg-red-950   text-red-300   border border-red-800",
  keep:      "bg-slate-800 text-slate-400 border border-slate-700",
}

const BADGE_LABELS: Record<string, string> = {
  downgrade: "Downgrade",
  switch:    "Switch tool",
  optimize:  "Remove overlap",
  keep:      "Keep",
}

export default function ToolBreakdown({ tools }: Props) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-8 text-slate-600 text-sm">
        No specific findings — your stack looks clean.
      </div>
    )
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Tool-by-tool breakdown
      </h2>
      <div className="space-y-3">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <div className="flex items-start justify-between gap-4">

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-semibold text-white">
                    {tool.toolName}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full
                      ${BADGE_STYLES[tool.recommendedAction]}`}
                  >
                    {BADGE_LABELS[tool.recommendedAction]}
                  </span>
                  {tool.recommendedPlan && (
                    <span className="text-xs text-slate-500">
                      → {tool.recommendedPlan}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tool.reason}
                </p>
              </div>

              <div className="text-right flex-shrink-0 ml-2">
                {tool.monthlySavings > 0 ? (
                  <>
                    <p className="text-slate-600 text-xs line-through mb-1">
                      ${tool.currentSpend}/mo
                    </p>
                    <p className="text-emerald-400 font-bold text-lg leading-none">
                      Save ${tool.monthlySavings}/mo
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                      ${tool.monthlySavings * 12}/yr
                    </p>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm">
                    ${tool.currentSpend}/mo
                  </p>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}