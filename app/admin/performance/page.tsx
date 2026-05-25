"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Bot, 
  FileText, 
  ChevronDown, 
  HelpCircle,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Check
} from "lucide-react";
import { AppShell, useLanguage, type Language } from "@/components/AppChrome";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Multi-language copy localized for EN, AR, KU
const perfCopy = {
  EN: {
    backBtn: "Back to Overview",
    title: "Article Performance Analysis",
    subtitle: "Granular channel metrics, customer engagement drop-offs, and automated quality improvement recommendations.",
    articleLabel: "Analyzing Article",
    totalQueries: "Total Channel Queries",
    totalQueriesDesc: "Customer & Agent search impressions",
    helpfulness: "Average Helpfulness",
    helpfulnessDesc: "User helpful ratings this month",
    agentUsage: "Agent Workspace Usage",
    agentUsageDesc: "Cases resolved with this document",
    engagementTitle: "Section engagement & drop-off",
    engagementDesc: "Tracks where readers lose interest or drop out of the article sections.",
    quotesTitle: "Customer feedback verbatims",
    quotesDesc: "Real, unmodified comments submitted by Zain Iraq users.",
    recsTitle: "AI-generated improvement recommendations",
    recsDesc: "Automated content enhancements derived from failed search context and user feedback.",
    relatedTitle: "Related category performance comparison",
    relatedDesc: "How this article compares to other active documents in the Roaming category.",
    viewTrend: "30-day view & helpfulness trend",
    ratingLabel: "Rating",
    sec1: "1. Overview & Partner Selection",
    sec2: "2. Subscription Codes & Pricing Table",
    sec3: "3. How to Avoid Accidental Charges",
    sec4: "4. Handset Settings & Troubleshooting",
    relColTitle: "Article Title",
    relColViews: "Total Views",
    relColSat: "Helpfulness",
    viewsLabel: "views",
    actionApply: "Apply Enhancement",
    actionApplied: "Enhancement Applied",
    criticalLabel: "CRITICAL",
    highLabel: "HIGH",
    suggestionLabel: "SUGGESTION"
  },
  AR: {
    backBtn: "العودة إلى الحوكمة",
    title: "تحليل أداء المقال",
    subtitle: "مقاييس تفصيلية للقنوات، فترات توقف تفاعل العملاء، وتوصيات تحسين الجودة المؤتمتة.",
    articleLabel: "المقال الخاضع للتحليل",
    totalQueries: "إجمالي استفسارات القناة",
    totalQueriesDesc: "انطباعات بحث العملاء والوكلاء",
    helpfulness: "معدل الفائدة والرضا",
    helpfulnessDesc: "تقييمات مفيدة من المستخدمين هذا الشهر",
    agentUsage: "الاستخدام في مساحة الوكيل",
    agentUsageDesc: "الحالات التي تم حلها باستخدام هذا المستند",
    engagementTitle: "التفاعل مع الأقسام ونقاط التوقف",
    engagementDesc: "يتتبع الأقسام التي يفقد فيها القراء الاهتمام أو يتوقفون عن القراءة.",
    quotesTitle: "آراء وتعليقات العملاء الحرفية",
    quotesDesc: "تعليقات حقيقية وغير معدلة تم تقديمها من مستخدمي زين العراق.",
    recsTitle: "توصيات التحسين المقترحة من الذكاء الاصطناعي",
    recsDesc: "تحسينات تلقائية للمحتوى مستمدة من سياق البحث الفاشل وملاحظات المستخدمين.",
    relatedTitle: "مقارنة الأداء بالفئة ذات الصلة",
    relatedDesc: "كيف يتقاطع أداء هذا المقال مع المستندات النشطة الأخرى في فئة التجوال.",
    viewTrend: "اتجاه المشاهدات ومعدل الرضا خلال 30 يومًا",
    ratingLabel: "التقييم",
    sec1: "1. نظرة عامة واختيار شبكة الشريك",
    sec2: "2. رموز الاشتراك وجدول الأسعار",
    sec3: "3. كيفية تجنب الرسوم العرضية",
    sec4: "4. إعدادات الهاتف واستكشاف الأعطال",
    relColTitle: "عنوان المقال",
    relColViews: "إجمالي المشاهدات",
    relColSat: "معدل الرضا",
    viewsLabel: "مشاهدة",
    actionApply: "تطبيق التحسين",
    actionApplied: "تم تطبيق التحسين",
    criticalLabel: "حرج",
    highLabel: "مرتفع",
    suggestionLabel: "اقتراح"
  },
  KU: {
    backBtn: "گەڕانەوە بۆ حوکمرانی",
    title: "شیکاری ئەدای بابەت",
    subtitle: "پێوەرە وردەکانی کەناڵ، کەلێنی بەشداربووان، و پێشنیارە ئۆتۆماتیکییەکان بۆ باشترکردنی کوالیتی.",
    articleLabel: "بابەتی ژێر شیکاری",
    totalQueries: "کۆی گشتی پرسیارەکان",
    totalQueriesDesc: "گەڕانەکانی کڕیار و ئەجێنت",
    helpfulness: "تێکڕای یارمەتیدەربوون",
    helpfulnessDesc: "ڕێژەی یارمەتیدەربوون لەلایەن کڕیار لەم مانگەدا",
    agentUsage: "بەکارھێنان لە شوێنی کاری ئەجێنت",
    agentUsageDesc: "چارەسەری کەیسەکان بە بەکارهێنانی ئەم بەڵگەنامەیە",
    engagementTitle: "تێوەگڵانی بەشەکان و دابەزینی بینەر",
    engagementDesc: "چاودێری دەکات لە کام بەشەدا خوێنەران گرنگی نادەن یان واز لە خوێندنەوە دەهێنن.",
    quotesTitle: "بۆچوونی ڕاستەقینەی کڕیارەکان",
    quotesDesc: "تێبینییە ڕاستەقینە و بێ گۆڕانکارییەکانی بەشداربووانی زەین عێراق.",
    recsTitle: "پێشنیارەکانی AI بۆ باشترکردنی بابەتەکە",
    recsDesc: "باشترکردنی ناوەڕۆک بە شێوەیەکی ئۆتۆماتیکی لە سياقی گەڕانی سەرنەکەوتوو و تێبینی کڕیارەوە.",
    relatedTitle: "بەراوردکردنی ئەدا لەگەڵ هاوپۆلەکانی",
    relatedDesc: "چۆن ئەم بابەتە بەراورد دەکرێت لەگەڵ بابەتە چالاکەکانی تری پۆلی ڕۆمینگ.",
    viewTrend: "ڕەوتی بینین و ڕێژەی یارمەتیدەربوون لە ٣٠ ڕۆژدا",
    ratingLabel: "پێشاندانی کوالیتی",
    sec1: "١. تێڕوانینی گشتی و هەڵبژاردنی هاوبەش",
    sec2: "٢. کۆدی بەشداریکردن و خشتەی نرخ",
    sec3: "٣. چۆن خۆمان لە پارەی زیادە بپارێزین",
    sec4: "٤. ڕێکخستنی مۆبایل و چارەسەری کێشەکان",
    relColTitle: "ناونیشانی بابەت",
    relColViews: "کۆی گشتی بینین",
    relColSat: "ڕێژەی یارمەتیدەربوون",
    viewsLabel: "بینین",
    actionApply: "جێبەجێکردنی پێشنیار",
    actionApplied: "پێشنیارەکە جێبەجێ کرا",
    criticalLabel: "گرنگ",
    highLabel: "بەرز",
    suggestionLabel: "پێشنیار"
  }
} satisfies Record<Language, Record<string, string>>;

// Mock data for Recharts (30-day views and helpfulness percentages)
const chartData = [
  { day: "May 01", views: 24, helpfulness: 80 },
  { day: "May 02", views: 28, helpfulness: 81 },
  { day: "May 03", views: 20, helpfulness: 81 },
  { day: "May 04", views: 32, helpfulness: 79 },
  { day: "May 05", views: 40, helpfulness: 80 },
  { day: "May 06", views: 35, helpfulness: 82 },
  { day: "May 07", views: 45, helpfulness: 83 },
  { day: "May 08", views: 50, helpfulness: 84 },
  { day: "May 09", views: 42, helpfulness: 82 },
  { day: "May 10", views: 30, helpfulness: 83 },
  { day: "May 11", views: 38, helpfulness: 83 },
  { day: "May 12", views: 44, helpfulness: 84 },
  { day: "May 13", views: 48, helpfulness: 84 },
  { day: "May 14", views: 52, helpfulness: 85 },
  { day: "May 15", views: 41, helpfulness: 83 },
  { day: "May 16", views: 35, helpfulness: 84 },
  { day: "May 17", views: 43, helpfulness: 85 },
  { day: "May 18", views: 47, helpfulness: 85 },
  { day: "May 19", views: 55, helpfulness: 86 },
  { day: "May 20", views: 60, helpfulness: 87 },
  { day: "May 21", views: 49, helpfulness: 85 },
  { day: "May 22", views: 39, helpfulness: 84 },
  { day: "May 23", views: 46, helpfulness: 85 },
  { day: "May 24", views: 50, helpfulness: 86 },
  { day: "May 25", views: 47, helpfulness: 85 }
];

export default function ArticlePerformancePage() {
  return (
    <AppShell active="Admin Dashboard">
      <ArticlePerformanceContent />
    </AppShell>
  );
}

function ArticlePerformanceContent() {
  const { language } = useLanguage();
  const copy = perfCopy[language];
  const [mounted, setMounted] = useState(false);

  // Prevention of SSR hydration discrepancies in Recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Section engagement breakdown (dropoff details)
  const dropoffs = [
    { title: copy.sec1, percent: 100, views: 47, color: "var(--teal)" },
    { title: copy.sec2, percent: 75, views: 35, color: "var(--violet)" },
    { title: copy.sec3, percent: 45, views: 21, color: "var(--magenta)" },
    { title: copy.sec4, percent: 20, views: 9, color: "#e74c3c" }
  ];

  // Feedback verbatims
  const verbatims = [
    { text: "Detailed prices but troubleshooting steps are hard to follow", rating: "3 / 5", date: "May 24" },
    { text: "Helped me activate roaming easily!", rating: "5 / 5", date: "May 22" },
    { text: "Could not find partners in Izmir", rating: "2 / 5", date: "May 18" },
    { text: "Clear roaming table, thanks", rating: "4 / 5", date: "May 15" }
  ];

  // AI Recommendations
  const [appliedRecommendations, setAppliedRecommendations] = useState<Record<string, boolean>>({});

  const recommendations = [
    { 
      id: "rec-1", 
      type: copy.criticalLabel, 
      color: "#e74c3c", 
      text: "Add 5G section", 
      reason: "3 customer queries flagged this week specifically searching for high-speed partner access in Istanbul." 
    },
    { 
      id: "rec-2", 
      type: copy.highLabel, 
      color: "#e67e22", 
      text: "Include troubleshooting steps", 
      reason: "Engagement drop-off at Section 4 is currently high at 80% loss. Adding a direct code restart workflow is recommended." 
    },
    { 
      id: "rec-3", 
      type: copy.suggestionLabel, 
      color: "var(--teal)", 
      text: "Add coverage map", 
      reason: "2 feedback comments highlighted missing information regarding partner network locations in coastal cities." 
    }
  ];

  const handleApplyRecommendation = (id: string) => {
    setAppliedRecommendations(prev => ({ ...prev, [id]: true }));
  };

  // Related category performance
  const relatedArticles = [
    { title: "Roaming partner network advisory", views: 420, helpfulness: "88%", isCurrent: false },
    { title: "Understanding Roaming in Turkey", views: 1842, helpfulness: "85%", isCurrent: true },
    { title: "International calls and roaming pricing catalog", views: 940, helpfulness: "76%", isCurrent: false }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "3rem" }}>
      
      {/* Navigation and Back Link */}
      <div>
        <Link 
          href="/admin"
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "6px", 
            fontSize: "12px", 
            fontWeight: "bold",
            color: "var(--muted)", 
            textDecoration: "none",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          <ArrowLeft size={14} /> {copy.backBtn}
        </Link>

        {/* Header Block */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text)" }}>
              {copy.title}
            </h1>
            <p className="muted" style={{ margin: 0, fontSize: "0.95rem", color: "var(--muted)", maxWidth: "800px" }}>
              {copy.subtitle}
            </p>
          </div>

          {/* Locked Selection Dropdown */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "10px 16px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px"
          }}>
            <span style={{ color: "var(--muted)", fontWeight: "bold" }}>{copy.articleLabel}:</span>
            <strong style={{ color: "var(--text)" }}>Understanding Roaming in Turkey</strong>
            <ChevronDown size={14} color="var(--muted)" />
          </div>
        </div>
      </div>

      {/* 3 Metrics Row (Total Queries, Helpfulness, Agent Usage) */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
        gap: "1rem" 
      }}>
        {/* Metric 1 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.5rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.totalQueries}
          </span>
          <strong style={{ fontSize: "2.5rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            47
          </strong>
          <p className="muted" style={{ fontSize: "12px", color: "var(--muted)", margin: "0.5rem 0 0" }}>
            {copy.totalQueriesDesc}
          </p>
        </div>

        {/* Metric 2 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.5rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.helpfulness}
          </span>
          <strong style={{ fontSize: "2.5rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            85%
          </strong>
          <p className="muted" style={{ fontSize: "12px", color: "var(--muted)", margin: "0.5rem 0 0" }}>
            {copy.helpfulnessDesc}
          </p>
        </div>

        {/* Metric 3 (Inverted dark card, strictly black/zinc background per Stitch spec) */}
        <div style={{ 
          background: "#1a1a1a", 
          color: "#ffffff",
          border: "1px solid #2d2d2d", 
          padding: "1.5rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#999999", display: "block", marginBottom: "0.5rem" }}>
            {copy.agentUsage}
          </span>
          <strong style={{ fontSize: "2.5rem", fontWeight: 800, display: "block", color: "#ffffff", lineHeight: 1 }}>
            12
          </strong>
          <p style={{ fontSize: "12px", color: "#cccccc", margin: "0.5rem 0 0" }}>
            {copy.agentUsageDesc}
          </p>
        </div>
      </div>

      {/* 30-Day Trend Chart Card */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "1.5rem",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
            {copy.viewTrend}
          </h2>
          <TrendingUp size={18} color="var(--magenta)" />
        </div>

        <div style={{ height: "300px", width: "100%", position: "relative" }}>
          {!mounted ? (
            <div style={{
              height: "100%",
              width: "100%",
              background: "var(--surface-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              color: "var(--muted)"
            }}>
              Loading Analytics Data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--magenta)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--magenta)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHelpful" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--teal)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--teal)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subpixel, #eeeeee)" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "var(--muted)", fontSize: 10 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "var(--muted)", fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    borderRadius: "4px",
                    boxShadow: "none",
                    fontSize: "12px",
                    color: "var(--text)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="var(--magenta)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  name="Views"
                />
                <Area 
                  type="monotone" 
                  dataKey="helpfulness" 
                  stroke="var(--teal)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorHelpful)" 
                  name="Helpfulness %"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Grid: Engagement Dropoff & Customer Verbatims */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Section-Level Engagement Breakdown */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.engagementTitle}
            </h2>
            <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.82rem" }}>
              {copy.engagementDesc}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "0.5rem" }}>
            {dropoffs.map((item, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                  <strong style={{ color: "var(--text)" }}>{item.title}</strong>
                  <span style={{ color: "var(--muted)", fontWeight: "bold" }}>
                    {item.percent}% ({item.views} {copy.viewsLabel})
                  </span>
                </div>
                
                {/* Flat Progress Bar Track */}
                <div style={{ 
                  width: "100%", 
                  background: "var(--surface-soft)", 
                  height: "8px", 
                  borderRadius: "4px", 
                  overflow: "hidden",
                  border: "1px solid var(--border)"
                }}>
                  <div style={{ 
                    width: `${item.percent}%`, 
                    background: item.color, 
                    height: "100%", 
                    borderRadius: "4px"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Feedback Verbatim Quotes */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.quotesTitle}
            </h2>
            <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.82rem" }}>
              {copy.quotesDesc}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {verbatims.map((v, index) => (
              <div 
                key={index}
                style={{
                  padding: "1rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "2px 6px",
                    borderRadius: "2px",
                    color: "var(--text)"
                  }}>
                    {copy.ratingLabel}: {v.rating}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>{v.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.45, color: "var(--text)" }}>
                  &ldquo;{v.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI-Generated Improvement Recommendations Box */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "1.5rem",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Bot size={22} color="var(--magenta)" />
          <div>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.recsTitle}
            </h2>
            <p className="muted" style={{ margin: "0.15rem 0 0", fontSize: "0.82rem" }}>
              {copy.recsDesc}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderInlineStart: `4px solid ${rec.color}`,
                borderRadius: "4px",
                background: "var(--surface-soft)",
                gap: "1.5rem",
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1, minWidth: "260px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ 
                    fontSize: "9px", 
                    fontWeight: 800, 
                    color: "#ffffff", 
                    background: rec.color, 
                    padding: "2px 6px",
                    borderRadius: "2px"
                  }}>
                    {rec.type}
                  </span>
                  <strong style={{ fontSize: "1rem", color: "var(--text)" }}>{rec.text}</strong>
                </div>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", lineHeight: 1.45, color: "var(--muted)" }}>
                  {rec.reason}
                </p>
              </div>

              <div>
                {appliedRecommendations[rec.id] ? (
                  <span style={{ 
                    fontSize: "12px", 
                    color: "#2ecc71", 
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "6px 12px",
                    border: "1px solid #2ecc71",
                    borderRadius: "2px",
                    background: "#f4fdf7"
                  }}>
                    <Check size={14} /> {copy.actionApplied}
                  </span>
                ) : (
                  <button 
                    onClick={() => handleApplyRecommendation(rec.id)}
                    style={{
                      background: "var(--text)",
                      color: "var(--surface)",
                      border: "none",
                      padding: "8px 14px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <Lightbulb size={14} /> {copy.actionApply}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Category Comparison Table Card */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "1.5rem",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem"
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
            {copy.relatedTitle}
          </h2>
          <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.82rem" }}>
            {copy.relatedDesc}
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                <th style={{ padding: "10px 8px", fontWeight: 700 }}>{copy.relColTitle}</th>
                <th style={{ padding: "10px 8px", fontWeight: 700, textAlign: "right" }}>{copy.relColViews}</th>
                <th style={{ padding: "10px 8px", fontWeight: 700, textAlign: "right" }}>{copy.relColSat}</th>
              </tr>
            </thead>
            <tbody>
              {relatedArticles.map((row) => (
                <tr 
                  key={row.title} 
                  style={{ 
                    borderBottom: "1px solid var(--border)",
                    background: row.isCurrent ? "var(--magenta-soft)" : "transparent",
                    fontWeight: row.isCurrent ? "bold" : "normal"
                  }}
                >
                  <td style={{ padding: "12px 8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText size={16} color={row.isCurrent ? "var(--magenta)" : "var(--muted)"} />
                    <span style={{ color: "var(--text)" }}>{row.title}</span>
                    {row.isCurrent && (
                      <span style={{
                        fontSize: "9px",
                        background: "var(--magenta)",
                        color: "#ffffff",
                        padding: "1px 4px",
                        borderRadius: "2px",
                        fontWeight: 800
                      }}>
                        ACTIVE
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", color: "var(--text)" }}>
                    {row.views.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", color: "#2ecc71", fontWeight: "bold" }}>
                    {row.helpfulness}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
