"use client";

import { TOOLS } from "@/lib/pricing";
import type { ToolEntry } from "@/lib/store";

interface Props {
  tools: ToolEntry[];
  onRemove: (index: number) => void;
}

export default function ToolsList({
  tools,
  onRemove,
}: Props) {

  if (tools.length === 0) {

    return (
      <div className="border border-dashed border-slate-800 rounded-2xl p-10 text-center mb-6 bg-slate-900/20">

        <p className="text-slate-500 text-sm">
          No tools added yet
        </p>

        <p className="text-slate-700 text-xs mt-2">
          Start by adding your first AI subscription above.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-3 mb-8">

      {tools.map((tool, index) => {

        const toolMeta = (TOOLS as any)[tool.toolId];

        const planMeta =
          toolMeta?.plans?.[tool.planId];

        return (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 rounded-xl px-5 py-4 transition-all"
          >

            <div>

              <div className="flex items-center gap-2 flex-wrap">

                <span className="text-sm font-semibold text-white">
                  {toolMeta?.name ?? tool.toolId}
                </span>

                <span className="text-slate-500 text-sm">
                  {planMeta?.label ?? tool.planId}
                </span>

              </div>

              <p className="text-xs text-slate-600 mt-1">
                {tool.seats} seat
                {tool.seats !== 1 ? "s" : ""}
              </p>

            </div>

            <div className="flex items-center gap-5">

              <span className="text-emerald-400 text-sm font-semibold">
                ${tool.monthlySpend}/mo
              </span>

              <button
                onClick={() => onRemove(index)}
                className="text-slate-600 hover:text-red-400 transition-colors text-lg leading-none"
                aria-label={`Remove ${toolMeta?.name}`}
              >
                ×
              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
}