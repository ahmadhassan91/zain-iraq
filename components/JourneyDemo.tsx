"use client";

import Link from "next/link";
import { Eye, RefreshCcw, Send, ShieldCheck, UserCog } from "lucide-react";
import { useLanguage } from "@/components/AppChrome";
import { useDemoKnowledge } from "@/lib/demo-state";
import { demoImpactCopy } from "@/lib/localized-copy";
import { ZainLogo } from "./ZainLogo";

export function RoleSelector() {
  const roles = [
    {
      href: "/customer",
      icon: Eye,
      title: "Customer",
      body: "Searches public support content, reads approved answers and submits missing-content feedback.",
      meta: "Public knowledge only"
    },
    {
      href: "/agent",
      icon: ShieldCheck,
      title: "Internal Agent",
      body: "Gets operational procedures, internal notes, pinned content and LLM assistance grounded by the KB.",
      meta: "Agent-safe process"
    },
    {
      href: "/admin",
      icon: UserCog,
      title: "Admin",
      body: "Publishes articles, controls visibility, manages announcements and monitors content gaps.",
      meta: "Governance and rights"
    }
  ];

  return (
    <div className="role-grid">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <Link className="role-card" href={role.href} key={role.title}>
            <span className="role-icon"><Icon size={22} /></span>
            <span className="chip">{role.meta}</span>
            <h3>{role.title}</h3>
            <p>{role.body}</p>
          </Link>
        );
      })}
    </div>
  );
}

export function DemoImpactPanel({ view }: { view: "admin" | "customer" | "agent" }) {
  const { state, publishUpdate, resetUpdate } = useDemoKnowledge();
  const { language } = useLanguage();
  const copy = demoImpactCopy[language];
  const isAdmin = view === "admin";
  const isUpdated = state.version === "v1.1";
  const title = isUpdated ? copy.updatedTitle : copy.title;
  const summary = isUpdated 
    ? (view === "agent" ? copy.updatedAgentNote : copy.updatedCustomerSummary) 
    : (view === "agent" ? copy.agentNote : copy.customerSummary);

  return (
    <section className="impact-panel">
      <div className="impact-copy">
        <h2>{title}</h2>
        <p>{summary}</p>
        <span className="small muted">{copy.published}: {state.publishedAt === "Just published by Admin" ? copy.justPublished : state.publishedAt}</span>
      </div>
      {isAdmin && (
        <div className="impact-actions">
          <button className="btn primary" onClick={publishUpdate}>
            <Send size={16} />
            {copy.publishUpdate}
          </button>
          <button className="btn ghost" onClick={resetUpdate}>
            <RefreshCcw size={16} />
            {copy.reset}
          </button>
        </div>
      )}
    </section>
  );
}

