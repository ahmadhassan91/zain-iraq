"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Bell, FileText, LockKeyhole, Pin, RadioTower, Users } from "lucide-react";
import { AppShell, SectionTitle, StatCard, useLanguage, type Language } from "@/components/AppChrome";
import { AdminWorkflowPanel, DemoPathNav } from "@/components/GuidedJourneys";
import { DemoImpactPanel, RoleLogin } from "@/components/JourneyDemo";
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
} satisfies Record<Language, Array<{ icon: typeof FileText; title: string; body: string }>>;

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
  const { language } = useLanguage();
  const copy = adminCopy[language];
  const localizedRights = rights[language];

  return (
    <>
      <DemoPathNav current="admin" />

      <section className="page-heading">
        <div>
          <span className="chip magenta">{copy.role}</span>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
        <Link className="btn primary" href="/admin/articles/roaming-activation">
          {copy.editor}
        </Link>
      </section>

      <section className="section">
        <DemoImpactPanel view="admin" />
      </section>

      <AdminWorkflowPanel />

      <section className="section">
        <div className="action-row">
          <Link className="btn" href="/admin/articles"><FileText size={16} /> {copy.articles}</Link>
          <Link className="btn" href="/admin/notifications"><Bell size={16} /> {copy.notifications}</Link>
          <Link className="btn" href="/admin/analytics"><BarChart3 size={16} /> {copy.analytics}</Link>
          <Link className="btn" href="/admin/groups"><Users size={16} /> {copy.groups}</Link>
        </div>
      </section>

      <section className="section">
        <div className="grid four">
          <StatCard label={copy.publishedContent} value="6" detail={copy.publishedDetail} />
          <StatCard label={copy.drafts} value="2" detail={copy.draftsDetail} />
          <StatCard label={copy.searchGaps} value="223" detail={copy.searchGapsDetail} />
          <StatCard label={copy.apiResponse} value="118ms" detail={copy.apiResponseDetail} />
        </div>
      </section>

      <section className="section">
        <SectionTitle title={copy.rightsTitle} />
        <div className="grid four">
          {localizedRights.map((right) => {
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
            <SectionTitle title={copy.gapsTitle}>
              <BarChart3 size={18} color="#4a9e9d" />
            </SectionTitle>
            {analytics.slice(0, 4).map((row) => (
              <div className="bar-row" key={row.label}>
                <div className="section-title">
                  <span>{analyticsLabel(row.label, language)}</span>
                  <span className="small">{row.failures} {copy.gaps}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.min(100, row.failures)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="panel">
            <SectionTitle title={copy.controlled}>
              <RadioTower size={18} color="#d12c89" />
            </SectionTitle>
            <div className="article-list">
              {articles.slice(0, 4).map((article) => {
                const localizedArticle = articleCopy(article, language);
                return (
                <Link className="result-item" href={`/admin/articles/${article.id}`} key={article.id}>
                  <div>
                    <h3>{localizedArticle.title}</h3>
                    <p className="muted">{term(article.visibility, language)} · {article.channelVariants.map((channel) => term(channel, language)).join(", ")}</p>
                  </div>
                  <span className="chip published">{term(article.status, language)}</span>
                </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
