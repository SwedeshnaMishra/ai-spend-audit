"use client"

import { useState } from "react"

interface Props {
  auditId:      string
  totalSavings: number
}

type Status = "idle" | "submitting" | "done" | "error"

export default function EmailCapture({ auditId, totalSavings }: Props) {
  const [email,   setEmail]   = useState("")
  const [company, setCompany] = useState("")
  const [role,    setRole]    = useState("")
  const [status,  setStatus]  = useState<Status>("idle")
  const [errMsg,  setErrMsg]  = useState("")

  async function handleSubmit() {
    if (!email) return
    setStatus("submitting")
    setErrMsg("")

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          companyName:  company,
          role,
          auditId,
          totalSavings,
          honeypot: "",
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("done")
    } catch {
      setErrMsg("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl
                      p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold mb-2">Report sent</h3>
        <p className="text-slate-400 text-sm">
          Check your inbox for a copy of this audit.
          {totalSavings > 500 &&
            " A Credex advisor will reach out within 24 hours."}
        </p>
      </div>
    )
  }

  const isHighSavings = totalSavings > 500

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-1">
        {isHighSavings
          ? "Get your report + Credex will reach out"
          : "Get notified when new optimisations apply to your stack"}
      </h3>
      <p className="text-slate-400 text-sm mb-5">
        No spam. Unsubscribe any time.
      </p>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg
                     px-4 py-3 text-sm text-white placeholder-slate-600
                     focus:outline-none focus:border-emerald-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3
                       text-sm text-white placeholder-slate-600
                       focus:outline-none focus:border-emerald-500"
          />
          <input
            type="text"
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3
                       text-sm text-white placeholder-slate-600
                       focus:outline-none focus:border-emerald-500"
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          autoComplete="off"
        />
      </div>

      {errMsg && (
        <p className="text-red-400 text-sm mt-3">{errMsg}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!email || status === "submitting"}
        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400
                   disabled:opacity-40 disabled:cursor-not-allowed
                   text-black font-bold py-3 rounded-xl text-sm
                   transition-colors"
      >
        {status === "submitting"
          ? "Sending..."
          : isHighSavings
            ? "Send report + get consultation →"
            : "Keep me updated →"}
      </button>
    </div>
  )
}