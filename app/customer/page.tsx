"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Bell, Search } from "lucide-react";
import { AppShell, ArticleMini, SectionTitle } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { DemoActionButton } from "@/components/DemoActionButton";
import { announcements, articles, searchArticles } from "@/lib/data";

export default function CustomerPage() {
  const [query, setQuery] = useState("How do I activate roaming?");
  const [searched, setSearched] = useState(false);
  const results = useMemo(() => searchArticles(query).filter((article) => article.visibility !== "Private Group"), [query]);
  const customerAnnouncements = announcements.filter((announcement) => announcement.audience !== "Agent");
  const liveAlert = customerAnnouncements.find((announcement) => announcement.status === "Live");

  return (
    <AppShell active="Customer KB">
      {liveAlert ? (
        <section className="alert-banner">
          <AlertTriangle color="#d12c89" />
          <div>
            <h3>{liveAlert.title}</h3>
            <p className="muted">{liveAlert.message}</p>
          </div>
          <span className={`chip ${liveAlert.severity.toLowerCase()}`}>{liveAlert.severity}</span>
        </section>
      ) : null}

      <section className="hero">
        <h1>How can we help you today?</h1>
        <p>Search Zain Iraq support content across roaming, bundles, SIM services, internet, app support and business FAQs.</p>
        <div className="search-box">
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search knowledge center" />
          <button className="btn primary" onClick={() => setSearched(true)}>
            <Search size={17} />
            {searched ? "Searched" : "Search"}
          </button>
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Best matches">
          <span className="chip">AI ranked results</span>
        </SectionTitle>
        <div className="grid two">
          <div className="result-list">
            {results.map((article) => (
              <ArticleResult key={article.id} article={article} href={`/customer/article/${article.id}`} />
            ))}
          </div>
          <div className="grid">
            <div className="panel">
              <div className="section-title">
                <h2>What&apos;s New</h2>
                <Bell size={18} color="#4a9e9d" />
              </div>
              {customerAnnouncements.map((announcement) => (
                <ArticleMini key={announcement.id} title={announcement.title} meta={`${announcement.status} · ${announcement.channel} · ${announcement.scheduledFor}`} />
              ))}
            </div>
            <div className="panel">
              <h3>What are we missing?</h3>
              <textarea className="textarea" placeholder="Tell us what support content you could not find." />
              <DemoActionButton className="btn magenta" message="Feedback submitted">Submit feedback</DemoActionButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Trending FAQs and most viewed" />
        <div className="grid four">
          {articles
            .filter((article) => article.visibility !== "Private Group")
            .sort((a, b) => b.views - a.views)
            .slice(0, 4)
            .map((article) => (
              <div className="card" key={article.id}>
                <h3>{article.title}</h3>
                <p className="muted">{article.views.toLocaleString()} views · {article.helpful}% helpful</p>
              </div>
            ))}
        </div>
      </section>
    </AppShell>
  );
}
