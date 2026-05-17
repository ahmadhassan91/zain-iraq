"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, ExternalLink, Pin, Star } from "lucide-react";
import type { Agent, Article } from "@/lib/data";
import { useLanguage } from "./AppChrome";
import { agentLocalized, articleCopy, term } from "@/lib/localized-copy";

export function ArticleResult({ article, href }: { article: Article; href: string }) {
  const { language } = useLanguage();
  const localized = articleCopy(article, language);

  return (
    <Link className="result-item" href={href}>
      <div>
        <div className="chip-row">
          <span className={`chip ${article.status.toLowerCase().replaceAll(" ", "-")}`}>{term(article.status, language)}</span>
          <span className="chip">{localized.category}</span>
          <span className="chip">{term(article.visibility, language)}</span>
        </div>
        <h3>{localized.title}</h3>
        <p className="muted">{localized.summary}</p>
        <div className="chip-row">
          {article.channelVariants.map((variant) => (
            <span className="chip" key={variant}>
              {term(variant, language)}
            </span>
          ))}
        </div>
      </div>
      <div className="confidence">{article.confidence}%</div>
    </Link>
  );
}

export function PersonaCard({ agent, active = false }: { agent: Agent; active?: boolean }) {
  const { language } = useLanguage();
  const localized = agentLocalized(agent, language);

  return (
    <div className={`persona-card ${active ? "active" : ""}`}>
      <div className={`avatar ${agent.color}`}>{agent.initials}</div>
      <div>
        <h3>{localized.role}</h3>
        <p className="muted">{localized.name}</p>
        <p className="small">{localized.skill}</p>
        <div className="chip-row">
          <span className="chip magenta">{localized.group}</span>
          <span className="chip">
            <Pin size={13} /> {agent.pinned.length} pinned
          </span>
        </div>
      </div>
    </div>
  );
}

export function CopyReadyAnswer({ answer }: { answer: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="card copy-card">
      <div className="section-title">
        <h2>Copy-ready answer</h2>
        <button
          className="btn"
          onClick={async () => {
            await navigator.clipboard?.writeText(answer).catch(() => undefined);
            setCopied(true);
          }}
        >
          <Copy size={16} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p>{answer}</p>
    </div>
  );
}

export function TroubleshootingFlow({ steps }: { steps: string[] }) {
  return (
    <div className="grid">
      {steps.map((step, index) => (
        <div className="step" key={step}>
          <span className="step-number">{index + 1}</span>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}

export function ArticleViewer({ article, mode }: { article: Article; mode: "customer" | "agent" }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="article-shell">
      <article className="article-main">
        <div className="chip-row">
          <span className="chip published">{article.status}</span>
          <span className="chip">{article.type}</span>
          <span className="chip">{article.language}</span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        <p className="muted">{article.summary}</p>

        <div className="section">
          <CopyReadyAnswer answer={article.customerAnswer} />
        </div>

        <div className="section">
          <div className="panel">
            <h3>Troubleshooting procedure</h3>
            <TroubleshootingFlow steps={article.steps} />
          </div>
        </div>

        {mode === "agent" ? (
          <div className="section">
            <div className="panel">
              <h3>Internal operational note</h3>
              <p>{article.internalNote}</p>
            </div>
          </div>
        ) : null}
      </article>

      <aside className="article-aside">
        <div className="grid">
          <div>
            <h3>Delivery channels</h3>
            <div className="chip-row">
              {article.channelVariants.map((variant) => (
                <span className="chip" key={variant}>
                  {variant}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3>AI confidence</h3>
            <div className="confidence">{article.confidence}%</div>
          </div>
          <div>
            <h3>Customer feedback</h3>
            <p className="muted">{article.helpful}% helpful from recent ratings</p>
            {feedback ? <p className="chip published">{feedback}</p> : null}
            <div className="inline-actions">
              <button className="btn" onClick={() => setFeedback("Helpful feedback captured")}>
                <Star size={16} />
                Helpful
              </button>
              <button className="btn ghost" onClick={() => setFeedback("Missing-info signal sent to Knowledge Gaps")}>
                Missing info
              </button>
            </div>
          </div>
          <Link className="btn primary" href={mode === "agent" ? "/agent" : "/customer"}>
            Back to workspace
            <ArrowRight size={16} />
          </Link>
          <Link className="btn" href={`/customer/article/${article.id}`}>
            <ExternalLink size={16} />
            Guest view link
          </Link>
        </div>
      </aside>
    </div>
  );
}
