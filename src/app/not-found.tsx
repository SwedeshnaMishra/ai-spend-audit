import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="text-center">

        <p className="text-slate-700 text-7xl font-black mb-4">
          404
        </p>

        <h1 className="text-2xl font-bold mb-3">
          Audit not found
        </h1>

        <p className="text-slate-400 mb-8 max-w-sm">
          This audit may have expired or the link is invalid.
        </p>

        <Link
          href="/audit"
          className="
            inline-block
            bg-emerald-500
            hover:bg-emerald-400
            text-black
            font-bold
            px-6
            py-3
            rounded-xl
            transition-colors
          "
        >
          Start a new audit
        </Link>

      </div>

    </main>
  )
}