"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, FilePlus2, Headphones, RadioTower, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useDemoKnowledge } from "@/lib/demo-state";

const customerScenarios = [
  {
    id: "roaming",
    label: "Roaming issue",
    query: "customer cannot use data while roaming",
    intent: "Intent understood: roaming data failure",
    article: "Roaming bundles and data setup",
    action: "Restart device, enable data roaming, manually select partner network",
    related: ["International calls", "Super Card", "Travel bundle usage"],
    escalation: "Escalate only if partner attach and eligibility checks fail"
  },
  {
    id: "sim",
    label: "SIM replacement",
    query: "SIM replacement and eSIM documents",
    intent: "Intent understood: SIM/eSIM service request",
    article: "eSIM and SIM replacement support",
    action: "Confirm device support and branch visit with valid ID",
    related: ["Nearest branch", "Ownership verification", "eSIM QR activation"],
    escalation: "Branch-assisted verification required"
  },
  {
    id: "billing",
    label: "Bill/payment",
    query: "unexpected balance deduction",
    intent: "Intent understood: billing investigation",
    article: "Customer care and bill support",
    action: "Check line type, recent usage, active services and bill status",
    related: ["Recharge", "Balance transfer", "Postpaid support"],
    escalation: "Route unresolved dispute to billing queue"
  },
  {
    id: "products",
    label: "Product discovery",
    query: "Super Card bundle support",
    intent: "Intent understood: prepaid bundle discovery",
    article: "Super Card bundle support",
    action: "Recommend package, explain validity, renewal and remaining units",
    related: ["Prepaid plans", "Recharge cards", "App subscription"],
    escalation: "Offer live support if package eligibility is unclear"
  }
];

const zainCategories = [
  { label: "Prepaid Plans", href: "/customer?topic=prepaid" },
  { label: "Services & Offers", href: "/customer?topic=services" },
  { label: "SIM Replacement", href: "/customer?topic=sim-replacement" },
  { label: "Super Card", href: "/customer/article/super-card" }
];

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
          <span className="chip magenta">Website-native support layer</span>
          <h2>Guided customer journey</h2>
          <p className="muted">A familiar Zain Knowledge Center structure with intelligent search, diagnosis and next actions layered on top.</p>
        </div>
        <div className="knowledge-category-row" aria-label="Zain knowledge center categories">
          {zainCategories.map((category) => (
            <Link className="knowledge-category" href={category.href} key={category.label}>
              {category.label}
            </Link>
          ))}
        </div>
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
          <span className="small">Customer asks</span>
          <strong>{scenario.query}</strong>
        </div>
        <div className="journey-step-card">
          <Bot size={18} />
          <span className="small">System action</span>
          <strong>{scenario.intent}</strong>
        </div>
        <div className="journey-step-card">
          <CheckCircle2 size={18} />
          <span className="small">Best knowledge</span>
          <strong>{scenario.article}</strong>
        </div>
        <div className="journey-step-card">
          <ArrowRight size={18} />
          <span className="small">Recommended next action</span>
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
