"use client";

import Link from "next/link";
import { BookOpen, Bot, Globe2, Home, LayoutDashboard, Search, Sun, Moon, LogOut, FileText } from "lucide-react";
import { ZainLogo } from "./ZainLogo";
import { createContext, useContext, useState, useEffect } from "react";
import { useDemoKnowledge } from "@/lib/demo-state";

export type Language = "EN" | "AR" | "KU";

const shellCopy: Record<Language, Record<string, string>> = {
  EN: {
    product: "Zain Iraq Knowledge Base",
    subtitle: "Unified knowledge platform for customers, agents and admins",
    scopeTitle: "Platform scope",
    scope: "Customer knowledge, agent assistance, governance, analytics and channel-ready content delivery.",
    publicScopeTitle: "Customer support",
    publicScope: "Search approved public help for roaming, bundles, SIM, internet, app support and service updates.",
    Home: "Home",
    "Customer KB": "Customer KB",
    "Agent Workspace": "Agent Workspace",
    "Admin Dashboard": "Admin Dashboard",
    Articles: "Articles",
    Notifications: "Notifications",
    Analytics: "Analytics",
    "Groups & Skills": "Groups & Skills",
    "API Readiness": "API Readiness",
    
    // Sidebar Group Titles
    "CUSTOMER EXPERIENCE": "Customer Experience",
    "AGENT WORKSPACE": "Agent Workspace",
    "ADMIN INSIGHTS": "Admin Insights",
    
    // Sidebar Item Labels
    "HOME": "Home",
    "SEARCH + RESULTS": "Search + Results",
    "ARTICLE DETAIL": "Article Detail",
    "DASHBOARD": "Dashboard",
    "RESOLUTION": "Resolution",
    "OVERVIEW": "Overview",
    "ARTICLE PERFORMANCE": "Article Performance",
    "LOGOUT": "Logout"
  },
  AR: {
    product: "قاعدة معرفة زين العراق",
    subtitle: "منصة معرفة موحدة للعملاء والوكلاء والإدارة",
    scopeTitle: "نطاق المنصة",
    scope: "معرفة العملاء، مساعدة الوكلاء، الحوكمة، التحليلات، وتسليم المحتوى للقنوات.",
    publicScopeTitle: "دعم العملاء",
    publicScope: "ابحث في المساعدة العامة المعتمدة للتجوال، الباقات، الشريحة، الإنترنت، التطبيق وتحديثات الخدمة.",
    Home: "الرئيسية",
    "Customer KB": "معرفة العملاء",
    "Agent Workspace": "مساحة الوكيل",
    "Admin Dashboard": "لوحة الإدارة",
    Articles: "المقالات",
    Notifications: "التنبيهات",
    Analytics: "التحليلات",
    "Groups & Skills": "المجموعات والمهارات",
    "API Readiness": "جاهزية الواجهات",
    
    // Sidebar Group Titles
    "CUSTOMER EXPERIENCE": "تجربة العملاء",
    "AGENT WORKSPACE": "مساحة عمل الوكيل",
    "ADMIN INSIGHTS": "إحصائيات الإدارة",
    
    // Sidebar Item Labels
    "HOME": "الرئيسية",
    "SEARCH + RESULTS": "البحث والنتائج",
    "ARTICLE DETAIL": "تفاصيل المقال",
    "DASHBOARD": "لوحة التحكم",
    "RESOLUTION": "الحلول والدعم",
    "OVERVIEW": "نظرة عامة",
    "ARTICLE PERFORMANCE": "أداء المقالات",
    "LOGOUT": "تسجيل الخروج"
  },
  KU: {
    product: "بنکەی زانیاری زەین عێراق",
    subtitle: "پلاتفۆرمی یەکگرتووی زانیاری بۆ کڕیاران، ئەجێنتەکان و بەڕێوەبەران",
    scopeTitle: "سنوری پلاتفۆرم",
    scope: "زانیاری کڕیار، یارمەتی ئەجێنت، حوکمرانی، شیکاری و گەیاندنی ناوەڕۆک بۆ کەناڵەکان.",
    publicScopeTitle: "پشتگیری کڕیار",
    publicScope: "لە یارمەتی گشتی پەسەندکراو بگەڕێ بۆ ڕۆمینگ، پاکێج، SIM، ئینتەرنێت، ئەپ و نوێکاری خزمەت.",
    Home: "سەرەکی",
    "Customer KB": "زانیاری کڕیار",
    "Agent Workspace": "شوێنی کاری ئەجێنت",
    "Admin Dashboard": "داشبۆردی بەڕێوەبەر",
    Articles: "بابەتەکان",
    Notifications: "ئاگادارکردنەوەکان",
    Analytics: "شیکارییەکان",
    "Groups & Skills": "گرووپ و شارەزایی",
    "API Readiness": "ئامادەیی API",
    
    // Sidebar Group Titles
    "CUSTOMER EXPERIENCE": "ئەزموونی کڕیار",
    "AGENT WORKSPACE": "شوێنی کاری ئەجێنت",
    "ADMIN INSIGHTS": "تێڕوانینی بەڕێوەبەر",
    
    // Sidebar Item Labels
    "HOME": "سەرەکی",
    "SEARCH + RESULTS": "گەڕان و ئەنجامەکان",
    "ARTICLE DETAIL": "وردەکاری بابەت",
    "DASHBOARD": "داشبۆرد",
    "RESOLUTION": "چارەسەرکردن",
    "OVERVIEW": "تێڕوانینی گشتی",
    "ARTICLE PERFORMANCE": "کارکردنی بابەتەکان",
    "LOGOUT": "چوونە دەرەوە"
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
  onLanguageChange,
  theme = "light",
  onThemeToggle
}: {
  active?: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
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
        {onThemeToggle && (
          <button
            onClick={onThemeToggle}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        )}
        <div className="language-switch" aria-label="Language switcher">
          {(["EN", "AR", "KU"] as Language[]).map((item) => (
            <button className={language === item ? "active" : ""} key={item} onClick={() => onLanguageChange(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

const navGroups = [
  {
    title: "CUSTOMER EXPERIENCE",
    items: [
      { href: "/", label: "HOME", icon: Home },
      { href: "/customer/search", label: "SEARCH + RESULTS", icon: Search },
      { href: "/customer/article/roaming-activation", label: "ARTICLE DETAIL", icon: BookOpen }
    ]
  },
  {
    title: "AGENT WORKSPACE",
    items: [
      { href: "/agent", label: "DASHBOARD", icon: LayoutDashboard },
      { href: "/agent/resolution", label: "RESOLUTION", icon: Bot }
    ]
  },
  {
    title: "ADMIN INSIGHTS",
    items: [
      { href: "/admin", label: "OVERVIEW", icon: Globe2 },
      { href: "/admin/performance", label: "ARTICLE PERFORMANCE", icon: FileText }
    ]
  }
];

const isItemActive = (itemLabel: string, activeProp?: string) => {
  if (!activeProp) return false;
  const normalizedActive = activeProp.toUpperCase().trim();
  const normalizedLabel = itemLabel.toUpperCase().trim();
  
  if (normalizedActive === normalizedLabel) return true;
  
  if (normalizedLabel === "HOME" && normalizedActive === "HOME") return true;
  if (normalizedLabel === "SEARCH + RESULTS" && (normalizedActive === "SEARCH + RESULTS" || normalizedActive === "SEARCH")) return true;
  if (normalizedLabel === "ARTICLE DETAIL" && (normalizedActive === "ARTICLE DETAIL" || normalizedActive === "CUSTOMER KB" || normalizedActive === "CUSTOMER")) return true;
  if (normalizedLabel === "DASHBOARD" && (normalizedActive === "DASHBOARD" || normalizedActive === "AGENT WORKSPACE" || normalizedActive === "AGENT")) return true;
  if (normalizedLabel === "RESOLUTION" && (normalizedActive === "RESOLUTION" || normalizedActive === "AGENT RESOLUTION")) return true;
  if (normalizedLabel === "OVERVIEW" && (normalizedActive === "OVERVIEW" || normalizedActive === "ADMIN DASHBOARD" || normalizedActive === "ADMIN")) return true;
  if (normalizedLabel === "ARTICLE PERFORMANCE" && (normalizedActive === "ARTICLE PERFORMANCE" || normalizedActive === "PERFORMANCE")) return true;
  
  return false;
};

export function Sidebar({ active = "Home" }: { active?: string }) {
  const { language } = useLanguage();
  const { resetUpdate } = useDemoKnowledge();

  const handleLogout = () => {
    resetUpdate();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("zain-demo-knowledge-state");
      window.localStorage.removeItem("zain-demo-feedback");
      window.location.href = "/";
    }
  };

  const isRtl = language !== "EN";

  return (
    <aside className="sidebar" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <div className="nav-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {navGroups.map((group) => (
          <div key={group.title} className="nav-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="sidebar-group-title" style={{ fontSize: "11px", fontWeight: "bold", color: "#666666", letterSpacing: "0.1em", padding: "0 8px", textTransform: "uppercase", marginBottom: "4px" }}>
              {localize(group.title, language)}
            </span>
            {group.items.map((item) => {
              const Icon = item.icon;
              const activeState = isItemActive(item.label, active);
              return (
                <Link
                  key={item.label}
                  className={`sidebar-item ${activeState ? "active" : ""}`}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "36px",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: activeState ? "600" : "500",
                    transition: "all 0.2s",
                    backgroundColor: activeState ? "var(--active-nav-bg, #1a1a1a)" : "transparent",
                    color: activeState ? "var(--active-nav-text, #ffffff)" : "var(--text)",
                    borderLeft: activeState && !isRtl ? "4px solid #d12c89" : "none",
                    borderRight: activeState && isRtl ? "4px solid #d12c89" : "none",
                  }}
                >
                  <Icon size={16} />
                  <span>{localize(item.label, language)}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={handleLogout}
          className="sidebar-item"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#e74c3c"
          }}
        >
          <LogOut size={16} />
          <span>{localize("LOGOUT", language)}</span>
        </button>
      </div>
    </aside>
  );
}

export function AppShell({
  active,
  children,
  variant = "internal"
}: {
  active?: string;
  children: React.ReactNode;
  variant?: "internal" | "public";
}) {
  const [language, setLanguage] = useState<Language>("EN");
  const isRtl = language !== "EN";
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", language === "AR" ? "ar" : language === "KU" ? "ku" : "en");
  }, [isRtl, language]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="app" dir={isRtl ? "rtl" : "ltr"}>
        <Header 
          active={active} 
          language={language} 
          onLanguageChange={setLanguage} 
          theme={theme}
          onThemeToggle={toggleTheme}
        />
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
  children,
  level = 2
}: {
  title: string;
  children?: React.ReactNode;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="section-title">
      <Heading>{title}</Heading>
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
