"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, ExternalLink, Pin, Star } from "lucide-react";
import type { Agent, Article } from "@/lib/data";
import { useLanguage } from "./AppChrome";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { agentLocalized, articleCopy, term, viewerCopy } from "@/lib/localized-copy";

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
            <Pin size={13} /> {agent.pinned.length} {term("pinned", language)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CopyReadyAnswer({ answer }: { answer: string }) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const copy = viewerCopy[language];

  return (
    <div className="card copy-card">
      <div className="section-title">
        <h2>{copy.copyReady}</h2>
        <button
          className="btn"
          onClick={async () => {
            await navigator.clipboard?.writeText(answer).catch(() => undefined);
            setCopied(true);
          }}
        >
          <Copy size={16} />
          {copied ? copy.copied : copy.copy}
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
  const { language } = useLanguage();
  const { state } = useDemoKnowledge();
  const articleWithDemo = applyDemoKnowledgeToArticle(article, state);
  const localized = articleCopy(articleWithDemo, language);
  const copy = viewerCopy[language];
  const showGuestLink = mode === "agent" && article.visibility === "Public";

  return (
    <div className="article-shell">
      <article className="article-main">
        <div className="chip-row">
          <span className="chip published">{term(article.status, language)}</span>
          <span className="chip">{term(article.type, language)}</span>
          <span className="chip">{language}</span>
        </div>
        <h1 className="article-title">{localized.title}</h1>
        <p className="muted">{localized.summary}</p>

        <div className="section">
          <CopyReadyAnswer answer={localized.customerAnswer} />
        </div>

        <div className="section">
          <div className="panel">
            <h3>{copy.procedure}</h3>
            <TroubleshootingFlow steps={localized.steps} />
          </div>
        </div>

        {mode === "agent" ? (
          <div className="section">
            <div className="panel">
              <h3>{copy.internalNote}</h3>
              <p>{localized.internalNote}</p>
            </div>
          </div>
        ) : null}
      </article>

      <aside className="article-aside">
        <div className="grid">
          <div>
            <h3>{copy.delivery}</h3>
            <div className="chip-row">
              {article.channelVariants.map((variant) => (
                <span className="chip" key={variant}>
                  {term(variant, language)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3>{copy.confidence}</h3>
            <div className="confidence">{articleWithDemo.confidence}%</div>
          </div>
          <div>
            <h3>{copy.feedback}</h3>
            <p className="muted">{articleWithDemo.helpful}% {copy.helpfulRatings}</p>
            {feedback ? <p className="chip published">{feedback}</p> : null}
            <div className="inline-actions">
              <button className="btn" onClick={() => setFeedback(copy.helpfulCaptured)}>
                <Star size={16} />
                {copy.helpful}
              </button>
              <button className="btn ghost" onClick={() => setFeedback(copy.missingSent)}>
                {copy.missingInfo}
              </button>
            </div>
          </div>
          <Link className="btn primary" href={mode === "agent" ? "/agent" : "/customer"}>
            {copy.back}
            <ArrowRight size={16} />
          </Link>
          {showGuestLink ? (
            <Link className="btn" href={`/customer/article/${articleWithDemo.id}`}>
              <ExternalLink size={16} />
              {copy.guest}
            </Link>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
