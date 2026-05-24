"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Filter, Search } from "lucide-react";
import { AppShell, SectionTitle, useLanguage } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { AgentWorkflowPanel } from "@/components/GuidedJourneys";
import { LlmAssistant } from "@/components/LlmAssistant";
import { agents, announcements, articles, searchArticles } from "@/lib/data";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { agentCopy, agentLocalized, announcementCopy, articleCopy, term } from "@/lib/localized-copy";

const colorMap: Record<string, string> = {
  magenta: "var(--magenta, #d12c89)",
  teal: "var(--teal, #4a9e9d)",
  blue: "var(--blue, #1f3f77)",
  violet: "var(--violet, #5f3283)"
};

export default function AgentPage() {
  return (
    <AppShell active="Agent Workspace">
      <AgentContent />
    </AppShell>
  );
}

function AgentContent() {
  const [agentId, setAgentId] = useState("roaming");
  const [query, setQuery] = useState("customer cannot use data while roaming");
  const [searched, setSearched] = useState(false);
  const { language } = useLanguage();
  const copy = agentCopy[language];
  const { state } = useDemoKnowledge();
  const agent = agents.find((item) => item.id === agentId) ?? agents[0];
  const localizedAgent = agentLocalized(agent, language);
  const results = useMemo(() => searchArticles(query).map((article) => applyDemoKnowledgeToArticle(article, state)), [query, state]);
  const pinned = articles.filter((article) => agent.pinned.includes(article.id)).map((article) => applyDemoKnowledgeToArticle(article, state));
  const agentUpdates = announcements.filter((announcement) => announcement.audience !== "Customer");

  useEffect(() => {
    setQuery(copy.query);
    setSearched(false);
  }, [copy.query]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "3rem" }}>
      {/* Page Heading & Persona Selector */}
      <div className="page-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", padding: "1.5rem", borderRadius: "12px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>{copy.title}</h1>
          <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.92rem" }}>
            Internal troubleshooting, pinned knowledge and AI assistance for <strong>{localizedAgent.role}</strong>
          </p>
        </div>
        <div className="agent-selector">
          {agents.map((item) => {
            const localized = agentLocalized(item, language);
            const bg = colorMap[item.color] || item.color;
            return (
              <button 
                key={item.id} 
                className={agentId === item.id ? "active" : ""} 
                onClick={() => setAgentId(item.id)}
              >
                <span className="agent-initials" style={{ background: bg }}>{item.initials}</span>
                {localized.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guided Agent Workflow */}
      <AgentWorkflowPanel
        onSelectAgent={setAgentId}
        onSelectQuery={(nextQuery) => {
          setQuery(nextQuery);
          setSearched(true);
        }}
      />

      {/* Two Column Workspace */}
      <div className="grid two">
        {/* Left Column: Search & Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="panel" style={{ padding: "1.5rem" }}>
            <div className="search-box" style={{ maxWidth: "100%" }}>
              <input 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                aria-label="Agent AI search" 
                placeholder="Search troubleshooting procedures, eSIM documents, roaming APN..."
              />
              <button className="btn primary" onClick={() => setSearched(true)}>
                <Search size={17} />
                {searched ? copy.searched : copy.search}
              </button>
            </div>
            <div className="chip-row" style={{ marginTop: 14 }}>
              <span className="chip"><Filter size={13} /> {copy.category}</span>
              <span className="chip">{copy.language}</span>
              <span className="chip">{copy.status}</span>
              <span className="chip">{copy.channel}</span>
              <span className="chip">{copy.contentType}</span>
            </div>
          </div>

          <section>
            <SectionTitle title={copy.ranked}>
              <span className="chip">{copy.confidence}</span>
            </SectionTitle>
            <div className="result-list">
              {results.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/agent/article/${article.id}`} searchQuery={query} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: AI Assistant, Pinned, and Updates */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Grounded LLM Assistant */}
          <LlmAssistant initialQuestion={query} />

          {/* Personal Pinned Content */}
          <div className="panel" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.1rem", fontFamily: "var(--font-display)" }}>{copy.pinned}</h3>
            <div className="article-list" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {pinned.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/agent/article/${article.id}`} />
              ))}
            </div>
          </div>

          {/* Operational Updates */}
          <div className="panel" style={{ padding: "1.5rem" }}>
            <div className="section-title" style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem" }}>{copy.updates}</h2>
              <Bell size={18} color="#d12c89" />
            </div>
            <div className="article-list" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {agentUpdates.map((announcement) => (
                <div className="result-item" key={announcement.id} style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>{announcementCopy(announcement, language).title}</h3>
                    <p className="muted" style={{ margin: "0.25rem 0", fontSize: "0.85rem", lineHeight: 1.4 }}>{announcementCopy(announcement, language).message}</p>
                    <span className="muted" style={{ fontSize: "0.75rem" }}>{announcement.scheduledFor}</span>
                  </div>
                  <span className={`chip ${announcement.severity.toLowerCase()}`} style={{ fontSize: "0.75rem" }}>
                    {term(announcement.severity, language)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
