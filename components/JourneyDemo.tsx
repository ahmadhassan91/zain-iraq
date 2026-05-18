"use client";

import Link from "next/link";
import { CheckCircle2, Eye, LockKeyhole, LogIn, RefreshCcw, Send, ShieldCheck, UserCog } from "lucide-react";
import { useDemoKnowledge } from "@/lib/demo-state";

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
  const isAdmin = view === "admin";
  const isAgent = view === "agent";

  return (
    <section className="impact-panel">
      <div className="impact-copy">
        <span className="chip published">
          <CheckCircle2 size={14} />
          {state.version} · {state.visibility}
        </span>
        <h2>{state.title}</h2>
        <p>{isAgent ? state.agentNote : state.customerSummary}</p>
        <div className="meta-row">
          <span className="small">Published: {state.publishedAt}</span>
          {isAgent ? <span className="chip magenta"><LockKeyhole size={13} /> Internal note visible</span> : null}
        </div>
      </div>

      {isAdmin ? (
        <div className="impact-actions">
          <button className="btn primary" onClick={publishUpdate}>
            <Send size={16} />
            Publish demo update
          </button>
          <button className="btn ghost" onClick={resetUpdate}>
            <RefreshCcw size={16} />
            Reset
          </button>
          <p className="small">This updates the Customer and Agent views in the same browser session.</p>
        </div>
      ) : null}
    </section>
  );
}

export function RoleLogin({
  role,
  title,
  body,
  points,
  onLogin
}: {
  role: "Admin" | "Agent";
  title: string;
  body: string;
  points: string[];
  onLogin: () => void;
}) {
  return (
    <section className="login-screen">
      <div className="login-card">
        <span className="chip magenta">{role} portal</span>
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="login-meta">
          {points.map((point) => (
            <span className="chip" key={point}>
              <CheckCircle2 size={14} />
              {point}
            </span>
          ))}
        </div>
        <button className="btn primary" onClick={onLogin}>
          <LogIn size={16} />
          Login as {role}
        </button>
      </div>
    </section>
  );
}
