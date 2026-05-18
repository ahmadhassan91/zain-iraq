import type { Config, Context } from "@netlify/functions";

type Article = {
  id: string;
  title: string;
  confidence: number;
  channels: string[];
  summary: string;
  answer: string;
  internalNote: string;
  tags: string[];
};

const knowledgeBase: Article[] = [
  {
    id: "roaming-activation",
    title: "How to activate roaming",
    confidence: 0.94,
    channels: ["website", "agent_portal", "chatbot", "whatsapp"],
    summary: "Guide customers through roaming readiness, activation checks and travel support steps.",
    answer:
      "Before travelling, open the Zain Iraq app or contact support to confirm roaming is active. Restart the device after arrival and choose a partner network if automatic selection does not connect.",
    internalNote: "Verify line status, roaming eligibility, spend controls and active package before escalation.",
    tags: ["roaming", "travel", "international"]
  },
  {
    id: "slow-internet",
    title: "Slow internet or no data connectivity",
    confidence: 0.91,
    channels: ["agent_portal", "chatbot"],
    summary: "Structured technical flow for slow data, no internet and APN-related issues.",
    answer:
      "Restart your device, make sure mobile data is enabled, check your bundle balance, and try switching airplane mode on and off for 10 seconds.",
    internalNote: "Check coverage, package balance, network barring, SIM status and APN before network ticket creation.",
    tags: ["4.5g", "internet", "apn", "coverage", "data"]
  },
  {
    id: "app-login",
    title: "Zain Iraq app login issue",
    confidence: 0.89,
    channels: ["website", "agent_portal", "chatbot", "whatsapp"],
    summary: "Support flow for app login, OTP, password and device-related self-service issues.",
    answer:
      "Update the Zain Iraq app, confirm your number is active, request a new OTP and make sure SMS reception is available on your device.",
    internalNote: "If OTP is delayed for multiple users, check digital incident board before individual escalation.",
    tags: ["app", "login", "otp", "self-service"]
  },
  {
    id: "balance-deduction",
    title: "Unexpected balance deduction",
    confidence: 0.86,
    channels: ["agent_portal", "whatsapp"],
    summary: "Agent guidance for investigating balance deduction complaints.",
    answer:
      "We can review your recent usage and active services. Some deductions may relate to bundle renewal, value-added services or out-of-bundle usage.",
    internalNote: "Check charging history and active VAS subscriptions before refund discussion.",
    tags: ["billing", "balance", "recharge", "deduction"]
  }
];

function getEnv(name: string) {
  const netlifyEnv = globalThis.Netlify?.env?.get(name);
  return netlifyEnv || process.env[name];
}

function searchKnowledge(question: string, channel: string) {
  const tokens = question.toLowerCase().split(/[^a-z0-9.]+/).filter(Boolean);

  return knowledgeBase
    .map((article) => {
      const haystack = [article.title, article.summary, article.answer, article.internalNote, ...article.tags].join(" ").toLowerCase();
      const tokenScore = tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0);
      const channelBoost = article.channels.includes(channel) ? 2 : 0;
      return { ...article, score: tokenScore + channelBoost + article.confidence };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function extractText(response: unknown) {
  const body = response as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string; type?: string }> }>;
  };

  if (body.output_text) {
    return body.output_text;
  }

  return (
    body.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter(Boolean)
      .join("\n") || ""
  );
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = getEnv("OPENAI_API_KEY");

  if (!apiKey) {
    return Response.json(
      {
        error: "OPENAI_API_KEY is not configured",
        message: "Set OPENAI_API_KEY in Netlify environment variables to enable live LLM answers."
      },
      { status: 503 }
    );
  }

  const payload = (await req.json().catch(() => ({}))) as {
    question?: string;
    channel?: string;
    language?: string;
  };

  const question = payload.question?.trim() || "How can I activate roaming?";
  const channel = payload.channel || "agent_portal";
  const language = payload.language || "en";
  const matches = searchKnowledge(question, channel);
  const topConfidence = matches[0]?.confidence ?? 0.52;
  const handoffRequired = topConfidence < 0.7;

  const grounding = matches.map(({ id, title, confidence, channels, summary, answer, internalNote }) => ({
    id,
    title,
    confidence,
    channels,
    summary,
    answer,
    internalNote: channel === "agent_portal" ? internalNote : undefined
  }));

  const model = getEnv("OPENAI_MODEL") || "gpt-4.1-mini";

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions:
        "You are the Zain Iraq knowledge assistant. Answer only from the provided approved KB context. Keep the answer concise, customer-safe, and operational. Reply in the requested language field: English for en, Arabic for ar, and Sorani Kurdish for ku. If the context is insufficient, say an agent should verify it. Do not invent prices, codes, eligibility rules, or policies.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ question, channel, language, approvedKnowledge: grounding }, null, 2)
            }
          ]
        }
      ]
    })
  });

  const openaiBody = await openaiResponse.json().catch(() => ({}));

  if (!openaiResponse.ok) {
    return Response.json(
      {
        error: "OpenAI request failed",
        status: openaiResponse.status,
        detail: openaiBody
      },
      { status: 502 }
    );
  }

  return Response.json({
    answer: extractText(openaiBody),
    confidence: topConfidence,
    channel,
    language,
    citations: grounding.map((article) => ({
      articleId: article.id,
      title: article.title,
      confidence: article.confidence
    })),
    handoff: {
      required: handoffRequired,
      reason: handoffRequired ? "Low confidence result requires agent verification." : null
    },
    loggedEvents: ["assistant_answered", "confidence_recorded", "citations_attached"],
    model
  });
};

export const config: Config = {
  path: "/api/assistant/answer"
};
