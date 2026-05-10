"use client"

import { useState } from "react"

interface Props { auditId: string }

export default function ShareButton({ auditId }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const url = `${window.location.origin}/audit/${auditId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full border border-slate-700 hover:border-slate-500
                 text-slate-400 hover:text-white font-medium py-3
                 rounded-xl text-sm transition-colors"
    >
      {copied ? "Link copied!" : "Copy shareable link"}
    </button>
  )
}