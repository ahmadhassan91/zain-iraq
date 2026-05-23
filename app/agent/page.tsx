"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Filter, Search } from "lucide-react";
import { AppShell, SectionTitle, useLanguage } from "@/components/AppChrome";
import { ArticleResult, PersonaCard } from "@/components/ArticleBlocks";
import { AgentWorkflowPanel } from "@/components/GuidedJourneys";
import { DemoImpactPanel, RoleLogin } from "@/components/JourneyDemo";
import { LlmAssistant } from "@/components/LlmAssistant";
import { agents, announcements, articles, searchArticles } from "@/lib/data";
import { applyDemoKnowledgeToArticle, useDemoKnowledge } from "@/lib/demo-state";
import { agentCopy, agentLocalized, announcementCopy, articleCopy, term } from "@/lib/localized-copy";

export default function AgentPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <RoleLogin
        role="Agent"
        title="Agent portal"
        body="Access internal troubleshooting procedures, pinned knowledge, agent-only notes and the LLM assistant."
        points={["Internal operational notes", "Skill-based pinned articles", "AI-assisted KB answers", "Escalation guidance"]}
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

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
    <>
      <SectionTitle title={copy.title} level={1}>
        <span className="chip magenta">{localizedAgent.role}</span>
      </SectionTitle>

      <DemoImpactPanel view="agent" />

      <AgentWorkflowPanel
        onSelectAgent={setAgentId}
        onSelectQuery={(nextQuery) => {
          setQuery(nextQuery);
          setSearched(true);
        }}
      />

      <div className="grid two">
        <div className="grid">
          <div className="panel">
            <div className="search-box" style={{ maxWidth: "100%" }}>
              <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Agent AI search" />
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

        <aside className="grid">
          <div className="panel">
            <SectionTitle title={copy.updates}>
              <Bell size={18} color="#d12c89" />
            </SectionTitle>
            <div className="article-list">
              {agentUpdates.map((announcement) => (
                <div className="result-item" key={announcement.id}>
                  <div>
                    <h3>{announcementCopy(announcement, language).title}</h3>
                    <p className="muted">{announcementCopy(announcement, language).message}</p>
                    <p className="small">{announcement.scheduledFor}</p>
                  </div>
                  <span className={`chip ${announcement.severity.toLowerCase()}`}>{term(announcement.severity, language)}</span>
                </div>
              ))}
            </div>
          </div>
          <LlmAssistant initialQuestion={query} />
          <div className="persona-list">
            {agents.map((item) => (
              <button className="persona-select" key={item.id} onClick={() => setAgentId(item.id)}>
                <PersonaCard agent={item} active={item.id === agentId} />
              </button>
            ))}
          </div>
          <div className="panel">
            <h3>{copy.pinned}</h3>
            <div className="article-list">
              {pinned.map((article) => (
                <ArticleResult key={article.id} article={article} href={`/agent/article/${article.id}`} />
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>{copy.tabs}</h3>
            <div className="chip-row">
              {results.slice(0, 3).map((article) => (
                <span className="chip" key={article.id}>{articleCopy(article, language).title}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
