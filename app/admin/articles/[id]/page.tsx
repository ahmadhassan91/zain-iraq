import { AppShell, SectionTitle } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import { articles, findArticle } from "@/lib/data";

export function generateStaticParams() {
  return [{ id: "new" }, ...articles.map((article) => ({ id: article.id }))];
}

export default function AdminArticlePage({ params }: { params: { id: string } }) {
  const article = params.id === "new" ? findArticle("app-login") : findArticle(params.id);

  return (
    <AppShell active="Content Workflow">
      <SectionTitle title={params.id === "new" ? "Create troubleshooting article" : "Edit article workflow"}>
        <span className="chip ready">Autosaved 1 min ago</span>
      </SectionTitle>
      <div className="admin-editor">
        <div className="panel">
          <div className="form-grid">
            <label>
              <span className="small">Title</span>
              <input className="field" defaultValue={article.title} />
            </label>
            <label>
              <span className="small">Category</span>
              <input className="field" defaultValue={article.category} />
            </label>
            <label>
              <span className="small">Content type</span>
              <select className="field" defaultValue={article.type}>
                <option>FAQ</option>
                <option>Troubleshooting</option>
                <option>Guide</option>
                <option>Announcement</option>
              </select>
            </label>
            <label>
              <span className="small">Visibility</span>
              <select className="field" defaultValue={article.visibility}>
                <option>Public</option>
                <option>Agent</option>
                <option>Private Group</option>
                <option>Digital Channel</option>
              </select>
            </label>
            <label className="full">
              <span className="small">Short answer</span>
              <textarea className="textarea" defaultValue={article.customerAnswer} />
            </label>
            <label className="full">
              <span className="small">Internal note</span>
              <textarea className="textarea" defaultValue={article.internalNote} />
            </label>
          </div>
        </div>

        <aside className="grid">
          <div className="panel">
            <h3>Workflow</h3>
            <div className="timeline">
              {["Draft saved", "Approval requested", "Ready to publish", "Scheduled publish", "Audit trail locked"].map((item, index) => (
                <div className="step" key={item}>
                  <span className="step-number">{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>Channel variants</h3>
            <div className="chip-row">
              {["Website", "Agent Portal", "Chatbot", "WhatsApp"].map((variant) => (
                <span className="chip" key={variant}>{variant}</span>
              ))}
            </div>
          </div>
          <div className="inline-actions">
            <DemoActionButton className="btn" message="Draft saved">Save draft</DemoActionButton>
            <DemoActionButton className="btn magenta" message="Approved">Approve</DemoActionButton>
            <DemoActionButton className="btn primary" message="Published">Publish</DemoActionButton>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
