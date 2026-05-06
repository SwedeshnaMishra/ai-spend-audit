export const TOOLS = {
  cursor: {
    name: "Cursor",
    website: "https://cursor.com/pricing",
    plans: {
      hobby: {
        price: 0,
        label: "Hobby",
        seats: 1,
      },
      pro: {
        price: 20,
        label: "Pro",
        seats: 1,
      },
      business: {
        price: 40,
        label: "Business",
        seats: 1,
      },
      enterprise: {
        price: null,
        label: "Enterprise",
        seats: null,
      },
    },
  },

  github_copilot: {
    name: "GitHub Copilot",
    website: "https://github.com/features/copilot/plans",
    plans: {
      individual: {
        price: 10,
        label: "Individual",
        seats: 1,
      },
      business: {
        price: 19,
        label: "Business",
        seats: 1,
      },
      enterprise: {
        price: 39,
        label: "Enterprise",
        seats: 1,
      },
    },
  },

  claude: {
    name: "Claude",
    website: "https://claude.ai/pricing",
    plans: {
      free: {
        price: 0,
        label: "Free",
        seats: 1,
      },
      pro: {
        price: 20,
        label: "Pro",
        seats: 1,
      },
      max: {
        price: 100,
        label: "Max",
        seats: 1,
      },
      team: {
        price: 30,
        label: "Team",
        seats: 5,
      },
      enterprise: {
        price: null,
        label: "Enterprise",
        seats: null,
      },
      api_direct: {
        price: null,
        label: "API Direct",
        seats: null,
      },
    },
  },

  chatgpt: {
    name: "ChatGPT",
    website: "https://openai.com/chatgpt/pricing",
    plans: {
      plus: {
        price: 20,
        label: "Plus",
        seats: 1,
      },
      team: {
        price: 30,
        label: "Team",
        seats: 2,
      },
      enterprise: {
        price: null,
        label: "Enterprise",
        seats: null,
      },
      api_direct: {
        price: null,
        label: "API Direct",
        seats: null,
      },
    },
  },

  anthropic_api: {
    name: "Anthropic API",
    website: "https://www.anthropic.com/api",
    plans: {
      sonnet_input: {
        price: 3,
        label: "Claude Sonnet Input ($/1M tokens)",
        seats: null,
      },
      sonnet_output: {
        price: 15,
        label: "Claude Sonnet Output ($/1M tokens)",
        seats: null,
      },
    },
  },

  openai_api: {
    name: "OpenAI API",
    website: "https://openai.com/api/pricing",
    plans: {
      gpt4o_input: {
        price: 5,
        label: "GPT-4o Input ($/1M tokens)",
        seats: null,
      },
      gpt4o_output: {
        price: 15,
        label: "GPT-4o Output ($/1M tokens)",
        seats: null,
      },
    },
  },

  gemini: {
    name: "Gemini",
    website: "https://one.google.com/about/gemini",
    plans: {
      free: {
        price: 0,
        label: "Free",
        seats: 1,
      },
      pro: {
        price: 20,
        label: "Pro",
        seats: 1,
      },
      ultra: {
        price: 250,
        label: "Ultra",
        seats: 1,
      },
      api: {
        price: null,
        label: "API",
        seats: null,
      },
    },
  },

  windsurf: {
    name: "Windsurf",
    website: "https://windsurf.com/pricing",
    plans: {
      free: {
        price: 0,
        label: "Free",
        seats: 1,
      },
      pro: {
        price: 15,
        label: "Pro",
        seats: 1,
      },
      teams: {
        price: 30,
        label: "Teams",
        seats: 1,
      },
    },
  },
} as const;

export type ToolId = keyof typeof TOOLS;