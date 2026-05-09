"use client"

export default function ShareButton() {

  async function handleCopy() {

    await navigator.clipboard.writeText(
      window.location.href
    )

    alert("Shareable link copied!")
  }

  return (
    <button
      onClick={handleCopy}
      className="
  text-sm
  text-slate-500
  hover:text-emerald-400
  transition-colors
"
    >
      Copy shareable link
    </button>
  )
}