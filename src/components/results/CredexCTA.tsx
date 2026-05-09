interface Props {
  savings: number
}

export default function CredexCTA({ savings }: Props) {
  return (
    <div className="bg-slate-900 border border-emerald-700 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="bg-emerald-900 rounded-xl p-3 flex-shrink-0 text-2xl">
          💡
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-emerald-300 text-lg mb-2">
            You qualify for a Credex consultation
          </h3>
          <p className="text-emerald-200 text-sm leading-relaxed mb-4">
            At ${savings.toLocaleString()}/month in potential savings, you are
            a strong candidate for discounted AI infrastructure credits through
            Credex — sourced from companies that overforecast or pivoted.
          </p>
          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-500 hover:bg-emerald-400
                       text-black font-bold px-6 py-3 rounded-xl text-sm
                       transition-colors"
          >
            Book a free Credex consultation →
          </a>
        </div>
      </div>
    </div>
  )
}