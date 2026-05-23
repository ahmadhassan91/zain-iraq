"use client";

import Link from "next/link";
import { CheckCircle2, Eye, LockKeyhole, LogIn, RefreshCcw, Send, ShieldCheck, UserCog } from "lucide-react";
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
  const isAgent = view === "agent";
  const isUpdated = state.version === "v1.1";
  const title = isUpdated ? copy.updatedTitle : copy.title;
  const customerSummary = isUpdated ? copy.updatedCustomerSummary : copy.customerSummary;
  const agentNote = isUpdated ? copy.updatedAgentNote : copy.agentNote;
  const publishedAt = state.publishedAt === "Just published by Admin" ? copy.justPublished : state.publishedAt;
  const visibility = state.visibility === "Agent only" ? copy.agentOnly : copy.customerAgent;

  return (
    <section className="impact-panel">
      <div className="impact-copy">
        <span className="chip published">
          <CheckCircle2 size={14} />
          {state.version} · {visibility}
        </span>
        <h2>{title}</h2>
        <p>{isAgent ? agentNote : customerSummary}</p>
        <div className="meta-row">
          <span className="small">{copy.published}: {publishedAt}</span>
          {isAgent ? <span className="chip magenta"><LockKeyhole size={13} /> {copy.internalNoteVisible}</span> : null}
        </div>
      </div>

      {isAdmin ? (
        <div className="impact-actions">
          <button className="btn primary" onClick={publishUpdate}>
            <Send size={16} />
            {copy.publishUpdate}
          </button>
          <button className="btn ghost" onClick={resetUpdate}>
            <RefreshCcw size={16} />
            {copy.reset}
          </button>
          <p className="small">{copy.adminHint}</p>
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
  const step = role === "Agent" ? "Step 2 of 3" : "Step 3 of 3";
  const context =
    role === "Agent"
      ? "Internal view after the customer cannot self-serve. Agents see troubleshooting, internal notes and AI assist."
      : "Governance view after the support gap is identified. Admins publish and control what each channel can see.";

  return (
    <main className="portal-page">
      <header className="portal-header">
        <Link href="/" className="portal-brand">
          <ZainLogo />
          <span>Zain Iraq Knowledge Base</span>
        </Link>
        <div className="portal-links">
          <Link href="/">Public home</Link>
          <Link href="/customer">Customer KB</Link>
        </div>
      </header>

      <section className="portal-shell">
        <div className="portal-copy">
          <span className="chip magenta">{role} portal</span>
          <span className="chip advisory">{step} in presenter demo</span>
          <h1>{title}</h1>
          <p>{body}</p>
          <p>{context}</p>
          <div className="portal-points">
            {points.map((point) => (
              <div className="portal-point" key={point}>
                <CheckCircle2 size={17} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="portal-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <div>
            <span className="small">Demo credentials</span>
            <h2>Sign in to continue</h2>
          </div>
          <label>
            <span className="small">Work email</span>
            <input className="field" defaultValue={role === "Admin" ? "admin@zain.iq" : "agent@zain.iq"} />
          </label>
          <label>
            <span className="small">Password</span>
            <input className="field" defaultValue="demo-password" type="password" />
          </label>
          <button className="btn primary" type="submit">
            <LogIn size={16} />
            Continue to {role} workspace
          </button>
          <p className="small">POC login only. No production authentication is enabled.</p>
        </form>
      </section>
    </main>
  );
}
