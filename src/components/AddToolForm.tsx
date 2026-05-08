"use client";

import { useState } from "react";

import { TOOLS } from "@/lib/pricing";
import type { ToolEntry } from "@/lib/store";

interface Props {
  onAdd: (tool: ToolEntry) => void;
}

export default function AddToolForm({ onAdd }: Props) {

  const [toolId, setToolId] = useState("");

  const [planId, setPlanId] = useState("");

  const [seats, setSeats] = useState(1);

  const [spend, setSpend] = useState("");

  const selectedTool = toolId
    ? (TOOLS as any)[toolId]
    : null;

  const planPrice =
    selectedTool && planId
      ? selectedTool.plans[planId]?.price ?? 0
      : 0;

  function handleAdd() {

    if (!toolId || !planId || !spend) {
      return;
    }

    onAdd({
      toolId,
      planId,
      seats,
      monthlySpend: parseFloat(spend),
    });

    setToolId("");
    setPlanId("");
    setSeats(1);
    setSpend("");
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-5 shadow-sm">

      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-sm font-semibold text-white">
            Add a tool
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Add every AI subscription your team currently pays for.
          </p>
        </div>

        <div className="text-xs text-slate-600">
          {Object.keys(TOOLS).length} supported tools
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">
            Tool
          </label>

          <select
            value={toolId}
            onChange={(e) => {
              setToolId(e.target.value);
              setPlanId("");
            }}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">
              Select tool...
            </option>

            {Object.entries(TOOLS).map(([id, tool]: any) => (
              <option
                key={id}
                value={id}
              >
                {tool.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">
            Plan
          </label>

          <select
            value={planId}
            onChange={(e) =>
              setPlanId(e.target.value)
            }
            disabled={!selectedTool}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 disabled:opacity-40 transition-colors"
          >
            <option value="">
              Select plan...
            </option>

            {selectedTool &&
              Object.entries(selectedTool.plans).map(
                ([id, plan]: any) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {plan.label} — ${plan.price}/seat/mo
                  </option>
                )
              )}

          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">
            Seats / licences
          </label>

          <input
            type="number"
            min={1}
            value={seats}
            onChange={(e) =>
              setSeats(
                Math.max(
                  1,
                  parseInt(e.target.value) || 1
                )
              )
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">

            Monthly spend ($)

            {planPrice > 0 && (
              <span className="text-slate-600 ml-1">
                · list ${planPrice * seats}/mo
              </span>
            )}

          </label>

          <input
            type="number"
            min={0}
            placeholder="What you actually pay"
            value={spend}
            onChange={(e) =>
              setSpend(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

      </div>

      <button
        onClick={handleAdd}
        disabled={!toolId || !planId || !spend}
        className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
      >
        + Add to audit
      </button>

    </div>
  );
}