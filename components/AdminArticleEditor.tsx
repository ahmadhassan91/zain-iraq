"use client";

import { Bold, ImagePlus, Italic, Link as LinkIcon, List, Paperclip, PlaySquare, Underline } from "lucide-react";
import { SectionTitle, useLanguage } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import type { Article } from "@/lib/data";
import { articleCopy, editorCopy, term } from "@/lib/localized-copy";

export function AdminArticleEditor({ article, isNew }: { article: Article; isNew: boolean }) {
  const { language } = useLanguage();
  const copy = editorCopy[language];
  const localized = articleCopy(article, language);
  const workflowItems = {
    EN: ["Draft saved", "Approval requested", "Ready to publish", "Scheduled publish", "Audit trail locked"],
    AR: ["تم حفظ المسودة", "تم طلب الموافقة", "جاهز للنشر", "نشر مجدول", "تم قفل سجل التدقيق"],
    KU: ["ڕەشنووس پاشەکەوت کرا", "داوای پەسەندکردن کرا", "ئامادەی بڵاوکردنەوە", "بڵاوکردنەوە خشتە کرا", "تۆماری پشکنین داخرا"]
  }[language];

  return (
    <>
      <SectionTitle title={isNew ? copy.createTitle : copy.editTitle}>
        <span className="chip ready">{copy.autosaved}</span>
      </SectionTitle>
      <div className="admin-editor">
        <div className="panel">
          <div className="form-grid">
            <label>
              <span className="small">{copy.title}</span>
              <input className="field" value={localized.title} readOnly />
            </label>
            <label>
              <span className="small">{copy.category}</span>
              <input className="field" value={localized.category} readOnly />
            </label>
            <label>
              <span className="small">{copy.contentType}</span>
              <select className="field" value={term(article.type, language)} onChange={() => undefined}>
                {["FAQ", "Troubleshooting", "Guide", "Announcement"].map((item) => (
                  <option key={item}>{term(item, language)}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="small">{copy.visibility}</span>
              <select className="field" value={term(article.visibility, language)} onChange={() => undefined}>
                {["Public", "Agent", "Private Group", "Digital Channel"].map((item) => (
                  <option key={item}>{term(item, language)}</option>
                ))}
              </select>
            </label>
            <label className="full">
              <span className="small">{copy.richAnswer}</span>
              <div className="toolbar" aria-label="Rich text toolbar">
                <button className="btn compact" type="button"><Bold size={15} /></button>
                <button className="btn compact" type="button"><Italic size={15} /></button>
                <button className="btn compact" type="button"><Underline size={15} /></button>
                <button className="btn compact" type="button"><List size={15} /></button>
                <button className="btn compact" type="button"><LinkIcon size={15} /></button>
              </div>
              <textarea className="textarea" value={localized.customerAnswer} readOnly />
            </label>
            <label className="full">
              <span className="small">{copy.internalNote}</span>
              <textarea className="textarea" value={localized.internalNote} readOnly />
            </label>
            <label>
              <span className="small">{copy.mediaUpload}</span>
              <div className="field media-field">
                <ImagePlus size={16} />
                {copy.mediaHint}
              </div>
            </label>
            <label>
              <span className="small">{copy.video}</span>
              <div className="field media-field">
                <PlaySquare size={16} />
                {copy.videoHint}
              </div>
            </label>
            <label className="full">
              <span className="small">{copy.attachments}</span>
              <div className="field media-field">
                <Paperclip size={16} />
                {copy.attachmentsHint}
              </div>
            </label>
          </div>
        </div>

        <aside className="grid">
          <div className="panel">
            <h3>{copy.workflow}</h3>
            <div className="timeline">
              {workflowItems.map((item, index) => (
                <div className="step" key={item}>
                  <span className="step-number">{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>{copy.channels}</h3>
            <div className="chip-row">
              {["Website", "Agent Portal", "Chatbot", "WhatsApp"].map((variant) => (
                <span className="chip" key={variant}>{term(variant, language)}</span>
              ))}
            </div>
          </div>
          <div className="inline-actions">
            <DemoActionButton className="btn" message={copy.saved}>{copy.saveDraft}</DemoActionButton>
            <DemoActionButton className="btn magenta" message={term("Approved", language)}>{copy.approve}</DemoActionButton>
            <DemoActionButton className="btn primary" message={term("Published", language)}>{copy.publish}</DemoActionButton>
            <DemoActionButton className="btn ghost" message={term("Archived", language)}>{copy.archive}</DemoActionButton>
          </div>
        </aside>
      </div>
    </>
  );
}
