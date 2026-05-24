"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import type { FormEvent } from "react";
import { AlertTriangle, Bell, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AppShell, ArticleMini, SectionTitle, useLanguage } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { announcements, articles, searchArticles } from "@/lib/data";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { announcementCopy, articleCopy, customerCopy, term } from "@/lib/localized-copy";

export default function CustomerPage() {
  return (
    <AppShell active="Customer KB" variant="public">
      <Suspense fallback={<div className="empty-state"><p>Loading support center...</p></div>}>
        <CustomerContent />
      </Suspense>
    </AppShell>
  );
}

function CustomerContent() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q");
  const topicParam = searchParams.get("topic");

  const initialQuery = useMemo(() => {
    if (qParam) return qParam;
    if (topicParam) {
      switch (topicParam) {
        case "roaming": return "roaming data setup";
        case "sim": return "SIM replacement eSIM";
        case "billing": return "balance recharge payment";
        case "bundles": return "Super Card data bundle";
        case "app": return "Zain app login";
        case "network": return "internet 4.5G coverage";
        default: return "";
      }
    }
    return "";
  }, [qParam, topicParam]);

  const { language } = useLanguage();
  const copy = customerCopy[language];
  const { state } = useDemoKnowledge();

  const [query, setQuery] = useState(initialQuery || "How do I activate roaming?");
  const [activeQuery, setActiveQuery] = useState(initialQuery || "How do I activate roaming?");
  const [searched, setSearched] = useState(!!initialQuery);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const isFirstRender = useRef(true);
  const resultsRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const publicArticles = articles
      .filter((article) => article.visibility === "Public")
      .map((article) => applyDemoKnowledgeToArticle(article, state));

    if (!searched) {
      return searchArticles(activeQuery)
        .filter((article) => article.visibility === "Public")
        .map((article) => applyDemoKnowledgeToArticle(article, state));
    }

    const normalized = activeQuery.toLowerCase().trim();
    const tokens = normalized.split(/[\s,.\-!?()؟،]+/).filter((token) => token.length >= 2);

    if (!normalized || !tokens.length) {
      return publicArticles.slice(0, 4);
    }

    return publicArticles
      .filter((article) => {
        const localized = articleCopy(article, language);
        const haystack = [
          localized.title,
          localized.category,
          localized.summary,
          localized.customerAnswer,
          localized.internalNote,
          ...localized.tags
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized) || tokens.some((token) => haystack.includes(token));
      })
      .sort((a, b) => b.confidence - a.confidence);
  }, [activeQuery, language, searched, state]);

  const customerAnnouncements = announcements.filter((announcement) => announcement.audience !== "Agent");
  const liveAlert = customerAnnouncements.find((announcement) => announcement.status === "Live");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialQuery) {
        setQuery(initialQuery);
        setActiveQuery(initialQuery);
        setSearched(true);
        return;
      }
    }
    if (!initialQuery) {
      setQuery(copy.query);
      setActiveQuery(copy.query);
      setSearched(false);
    }
  }, [copy.query, initialQuery]);

  const runSearch = (event?: FormEvent) => {
    event?.preventDefault();
    const nextQuery = query.trim() || copy.query;
    setQuery(nextQuery);
    setActiveQuery(nextQuery);
    setSearched(true);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true);
      setFeedbackText("");
      setTimeout(() => setFeedbackSubmitted(false), 4000);
    }
  };

  return (
    <>
      {liveAlert ? (
        <section className="alert-banner">
          <AlertTriangle color="#d12c89" />
          <div>
            <h3>{announcementCopy(liveAlert, language).title}</h3>
            <p className="muted">{announcementCopy(liveAlert, language).message}</p>
          </div>
          <span className={`chip ${liveAlert.severity.toLowerCase()}`}>{term(liveAlert.severity, language)}</span>
        </section>
      ) : null}

      <section className="hero">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroBody}</p>
        <form className="search-box" onSubmit={runSearch}>
          <input 
            value={query} 
            onChange={(event) => setQuery(event.target.value)} 
            aria-label="Search knowledge center" 
            placeholder={
              language === "AR" ? "ابحث في مقالات المساعدة..." : 
              language === "KU" ? "بگەڕێ لە بابەتەکانی پشتگیری..." : 
              "Search help articles..."
            }
          />
          <button className="btn primary" type="submit">
            <Search size={17} />
            {searched ? copy.searched : copy.search}
          </button>
        </form>
        {searched ? (
          <div className="hero-search-summary" aria-live="polite">
            <Search size={15} />
            <span>{results.length} {copy.resultsFor} &ldquo;{activeQuery}&rdquo;</span>
          </div>
        ) : null}
      </section>

      <section className="section" ref={resultsRef}>
        <SectionTitle title={copy.bestMatches}>
          <div className="chip-row">
            <span className="chip">{copy.aiRanked}</span>
            {searched ? <span className="chip published">{results.length} {copy.resultsFor} &ldquo;{activeQuery}&rdquo;</span> : null}
          </div>
        </SectionTitle>
        <div className="grid two">
          <div className="result-list">
            {results.length ? (
              results.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/customer/article/${article.id}`} searchQuery={activeQuery} />
              ))
            ) : (
              <div className="empty-state">
                <Search size={22} />
                <h3>{copy.noResultsTitle}</h3>
                <p className="muted">{copy.noResultsBody}</p>
              </div>
            )}
          </div>
          <div className="grid">
            <div className="panel">
              <div className="section-title">
                <h2>{copy.whatsNew}</h2>
                <Bell size={18} color="#4a9e9d" />
              </div>
              {customerAnnouncements.map((announcement) => (
                <ArticleMini
                  key={announcement.id}
                  title={announcementCopy(announcement, language).title}
                  meta={`${term(announcement.status, language)} · ${term(announcement.channel, language)} · ${announcement.scheduledFor}`}
                />
              ))}
            </div>
            <div className="panel">
              <h3>{copy.missingTitle}</h3>
              <form onSubmit={handleFeedbackSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <textarea 
                  className="textarea" 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={copy.missingPlaceholder} 
                />
                <button className="btn magenta" type="submit">
                  {feedbackSubmitted ? copy.feedbackSubmitted : copy.submitFeedback}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.trending} />
        <div className="grid four">
          {articles
            .filter((article) => article.visibility === "Public")
            .map((article) => applyDemoKnowledgeToArticle(article, state))
            .sort((a, b) => b.views - a.views)
            .slice(0, 4)
            .map((article) => (
              <div className="card" key={article.id}>
                <h3>{articleCopy(article, language).title}</h3>
                <p className="muted">{article.views.toLocaleString()} {copy.views} · {article.helpful}% {copy.helpful}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
