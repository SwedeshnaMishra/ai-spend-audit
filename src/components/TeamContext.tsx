"use client"

import type { UseCase } from "@/lib/audit-engine"

interface Props {
  teamSize: number
  useCase: UseCase
  onTeamSizeChange: (n: number) => void
  onUseCaseChange:  (u: UseCase) => void
}

const USE_CASES: { value: UseCase; label: string; desc: string }[] = [
  { value: "coding",   label: "Coding",   desc: "Writing and reviewing code" },
  { value: "writing",  label: "Writing",  desc: "Docs, emails, content"       },
  { value: "data",     label: "Data",     desc: "Analysis and reporting"      },
  { value: "research", label: "Research", desc: "Deep research and synthesis" },
  { value: "mixed",    label: "Mixed",    desc: "A bit of everything"         },
]

export default function TeamContext({
  teamSize, useCase, onTeamSizeChange, onUseCaseChange
}: Props) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-8">
      <div className="mb-5">
  <p className="text-sm font-semibold text-white">
    About your team
  </p>

  <p className="text-xs text-slate-500 mt-1">
    This helps us detect plan overkill and redundant tooling.
  </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Team size (people using AI tools)
          </label>
          <input
            type="number"
            min={1}
            max={10000}
            value={teamSize}
            onChange={(e) =>
              onTeamSizeChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 h-12 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Primary use case
          </label>
          <select
            value={useCase}
            onChange={(e) => onUseCaseChange(e.target.value as UseCase)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-12 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {USE_CASES.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label} — {u.desc}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}