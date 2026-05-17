"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppChrome";
import { ArticleResult, PersonaCard } from "@/components/ArticleBlocks";
import { LlmAssistant } from "@/components/LlmAssistant";
import { agents, articles, searchArticles } from "@/lib/data";

export default function AgentPage() {
  const [agentId, setAgentId] = useState("roaming");
  const [query, setQuery] = useState("customer cannot use data while roaming");
  const [searched, setSearched] = useState(false);
  const agent = agents.find((item) => item.id === agentId) ?? agents[0];
  const results = useMemo(() => searchArticles(query), [query]);
  const pinned = articles.filter((article) => agent.pinned.includes(article.id));

  return (
    <AppShell active="Agent Workspace">
      <SectionTitle title="Agent assist workspace">
        <span className="chip magenta">{agent.role}</span>
      </SectionTitle>
      <div className="grid two">
        <div className="grid">
          <div className="panel">
            <div className="search-box" style={{ maxWidth: "100%" }}>
              <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Agent AI search" />
              <button className="btn primary" onClick={() => setSearched(true)}>
                <Search size={17} />
                {searched ? "Searched" : "Search"}
              </button>
            </div>
            <div className="chip-row" style={{ marginTop: 14 }}>
              <span className="chip"><Filter size={13} /> Category</span>
              <span className="chip">Language</span>
              <span className="chip">Status</span>
              <span className="chip">Channel</span>
              <span className="chip">Content type</span>
            </div>
          </div>

          <section>
            <SectionTitle title="Ranked knowledge results">
              <span className="chip">Confidence score included</span>
            </SectionTitle>
            <div className="result-list">
              {results.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/agent/article/${article.id}`} />
              ))}
            </div>
          </section>
        </div>

        <aside className="grid">
          <LlmAssistant initialQuestion={query} />
          <div className="persona-list">
            {agents.map((item) => (
              <button className="persona-select" key={item.id} onClick={() => setAgentId(item.id)}>
                <PersonaCard agent={item} active={item.id === agentId} />
              </button>
            ))}
          </div>
          <div className="panel">
            <h3>Personal pinned content</h3>
            <div className="article-list">
              {pinned.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/agent/article/${article.id}`} />
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>Open article tabs</h3>
            <div className="chip-row">
              {results.slice(0, 3).map((article) => (
                <span className="chip" key={article.id}>{article.title}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
