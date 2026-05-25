"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  BarChart3, 
  Bell, 
  FileText, 
  LockKeyhole, 
  Pin, 
  RadioTower, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info
} from "lucide-react";
import { AppShell, useLanguage, type Language } from "@/components/AppChrome";
import { AdminWorkflowPanel } from "@/components/GuidedJourneys";
import { useDemoKnowledge } from "@/lib/demo-state";

// Multi-language copy localized for EN, AR, KU
const adminCopy = {
  EN: {
    role: "Admin Portal",
    title: "Governance Overview",
    subtitle: "Centralized command center for knowledge management, analytics, and quality control.",
    heroTitle: "Operational Impact & Savings",
    heroText: "Zain Iraq Knowledge Base PoC metrics for this month",
    resolvedQueries: "customer queries resolved",
    costSaved: "saved in support costs",
    hoursSaved: "agent hours saved",
    momGrowth: "growth MoM",
    kpiQueries: "Total Queries",
    kpiSatisfaction: "Customer Satisfaction",
    kpiViews: "Article Views",
    kpiGaps: "Knowledge Gaps",
    topArticles: "Top Performing Articles",
    knowledgeGaps: "Active Knowledge Gaps",
    agentPerformance: "Agent Team Performance",
    liveActivity: "Live Governance Feed",
    viewsLabel: "views",
    helpfulLabel: "helpful",
    remediateBtn: "Remediate Gap",
    remediatedSuccess: "Marked gap for remediation",
    analyzeBtn: "Analyze Performance",
    livePreview: "Live Content Preview",
    livePreviewDesc: "Observe how source changes dynamically update public and agent channels in real-time.",
    customerChannel: "Customer Channel",
    agentChannel: "Agent Workspace Channel",
    publicNote: "Public approved self-service answer",
    internalProcedure: "Internal restricted procedure",
    published: "Published",
    version: "Version",
    lastUpdated: "Last updated",
    agentHeader: "Agent Name",
    groupHeader: "Skill Group",
    satHeader: "Satisfaction",
    avgTimeHeader: "Avg Handling",
    casesHeader: "Cases",
    searchesLabel: "searches"
  },
  AR: {
    role: "بوابة المسؤول",
    title: "نظرة عامة على الحوكمة",
    subtitle: "مركز القيادة المركزي لإدارة المعرفة والتحليلات ومراقبة الجودة.",
    heroTitle: "الأثر التشغيلي والوفورات",
    heroText: "مقاييس قاعدة معرفة زين العراق لهذا الشهر",
    resolvedQueries: "استفسارًا تم حله",
    costSaved: "تم توفيرها من تكاليف الدعم",
    hoursSaved: "ساعة عمل للوكلاء تم توفيرها",
    momGrowth: "نمو تشغيلي",
    kpiQueries: "إجمالي الاستفسارات",
    kpiSatisfaction: "رضا العملاء",
    kpiViews: "مشاهدات المقالات",
    kpiGaps: "فجوات المعرفة",
    topArticles: "المقالات الأكثر أداءً",
    knowledgeGaps: "فجوات المعرفة النشطة",
    agentPerformance: "أداء فريق الوكلاء",
    liveActivity: "سجل حوكمة المعرفة المباشر",
    viewsLabel: "مشاهدة",
    helpfulLabel: "مفيدة",
    remediateBtn: "معالجة الفجوة",
    remediatedSuccess: "تم تحديد الفجوة للمعالجة",
    analyzeBtn: "تحليل الأداء",
    livePreview: "المعاينة الحية للمحتوى",
    livePreviewDesc: "راقب كيف تؤدي تغييرات المصدر إلى تحديث قنوات العملاء والوكلاء في الوقت الفعلي.",
    customerChannel: "قناة العميل",
    agentChannel: "قناة مساحة الوكيل",
    publicNote: "الإجابة العامة المعتمدة للخدمة الذاتية",
    internalProcedure: "الإجراء الداخلي المقيد للوكيل",
    published: "تم النشر",
    version: "النسخة",
    lastUpdated: "آخر تحديث",
    agentHeader: "اسم الوكيل",
    groupHeader: "مجموعة المهارة",
    satHeader: "معدل الرضا",
    avgTimeHeader: "متوسط وقت المعاملة",
    casesHeader: "الحالات",
    searchesLabel: "بحث"
  },
  KU: {
    role: "بۆردی بەڕێوەبەر",
    title: "تێڕوانینی گشتی حوکمرانی",
    subtitle: "ناوەندی سەرەکی کۆنترۆڵ بۆ بەڕێوەبردنی زانیاری، شیکاری و کوالیتی.",
    heroTitle: "کاریگەری ئۆپەراسیۆن و پاشەکەوتکردن",
    heroText: "پێوەرەکانی بنکەی زانیاری زەین عێراق بۆ ئەم مانگە",
    resolvedQueries: "پرسیاری کڕیاران چارەسەرکراون",
    costSaved: "لە تێچووی پشتگیری پاشەکەوت کراوە",
    hoursSaved: "کاتژمێری کاری ئەجێنت پاشەکەوت کراوە",
    momGrowth: "گەشەکردنی MoM",
    kpiQueries: "کۆی گشتی گەڕانەکان",
    kpiSatisfaction: "ڕەزامەندی کڕیار",
    kpiViews: "بینینی بابەتەکان",
    kpiGaps: "کەلێنەکانی زانیاری",
    topArticles: "بابەتە هەرە سەرکەوتووەکان",
    knowledgeGaps: "کەلێنە چالاکەکانی زانیاری",
    agentPerformance: "ئەدای تیمی ئەجێنتەکان",
    liveActivity: "تۆماری حوکمرانی ناوەڕۆکی ڕاستەوخۆ",
    viewsLabel: "بینین",
    helpfulLabel: "یارمەتیدەرە",
    remediateBtn: "چارەسەری کەلێن",
    remediatedSuccess: "کەلێنەکە نیشان کرا بۆ چارەسەرکردن",
    analyzeBtn: "شیکاری ئەدا",
    livePreview: "پێشبینینی ناوەڕۆکی ڕاستەوخۆ",
    livePreviewDesc: "چاودێری بکە چۆن گۆڕانکاری لە سەرچاوەکاندا بە شێوەیەکی داینامیکی قاڵبەکانی کڕیار و ئەجێنت نوێ دەکاتەوە.",
    customerChannel: "کەناڵی کڕیار",
    agentChannel: "کەناڵی شوێنی کاری ئەجێنت",
    publicNote: "وەڵامی پەسەندکراوی گشتی کڕیاران",
    internalProcedure: "ڕێکاری ناوخۆیی سنووردارکراوی ئەجێنت",
    published: "بڵاوکراوەتەوە",
    version: "وەشان",
    lastUpdated: "دواین نوێکاری",
    agentHeader: "ناوی ئەجێنت",
    groupHeader: "گرووپی شارەزایی",
    satHeader: "ڕەزامەندی",
    avgTimeHeader: "تێکڕای چارەسەر",
    casesHeader: "حاڵەتەکان",
    searchesLabel: "گەڕانەکان"
  }
} satisfies Record<Language, Record<string, string>>;

export default function AdminPage() {
  return (
    <AppShell active="Admin Dashboard">
      <AdminOverviewContent />
    </AppShell>
  );
}

function AdminOverviewContent() {
  const { language } = useLanguage();
  const copy = adminCopy[language];
  const { state } = useDemoKnowledge();

  // Localized Gaps Data (as defined in the specifications)
  const gapsData = [
    { id: "gap-1", label: "Family plans", count: 15, query: "family shared bundles" },
    { id: "gap-2", label: "Syria roaming", count: 8, query: "syria partner network data" },
    { id: "gap-3", label: "5G activation", count: 6, query: "activate 5g on compatible devices" },
    { id: "gap-4", label: "Lebanon coverage", count: 5, query: "lebanon partner operators tariff" }
  ];

  // Top Articles
  const topArticles = [
    { id: "roaming-activation", title: "Understanding Roaming in Turkey", views: 1842, helpfulness: "85%" },
    { id: "sim-replacement", title: "eSIM and SIM replacement support", views: 1298, helpfulness: "84%" },
    { id: "super-card", title: "Super Card bundle support", views: 1190, helpfulness: "80%" },
    { id: "app-login", title: "MyZain app and self-service access", views: 1014, helpfulness: "79%" }
  ];

  // Agent Performance Data
  const agentPerformance = [
    { name: "Lana Saeed", group: "Roaming Desk", sat: "95%", time: "2.5 min", cases: 186 },
    { name: "Sara Hassan", group: "Consumer Care", sat: "92%", time: "4.2 min", cases: 128 },
    { name: "Omar Kareem", group: "Technical Support", sat: "88%", time: "3.8 min", cases: 94 },
    { name: "Mina Yousif", group: "Digital Care", sat: "86%", time: "4.5 min", cases: 210 }
  ];

  // Activity Feed Data
  const activities = [
    { time: "14:32", text: "Layla Ahmed updated draft: 'MyZain App Login Guide v2'" },
    { time: "12:15", text: "Knowledge Gap flagged: 'Lebanon coverage' (5 failed searches)" },
    { time: "10:45", text: "User feedback on 'SIM Replacement' marked as unhelpful" },
    { time: "09:12", text: "System auto-archived obsolete document: 'Old Roaming rates 2025'" }
  ];

  // Local state for gap alerts
  const [remediatedGaps, setRemediatedGaps] = useState<Record<string, boolean>>({});

  const handleRemediate = (id: string) => {
    setRemediatedGaps(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "3rem" }}>
      
      {/* Title & Subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <span style={{ 
          fontSize: "11px", 
          textTransform: "uppercase", 
          letterSpacing: "0.1em", 
          color: "var(--muted)", 
          fontWeight: 700 
        }}>
          {copy.role}
        </span>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text)" }}>
          {copy.title}
        </h1>
        <p className="muted" style={{ margin: 0, fontSize: "0.95rem", color: "var(--muted)" }}>
          {copy.subtitle}
        </p>
      </div>

      {/* Dark Hero Stats Banner (847 queries, $63.5k saved, 23% growth) */}
      <div style={{
        background: "#1a1a1a",
        color: "#ffffff",
        padding: "2rem",
        borderRadius: "4px",
        border: "1px solid #2d2d2d",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        boxShadow: "none"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#999999" }}>
              {copy.heroTitle}
            </span>
            <span style={{ fontSize: "0.85rem", color: "#cccccc" }}>
              {copy.heroText}
            </span>
          </div>
          {/* MoM Growth badge */}
          <div style={{
            background: "#2ecc71",
            color: "#ffffff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}>
            <TrendingUp size={14} />
            <span>↑ 23% {copy.momGrowth}</span>
          </div>
        </div>

        {/* 3 Main Highlight metrics */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "2rem",
          borderTop: "1px solid #333333",
          paddingTop: "1.5rem"
        }}>
          <div>
            <span style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#ffffff", lineHeight: 1.1 }}>
              847
            </span>
            <span style={{ fontSize: "0.85rem", color: "#aaaaaa" }}>
              {copy.resolvedQueries}
            </span>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#ffffff", lineHeight: 1.1 }}>
              $63,500
            </span>
            <span style={{ fontSize: "0.85rem", color: "#aaaaaa" }}>
              {copy.costSaved}
            </span>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#ffffff", lineHeight: 1.1 }}>
              4,235
            </span>
            <span style={{ fontSize: "0.85rem", color: "#aaaaaa" }}>
              {copy.hoursSaved}
            </span>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "1rem" 
      }}>
        {/* KPI 1 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.25rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.kpiQueries}
          </span>
          <strong style={{ fontSize: "2rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            847
          </strong>
          <span style={{ fontSize: "12px", color: "#2ecc71", display: "flex", alignItems: "center", gap: "2px", marginTop: "0.5rem" }}>
            <TrendingUp size={12} /> +12% MoM
          </span>
        </div>

        {/* KPI 2 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.25rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.kpiSatisfaction}
          </span>
          <strong style={{ fontSize: "2rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            83%
          </strong>
          <span style={{ fontSize: "12px", color: "#2ecc71", display: "flex", alignItems: "center", gap: "2px", marginTop: "0.5rem" }}>
            <TrendingUp size={12} /> +1.8% vs target
          </span>
        </div>

        {/* KPI 3 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.25rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.kpiViews}
          </span>
          <strong style={{ fontSize: "2rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            12,340
          </strong>
          <span style={{ fontSize: "12px", color: "#2ecc71", display: "flex", alignItems: "center", gap: "2px", marginTop: "0.5rem" }}>
            <TrendingUp size={12} /> +15.4% searches
          </span>
        </div>

        {/* KPI 4 */}
        <div style={{ 
          background: "var(--surface)", 
          border: "1px solid var(--border)", 
          padding: "1.25rem", 
          borderRadius: "4px" 
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "0.5rem" }}>
            {copy.kpiGaps}
          </span>
          <strong style={{ fontSize: "2rem", fontWeight: 800, display: "block", color: "var(--text)", lineHeight: 1 }}>
            45
          </strong>
          <span style={{ fontSize: "12px", color: "#e67e22", display: "flex", alignItems: "center", gap: "2px", marginTop: "0.5rem" }}>
            <AlertTriangle size={12} /> 4 critical issues
          </span>
        </div>
      </div>

      {/* Main Grid: Articles vs Gaps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Top Performing Articles Panel */}
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
              {copy.topArticles}
            </h2>
            <FileText size={18} color="var(--magenta)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {topArticles.map((article, index) => (
              <div 
                key={article.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface-soft)",
                  gap: "0.5rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: "bold" }}>#{index + 1}</span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text)" }}>{article.title}</strong>
                  </div>
                  <span style={{ 
                    fontSize: "11px", 
                    background: "var(--magenta-soft)", 
                    color: "var(--magenta)", 
                    padding: "2px 6px", 
                    borderRadius: "2px",
                    fontWeight: 700
                  }}>
                    {article.helpfulness} {copy.helpfulLabel}
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {article.views.toLocaleString()} {copy.viewsLabel}
                  </span>

                  {/* Drill-down Link for Roaming in Turkey */}
                  {article.id === "roaming-activation" ? (
                    <Link 
                      href="/admin/performance"
                      style={{
                        fontSize: "11px",
                        color: "var(--magenta)",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px"
                      }}
                    >
                      {copy.analyzeBtn} <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "capitalize" }}>
                      Active KB
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Gaps Warning Callouts Panel */}
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
              {copy.knowledgeGaps}
            </h2>
            <AlertTriangle size={18} color="#e67e22" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {gapsData.map((gap) => (
              <div 
                key={gap.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                  border: "1px solid #e67e22",
                  borderRadius: "4px",
                  background: remediatedGaps[gap.id] ? "#f4fdf7" : "#fffaf0",
                  borderColor: remediatedGaps[gap.id] ? "#2ecc71" : "#e67e22",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <strong style={{ fontSize: "0.95rem", color: remediatedGaps[gap.id] ? "#27ae60" : "#d35400" }}>
                    {gap.label}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                  &ldquo;{gap.query}&rdquo; · <strong>{gap.count} {copy.searchesLabel}</strong>
                  </span>
                </div>

                <div>
                  {remediatedGaps[gap.id] ? (
                    <span style={{ 
                      fontSize: "11px", 
                      color: "#27ae60", 
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px"
                    }}>
                      <CheckCircle2 size={12} /> OK
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleRemediate(gap.id)}
                      style={{
                        background: "#e67e22",
                        color: "#ffffff",
                        border: "none",
                        padding: "6px 12px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        cursor: "pointer"
                      }}
                    >
                      {copy.remediateBtn}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split-Screen Live Preview Panel */}
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
          <div>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.livePreview}
            </h2>
            <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.85rem" }}>
              {copy.livePreviewDesc}
            </p>
          </div>
          <RadioTower size={18} color="var(--magenta)" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          {/* Customer View */}
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "1.25rem",
            background: "var(--surface-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            position: "relative"
          }}>
            <span style={{
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
              background: "#1f3f77",
              color: "#ffffff",
              padding: "2px 6px",
              borderRadius: "2px",
              alignSelf: "flex-start"
            }}>
              {copy.customerChannel}
            </span>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
              {state.title}
            </h3>
            <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text)" }}>
              {state.customerSummary}
            </p>
            <span style={{ 
              fontSize: "11px", 
              color: "var(--muted)", 
              marginTop: "auto", 
              borderTop: "1px solid var(--border)", 
              paddingTop: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <Info size={12} style={{ flexShrink: 0 }} /> {copy.publicNote}
            </span>
          </div>

          {/* Agent View */}
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "1.25rem",
            background: "var(--surface-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            position: "relative"
          }}>
            <span style={{
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
              background: "var(--magenta)",
              color: "#ffffff",
              padding: "2px 6px",
              borderRadius: "2px",
              alignSelf: "flex-start"
            }}>
              {copy.agentChannel}
            </span>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
              {state.title}
            </h3>
            <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text)", marginBottom: "0.5rem" }}>
              {state.customerSummary}
            </p>
            
            {/* Restricted Internal Note */}
            <div style={{
              background: "var(--magenta-soft)",
              borderInlineStart: "3px solid var(--magenta)",
              padding: "8px 12px",
              borderRadius: "2px",
              fontSize: "0.82rem",
              lineHeight: 1.45,
              color: "var(--text)",
              display: "flex",
              gap: "6px",
              alignItems: "flex-start"
            }}>
              <LockKeyhole size={14} style={{ color: "var(--magenta)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>Restricted Agent Note:</strong> {state.agentNote}
              </div>
            </div>

            <span style={{ 
              fontSize: "11px", 
              color: "var(--muted)", 
              marginTop: "auto", 
              borderTop: "1px solid var(--border)", 
              paddingTop: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <LockKeyhole size={12} style={{ flexShrink: 0 }} /> {copy.internalProcedure}
            </span>
          </div>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          fontSize: "12px", 
          color: "var(--muted)",
          borderTop: "1px solid var(--border)",
          paddingTop: "0.75rem",
          marginTop: "0.5rem"
        }}>
          <span>
            {copy.published}: <strong>{state.publishedAt}</strong>
          </span>
          <span>
            {copy.version}: <strong>{state.version}</strong>
          </span>
        </div>
      </div>

      {/* Governance & Publish Cause-and-Effect Panel */}
      <AdminWorkflowPanel />

      {/* Row: Agent Team Performance & Activity Log */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Agent Performance Table */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.agentPerformance}
            </h2>
            <Users size={18} color="var(--magenta)" />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  <th style={{ padding: "8px 4px", fontWeight: 700 }}>{copy.agentHeader}</th>
                  <th style={{ padding: "8px 4px", fontWeight: 700 }}>{copy.groupHeader}</th>
                  <th style={{ padding: "8px 4px", fontWeight: 700, textAlign: "right" }}>{copy.satHeader}</th>
                  <th style={{ padding: "8px 4px", fontWeight: 700, textAlign: "right" }}>{copy.avgTimeHeader}</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent) => (
                  <tr key={agent.name} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 4px", fontWeight: 700, color: "var(--text)" }}>{agent.name}</td>
                    <td style={{ padding: "10px 4px", color: "var(--muted)" }}>{agent.group}</td>
                    <td style={{ padding: "10px 4px", color: "#2ecc71", fontWeight: "bold", textAlign: "right" }}>{agent.sat}</td>
                    <td style={{ padding: "10px 4px", color: "var(--text)", textAlign: "right" }}>{agent.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Log */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {copy.liveActivity}
            </h2>
            <Bell size={18} color="var(--magenta)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {activities.map((act, index) => (
              <div 
                key={index}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                  borderBottom: index < activities.length - 1 ? "1px solid var(--border-subpixel, #eeeeee)" : "none",
                  paddingBottom: index < activities.length - 1 ? "0.75rem" : "0"
                }}
              >
                <span style={{ 
                  color: "var(--magenta)", 
                  fontWeight: "bold", 
                  background: "var(--magenta-soft)", 
                  padding: "1px 6px",
                  borderRadius: "2px",
                  fontSize: "11px",
                  fontFamily: "monospace"
                }}>
                  {act.time}
                </span>
                <span style={{ color: "var(--text)" }}>
                  {act.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
