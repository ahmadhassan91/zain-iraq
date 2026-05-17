"use client";

import Link from "next/link";
import { BarChart3, Bell, BookOpen, Bot, FileText, Globe2, Home, LayoutDashboard, Search, ShieldCheck, Users } from "lucide-react";
import { ZainLogo } from "./ZainLogo";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/customer", label: "Customer KB", icon: Globe2 },
  { href: "/agent", label: "Agent Workspace", icon: Search },
  { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/groups", label: "Groups & Skills", icon: Users },
  { href: "/api-readiness", label: "API Readiness", icon: Bot }
];

type Language = "EN" | "AR" | "KU";

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
          <strong>Zain Iraq Knowledge Base</strong>
          <span>Unified knowledge platform for customers, agents and admins</span>
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
          {active}
        </div>
      </div>
    </header>
  );
}

export function Sidebar({ active = "Home" }: { active?: string }) {
  return (
    <aside className="sidebar">
      <div className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} href={item.href}>
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="footer-note">
        <strong>Platform scope</strong>
        <p className="small">Customer knowledge, agent assistance, governance, analytics and channel-ready content delivery.</p>
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
    <div className="app" dir={isRtl ? "rtl" : "ltr"}>
      <Header active={active} language={language} onLanguageChange={setLanguage} />
      <div className="layout">
        <Sidebar active={active} />
        <main className="main">{children}</main>
      </div>
    </div>
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
