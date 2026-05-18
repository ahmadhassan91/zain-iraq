"use client";

import Link from "next/link";
import { BookOpen, Bot, Globe2, Home, LayoutDashboard, Search, ShieldCheck } from "lucide-react";
import { ZainLogo } from "./ZainLogo";
import { createContext, useContext, useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/customer", label: "Customer KB", icon: Globe2 },
  { href: "/agent", label: "Agent Workspace", icon: Search },
  { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/api-readiness", label: "API Readiness", icon: Bot }
];

export type Language = "EN" | "AR" | "KU";

const shellCopy: Record<Language, Record<string, string>> = {
  EN: {
    product: "Zain Iraq Knowledge Base",
    subtitle: "Unified knowledge platform for customers, agents and admins",
    scopeTitle: "Platform scope",
    scope: "Customer knowledge, agent assistance, governance, analytics and channel-ready content delivery.",
    Home: "Home",
    "Customer KB": "Customer KB",
    "Agent Workspace": "Agent Workspace",
    "Admin Dashboard": "Admin Dashboard",
    Articles: "Articles",
    Notifications: "Notifications",
    Analytics: "Analytics",
    "Groups & Skills": "Groups & Skills",
    "API Readiness": "API Readiness"
  },
  AR: {
    product: "قاعدة معرفة زين العراق",
    subtitle: "منصة معرفة موحدة للعملاء والوكلاء والإدارة",
    scopeTitle: "نطاق المنصة",
    scope: "معرفة العملاء، مساعدة الوكلاء، الحوكمة، التحليلات، وتسليم المحتوى للقنوات.",
    Home: "الرئيسية",
    "Customer KB": "معرفة العملاء",
    "Agent Workspace": "مساحة الوكيل",
    "Admin Dashboard": "لوحة الإدارة",
    Articles: "المقالات",
    Notifications: "التنبيهات",
    Analytics: "التحليلات",
    "Groups & Skills": "المجموعات والمهارات",
    "API Readiness": "جاهزية الواجهات"
  },
  KU: {
    product: "بنکەی زانیاری زەین عێراق",
    subtitle: "پلاتفۆرمی یەکگرتووی زانیاری بۆ کڕیاران، ئەجێنتەکان و بەڕێوەبەران",
    scopeTitle: "سنوری پلاتفۆرم",
    scope: "زانیاری کڕیار، یارمەتی ئەجێنت، حوکمرانی، شیکاری و گەیاندنی ناوەڕۆک بۆ کەناڵەکان.",
    Home: "سەرەکی",
    "Customer KB": "زانیاری کڕیار",
    "Agent Workspace": "شوێنی کاری ئەجێنت",
    "Admin Dashboard": "داشبۆردی بەڕێوەبەر",
    Articles: "بابەتەکان",
    Notifications: "ئاگادارکردنەوەکان",
    Analytics: "شیکارییەکان",
    "Groups & Skills": "گرووپ و شارەزایی",
    "API Readiness": "ئامادەیی API"
  }
};

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: "EN",
  setLanguage: () => undefined
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function localize(key: string, language: Language) {
  return shellCopy[language][key] || key;
}

export function Header({
  active = "Home",
  language,
  onLanguageChange
}: {
  active?: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <header className="topbar">
      <div className="brand-area">
        <ZainLogo />
        <div className="product-title">
          <strong>{shellCopy[language].product}</strong>
          <span>{shellCopy[language].subtitle}</span>
        </div>
      </div>
      <div className="topbar-actions">
        <div className="language-switch" aria-label="Language switcher">
          {(["EN", "AR", "KU"] as Language[]).map((item) => (
            <button className={language === item ? "active" : ""} key={item} onClick={() => onLanguageChange(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="chip">
          <ShieldCheck size={16} />
          {localize(active, language)}
        </div>
      </div>
    </header>
  );
}

export function Sidebar({ active = "Home" }: { active?: string }) {
  const { language } = useLanguage();

  return (
    <aside className="sidebar">
      <div className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} href={item.href}>
              <Icon size={18} />
              {localize(item.label, language)}
            </Link>
          );
        })}
      </div>
      <div className="footer-note">
        <strong>{shellCopy[language].scopeTitle}</strong>
        <p className="small">{shellCopy[language].scope}</p>
      </div>
    </aside>
  );
}

export function AppShell({
  active,
  children
}: {
  active?: string;
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("EN");
  const isRtl = language !== "EN";

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="app" dir={isRtl ? "rtl" : "ltr"}>
        <Header active={active} language={language} onLanguageChange={setLanguage} />
        <div className="layout">
          <Sidebar active={active} />
          <main className="main">{children}</main>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

export function StatCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="card metric">
      <span className="small">{label}</span>
      <strong>{value}</strong>
      <span className="muted">{detail}</span>
    </div>
  );
}

export function SectionTitle({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export function ArticleMini({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="result-item">
      <div>
        <h3>{title}</h3>
        <p className="muted">{meta}</p>
      </div>
      <BookOpen size={22} color="#d12c89" />
    </div>
  );
}
