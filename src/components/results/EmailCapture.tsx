"use client"

import { useState } from "react"

interface Props {
  auditId: string
  totalSavings: number
}

export default function EmailCapture({
  auditId,
  totalSavings,
}: Props) {

  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [role, setRole] = useState("")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          auditId,
          totalSavings,
          companyName,
          role,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to save lead")
      }

      setSuccess(true)

    } catch (err: any) {

      setError(
        err.message ??
        "Something went wrong. Please try again."
      )

    } finally {

      setLoading(false)

    }
  }

  if (success) {
    return (

      <div
        className="
        w-full
          bg-emerald-950/20
          border
          border-emerald-900/50
          rounded-2xl
          p-10
          text-center
        "
      >

        <div className="text-emerald-400 text-5xl mb-4">
          ✓
        </div>

        <h3 className="text-2xl font-bold mb-3">
          Report sent
        </h3>

        <p className="text-slate-400 leading-7">
          Check your inbox for a copy of this audit.
        </p>

        <a
          href="/audit"
          className="
            inline-block
            mt-6
            text-sm
            text-slate-400
            hover:text-white
            transition-colors
          "
        >
          Run another audit →
        </a>

      </div>
    )
  }

  return (

    <div
      className="
      w-full
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-8
      "
    >

      <h3 className="text-3xl font-bold mb-3">
        Get notified when new optimisations apply to your stack
      </h3>

      <p className="text-slate-400 mb-8">
        No spam. Unsubscribe any time.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-4
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:border-emerald-500
            transition-colors
          "
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Company (optional)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-4
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-emerald-500
              transition-colors
            "
          />

          <input
            type="text"
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-4
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-emerald-500
              transition-colors
            "
          />

        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-emerald-500
            hover:bg-emerald-400
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-black
            font-bold
            py-3.5
            rounded-xl
            text-base
            transition-colors
          "
        >

          {loading
            ? "Sending..."
            : "Keep me updated →"}

        </button>

      </form>

    </div>
  )
}