"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell, ArticleMini, SectionTitle } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { DemoActionButton } from "@/components/DemoActionButton";
import { articles, searchArticles } from "@/lib/data";

export default function CustomerPage() {
  const [query, setQuery] = useState("How do I activate roaming?");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [searched, setSearched] = useState(false);
  const results = useMemo(() => searchArticles(query).filter((article) => article.visibility !== "Private Group"), [query]);

  return (
    <AppShell active="Customer KB">
      <section className="hero" dir={dir}>
        <h1>How can we help you today?</h1>
        <p>Search Zain Iraq support content across roaming, bundles, SIM services, internet, app support and business FAQs.</p>
        <div className="search-box">
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search knowledge center" />
          <button className="btn primary" onClick={() => setSearched(true)}>
            <Search size={17} />
            {searched ? "Searched" : "Search"}
          </button>
        </div>
        <div className="chip-row" style={{ marginTop: 14 }}>
          <button className="btn" onClick={() => setDir("ltr")}>English</button>
          <button className="btn" onClick={() => setDir("rtl")}>Arabic RTL</button>
          <button className="btn" onClick={() => setDir("rtl")}>Kurdish RTL</button>
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
              <h3>What&apos;s New</h3>
              <ArticleMini title="4.5G+ unlimited data support update" meta="Published for website, chatbot and agent channels" />
              <ArticleMini title="Roaming support readiness" meta="Updated customer-facing travel checklist" />
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
        <SectionTitle title="Popular support categories" />
        <div className="grid four">
          {["Bundles", "Roaming", "SIM Services", "Digital Channels"].map((category) => (
            <div className="card" key={category}>
              <h3>{category}</h3>
              <p className="muted">Browse public FAQs, guides and troubleshooting content.</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
