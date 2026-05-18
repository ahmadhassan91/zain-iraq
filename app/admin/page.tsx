"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Bell, FileText, RadioTower } from "lucide-react";
import { AppShell, SectionTitle, StatCard, useLanguage } from "@/components/AppChrome";
import { ArticleResult } from "@/components/ArticleBlocks";
import { analytics, announcements, articles, integrations } from "@/lib/data";
import { adminCopy, analyticsLabel, announcementCopy, integrationCopy, term } from "@/lib/localized-copy";

export default function AdminPage() {
  return (
    <AppShell active="Admin Dashboard">
      <AdminContent />
    </AppShell>
  );
}

function AdminContent() {
  const { language } = useLanguage();
  const copy = adminCopy[language];

  return (
    <>
      <section className="section" style={{ marginTop: 0 }}>
        <SectionTitle title={copy.title}>
          <Link className="btn primary" href="/admin/articles/new">
            {copy.createArticle} <ArrowRight size={16} />
          </Link>
        </SectionTitle>
        <div className="grid four">
          <StatCard label={copy.publishedContent} value="6" detail={copy.publishedDetail} />
          <StatCard label={copy.drafts} value="2" detail={copy.draftsDetail} />
          <StatCard label={copy.failedSearches} value="223" detail={copy.failedDetail} />
          <StatCard label={copy.apiResponse} value="118ms" detail={copy.apiDetail} />
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="panel">
            <SectionTitle title={copy.announcements}>
              <Bell size={18} color="#d12c89" />
            </SectionTitle>
            <div className="article-list">
              {announcements.map((announcement) => {
                const localized = announcementCopy(announcement, language);
                return (
                  <div className="result-item" key={announcement.id}>
                    <div>
                      <h3>{localized.title}</h3>
                      <p className="muted">{localized.message}</p>
                    </div>
                    <span className={`chip ${announcement.status.toLowerCase()}`}>{term(announcement.status, language)}</span>
                  </div>
                );
              })}
            </div>
            <Link className="btn magenta" href="/admin/notifications" style={{ marginTop: 14 }}>
              {copy.manageAlerts}
            </Link>
          </div>
          <div className="panel">
            <SectionTitle title={copy.contentAttention}>
              <span className="chip magenta"><AlertTriangle size={14} /> {copy.gaps}</span>
            </SectionTitle>
            <div className="result-list">
              {articles.slice(0, 4).map((article) => (
                <ArticleResult key={article.id} article={article} href={`/admin/articles/${article.id}`} />
              ))}
            </div>
          </div>
          <div className="panel">
            <SectionTitle title={copy.integrations}>
              <RadioTower size={20} color="#4a9e9d" />
            </SectionTitle>
            <div className="article-list">
              {integrations.map((integration) => {
                const localized = integrationCopy(integration, language);
                return (
                  <div className="result-item" key={integration.name}>
                    <div>
                      <h3>{localized.name}</h3>
                      <p className="muted">{localized.detail}</p>
                    </div>
                    <span className={`chip ${integration.status === "Demo Connected" ? "published" : ""}`}>
                      {term(integration.status, language)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.searchTrends} />
        <div className="panel stat-bars">
          {analytics.map((row) => (
            <div className="bar-row" key={row.label}>
              <div className="section-title">
                <span>{analyticsLabel(row.label, language)}</span>
                <span className="small">{row.searches} {term("searches", language)} / {row.failures} {term("failed", language)}</span>
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
            <h3>{copy.workflow}</h3>
            <p className="muted">{copy.workflowDetail}</p>
          </Link>
          <Link className="card" href="/admin/articles">
            <h3>{copy.articleManagement}</h3>
            <p className="muted">{copy.articleManagementDetail}</p>
          </Link>
          <Link className="card" href="/admin/analytics">
            <h3>{copy.apiAnalytics}</h3>
            <p className="muted">{copy.apiAnalyticsDetail}</p>
          </Link>
          <Link className="card" href="/admin/groups">
            <h3>{copy.groups}</h3>
            <p className="muted">{copy.groupsDetail}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
