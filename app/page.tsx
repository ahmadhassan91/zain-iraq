"use client";

import Link from "next/link";
import { ArrowRight, Bot, Globe2, Headphones, LayoutDashboard, Sparkles } from "lucide-react";
import { AppShell, SectionTitle, StatCard, useLanguage } from "@/components/AppChrome";
import { agents, analytics, articles } from "@/lib/data";
import { PersonaCard } from "@/components/ArticleBlocks";
import { analyticsLabel, homeCopy } from "@/lib/localized-copy";

export default function Home() {
  return (
    <AppShell active="Home">
      <HomeContent />
    </AppShell>
  );
}

function HomeContent() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <>
      <section className="hero">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroBody}</p>
        <div className="inline-actions">
          <Link className="btn primary" href="/customer">
            {copy.customerCenter} <ArrowRight size={16} />
          </Link>
          <Link className="btn" href="/agent">
            {copy.agentWorkspace}
          </Link>
          <Link className="btn" href="/admin">
            {copy.adminDashboard}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="grid four">
          <StatCard label={copy.seedArticles} value={`${articles.length}`} detail={copy.seedDetail} />
          <StatCard label={copy.targetedAgents} value={`${agents.length}`} detail={copy.targetedDetail} />
          <StatCard label={copy.channelVariants} value="4" detail={copy.channelDetail} />
          <StatCard label={copy.aiConfidence} value="94%" detail={copy.aiConfidenceDetail} />
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.journeys} />
        <div className="grid three">
          <Link className="card" href="/customer">
            <Globe2 color="#d12c89" />
            <h3>{copy.publicCustomer}</h3>
            <p className="muted">{copy.publicCustomerDetail}</p>
          </Link>
          <Link className="card" href="/agent">
            <Headphones color="#4a9e9d" />
            <h3>{copy.contactAgent}</h3>
            <p className="muted">{copy.contactAgentDetail}</p>
          </Link>
          <Link className="card" href="/admin">
            <LayoutDashboard color="#5f3283" />
            <h3>{copy.knowledgeAdmin}</h3>
            <p className="muted">{copy.knowledgeAdminDetail}</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.skillsTitle}>
          <span className="chip">
            <Sparkles size={14} />
            {copy.fiveAgents}
          </span>
        </SectionTitle>
        <div className="grid two">
          <div className="persona-list">
            {agents.map((agent, index) => (
              <PersonaCard key={agent.id} agent={agent} active={index === 2} />
            ))}
          </div>
          <div className="panel">
            <h3>{copy.gapSignal}</h3>
            <p className="muted">{copy.gapSignalDetail}</p>
            <div className="stat-bars">
              {analytics.map((row) => (
                <div className="bar-row" key={row.label}>
                  <div className="section-title">
                    <span>{analyticsLabel(row.label, language)}</span>
                    <span className="small">{row.failures} {copy.gaps}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.min(100, row.failures)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link className="btn magenta" href="/api-readiness">
              <Bot size={16} />
              {copy.viewApi}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.apiFirst} />
        <div className="grid three">
          <div className="card">
            <h3>{copy.knowledgeApis}</h3>
            <p className="muted">{copy.knowledgeApisDetail}</p>
          </div>
          <div className="card">
            <h3>{copy.qualitySignals}</h3>
            <p className="muted">{copy.qualitySignalsDetail}</p>
          </div>
          <div className="card">
            <h3>{copy.llmReady}</h3>
            <p className="muted">{copy.llmReadyDetail}</p>
          </div>
        </div>
      </section>
    </>
  );
}
