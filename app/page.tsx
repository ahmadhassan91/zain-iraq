"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Network, ShieldCheck } from "lucide-react";
import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { RoleSelector } from "@/components/JourneyDemo";
import { agents, articles } from "@/lib/data";

export default function Home() {
  return (
    <AppShell active="Home">
      <section className="intro-hero">
        <div>
          <span className="chip published">
            <ShieldCheck size={14} />
            Three role journeys
          </span>
          <h1>Zain Iraq Knowledge Base POC</h1>
          <p>
            A cleaner demo of how Admin governance changes what customers see publicly and what internal agents see operationally.
          </p>
        </div>
        <Link className="btn primary" href="/customer">
          Open customer dashboard <ArrowRight size={16} />
        </Link>
      </section>

      <section className="section">
        <RoleSelector />
      </section>

      <section className="section">
        <div className="grid four">
          <StatCard label="Roles" value="3" detail="Customer, internal agent and admin" />
          <StatCard label="Targeted care agents" value={`${agents.length}`} detail="Billing, technical, roaming, digital and PTX" />
          <StatCard label="Seed articles" value={`${articles.length}`} detail="Shared content with role-based visibility" />
          <StatCard label="Demo update" value="Live" detail="Admin changes reflect across Customer and Agent views" />
        </div>
      </section>

      <section className="section">
        <SectionTitle title="POC story" />
        <div className="journey-strip">
          <div>
            <Network color="#d12c89" />
            <h3>One content source</h3>
            <p>Articles keep public answers, agent notes, channel variants and visibility rules together.</p>
          </div>
          <div>
            <CheckCircle2 color="#4a9e9d" />
            <h3>Role-based output</h3>
            <p>Customer sees approved public guidance. Agent sees internal procedure. Admin controls both.</p>
          </div>
          <div>
            <ShieldCheck color="#1f3f77" />
            <h3>Governed delivery</h3>
            <p>Publishing, pinning, feedback and analytics are visible without overcrowding the demo.</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
