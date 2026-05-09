interface Props {
  summary: string | null
}

export default function AISummary({ summary }: Props) {
  if (!summary) return null

  return (
    <div
      className="bg-slate-900 px-5 py-4"
      style={{ borderLeft: "4px solid #1D9E75", borderRadius: "0 12px 12px 0" }}
    >
      <p className="text-xs text-emerald-400 font-semibold uppercase
                    tracking-wider mb-2">
        AI summary
      </p>
      <p className="text-slate-300 text-sm leading-relaxed">
        {summary}
      </p>
    </div>
  )
}