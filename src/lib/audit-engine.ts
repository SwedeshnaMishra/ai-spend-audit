export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export interface ToolInput {
  toolId: string;
  planId: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: UseCase;
}

export interface ToolAuditResult {
  toolId: string;
  toolName: string;
  currentSpend: number;
  recommendedAction: "downgrade" | "switch" | "optimize" | "keep";
  recommendedTool?: string;
  recommendedPlan?: string;
  projectedSpend: number;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  tools: ToolAuditResult[];
  totalMonthlySpend: number;
  totalProjectedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  isAlreadyOptimal: boolean;
}

const TOOL_NAMES: Record<string, string> = {
  cursor: "Cursor",
  github_copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  anthropic_api: "Anthropic API",
  openai_api: "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf",
};

function getToolName(toolId: string): string {
  return TOOL_NAMES[toolId] ?? toolId;
}


function auditCursor(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "business" && seats <= 3) {
    const projectedSpend = seats * 20;
    return {
      toolId: tool.toolId,
      toolName: "Cursor",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Pro",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `Cursor Business ($40/seat) is designed for larger orgs. At ${seats} seat${seats > 1 ? "s" : ""}, Pro ($20/seat) provides the same core AI features — saving $${monthlySpend - projectedSpend}/mo with no capability loss.`,
    };
  }

  return null;
}

function auditCopilot(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "enterprise") {
    const projectedSpend = seats * 19;
    return {
      toolId: tool.toolId,
      toolName: "GitHub Copilot",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Business",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `Copilot Enterprise ($39/seat) adds policy controls and audit logs needed by large orgs. At ${seats} seat${seats > 1 ? "s" : ""}, Business ($19/seat) covers all AI coding features — saving $${monthlySpend - projectedSpend}/mo.`,
    };
  }

  return null;
}

function auditClaude(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "max" && seats === 1) {
    const projectedSpend = 20; 
    return {
      toolId: tool.toolId,
      toolName: "Claude",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Pro",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `Claude Max ($100/mo) is for very heavy daily usage. Unless you're hitting Pro rate limits regularly, Claude Pro ($20/mo) covers most professional use cases — saving $${monthlySpend - projectedSpend}/mo.`,
    };
  }

  if (planId === "team" && seats <= 2) {
    const projectedSpend = seats * 20; 
    return {
      toolId: tool.toolId,
      toolName: "Claude",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Pro (individual)",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `Claude Team ($30/seat) adds admin controls for larger groups. At ${seats} seat${seats > 1 ? "s" : ""}, two individual Pro plans ($20/seat) give the same AI capability for less.`,
    };
  }

  return null;
}

function auditChatGPT(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "enterprise" && seats <= 5) {
    const projectedSpend = seats * 30; 
    return {
      toolId: tool.toolId,
      toolName: "ChatGPT",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Team",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `ChatGPT Enterprise is priced for 150+ seat deployments with SSO and dedicated support. At ${seats} seats, Team ($30/seat) covers the same GPT-4 access — saving $${monthlySpend - projectedSpend}/mo.`,
    };
  }

  return null;
}

function auditWindsurf(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "teams" && seats <= 2) {
    const projectedSpend = seats * 15; 
    return {
      toolId: tool.toolId,
      toolName: "Windsurf",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Pro",
      projectedSpend,
      monthlySavings: monthlySpend - projectedSpend,
      reason: `Windsurf Teams ($35/seat) adds admin and collaboration features for larger groups. At ${seats} seat${seats > 1 ? "s" : ""}, Pro ($15/seat) gives identical AI coding features.`,
    };
  }

  return null;
}

function auditGemini(tool: ToolInput): ToolAuditResult | null {
  const { planId, seats, monthlySpend } = tool;

  if (planId === "ultra" && seats === 1 && monthlySpend > 30) {
    return {
      toolId: tool.toolId,
      toolName: "Gemini",
      currentSpend: monthlySpend,
      recommendedAction: "downgrade",
      recommendedPlan: "Pro",
      projectedSpend: 20,
      monthlySavings: monthlySpend - 20,
      reason: `Gemini Ultra adds Deep Research and expanded context. If you're not using those features weekly, Gemini Pro covers most tasks at a lower price.`,
    };
  }

  return null;
}

function detectDuplicateCodingTools(
  tools: ToolInput[]
): ToolAuditResult | null {
  const codingEditors = tools.filter((t) =>
    ["cursor", "windsurf", "github_copilot"].includes(t.toolId)
  );

  if (codingEditors.length > 1) {
    const redundantTool = codingEditors.reduce((prev, current) =>
      current.monthlySpend > prev.monthlySpend ? current : prev
    );

    return {
      toolId: redundantTool.toolId,
      toolName: getToolName(redundantTool.toolId), 
      currentSpend: redundantTool.monthlySpend,
      recommendedAction: "optimize",
      projectedSpend: 0,
      monthlySavings: redundantTool.monthlySpend,
      reason: `You're paying for ${codingEditors.length} AI coding editors (${codingEditors.map((t) => getToolName(t.toolId)).join(", ")}). These tools overlap heavily — pick one and cancel the others. $${redundantTool.monthlySpend}/mo saved.`,
    };
  }

  return null;
}

function detectWritingOverlap(
  tools: ToolInput[],
  useCase: UseCase
): ToolAuditResult | null {
  const hasChatGPT = tools.some((t) => t.toolId === "chatgpt");
  const hasClaude = tools.some((t) => t.toolId === "claude");

  if (hasChatGPT && hasClaude && useCase === "writing") {
    const chatgptTool = tools.find((t) => t.toolId === "chatgpt")!;
    const claudeTool = tools.find((t) => t.toolId === "claude")!;
    const redundant =
      chatgptTool.monthlySpend >= claudeTool.monthlySpend
        ? chatgptTool
        : claudeTool;

    return {
      toolId: redundant.toolId,
      toolName: getToolName(redundant.toolId),
      currentSpend: redundant.monthlySpend,
      recommendedAction: "optimize",
      projectedSpend: 0,
      monthlySavings: redundant.monthlySpend,
      reason: `ChatGPT and Claude have near-identical writing capabilities. For a writing-focused team, one subscription covers all use cases — dropping the pricier one saves $${redundant.monthlySpend}/mo.`,
    };
  }

  return null;
}

function detectAPIOverlap(tools: ToolInput[]): ToolAuditResult | null {
  const hasAnthropicApi = tools.some((t) => t.toolId === "anthropic_api");
  const hasOpenAiApi = tools.some((t) => t.toolId === "openai_api");
  const hasClaude = tools.some((t) => t.toolId === "claude");
  const hasChatGPT = tools.some((t) => t.toolId === "chatgpt");

  if (hasAnthropicApi && hasClaude) {
    const claudeTool = tools.find((t) => t.toolId === "claude")!;
    return {
      toolId: "claude",
      toolName: "Claude",
      currentSpend: claudeTool.monthlySpend,
      recommendedAction: "optimize",
      projectedSpend: 0,
      monthlySavings: claudeTool.monthlySpend,
      reason: `You're paying for both Claude Pro and Anthropic API access. If you're building with the API, you can access Claude directly through it — the Pro subscription is redundant and can be cancelled, saving $${claudeTool.monthlySpend}/mo.`,
    };
  }

  if (hasOpenAiApi && hasChatGPT) {
    const chatgptTool = tools.find((t) => t.toolId === "chatgpt")!;
    return {
      toolId: "chatgpt",
      toolName: "ChatGPT",
      currentSpend: chatgptTool.monthlySpend,
      recommendedAction: "optimize",
      projectedSpend: 0,
      monthlySavings: chatgptTool.monthlySpend,
      reason: `You're paying for both ChatGPT Plus and OpenAI API access. API access includes GPT-4 — the ChatGPT Plus subscription is redundant for developers, saving $${chatgptTool.monthlySpend}/mo.`,
    };
  }

  return null;
}


export function runAudit(input: AuditInput): AuditResult {
  const auditedToolIds = new Set<string>();
  const results: ToolAuditResult[] = [];

  function pushIfNew(result: ToolAuditResult | null) {
    if (!result) return;
    if (auditedToolIds.has(result.toolId)) return; 
    auditedToolIds.add(result.toolId);
    results.push(result);
  }

  for (const tool of input.tools) {
    pushIfNew(auditCursor(tool));
    pushIfNew(auditCopilot(tool));
    pushIfNew(auditClaude(tool));
    pushIfNew(auditChatGPT(tool));
    pushIfNew(auditWindsurf(tool));
    pushIfNew(auditGemini(tool));
  }

  pushIfNew(detectDuplicateCodingTools(input.tools));
  pushIfNew(detectWritingOverlap(input.tools, input.useCase));
  pushIfNew(detectAPIOverlap(input.tools));

  const totalMonthlySpend = input.tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );

  const totalSavings = results.reduce(
    (sum, result) => sum + result.monthlySavings,
    0
  );

  const totalProjectedSpend = totalMonthlySpend - totalSavings;
  const totalMonthlySavings = totalSavings;

  return {
    tools: results,
    totalMonthlySpend,
    totalProjectedSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isAlreadyOptimal: totalMonthlySavings < 10, 
  };
}