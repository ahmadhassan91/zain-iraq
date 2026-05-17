export type Role = "Customer" | "Agent" | "Admin";

export type Agent = {
  id: string;
  name: string;
  role: string;
  skill: string;
  group: string;
  initials: string;
  color: string;
  pinned: string[];
};

export type Article = {
  id: string;
  title: string;
  category: string;
  type: "FAQ" | "Troubleshooting" | "Guide" | "Announcement";
  language: "English" | "Arabic" | "Kurdish";
  status: "Draft" | "Approved" | "Ready to Publish" | "Published" | "Archived";
  visibility: "Public" | "Agent" | "Private Group" | "Digital Channel";
  confidence: number;
  views: number;
  helpful: number;
  tags: string[];
  channelVariants: string[];
  summary: string;
  customerAnswer: string;
  internalNote: string;
  steps: string[];
  updatedAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  audience: "Customer" | "Agent" | "All";
  severity: "Info" | "Advisory" | "Critical";
  channel: "Website" | "Agent Portal" | "Chatbot" | "WhatsApp";
  status: "Live" | "Scheduled" | "Draft";
  message: string;
  scheduledFor: string;
};

export const agents: Agent[] = [
  {
    id: "billing",
    name: "Sara Hassan",
    role: "Care Agent - Billing",
    skill: "Recharge, balance, invoices, payment issues",
    group: "Consumer Care",
    initials: "SH",
    color: "magenta",
    pinned: ["balance-deduction", "super-card"]
  },
  {
    id: "technical",
    name: "Omar Kareem",
    role: "Care Agent - Technical Support",
    skill: "Internet, 4.5G, SIM, APN, device and coverage",
    group: "Technical Support",
    initials: "OK",
    color: "teal",
    pinned: ["slow-internet", "sim-replacement"]
  },
  {
    id: "roaming",
    name: "Lana Saeed",
    role: "Care Agent - Roaming",
    skill: "Roaming activation, travel support, international calls",
    group: "Roaming Desk",
    initials: "LS",
    color: "violet",
    pinned: ["roaming-activation", "international-calls"]
  },
  {
    id: "digital",
    name: "Mina Yousif",
    role: "Care Agent - Digital Channels",
    skill: "Zain app, website, chatbot and self-service journeys",
    group: "Digital Care",
    initials: "MY",
    color: "blue",
    pinned: ["app-login", "chatbot-escalation"]
  },
  {
    id: "enterprise",
    name: "Ali Rahman",
    role: "Care Agent - Enterprise/PTX",
    skill: "Business services, Push-to-X and corporate support",
    group: "Business Support",
    initials: "AR",
    color: "purple",
    pinned: ["push-to-x", "enterprise-sla"]
  }
];

export const articles: Article[] = [
  {
    id: "roaming-activation",
    title: "How to activate roaming",
    category: "Roaming",
    type: "Troubleshooting",
    language: "English",
    status: "Published",
    visibility: "Public",
    confidence: 94,
    views: 1842,
    helpful: 91,
    tags: ["roaming", "travel", "international"],
    channelVariants: ["Website", "Agent Portal", "Chatbot", "WhatsApp"],
    summary: "Guide customers through roaming readiness, activation checks and travel support steps.",
    customerAnswer: "Before travelling, open the Zain Iraq app or contact support to confirm roaming is active. Restart the device after arrival and choose a partner network if automatic selection does not connect.",
    internalNote: "Verify line status, roaming eligibility, spend controls and active package before escalation.",
    steps: ["Confirm customer line is active", "Check roaming eligibility", "Validate destination coverage", "Ask customer to restart device", "Escalate if partner network attach fails"],
    updatedAt: "2026-05-12"
  },
  {
    id: "slow-internet",
    title: "Slow internet or no data connectivity",
    category: "Technical Support",
    type: "Troubleshooting",
    language: "English",
    status: "Published",
    visibility: "Agent",
    confidence: 91,
    views: 2260,
    helpful: 88,
    tags: ["4.5G", "internet", "APN", "coverage"],
    channelVariants: ["Agent Portal", "Chatbot"],
    summary: "Structured technical flow for slow data, no internet and APN-related issues.",
    customerAnswer: "Restart your device, make sure mobile data is enabled, check your bundle balance, and try switching airplane mode on and off for 10 seconds.",
    internalNote: "Check coverage, package balance, network barring, SIM status and APN before network ticket creation.",
    steps: ["Check active bundle", "Validate network coverage", "Confirm APN settings", "Test SIM in another device", "Create technical ticket if issue persists"],
    updatedAt: "2026-05-10"
  },
  {
    id: "sim-replacement",
    title: "SIM replacement process",
    category: "SIM Services",
    type: "Guide",
    language: "English",
    status: "Approved",
    visibility: "Agent",
    confidence: 87,
    views: 1298,
    helpful: 84,
    tags: ["SIM", "replacement", "ownership"],
    channelVariants: ["Agent Portal", "Website"],
    summary: "Agent process and customer guidance for damaged, lost or upgraded SIM replacement.",
    customerAnswer: "Please visit the nearest Zain branch with your valid ID. The branch team will verify ownership and complete the SIM replacement.",
    internalNote: "Do not share internal identity verification rules through public channels.",
    steps: ["Confirm reason for replacement", "Guide customer to nearest branch", "Explain ID requirement", "Record interaction note"],
    updatedAt: "2026-05-08"
  },
  {
    id: "app-login",
    title: "Zain Iraq app login issue",
    category: "Digital Channels",
    type: "Troubleshooting",
    language: "English",
    status: "Ready to Publish",
    visibility: "Digital Channel",
    confidence: 89,
    views: 1014,
    helpful: 79,
    tags: ["app", "login", "OTP", "self-service"],
    channelVariants: ["Website", "Agent Portal", "Chatbot", "WhatsApp"],
    summary: "Support flow for app login, OTP, password and device-related self-service issues.",
    customerAnswer: "Update the Zain Iraq app, confirm your number is active, request a new OTP and make sure SMS reception is available on your device.",
    internalNote: "If OTP is delayed for multiple users, check digital incident board before individual escalation.",
    steps: ["Confirm app version", "Validate active line", "Retry OTP", "Clear cache", "Escalate to digital support"],
    updatedAt: "2026-05-14"
  },
  {
    id: "balance-deduction",
    title: "Unexpected balance deduction",
    category: "Billing",
    type: "FAQ",
    language: "English",
    status: "Published",
    visibility: "Agent",
    confidence: 86,
    views: 1726,
    helpful: 82,
    tags: ["billing", "balance", "recharge"],
    channelVariants: ["Agent Portal", "WhatsApp"],
    summary: "Agent guidance for investigating balance deduction complaints.",
    customerAnswer: "We can review your recent usage and active services. Some deductions may relate to bundle renewal, value-added services or out-of-bundle usage.",
    internalNote: "Check charging history and active VAS subscriptions before refund discussion.",
    steps: ["Open charging history", "Review bundle renewal", "Check active VAS", "Explain charge reason", "Escalate billing dispute if unresolved"],
    updatedAt: "2026-05-07"
  },
  {
    id: "international-calls",
    title: "International calls and rates",
    category: "International",
    type: "FAQ",
    language: "English",
    status: "Published",
    visibility: "Public",
    confidence: 83,
    views: 940,
    helpful: 76,
    tags: ["international", "calls", "rates"],
    channelVariants: ["Website", "Chatbot"],
    summary: "Explain international dialing format and where customers can confirm destination rates.",
    customerAnswer: "Dial 00 followed by the country code, area code and phone number. Rates vary by destination and package.",
    internalNote: "Use latest rate table from approved commercial source only.",
    steps: ["Confirm destination", "Check package type", "Share dialing format", "Point to rate details"],
    updatedAt: "2026-05-04"
  },
  {
    id: "push-to-x",
    title: "Zain Push-to-X business support",
    category: "Enterprise",
    type: "Guide",
    language: "English",
    status: "Published",
    visibility: "Private Group",
    confidence: 90,
    views: 388,
    helpful: 93,
    tags: ["business", "PTX", "enterprise"],
    channelVariants: ["Agent Portal"],
    summary: "Restricted enterprise knowledge for Push-to-X customer support and eligibility.",
    customerAnswer: "Zain Push-to-X supports real-time team communication for business customers across Iraq through Zain's network.",
    internalNote: "Enterprise/PTX content is restricted to Business Support agents and supervisors.",
    steps: ["Confirm corporate account", "Identify PTX plan", "Check device compatibility", "Route to enterprise support queue"],
    updatedAt: "2026-05-06"
  },
  {
    id: "super-card",
    title: "Super Card bundle support",
    category: "Bundles",
    type: "FAQ",
    language: "Kurdish",
    status: "Published",
    visibility: "Public",
    confidence: 81,
    views: 1190,
    helpful: 80,
    tags: ["bundle", "super card", "prepaid"],
    channelVariants: ["Website", "Chatbot", "WhatsApp"],
    summary: "Public FAQ for subscribing, renewal and checking remaining bundle units.",
    customerAnswer: "Use the approved subscription channel shown in the Zain Iraq app or official support page to activate your bundle.",
    internalNote: "Confirm latest commercial codes before sharing through assisted channels.",
    steps: ["Select bundle", "Confirm balance", "Subscribe through app or SMS", "Check renewal status"],
    updatedAt: "2026-05-01"
  }
];

export const analytics = [
  { label: "Roaming activation", searches: 1240, failures: 24 },
  { label: "Slow internet", searches: 980, failures: 68 },
  { label: "App login", searches: 760, failures: 42 },
  { label: "SIM replacement", searches: 640, failures: 18 },
  { label: "Balance deduction", searches: 590, failures: 71 }
];

export const announcements: Announcement[] = [
  {
    id: "network-maintenance",
    title: "Planned maintenance in Baghdad",
    audience: "Customer",
    severity: "Advisory",
    channel: "Website",
    status: "Live",
    message: "Some customers may notice intermittent data service between 01:00 and 03:00 during planned optimization work.",
    scheduledFor: "2026-05-18 01:00"
  },
  {
    id: "roaming-advisory",
    title: "Roaming partner advisory",
    audience: "Agent",
    severity: "Critical",
    channel: "Agent Portal",
    status: "Live",
    message: "For roaming attach failures, confirm destination partner network before creating a technical ticket.",
    scheduledFor: "2026-05-17 13:30"
  },
  {
    id: "super-card-update",
    title: "Super Card support article refresh",
    audience: "All",
    severity: "Info",
    channel: "Chatbot",
    status: "Scheduled",
    message: "Updated bundle support content will be pushed to chatbot and WhatsApp variants after approval.",
    scheduledFor: "2026-05-19 09:00"
  }
];

export const integrations = [
  { name: "Zain Website", status: "Demo Connected", detail: "Public article and FAQ rendering" },
  { name: "Chatbot", status: "API Ready", detail: "Search and feedback response shape" },
  { name: "WhatsApp", status: "API Ready", detail: "Short answer content variant" },
  { name: "Sprinklr", status: "Production Integration Required", detail: "Connector pending client access" },
  { name: "AVAYA", status: "Production Integration Required", detail: "Contact center event integration" },
  { name: "Genesys", status: "Production Integration Required", detail: "Agent assist integration" }
];

export function findArticle(id: string) {
  return articles.find((article) => article.id === id) ?? articles[0];
}

export function searchArticles(query: string) {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    return articles.slice(0, 5);
  }

  return articles
    .map((article) => {
      const haystack = [
        article.title,
        article.category,
        article.summary,
        article.customerAnswer,
        article.internalNote,
        ...article.tags
      ]
        .join(" ")
        .toLowerCase();

      const direct = haystack.includes(normalized) ? 20 : 0;
      const tokenScore = normalized
        .split(/\s+/)
        .filter(Boolean)
        .reduce((score, token) => score + (haystack.includes(token) ? 7 : 0), 0);

      return {
        ...article,
        score: article.confidence + direct + tokenScore
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}
