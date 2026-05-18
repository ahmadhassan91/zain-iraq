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
    pinned: ["app-login", "super-card"]
  },
  {
    id: "enterprise",
    name: "Ali Rahman",
    role: "Care Agent - Enterprise/PTX",
    skill: "Business services, Push-to-X and corporate support",
    group: "Business Support",
    initials: "AR",
    color: "purple",
    pinned: ["push-to-x", "international-calls"]
  }
];

export const articles: Article[] = [
  {
    id: "roaming-activation",
    title: "Roaming bundles and data setup",
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
    summary: "Public guidance for roaming bundle selection, device data roaming and usage checks while abroad.",
    customerAnswer: "Before travelling, review the available roaming bundles for your destination, subscribe to the preferred bundle and make sure data roaming is enabled from your handset settings. Zain Iraq customers can check roaming offers and usage details through *225#.",
    internalNote: "If roaming data fails, verify bundle activation, destination/operator coverage, data roaming handset setting, partner network attachment and whether credit-balance internet was disabled for protection.",
    steps: ["Confirm roaming bundle and destination", "Ask customer to enable data roaming on handset", "Check usage or offers through *225#", "Manually select a partner network if needed", "Escalate only after eligibility and partner attach checks"],
    updatedAt: "2026-05-12"
  },
  {
    id: "slow-internet",
    title: "4.5G+ internet recharge cards",
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
    summary: "Support flow for prepaid internet recharge cards, balance checks and 4.5G+ usage questions.",
    customerAnswer: "Zain Iraq prepaid internet cards include weekly and monthly data options. Recharge using the standard *101# card-number method, and check internet balance by sending an empty SMS to 21777.",
    internalNote: "Confirm card validity, remaining data balance, free social eligibility, APN/device status and whether another active internet offer has priority before raising a network ticket.",
    steps: ["Confirm card type and validity", "Ask customer to check balance via empty SMS to 21777", "Validate APN and mobile data settings", "Check whether another internet offer has usage priority", "Escalate only after coverage and SIM checks"],
    updatedAt: "2026-05-10"
  },
  {
    id: "sim-replacement",
    title: "eSIM and SIM replacement support",
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
    summary: "Customer guidance for eSIM availability, SIM replacement and branch-assisted ownership verification.",
    customerAnswer: "Zain Iraq offers eSIM as a digital version of the regular SIM. For SIM replacement or ownership-sensitive updates, visit a Zain branch with valid ID so the branch team can verify the request.",
    internalNote: "Keep ownership checks internal. For eSIM or replacement cases, confirm device support, line status and branch requirement without exposing verification rules publicly.",
    steps: ["Confirm whether the request is eSIM, lost SIM or damaged SIM", "Check device support for eSIM where relevant", "Guide customer to nearest branch for ownership verification", "Record the interaction note"],
    updatedAt: "2026-05-08"
  },
  {
    id: "app-login",
    title: "MyZain app and self-service access",
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
    summary: "Support flow for MyZain sign-in, app access, OTP and self-service journeys.",
    customerAnswer: "Use the Zain Iraq app or MyZain access for account self-service. If login fails, update the app, confirm your number is active, request a new OTP and make sure SMS reception is working.",
    internalNote: "If multiple users report OTP or login delays, check digital incident status before opening individual escalation tickets.",
    steps: ["Confirm app version", "Validate active line", "Retry OTP", "Check SMS reception", "Escalate to digital support if issue persists"],
    updatedAt: "2026-05-14"
  },
  {
    id: "balance-deduction",
    title: "Customer care and bill support",
    category: "Billing",
    type: "FAQ",
    language: "English",
    status: "Published",
    visibility: "Agent",
    confidence: 86,
    views: 1726,
    helpful: 82,
    tags: ["billing", "balance", "support", "bill"],
    channelVariants: ["Agent Portal", "WhatsApp"],
    summary: "Guidance for customer care contact routes, postpaid billing help and account support.",
    customerAnswer: "For general support, Zain Iraq customers can call Customer Care at 107. Postpaid customers can use 307, and bill-related requests may be handled through Zain support channels or branches.",
    internalNote: "For billing cases, check line type, recent usage, active subscriptions, bill status and account ownership before sharing next steps.",
    steps: ["Identify prepaid, postpaid or corporate line", "Confirm the customer request type", "Review bill or usage history", "Route to 107, 307, branch or billing queue as appropriate", "Escalate unresolved billing disputes"],
    updatedAt: "2026-05-07"
  },
  {
    id: "international-calls",
    title: "International calls and roaming prices",
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
    summary: "Explain international call basics and how customers should confirm rates by destination or offer.",
    customerAnswer: "International and roaming rates depend on destination, visited network and active package. Customers should confirm the latest destination rates or bundle details before travelling or placing international calls.",
    internalNote: "Do not quote unverified rates from memory. Use approved commercial/rate sources and confirm whether the customer is asking about local, international, flight or maritime roaming.",
    steps: ["Confirm destination and call direction", "Check line type and active package", "Use approved rate source", "Explain that prices vary by network and offer", "Escalate unusual charging disputes"],
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
    summary: "Public FAQ for Super Card bundles, recharge channels, renewal and remaining units.",
    customerAnswer: "Super Card bundles include data, local minutes and SMS with weekly or monthly validity. Customers can recharge using the standard recharge method, voice instructions on 116, the Zain Iraq app, or supported subscription channels.",
    internalNote: "Confirm the selected Super Card tier, subscription/unsubscription code, renewal status and remaining units before advising the customer.",
    steps: ["Identify selected Super Card tier", "Confirm recharge or subscription channel", "Check remaining units and validity", "Explain renewal or unsubscription status", "Escalate only if charging history does not match bundle rules"],
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
