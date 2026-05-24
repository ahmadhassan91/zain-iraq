"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Bell, FileText, LockKeyhole, Pin, RadioTower, Users } from "lucide-react";
import { AppShell, SectionTitle, StatCard, useLanguage, type Language } from "@/components/AppChrome";
import { AdminWorkflowPanel } from "@/components/GuidedJourneys";
import { useDemoKnowledge } from "@/lib/demo-state";
import { analytics, articles } from "@/lib/data";
import { analyticsLabel, articleCopy, term } from "@/lib/localized-copy";

const adminCopy: Record<Language, Record<string, string>> = {
  EN: {
    role: "Admin role",
    title: "Governance workspace",
    body: "Shows what Admin can control, and how a publish action changes Customer and Agent journeys.",
    editor: "Open article editor",
    articles: "Articles",
    notifications: "Notifications",
    analytics: "Analytics",
    groups: "Groups & Skills",
    publishedContent: "Published content",
    publishedDetail: "Public and internal KB entries",
    drafts: "Drafts",
    draftsDetail: "Awaiting approval or scheduling",
    searchGaps: "Search gaps",
    searchGapsDetail: "Failed or low-confidence searches",
    apiResponse: "API response",
    apiResponseDetail: "Average search endpoint response",
    rightsTitle: "Admin rights",
    gapsTitle: "Knowledge gaps",
    gaps: "gaps",
    controlled: "Content controlled by Admin"
  },
  AR: {
    role: "دور المسؤول",
    title: "مساحة الحوكمة",
    body: "يوضح ما يمكن للمسؤول التحكم به، وكيف يغيّر النشر رحلتي العميل والوكيل.",
    editor: "فتح محرر المقال",
    articles: "المقالات",
    notifications: "التنبيهات",
    analytics: "التحليلات",
    groups: "المجموعات والمهارات",
    publishedContent: "المحتوى المنشور",
    publishedDetail: "إدخالات معرفة عامة وداخلية",
    drafts: "المسودات",
    draftsDetail: "بانتظار الاعتماد أو الجدولة",
    searchGaps: "فجوات البحث",
    searchGapsDetail: "عمليات بحث فاشلة أو منخفضة الثقة",
    apiResponse: "استجابة API",
    apiResponseDetail: "متوسط زمن استجابة واجهة البحث",
    rightsTitle: "صلاحيات المسؤول",
    gapsTitle: "فجوات المعرفة",
    gaps: "فجوة",
    controlled: "المحتوى الذي يتحكم به المسؤول"
  },
  KU: {
    role: "ڕۆڵی بەڕێوەبەر",
    title: "شوێنی کاری حوکمرانی",
    body: "پیشان دەدات بەڕێوەبەر چی کۆنترۆڵ دەکات و چۆن بڵاوکردنەوە گەشتی کڕیار و ئەجێنت دەگۆڕێت.",
    editor: "کردنەوەی دەستکاریکەری بابەت",
    articles: "بابەتەکان",
    notifications: "ئاگادارکردنەوەکان",
    analytics: "شیکارییەکان",
    groups: "گرووپ و شارەزایی",
    publishedContent: "ناوەڕۆکی بڵاوکراوە",
    publishedDetail: "تۆمارەکانی زانیاری گشتی و ناوخۆ",
    drafts: "ڕەشنووسەکان",
    draftsDetail: "چاوەڕوانی پەسەندکردن یان کاتدانان",
    searchGaps: "کەلێنی گەڕان",
    searchGapsDetail: "گەڕانی سەرنەکەوتوو یان کەم متمانە",
    apiResponse: "وەڵامی API",
    apiResponseDetail: "تێکڕای کاتی وەڵامی API گەڕان",
    rightsTitle: "مۆڵەتەکانی بەڕێوەبەر",
    gapsTitle: "کەلێنی زانیاری",
    gaps: "کەلێن",
    controlled: "ناوەڕۆکی کۆنترۆڵکراو لەلایەن بەڕێوەبەر"
  }
};

const rights = {
  EN: [
    { icon: FileText, title: "Create and edit KB articles", body: "Maintain customer answer, internal agent note, steps, status and channel variants." },
    { icon: LockKeyhole, title: "Control visibility", body: "Publish content for Customer, Agent Portal, Chatbot, WhatsApp or private agent groups." },
    { icon: Pin, title: "Pin operational content", body: "Promote high-priority content for targeted care teams and live incidents." },
    { icon: Bell, title: "Manage alerts", body: "Publish customer banners and internal advisories without changing the whole article." }
  ],
  AR: [
    { icon: FileText, title: "إنشاء وتعديل مقالات المعرفة", body: "إدارة إجابة العميل، ملاحظة الوكيل الداخلية، الخطوات، الحالة ونسخ القنوات." },
    { icon: LockKeyhole, title: "التحكم في الرؤية", body: "نشر المحتوى للعميل، بوابة الوكيل، الشات بوت، واتساب أو مجموعات وكلاء خاصة." },
    { icon: Pin, title: "تثبيت محتوى تشغيلي", body: "إبراز المحتوى عالي الأولوية لفرق الرعاية المستهدفة والحوادث المباشرة." },
    { icon: Bell, title: "إدارة التنبيهات", body: "نشر أشرطة للعملاء وتنبيهات داخلية دون تغيير المقال بالكامل." }
  ],
  KU: [
    { icon: FileText, title: "دروستکردن و دەستکاریکردنی بابەتی زانیاری", body: "بەڕێوەبردنی وەڵامی کڕیار، تێبینی ناوخۆی ئەجێنت، هەنگاوەکان، دۆخ و وەشانی کەناڵەکان." },
    { icon: LockKeyhole, title: "کۆنترۆڵی بینین", body: "ناوەڕۆک بۆ کڕیار، دەروازەی ئەجێنت، چاتبۆت، واتساپ یان گرووپی تایبەتی ئەجێنت بڵاو بکەوە." },
    { icon: Pin, title: "جێگیرکردنی ناوەڕۆکی ئۆپەراسیۆن", body: "ناوەڕۆکی گرنگ بۆ تیپە ئامانجدارەکان و ڕووداوە زیندووەکان بەرز بکەوە." },
    { icon: Bell, title: "بەڕێوەبردنی ئاگاداری", body: "بەندی کڕیار و ئاگاداری ناوخۆ بڵاو بکەوە بەبێ گۆڕینی تەواوی بابەت." }
  ]
};

export default function AdminPage() {
  return (
    <AppShell active="Admin Dashboard">
      <AdminWorkspace />
    </AppShell>
  );
}

function AdminWorkspace() {
  const { language } = useLanguage();
  const copy = adminCopy[language];
  const localizedRights = rights[language];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "3rem" }}>
      {/* Page Heading */}
      <div className="page-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", padding: "1.5rem", borderRadius: "12px" }}>
        <div>
          <span className="chip magenta" style={{ fontSize: "0.75rem", padding: "3px 8px" }}>Governance</span>
          <h1 style={{ margin: "0.25rem 0 0", fontSize: "1.8rem" }}>{copy.title}</h1>
          <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.92rem" }}>
            Publish content, control visibility and monitor knowledge gaps across all channels
          </p>
        </div>
        <Link className="btn primary" href="/admin/articles/roaming-activation">
          {copy.editor}
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid four">
        <StatCard label={copy.publishedContent} value="6" detail={copy.publishedDetail} />
        <StatCard label={copy.drafts} value="2" detail={copy.draftsDetail} />
        <StatCard label={copy.searchGaps} value="223" detail={copy.searchGapsDetail} />
        <StatCard label={copy.apiResponse} value="118ms" detail={copy.apiResponseDetail} />
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="action-row" style={{ display: "flex", gap: "0.75rem", padding: "1rem", borderRadius: "12px" }}>
        <Link className="btn" href="/admin/articles"><FileText size={16} /> {copy.articles}</Link>
        <Link className="btn" href="/admin/notifications"><Bell size={16} /> {copy.notifications}</Link>
        <Link className="btn" href="/admin/analytics"><BarChart3 size={16} /> {copy.analytics}</Link>
        <Link className="btn" href="/admin/groups"><Users size={16} /> {copy.groups}</Link>
      </div>

      {/* Governance & Publish Workflow Panel */}
      <AdminWorkflowPanel />

      {/* Live Content Split-Screen Preview */}
      <LivePreviewPanel />

      {/* Admin Rights / Capabilities */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <SectionTitle title={copy.rightsTitle} />
        <div className="grid four" style={{ marginTop: "1rem" }}>
          {localizedRights.map((right) => {
            const Icon = right.icon;
            return (
              <div className="card quiet-card" key={right.title} style={{ padding: "1.25rem", minHeight: "160px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ color: "var(--magenta)", display: "flex" }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>{right.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.45 }}>{right.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Knowledge Gaps & Content List split */}
      <div className="grid two balanced">
        <div className="panel stat-bars" style={{ padding: "1.5rem" }}>
          <SectionTitle title={copy.gapsTitle}>
            <BarChart3 size={18} color="#4a9e9d" />
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {analytics.slice(0, 4).map((row) => (
              <div className="bar-row" key={row.label}>
                <div className="section-title" style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.88rem" }}>
                  <strong>{analyticsLabel(row.label, language)}</strong>
                  <span className="small muted">{row.failures} {copy.gaps}</span>
                </div>
                <div className="bar-track" style={{ height: "8px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", background: "var(--teal, #4a9e9d)", width: `${Math.min(100, row.failures)}%`, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" style={{ padding: "1.5rem" }}>
          <SectionTitle title={copy.controlled}>
            <RadioTower size={18} color="#d12c89" />
          </SectionTitle>
          <div className="article-list" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
            {articles.slice(0, 4).map((article) => {
              const localizedArticle = articleCopy(article, language);
              return (
                <Link 
                  className="result-item" 
                  href={`/admin/articles/${article.id}`} 
                  key={article.id}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "8px", textDecoration: "none", color: "inherit" }}
                >
                  <div>
                    <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>{localizedArticle.title}</h3>
                    <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.82rem" }}>
                      {term(article.visibility, language)} · {article.channelVariants.map((channel) => term(channel, language)).join(", ")}
                    </p>
                  </div>
                  <span className="chip published" style={{ fontSize: "0.75rem" }}>{term(article.status, language)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LivePreviewPanel() {
  const { state } = useDemoKnowledge();
  return (
    <section className="preview-split">
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Live content preview</h2>
      <p className="muted" style={{ margin: "0.25rem 0 1.25rem", fontSize: "0.88rem" }}>Observe changes instantly across different audience views</p>
      <div className="preview-columns">
        <div className="preview-col">
          <span className="chip" style={{ background: "var(--blue, #1f3f77)", color: "white", width: "fit-content", padding: "4px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800 }}>
            Customer view
          </span>
          <h3 style={{ marginTop: "0.5rem" }}>{state.title}</h3>
          <p>{state.customerSummary}</p>
          <span className="small muted" style={{ fontSize: "0.78rem", marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "0.5rem" }}>Public answer only</span>
        </div>
        <div className="preview-col">
          <span className="chip magenta" style={{ background: "var(--magenta, #d12c89)", color: "white", width: "fit-content", padding: "4px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800 }}>
            Agent view
          </span>
          <h3 style={{ marginTop: "0.5rem" }}>{state.title}</h3>
          <p>{state.customerSummary}</p>
          <div className="internal-note">
            <LockKeyhole size={14} style={{ color: "var(--magenta, #d12c89)", flexShrink: 0, marginTop: "2px" }} />
            <p>{state.agentNote}</p>
          </div>
          <span className="small muted" style={{ fontSize: "0.78rem", marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "0.5rem" }}>Includes internal procedure</span>
        </div>
      </div>
      <p className="small muted" style={{ marginTop: "1rem", fontSize: "0.78rem", margin: "1rem 0 0" }}>
        Published: <strong>{state.publishedAt}</strong> · Version: <strong>{state.version}</strong>
      </p>
    </section>
  );
}
