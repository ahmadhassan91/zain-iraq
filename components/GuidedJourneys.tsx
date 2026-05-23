"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  CreditCard,
  FilePlus2,
  Headphones,
  MapPin,
  RadioTower,
  Search,
  ShieldCheck,
  Smartphone,
  Wifi
} from "lucide-react";
import { useMemo, useState } from "react";
import { useDemoKnowledge } from "@/lib/demo-state";

const customerScenarios = [
  {
    id: "roaming",
    label: "Roaming data",
    query: "customer cannot use data while roaming",
    intent: "Recognize travel + data failure",
    article: "Roaming services, bundles and Q&A",
    action: "Enable data roaming, check bundle via *225#, manually select partner network",
    related: ["Roaming prices", "Helpful tips", "International calls"],
    escalation: "Escalate only after bundle, handset and partner-network checks"
  },
  {
    id: "sim",
    label: "SIM/eSIM",
    query: "SIM replacement and eSIM documents",
    intent: "Recognize identity + branch service",
    article: "SIM replacement requirements",
    action: "Show 5,000 IQD SIM swap, 10,000 IQD eSIM, valid ID and *315# store locator",
    related: ["Nearest Zain center", "Ownership documents", "4.5G+ SIM upgrade"],
    escalation: "Route to store when ownership or document checks are required"
  },
  {
    id: "billing",
    label: "Balance/payment",
    query: "unexpected balance deduction",
    intent: "Recognize recharge, usage or bill dispute",
    article: "Recharge, balance and postpaid bill support",
    action: "Check balance via *100#, recharge via *101#, then review active services",
    related: ["Pay My Bill", "Recharge card", "Postpaid support"],
    escalation: "Route unresolved dispute to billing queue"
  },
  {
    id: "products",
    label: "Bundles",
    query: "Super Card bundle support",
    intent: "Recognize prepaid bundle discovery",
    article: "Super Card and KAFOO bundle support",
    action: "Compare data, minutes, SMS, validity and subscription channel",
    related: ["KAFOO", "Data bundles", "Zain Iraq App"],
    escalation: "Offer live support if eligibility or subscription status is unclear"
  }
];

const zainCategories = [
  { label: "Prepaid", detail: "KAFOO, Super Card, data bundles", href: "/customer?topic=prepaid" },
  { label: "Postpaid", detail: "Plans, bills, roaming", href: "/customer?topic=postpaid" },
  { label: "Zain-Fi", detail: "Devices, data offers, Connect SIM", href: "/customer?topic=zain-fi" },
  { label: "Services", detail: "Digital services, apps, devices", href: "/customer?topic=services" },
  { label: "Support", detail: "Knowledge Center, stores, contact", href: "/customer?topic=support" }
];

const demoSteps = [
  {
    href: "/customer",
    label: "Customer",
    title: "Find an answer",
    body: "Public KB, Zain categories, app/store/contact channels"
  },
  {
    href: "/agent",
    label: "Agent",
    title: "Resolve the case",
    body: "Internal checklist, pinned content, LLM grounded by KB"
  },
  {
    href: "/admin",
    label: "Admin",
    title: "Govern the source",
    body: "Publish once, control visibility, monitor content gaps"
  }
];

export function DemoPathNav({ current }: { current: "customer" | "agent" | "admin" }) {
  return (
    <section className="demo-path" aria-label="POC presenter demo path">
      <div>
        <span className="chip advisory">Presenter demo path</span>
        <h2>One telco issue, three role views</h2>
        <p className="muted">Start with a customer support question, show the agent resolution workspace, then show how Admin changes the source of truth.</p>
      </div>
      <div className="demo-path-steps">
        {demoSteps.map((step, index) => (
          <Link className={`demo-step ${current === step.label.toLowerCase() ? "active" : ""}`} href={step.href} key={step.label}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}: {step.title}</strong>
              <p>{step.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CustomerJourneyPanel({
  onSelectQuery
}: {
  onSelectQuery: (query: string) => void;
}) {
  const [active, setActive] = useState(customerScenarios[0].id);
  const scenario = customerScenarios.find((item) => item.id === active) ?? customerScenarios[0];

  return (
    <section className="guided-journey customer-journey">
      <div className="journey-heading">
        <div>
          <span className="chip magenta">Zain-style Knowledge Center</span>
          <h2>Choose a customer intent</h2>
          <p className="muted">The demo now starts where telecom customers usually start: roaming, SIM/eSIM, balance, bundles, app support and nearby stores.</p>
        </div>
      </div>

      <div className="category-showcase" aria-label="Zain knowledge center categories">
        {zainCategories.map((category) => (
          <Link className="knowledge-category" href={category.href} key={category.label}>
            <strong>{category.label}</strong>
            <span>{category.detail}</span>
          </Link>
        ))}
      </div>

      <div className="scenario-tabs" role="tablist" aria-label="Customer scenarios">
        {customerScenarios.map((item) => (
          <button
            className={active === item.id ? "active" : ""}
            key={item.id}
            onClick={() => {
              setActive(item.id);
              onSelectQuery(item.query);
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="journey-flow-grid">
        <div className="journey-step-card">
          <Search size={18} />
          <span className="small">Customer language</span>
          <strong>{scenario.query}</strong>
        </div>
        <div className="journey-step-card">
          <Bot size={18} />
          <span className="small">AI intent</span>
          <strong>{scenario.intent}</strong>
        </div>
        <div className="journey-step-card">
          <CheckCircle2 size={18} />
          <span className="small">Zain KB answer</span>
          <strong>{scenario.article}</strong>
        </div>
        <div className="journey-step-card">
          <ArrowRight size={18} />
          <span className="small">Next best action</span>
          <strong>{scenario.action}</strong>
        </div>
      </div>

      <div className="journey-resolution">
        <div>
          <h3>Related FAQs suggested</h3>
          <div className="chip-row">
            {scenario.related.map((item) => (
              <span className="chip" key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="escalation-note">
          <Headphones size={18} />
          <span>{scenario.escalation}</span>
        </div>
      </div>
    </section>
  );
}

const supportChannels = [
  {
    icon: Smartphone,
    title: "Zain Iraq App",
    body: "Manage account, check balance, subscribe to bundles and pay bills from the customer channel."
  },
  {
    icon: MapPin,
    title: "Stores and service centers",
    body: "Route branch-required tasks like SIM/eSIM replacement, documents and ownership verification."
  },
  {
    icon: CreditCard,
    title: "USSD and SMS actions",
    body: "Surface codes such as *100# balance, *101# recharge and *225# roaming usage where relevant."
  },
  {
    icon: Wifi,
    title: "Network support",
    body: "Handle APN, 4.5G+, device, data bundle and coverage troubleshooting without mixing it into billing."
  }
];

export function SupportChannelPanel() {
  return (
    <section className="section">
      <div className="section-title">
        <div>
          <h2>Telco support channels included</h2>
          <p className="muted">The UI is organized around Zain Iraq customer behavior rather than generic software support.</p>
        </div>
        <span className="chip published">Industry tailored</span>
      </div>
      <div className="grid four support-channel-grid">
        {supportChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div className="support-channel-card" key={channel.title}>
              <Icon size={22} />
              <h3>{channel.title}</h3>
              <p>{channel.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function AgentWorkflowPanel({
  onSelectQuery,
  onSelectAgent
}: {
  onSelectQuery: (query: string) => void;
  onSelectAgent: (agentId: string) => void;
}) {
  const [active, setActive] = useState("roaming");
  const workflows = useMemo(
    () => ({
      roaming: {
        title: "Roaming complaint resolution",
        agentId: "roaming",
        query: "customer cannot use data while roaming",
        steps: ["Confirm destination and roaming bundle", "Check handset data roaming", "Validate partner network attach", "Send customer-safe response", "Escalate only after eligibility checks"],
        response: "Ask the customer to restart the device, enable data roaming and manually select a partner network."
      },
      escalation: {
        title: "Escalation workflow",
        agentId: "technical",
        query: "slow internet needs technical escalation",
        steps: ["Validate APN", "Check balance and active offer priority", "Review coverage and SIM status", "Collect required troubleshooting evidence", "Open network ticket if unresolved"],
        response: "Escalate with APN, balance, coverage and device checks attached."
      },
      restricted: {
        title: "Restricted content access",
        agentId: "enterprise",
        query: "enterprise push to x support",
        steps: ["Switch agent persona", "Apply group visibility", "Show private PTX article", "Hide restricted content from customer view", "Route to enterprise support queue"],
        response: "Business Support agents see PTX guidance that public customers do not see."
      }
    }),
    []
  );
  const workflow = workflows[active as keyof typeof workflows];

  return (
    <section className="guided-journey agent-journey">
      <div className="journey-heading">
        <div>
          <span className="chip published">Operational workflow</span>
          <h2>Agent resolution path</h2>
          <p className="muted">The agent journey prioritizes troubleshooting, customer-safe responses, internal notes and escalation readiness.</p>
        </div>
        <div className="scenario-tabs compact" role="tablist" aria-label="Agent workflows">
          {Object.entries(workflows).map(([key, item]) => (
            <button
              className={active === key ? "active" : ""}
              key={key}
              onClick={() => {
                setActive(key);
                onSelectQuery(item.query);
                onSelectAgent(item.agentId);
              }}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="workflow-board">
        <div className="timeline compact-timeline">
          {workflow.steps.map((step, index) => (
            <div className="step" key={step}>
              <span className="step-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="resolution-card">
          <ShieldCheck size={22} />
          <span className="small">Copy-ready response direction</span>
          <strong>{workflow.response}</strong>
        </div>
      </div>
    </section>
  );
}

export function AdminWorkflowPanel() {
  const { publishUpdate } = useDemoKnowledge();
  const [active, setActive] = useState("publish");
  const [actionMessage, setActionMessage] = useState("Select a workflow action to see the demo impact.");
  const workflows = {
    publish: {
      title: "Publish update",
      icon: FilePlus2,
      steps: ["Edit roaming article", "Set Customer + Agent visibility", "Publish approved update", "Customer answer updates", "Agent internal procedure updates"],
      action: "Publish demo update"
    },
    remediation: {
      title: "Failed search remediation",
      icon: Search,
      steps: ["Review failed searches", "Identify low-confidence roaming query", "Create missing KB answer", "Approve and publish", "Future searches improve"],
      action: "Mark gap as remediated"
    },
    notification: {
      title: "Notification management",
      icon: RadioTower,
      steps: ["Create outage alert", "Choose Customer and Agent audiences", "Schedule website banner", "Publish internal advisory", "Measure acknowledgement"],
      action: "Preview alert impact"
    }
  };
  const workflow = workflows[active as keyof typeof workflows];
  const Icon = workflow.icon;
  const handleWorkflowAction = () => {
    if (active === "publish") {
      publishUpdate();
      setActionMessage("Published demo update applied to the Customer KB and Agent Workspace.");
      return;
    }

    if (active === "remediation") {
      setActionMessage("Search gap marked as remediated. The demo now shows how future low-confidence queries would be improved.");
      return;
    }

    setActionMessage("Alert preview prepared for the customer banner and internal agent advisory.");
  };

  return (
    <section className="guided-journey admin-journey">
      <div className="journey-heading">
        <div>
          <span className="chip magenta">Governance workflow</span>
          <h2>Admin cause-and-effect demo</h2>
          <p className="muted">Admin actions show how one governed content source changes customer, agent and channel-ready outputs.</p>
        </div>
        <div className="scenario-tabs compact" role="tablist" aria-label="Admin workflows">
          {Object.entries(workflows).map(([key, item]) => (
            <button
              className={active === key ? "active" : ""}
              key={key}
              onClick={() => {
                setActive(key);
                setActionMessage("Select a workflow action to see the demo impact.");
              }}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="workflow-board">
        <div className="timeline compact-timeline">
          {workflow.steps.map((step, index) => (
            <div className="step" key={step}>
              <span className="step-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="resolution-card">
          <Icon size={22} />
          <span className="small">Demo action</span>
          <button className="btn primary" onClick={handleWorkflowAction} type="button">
            {workflow.action}
          </button>
          <p className="small success-text">{actionMessage}</p>
          <p className="small">POC state is session-based. Production would persist through API, workflow and database services.</p>
        </div>
      </div>
    </section>
  );
}

export function PocMaturityPanel() {
  return (
    <section className="maturity-panel">
      <div>
        <span className="chip advisory">
          <AlertTriangle size={14} />
          POC maturity disclosure
        </span>
        <h2>What is live, simulated and next</h2>
      </div>
      <div className="maturity-grid">
        <div>
          <strong>Functional today</strong>
          <p>Role routes, guided workflows, multilingual UI, public/internal visibility, Netlify LLM endpoint and API sample contracts.</p>
        </div>
        <div>
          <strong>Simulated for demo</strong>
          <p>RBAC, persistence, analytics logs, feedback storage, article approval workflow and search-gap remediation.</p>
        </div>
        <div>
          <strong>Production next</strong>
          <p>Database, semantic/vector search, ingestion pipeline, real auth/RBAC, analytics events and channel integrations.</p>
        </div>
      </div>
    </section>
  );
}
