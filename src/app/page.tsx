import Link from "next/link";

export const metadata = {
  title: "SpendLens — Free AI tool spend audit",
  description:
    "Find out exactly where you're overspending on AI tools. Free audit in 60 seconds.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      <nav className="border-b border-slate-800/80 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />

            <span className="font-semibold text-xl tracking-tight">
              SpendLens
            </span>
          </div>

          <Link
            href="/audit"
            className="text-base text-slate-400 hover:text-white transition-colors"
          >
            Start audit
          </Link>

        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">

        <div className="inline-block bg-emerald-950/60 text-emerald-300 text-sm font-medium py-5 px-12 rounded-full mb-8 border border-emerald-800">
          Free · No login required · Results in 60 seconds
        </div>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
          Are you overpaying for
          <br />

          <span className="text-emerald-400">
            AI tools?
          </span>
        </h1>

        <p className="text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Enter your AI stack and get an instant audit —
          which plans to downgrade, which tools overlap,
          and exactly how much you can save.
        </p>

        <Link
          href="/audit"
          className="inline-block bg-emerald-400 hover:bg-emerald-300 text-black font-bold py-4 px-10 rounded-2xl text-lg transition-all shadow-lg shadow-emerald-500/20"
        >
          Audit my stack — free
        </Link>

        <p className="text-slate-600 mt-5 text-sm">
          Used by 200+ engineering teams (mocked)
        </p>

      </section>

      <section className="max-w-5xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          {
            icon: "⚡",
            title: "Instant results",
            body:
              "No signup, no waiting. Enter your tools and get your audit in seconds.",
          },
          {
            icon: "🔍",
            title: "Defensible reasoning",
            body:
              "Every recommendation shows the exact dollar math. Not guesses.",
          },
          {
            icon: "🔒",
            title: "Private by default",
            body:
              "Your data is never sold. Shareable reports strip identifying info.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-7 hover:border-emerald-800 hover:-translate-y-1 transition-colors"
          >

            <div className="text-3xl mb-4">
              {feature.icon}
            </div>

            <h3 className="font-semibold text-lg mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-400 leading-relaxed">
              {feature.body}
            </p>

          </div>
        ))}

      </section>

    </main>
  );
}