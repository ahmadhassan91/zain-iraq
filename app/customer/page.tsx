"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Bell, Search } from "lucide-react";
import { AppShell, ArticleMini, SectionTitle, useLanguage } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { DemoActionButton } from "@/components/DemoActionButton";
import { CustomerJourneyPanel, DemoPathNav, SupportChannelPanel } from "@/components/GuidedJourneys";
import { DemoImpactPanel } from "@/components/JourneyDemo";
import { announcements, articles, searchArticles } from "@/lib/data";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { announcementCopy, articleCopy, customerCopy, term } from "@/lib/localized-copy";

export default function CustomerPage() {
  return (
    <AppShell active="Customer KB" variant="public">
      <CustomerContent />
    </AppShell>
  );
}

function CustomerContent() {
  const [query, setQuery] = useState("How do I activate roaming?");
  const [searched, setSearched] = useState(false);
  const { language } = useLanguage();
  const copy = customerCopy[language];
  const { state } = useDemoKnowledge();
  const results = useMemo(
    () => searchArticles(query).filter((article) => article.visibility === "Public").map((article) => applyDemoKnowledgeToArticle(article, state)),
    [query, state]
  );
  const customerAnnouncements = announcements.filter((announcement) => announcement.audience !== "Agent");
  const liveAlert = customerAnnouncements.find((announcement) => announcement.status === "Live");

  useEffect(() => {
    setQuery(copy.query);
    setSearched(false);
  }, [copy.query]);

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

      <DemoPathNav current="customer" />

      <section className="hero">
        <span className="chip hero-chip">Public customer view</span>
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroBody}</p>
        <div className="search-box">
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search knowledge center" />
          <button className="btn primary" onClick={() => setSearched(true)}>
            <Search size={17} />
            {searched ? copy.searched : copy.search}
          </button>
        </div>
      </section>

      <CustomerJourneyPanel
        onSelectQuery={(nextQuery) => {
          setQuery(nextQuery);
          setSearched(true);
        }}
      />

      <SupportChannelPanel />

      <section className="section">
        <SectionTitle title={copy.customerCanSee} />
        <DemoImpactPanel view="customer" />
      </section>

      <section className="section">
        <SectionTitle title={copy.bestMatches}>
          <span className="chip">{copy.aiRanked}</span>
        </SectionTitle>
        <div className="grid two">
          <div className="result-list">
            {results.map((article) => (
              <ArticleResult key={article.id} article={article} href={`/customer/article/${article.id}`} searchQuery={query} />
            ))}
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
              <textarea className="textarea" placeholder={copy.missingPlaceholder} />
              <DemoActionButton className="btn magenta" message={copy.feedbackSubmitted}>{copy.submitFeedback}</DemoActionButton>
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
