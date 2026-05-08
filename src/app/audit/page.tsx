"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuditStore } from "@/lib/store";

import AddToolForm from "@/components/AddToolForm";
import ToolsList from "@/components/ToolsList";
import TeamContext from "@/components/TeamContext";

export default function AuditPage() {

  const router = useRouter();

  const {
    tools,
    teamSize,
    useCase,
    addTool,
    removeTool,
    setTeamSize,
    setUseCase,
  } = useAuditStore();

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Audit your AI spend
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed">
            Add every AI tool you pay for.
            We&apos;ll tell you where you can save.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-600 mt-4">

            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            <span>
              Your progress is automatically saved
            </span>

          </div>

        </div>

        <div className="space-y-6">

          <AddToolForm onAdd={addTool} />

          <ToolsList
            tools={tools}
            onRemove={removeTool}
          />

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-emerald-300 uppercase tracking-wide">
                  Current monthly spend
                </p>

                <p className="text-2xl font-bold text-white mt-1">

                  $

                  {tools.reduce(
                    (sum, t) => sum + t.monthlySpend,
                    0
                  )}

                  /mo

                </p>

              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">

                  {tools.length} tool

                  {tools.length !== 1 ? "s" : ""}

                </p>

                <p className="text-xs text-slate-500 mt-1">

                  {teamSize} team member

                  {teamSize !== 1 ? "s" : ""}

                </p>

              </div>

            </div>

          </div>

          <TeamContext
            teamSize={teamSize}
            useCase={useCase}
            onTeamSizeChange={setTeamSize}
            onUseCaseChange={setUseCase}
          />

        </div>

        {/* Submit button — Block 5 goes here */}

      </div>

    </main>
  );
}