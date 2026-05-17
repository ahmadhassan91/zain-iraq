import { Bold, ImagePlus, Italic, Link as LinkIcon, List, Paperclip, PlaySquare, Underline } from "lucide-react";
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
              <span className="small">Rich answer editor</span>
              <div className="toolbar" aria-label="Rich text toolbar">
                <button className="btn compact" type="button"><Bold size={15} /></button>
                <button className="btn compact" type="button"><Italic size={15} /></button>
                <button className="btn compact" type="button"><Underline size={15} /></button>
                <button className="btn compact" type="button"><List size={15} /></button>
                <button className="btn compact" type="button"><LinkIcon size={15} /></button>
              </div>
              <textarea className="textarea" defaultValue={article.customerAnswer} />
            </label>
            <label className="full">
              <span className="small">Internal note</span>
              <textarea className="textarea" defaultValue={article.internalNote} />
            </label>
            <label>
              <span className="small">Media upload</span>
              <div className="field media-field">
                <ImagePlus size={16} />
                Branch photo, coverage map or support image
              </div>
            </label>
            <label>
              <span className="small">Video tutorial</span>
              <div className="field media-field">
                <PlaySquare size={16} />
                Add walkthrough video URL
              </div>
            </label>
            <label className="full">
              <span className="small">Attachments</span>
              <div className="field media-field">
                <Paperclip size={16} />
                PDF, rate sheet, service advisory or training file
              </div>
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
            <DemoActionButton className="btn ghost" message="Archived">Archive</DemoActionButton>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
