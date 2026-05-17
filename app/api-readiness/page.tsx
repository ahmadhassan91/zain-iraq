import Link from "next/link";
import { Bot, Braces, CheckCircle2, FileJson, Gauge, MessageSquareText, Radio, Search, Send, Signal } from "lucide-react";
import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";

const endpoints = [
  {
    title: "Search API",
    method: "GET",
    path: "/api/search?q=roaming&channel=website&lang=en",
    icon: Search,
    detail: "Returns ranked articles, matched intents, channel-safe snippets and confidence score.",
    sample: "/api-demo/search.json"
  },
  {
    title: "Article Retrieval API",
    method: "GET",
    path: "/api/articles/{articleId}?channel=agent",
    icon: FileJson,
    detail: "Returns article body, steps, internal notes, visibility and approved channel variants.",
    sample: "/api-demo/article.json"
  },
  {
    title: "Feedback API",
    method: "POST",
    path: "/api/feedback",
    icon: MessageSquareText,
    detail: "Captures helpful votes, missing content flags, article issues and search-result feedback.",
    sample: "/api-demo/feedback.json"
  },
  {
    title: "Analytics and Logging API",
    method: "POST",
    path: "/api/analytics/events",
    icon: Signal,
    detail: "Logs searches, channel, latency, selected article, confidence and failed queries.",
    sample: "/api-demo/analytics.json"
  },
  {
    title: "Channel Content API",
    method: "GET",
    path: "/api/channels/{channel}/articles/{articleId}",
    icon: Radio,
    detail: "Returns website, chatbot, WhatsApp or agent-specific response formats from the same article.",
    sample: "/api-demo/channel-response.json"
  },
  {
    title: "LLM Assistant API",
    method: "POST",
    path: "/api/assistant/answer",
    icon: Bot,
    detail: "Live Netlify function that calls OpenAI with KB grounding and returns a cited answer with confidence.",
    sample: "/api-demo/llm-assistant.json"
  }
];

const responseExample = `{
  "query": "activate roaming",
  "channel": "chatbot",
  "language": "en",
  "answer": "Before travelling, confirm roaming is active...",
  "confidence": 0.94,
  "citations": [
    { "articleId": "roaming-activation", "title": "How to activate roaming" }
  ],
  "handoff": {
    "required": false,
    "reason": null
  }
}`;

export default function ApiReadinessPage() {
  return (
    <AppShell active="API Readiness">
      <section className="section flush-top">
        <SectionTitle title="API-first knowledge delivery">
          <span className="chip">
            <CheckCircle2 size={14} />
            Integration-ready
          </span>
        </SectionTitle>
        <div className="grid four">
          <StatCard label="Core APIs" value="6" detail="Search, article, feedback, analytics, channel and assistant" />
          <StatCard label="Channel outputs" value="4" detail="Website, Agent Portal, Chatbot, WhatsApp" />
          <StatCard label="AI confidence" value="0.94" detail="Returned with every ranked result and answer" />
          <StatCard label="LLM layer" value="RAG" detail="Grounded answers from approved KB content" />
        </div>
      </section>

      <section className="section">
        <div className="grid three api-grid">
          {endpoints.map((endpoint) => {
            const Icon = endpoint.icon;
            return (
              <div className="card endpoint-card" key={endpoint.title}>
                <div className="endpoint-head">
                  <Icon size={22} color="#d12c89" />
                  <span className="method-pill">{endpoint.method}</span>
                </div>
                <h3>{endpoint.title}</h3>
                <code>{endpoint.path}</code>
                <p className="muted">{endpoint.detail}</p>
                <Link className="btn ghost compact" href={endpoint.sample}>
                  <Braces size={16} />
                  View sample JSON
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="panel">
            <SectionTitle title="LLM assistant flow">
              <span className="chip magenta">
                <Bot size={14} />
                Optional AI layer
              </span>
            </SectionTitle>
            <div className="timeline">
              <div className="step">
                <span className="step-number">1</span>
                <p>Customer, agent or chatbot sends a natural-language question with channel and language.</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>Search API retrieves approved KB articles and returns ranked results with confidence.</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>LLM generates a grounded answer only from retrieved content and includes citations.</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <p>Low confidence, restricted content or missing answers trigger agent handoff and analytics logging.</p>
              </div>
            </div>
          </div>
          <div className="panel">
            <SectionTitle title="AI response contract">
              <span className="chip">
                <Gauge size={14} />
                Confidence included
              </span>
            </SectionTitle>
            <pre className="code-block">{responseExample}</pre>
            <div className="inline-actions">
              <Link className="btn primary" href="/api-demo/llm-assistant.json">
                <Send size={16} />
                Assistant JSON
              </Link>
              <Link className="btn" href="/api-demo/channel-response.json">
                Channel JSON
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
