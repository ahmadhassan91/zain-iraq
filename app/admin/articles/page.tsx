import Link from "next/link";
import { Archive, Edit3, Eye, FilePlus2, Pin, Trash2 } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import { articles } from "@/lib/data";

export default function ArticlesPage() {
  const mostViewed = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <AppShell active="Articles">
      <SectionTitle title="Article list and lifecycle management">
        <Link className="btn primary" href="/admin/articles/new">
          <FilePlus2 size={16} />
          Create article
        </Link>
      </SectionTitle>

      <div className="grid two">
        <div className="panel">
          <SectionTitle title="All articles">
            <span className="chip">{articles.length} articles</span>
          </SectionTitle>
          <div className="management-table">
            {articles.map((article) => (
              <div className="table-row" key={article.id}>
                <div>
                  <h3>{article.title}</h3>
                  <p className="muted">{article.summary}</p>
                </div>
                <div className="management-actions">
                  <div className="chip-row">
                    <span className={`chip ${article.status.toLowerCase().replaceAll(" ", "-")}`}>{article.status}</span>
                    <span className="chip">{article.visibility}</span>
                    <span className="chip">{article.views.toLocaleString()} views</span>
                  </div>
                  <div className="inline-actions">
                    <Link className="btn compact" href={`/admin/articles/${article.id}`}>
                      <Edit3 size={15} />
                      Edit
                    </Link>
                    <DemoActionButton className="btn compact" message="Archived">
                      <Archive size={15} />
                      Archive
                    </DemoActionButton>
                    <DemoActionButton className="btn compact ghost" message="Removed">
                      <Trash2 size={15} />
                    </DemoActionButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="grid">
          <div className="panel">
            <SectionTitle title="Most viewed articles">
              <Eye size={18} color="#4a9e9d" />
            </SectionTitle>
            <div className="article-list">
              {mostViewed.map((article) => (
                <div className="result-item" key={article.id}>
                  <div>
                    <h3>{article.title}</h3>
                    <p className="muted">{article.views.toLocaleString()} views · {article.helpful}% helpful</p>
                  </div>
                  <span className="confidence">{article.confidence}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <SectionTitle title="Global pinned articles">
              <Pin size={18} color="#d12c89" />
            </SectionTitle>
            <div className="chip-row">
              {articles.slice(0, 4).map((article) => (
                <span className="chip magenta" key={article.id}>{article.title}</span>
              ))}
            </div>
            <div className="inline-actions" style={{ marginTop: 14 }}>
              <DemoActionButton className="btn" message="Pin order saved">Save pin order</DemoActionButton>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
