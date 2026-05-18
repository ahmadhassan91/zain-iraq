"use client";

import Link from "next/link";
import { Archive, Edit3, Eye, FilePlus2, Pin, Trash2 } from "lucide-react";
import { AppShell, SectionTitle, useLanguage } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import { articles } from "@/lib/data";
import { articleAdminCopy, articleCopy, term } from "@/lib/localized-copy";

export default function ArticlesPage() {
  return (
    <AppShell active="Articles">
      <ArticlesContent />
    </AppShell>
  );
}

function ArticlesContent() {
  const { language } = useLanguage();
  const copy = articleAdminCopy[language];
  const mostViewed = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <>
      <SectionTitle title={copy.title}>
        <Link className="btn primary" href="/admin/articles/new">
          <FilePlus2 size={16} />
          {copy.create}
        </Link>
      </SectionTitle>

      <div className="grid two">
        <div className="panel">
          <SectionTitle title={copy.all}>
            <span className="chip">{articles.length} {copy.articles}</span>
          </SectionTitle>
          <div className="management-table">
            {articles.map((article) => {
              const localized = articleCopy(article, language);
              return (
                <div className="table-row" key={article.id}>
                  <div>
                    <h3>{localized.title}</h3>
                    <p className="muted">{localized.summary}</p>
                  </div>
                  <div className="management-actions">
                    <div className="chip-row">
                      <span className={`chip ${article.status.toLowerCase().replaceAll(" ", "-")}`}>{term(article.status, language)}</span>
                      <span className="chip">{term(article.visibility, language)}</span>
                      <span className="chip">{article.views.toLocaleString()} {copy.views}</span>
                    </div>
                    <div className="inline-actions">
                      <Link className="btn compact" href={`/admin/articles/${article.id}`}>
                        <Edit3 size={15} />
                        {copy.edit}
                      </Link>
                      <DemoActionButton className="btn compact" message={copy.archived}>
                        <Archive size={15} />
                        {copy.archive}
                      </DemoActionButton>
                      <DemoActionButton className="btn compact ghost" message={copy.removed}>
                        <Trash2 size={15} />
                      </DemoActionButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="grid">
          <div className="panel">
            <SectionTitle title={copy.mostViewed}>
              <Eye size={18} color="#4a9e9d" />
            </SectionTitle>
            <div className="article-list">
              {mostViewed.map((article) => {
                const localized = articleCopy(article, language);
                return (
                  <div className="result-item" key={article.id}>
                    <div>
                      <h3>{localized.title}</h3>
                      <p className="muted">{article.views.toLocaleString()} {copy.views} · {article.helpful}% {copy.helpful}</p>
                    </div>
                    <span className="confidence">{article.confidence}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel">
            <SectionTitle title={copy.pinned}>
              <Pin size={18} color="#d12c89" />
            </SectionTitle>
            <div className="chip-row">
              {articles.slice(0, 4).map((article) => (
                <span className="chip magenta" key={article.id}>{articleCopy(article, language).title}</span>
              ))}
            </div>
            <div className="inline-actions" style={{ marginTop: 14 }}>
              <DemoActionButton className="btn" message={copy.savedPins}>{copy.savePins}</DemoActionButton>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
