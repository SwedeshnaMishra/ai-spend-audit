"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuditStore } from "@/lib/store";
import { TOOLS } from "@/lib/pricing";

import AddToolForm from "@/components/AddToolForm";
import ToolsList from "@/components/ToolsList";

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

        <AddToolForm onAdd={addTool} />

        <ToolsList
          tools={tools}
          onRemove={removeTool}
        />

        {/* Team context — Block 4 goes here */}

        {/* Submit button — Block 5 goes here */}

      </div>

    </main>
  );
}