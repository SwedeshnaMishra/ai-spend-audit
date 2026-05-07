import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UseCase } from "./audit-engine";

export interface ToolEntry {
  toolId: string;
  planId: string;
  monthlySpend: number;
  seats: number;
}

interface AuditStore {
  tools: ToolEntry[];

  teamSize: number;

  useCase: UseCase;

  addTool: (tool: ToolEntry) => void;

  removeTool: (index: number) => void;

  updateTool: (
    index: number,
    tool: Partial<ToolEntry>
  ) => void;

  setTeamSize: (n: number) => void;

  setUseCase: (u: UseCase) => void;

  reset: () => void;
}

const defaultState = {
  tools: [],
  teamSize: 1,
  useCase: "mixed" as UseCase,
};

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      ...defaultState,

      addTool: (tool) =>
        set((state) => ({
          tools: [...state.tools, tool],
        })),

      removeTool: (index) =>
        set((state) => ({
          tools: state.tools.filter(
            (_, idx) => idx !== index
          ),
        })),

      updateTool: (index, partial) =>
        set((state) => ({
          tools: state.tools.map((tool, idx) =>
            idx === index
              ? { ...tool, ...partial }
              : tool
          ),
        })),

      setTeamSize: (n) =>
        set({
          teamSize: n,
        }),

      setUseCase: (u) =>
        set({
          useCase: u,
        }),

      reset: () =>
        set(defaultState),
    }),
    {
      name: "audit-store-v1",
    }
  )
);