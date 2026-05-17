import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, RadioTower } from "lucide-react";
import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { analytics, articles, integrations } from "@/lib/data";

export default function AdminPage() {
  return (
    <AppShell active="Admin Dashboard">
      <section className="section" style={{ marginTop: 0 }}>
        <SectionTitle title="Knowledge admin dashboard">
          <Link className="btn primary" href="/admin/articles/new">
            Create article <ArrowRight size={16} />
          </Link>
        </SectionTitle>
        <div className="grid four">
          <StatCard label="Published content" value="6" detail="Public, agent and digital channel articles" />
          <StatCard label="Drafts in workflow" value="2" detail="Ready for approval or publish scheduling" />
          <StatCard label="Failed searches" value="223" detail="Across agent and digital channels" />
          <StatCard label="API response" value="118ms" detail="Average search endpoint response" />
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="panel">
            <SectionTitle title="Content requiring attention">
              <span className="chip magenta"><AlertTriangle size={14} /> Knowledge gaps</span>
            </SectionTitle>
            <div className="result-list">
              {articles.slice(0, 4).map((article) => (
                <ArticleResult key={article.id} article={article} href={`/admin/articles/${article.id}`} />
              ))}
            </div>
          </div>
          <div className="panel">
            <SectionTitle title="Integration readiness">
              <RadioTower size={20} color="#4a9e9d" />
            </SectionTitle>
            <div className="article-list">
              {integrations.map((integration) => (
                <div className="result-item" key={integration.name}>
                  <div>
                    <h3>{integration.name}</h3>
                    <p className="muted">{integration.detail}</p>
                  </div>
                  <span className={`chip ${integration.status === "Demo Connected" ? "published" : ""}`}>{integration.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Search trend monitoring" />
        <div className="panel stat-bars">
          {analytics.map((row) => (
            <div className="bar-row" key={row.label}>
              <div className="section-title">
                <span>{row.label}</span>
                <span className="small">{row.searches} searches / {row.failures} failed</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${Math.min(100, row.searches / 13)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid three">
          <Link className="card" href="/admin/articles/new">
            <FileText color="#d12c89" />
            <h3>Workflow management</h3>
            <p className="muted">Draft, approve, ready to publish, scheduled publish and archive statuses.</p>
          </Link>
          <Link className="card" href="/admin/analytics">
            <h3>API analytics</h3>
            <p className="muted">Track API volume, response time, low confidence results and chatbot feedback.</p>
          </Link>
          <Link className="card" href="/admin/groups">
            <h3>Groups and skills</h3>
            <p className="muted">Assign content visibility by group, agent skill and channel.</p>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
