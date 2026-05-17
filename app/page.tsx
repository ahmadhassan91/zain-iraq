import Link from "next/link";
import { ArrowRight, Bot, Globe2, Headphones, LayoutDashboard, Sparkles } from "lucide-react";
import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { agents, analytics, articles } from "@/lib/data";
import { PersonaCard } from "@/components/ArticleBlocks";

export default function Home() {
  return (
    <AppShell active="Home">
      <section className="hero">
        <h1>One Zain knowledge source for customers, agents and digital channels.</h1>
        <p>
          AI-assisted search, targeted agent guidance, content governance, analytics, multilingual support and channel-ready knowledge delivery.
        </p>
        <div className="inline-actions">
          <Link className="btn primary" href="/customer">
            Customer Knowledge Center <ArrowRight size={16} />
          </Link>
          <Link className="btn" href="/agent">
            Agent Workspace
          </Link>
          <Link className="btn" href="/admin">
            Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="grid four">
          <StatCard label="Seed articles" value={`${articles.length}`} detail="FAQs, guides and troubleshooting flows" />
          <StatCard label="Targeted agents" value={`${agents.length}`} detail="Billing, technical, roaming, digital and PTX" />
          <StatCard label="Channel variants" value="4" detail="Website, Agent Portal, Chatbot, WhatsApp" />
          <StatCard label="AI confidence" value="94%" detail="Shown on ranked search results" />
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Role-based journeys" />
        <div className="grid three">
          <Link className="card" href="/customer">
            <Globe2 color="#d12c89" />
            <h3>Public customer</h3>
            <p className="muted">Search Zain FAQs, roaming, bundles, app support and public troubleshooting guides.</p>
          </Link>
          <Link className="card" href="/agent">
            <Headphones color="#4a9e9d" />
            <h3>Contact center agent</h3>
            <p className="muted">Use skill-based recommendations, copy-ready answers and restricted procedures.</p>
          </Link>
          <Link className="card" href="/admin">
            <LayoutDashboard color="#5f3283" />
            <h3>Knowledge administrator</h3>
            <p className="muted">Create, approve, publish, archive and analyze content across channels.</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <SectionTitle title="4-5 targeted agent skills">
          <span className="chip">
            <Sparkles size={14} />
            5 targeted agents
          </span>
        </SectionTitle>
        <div className="grid two">
          <div className="persona-list">
            {agents.map((agent, index) => (
              <PersonaCard key={agent.id} agent={agent} active={index === 2} />
            ))}
          </div>
          <div className="panel">
            <h3>Knowledge gap signal</h3>
            <p className="muted">Admin sees failed or low-confidence searches from all channels.</p>
            <div className="stat-bars">
              {analytics.map((row) => (
                <div className="bar-row" key={row.label}>
                  <div className="section-title">
                    <span>{row.label}</span>
                    <span className="small">{row.failures} gaps</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.min(100, row.failures)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link className="btn magenta" href="/api-readiness">
              <Bot size={16} />
              View API readiness
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title="API-first delivery" />
        <div className="grid three">
          <div className="card">
            <h3>Knowledge APIs</h3>
            <p className="muted">Search, article retrieval and channel-specific content responses for website, agent portal, chatbot and WhatsApp.</p>
          </div>
          <div className="card">
            <h3>Quality signals</h3>
            <p className="muted">Confidence scores, feedback capture, missing-content flags and analytics events are part of the response model.</p>
          </div>
          <div className="card">
            <h3>LLM-ready assistant</h3>
            <p className="muted">A grounded assistant can use approved KB articles as context and return cited answers with handoff rules.</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
