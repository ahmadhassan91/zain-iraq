"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Copy, ExternalLink, Pin, Star, Check } from "lucide-react";
import type { Agent, Article } from "@/lib/data";
import { useLanguage } from "./AppChrome";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { agentLocalized, articleCopy, term, viewerCopy } from "@/lib/localized-copy";

// Keyframe styles injected inline for seamless portability
const MICRO_ANIMATION_STYLES = `
  @keyframes springyCheck {
    0% {
      transform: scale(0.3) rotate(-10deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.4) rotate(15deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }
  
  @keyframes toastFadeIn {
    0% {
      transform: translateY(24px) scale(0.95);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`;

// Helper component for matched search term token highlight logic
export function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  // Define simple common stop words to avoid highlighting unhelpful tokens
  const stopWords = new Set([
    "how", "do", "i", "can", "with", "for", "and", "or", "the", "a", "an", "in", "on", "to", "is", "are", "of", "your", "my"
  ]);

  // Extract terms, splitting on standard whitespace/punctuation
  const terms = query
    .toLowerCase()
    .split(/[\s,.\-!?()]+/)
    .filter((term) => term.length >= 2 && !stopWords.has(term));

  if (terms.length === 0) {
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length > 0) {
      terms.push(cleanQuery);
    } else {
      return <>{text}</>;
    }
  }

  // Create a regex to match any extracted search term case-insensitively
  const escapedTerms = terms.map((term) => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = terms.some(
          (t) =>
            part.toLowerCase() === t.toLowerCase() ||
            (part.length >= 2 && part.toLowerCase().includes(t.toLowerCase()))
        );

        if (isMatch) {
          return (
            <span
              key={index}
              style={{
                color: "var(--magenta, #d12c89)",
                fontWeight: 700,
                background: "rgba(209, 44, 137, 0.08)",
                padding: "1px 4px",
                borderRadius: "4px",
                borderBottom: "2px solid var(--magenta, #d12c89)",
                display: "inline-block",
                lineHeight: "1.2",
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

// Visual interactive SVG circular progress gauge for article confidence scores
export function ConfidenceGauge({ confidence }: { confidence: number }) {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Standard delay to trigger mount SVG animation transition smoothly
    const timer = setTimeout(() => {
      setProgress(confidence);
    }, 100);
    return () => clearTimeout(timer);
  }, [confidence]);

  const isHigh = confidence > 85;
  const size = 58;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const mainColor = isHigh ? "var(--teal, #4a9e9d)" : "#eab308";
  const glowId = isHigh ? "teal-glow-filter" : "amber-glow-filter";

  return (
    <div
      className="confidence-gauge-wrapper"
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        filter: hovered ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`AI Confidence Rating: ${confidence}%`}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Glowing teal filter */}
          <filter id="teal-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.8" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glowing amber filter */}
          <filter id="amber-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.6" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track path */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isHigh ? "rgba(74, 158, 157, 0.15)" : "rgba(234, 179, 8, 0.15)"}
          strokeWidth={strokeWidth}
        />

        {/* Gauge progress indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={mainColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>

      {/* Central percentage text label */}
      <span
        style={{
          position: "absolute",
          fontSize: "13px",
          fontWeight: 900,
          fontFamily: "inherit",
          color: mainColor,
          textShadow: hovered ? `0 0 6px ${isHigh ? "rgba(74, 158, 157, 0.4)" : "rgba(234, 179, 8, 0.4)"}` : "none",
          transition: "text-shadow 0.3s ease, color 0.3s ease",
        }}
      >
        {confidence}%
      </span>
    </div>
  );
}

export function ArticleResult({
  article,
  href,
  searchQuery,
}: {
  article: Article;
  href: string;
  searchQuery?: string;
}) {
  const { language } = useLanguage();
  const localized = articleCopy(article, language);
  const variants = href.startsWith("/customer")
    ? article.channelVariants.filter((variant) => variant !== "Agent Portal")
    : article.channelVariants;

  return (
    <Link className="result-item" href={href}>
      <style dangerouslySetInnerHTML={{ __html: MICRO_ANIMATION_STYLES }} />
      <div>
        <div className="chip-row">
          <span className={`chip ${article.status.toLowerCase().replaceAll(" ", "-")}`}>
            {term(article.status, language)}
          </span>
          <span className="chip">{localized.category}</span>
          <span className="chip">{term(article.visibility, language)}</span>
        </div>
        <h3>
          <HighlightedText text={localized.title} query={searchQuery} />
        </h3>
        <p className="muted">
          <HighlightedText text={localized.summary} query={searchQuery} />
        </p>
        <div className="chip-row">
          {variants.map((variant) => (
            <span className="chip" key={variant}>
              {term(variant, language)}
            </span>
          ))}
        </div>
      </div>
      <ConfidenceGauge confidence={article.confidence} />
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
  const [showToast, setShowToast] = useState(false);
  const { language } = useLanguage();
  const copy = viewerCopy[language];

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);

    await navigator.clipboard?.writeText(answer).catch(() => undefined);
    setCopied(true);
    setShowToast(true);

    // Toast self-dismiss timer
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2800);

    // Copy state reset timer
    stateTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 3200);
  };

  return (
    <div className="card copy-card" style={{ position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: MICRO_ANIMATION_STYLES }} />
      <div className="section-title">
        <h2>{copy.copyReady}</h2>
        <button
          className="btn"
          onClick={handleCopy}
          style={{
            minWidth: "110px",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            borderColor: copied ? "var(--teal, #4a9e9d)" : "var(--border)",
            background: copied ? "rgba(74, 158, 157, 0.05)" : "var(--surface)",
          }}
        >
          {copied ? (
            <Check
              size={16}
              color="var(--teal, #4a9e9d)"
              style={{
                animation: "springyCheck 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
              }}
            />
          ) : (
            <Copy size={16} />
          )}
          <span style={{ transition: "color 0.3s ease", color: copied ? "var(--teal, #4a9e9d)" : "inherit" }}>
            {copied ? copy.copied : copy.copy}
          </span>
        </button>
      </div>
      <p>{answer}</p>

      {/* Floating glassmorphic toast notification */}
      {showToast && (
        <div
          className="glassmorphic-toast"
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 20px",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            boxShadow: "0 10px 40px -10px rgba(31, 38, 135, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05)",
            color: "var(--text, #20242a)",
            fontFamily: "inherit",
            fontWeight: 800,
            fontSize: "14px",
            animation: "toastFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "var(--teal, #4a9e9d)",
              color: "#fff",
            }}
          >
            <Check size={14} style={{ animation: "springyCheck 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }} />
          </div>
          <span style={{ letterSpacing: "-0.01em" }}>{copy.copied}</span>
        </div>
      )}
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
  const variants = mode === "customer"
    ? articleWithDemo.channelVariants.filter((variant) => variant !== "Agent Portal")
    : articleWithDemo.channelVariants;

  return (
    <div className="article-shell">
      <style dangerouslySetInnerHTML={{ __html: MICRO_ANIMATION_STYLES }} />
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
              {variants.map((variant) => (
                <span className="chip" key={variant}>
                  {term(variant, language)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3>{copy.confidence}</h3>
            <ConfidenceGauge confidence={articleWithDemo.confidence} />
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

