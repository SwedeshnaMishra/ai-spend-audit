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

  async function handleSubmit() {

  if (tools.length === 0) {

    setError(
      "Add at least one tool before running the audit."
    );

    return;
  }

  setError("");

  setSubmitting(true);

  try {

    const res = await fetch("/api/audit", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        tools,
        teamSize,
        useCase,
      }),
    });

    if (!res.ok) {

      const data = await res.json();

      throw new Error(
        data.error ?? "Something went wrong"
      );
    }

    const { auditId } = await res.json();

    router.push(`/audit/${auditId}`);

  } catch (err: any) {

    setError(
      err.message ??
      "Failed to run audit. Please try again."
    );

  } finally {

    setSubmitting(false);
  }
}

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

        <div className="mt-8">

  {error && (

    <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">

      <p className="text-red-400 text-sm">
        {error}
      </p>

    </div>
  )}

  <button
    onClick={handleSubmit}
    disabled={submitting || tools.length === 0}
    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-3"
  >

    {submitting && (

      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
    )}

    {submitting
      ? "Analysing your stack..."
      : "Get my free audit →"}

  </button>

  <p className="text-center text-slate-600 text-xs mt-3">
    No account needed. Results are instant.
  </p>

</div>

      </div>

    </main>
  );
}