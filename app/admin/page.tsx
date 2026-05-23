"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Bell, FileText, LockKeyhole, Pin, RadioTower, Users } from "lucide-react";
import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { AdminWorkflowPanel } from "@/components/GuidedJourneys";
import { DemoImpactPanel, RoleLogin } from "@/components/JourneyDemo";
import { analytics, articles } from "@/lib/data";

const rights = [
  { icon: FileText, title: "Create and edit KB articles", body: "Maintain customer answer, internal agent note, steps, status and channel variants." },
  { icon: LockKeyhole, title: "Control visibility", body: "Publish content for Customer, Agent Portal, Chatbot, WhatsApp or private agent groups." },
  { icon: Pin, title: "Pin operational content", body: "Promote high-priority content for targeted care teams and live incidents." },
  { icon: Bell, title: "Manage alerts", body: "Publish customer banners and internal advisories without changing the whole article." }
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <RoleLogin
        role="Admin"
        title="Admin portal"
        body="Govern the knowledge base, publish approved content, control visibility and monitor content gaps from one focused workspace."
        points={["Publish customer and agent content", "Set role and channel visibility", "Manage live alerts", "Review analytics and gaps"]}
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

  return (
    <AppShell active="Admin Dashboard">
      <AdminWorkspace />
    </AppShell>
  );
}

function AdminWorkspace() {
  return (
    <>
      <section className="page-heading">
        <div>
          <span className="chip magenta">Admin role</span>
          <h1>Governance workspace</h1>
          <p>Shows what Admin can control, and how a publish action changes Customer and Agent journeys.</p>
        </div>
        <Link className="btn primary" href="/admin/articles/roaming-activation">
          Open article editor
        </Link>
      </section>

      <section className="section">
        <DemoImpactPanel view="admin" />
      </section>

      <AdminWorkflowPanel />

      <section className="section">
        <div className="action-row">
          <Link className="btn" href="/admin/articles"><FileText size={16} /> Articles</Link>
          <Link className="btn" href="/admin/notifications"><Bell size={16} /> Notifications</Link>
          <Link className="btn" href="/admin/analytics"><BarChart3 size={16} /> Analytics</Link>
          <Link className="btn" href="/admin/groups"><Users size={16} /> Groups & Skills</Link>
        </div>
      </section>

      <section className="section">
        <div className="grid four">
          <StatCard label="Published content" value="6" detail="Public and internal KB entries" />
          <StatCard label="Drafts" value="2" detail="Awaiting approval or scheduling" />
          <StatCard label="Search gaps" value="223" detail="Failed or low-confidence searches" />
          <StatCard label="API response" value="118ms" detail="Average search endpoint response" />
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Admin rights" />
        <div className="grid four">
          {rights.map((right) => {
            const Icon = right.icon;
            return (
              <div className="card quiet-card" key={right.title}>
                <Icon color="#d12c89" />
                <h3>{right.title}</h3>
                <p className="muted">{right.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="grid two balanced">
          <div className="panel stat-bars">
            <SectionTitle title="Knowledge gaps">
              <BarChart3 size={18} color="#4a9e9d" />
            </SectionTitle>
            {analytics.slice(0, 4).map((row) => (
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
          <div className="panel">
            <SectionTitle title="Content controlled by Admin">
              <RadioTower size={18} color="#d12c89" />
            </SectionTitle>
            <div className="article-list">
              {articles.slice(0, 4).map((article) => (
                <Link className="result-item" href={`/admin/articles/${article.id}`} key={article.id}>
                  <div>
                    <h3>{article.title}</h3>
                    <p className="muted">{article.visibility} · {article.channelVariants.join(", ")}</p>
                  </div>
                  <span className="chip published">{article.status}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
