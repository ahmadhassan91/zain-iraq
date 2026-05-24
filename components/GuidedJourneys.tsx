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
import { useEffect, useMemo, useState } from "react";
import { useLanguage, type Language } from "@/components/AppChrome";
import { useDemoKnowledge } from "@/lib/demo-state";

type CustomerScenario = {
  id: string;
  label: string;
  query: string;
  intent: string;
  article: string;
  action: string;
  related: string[];
  escalation: string;
};

type Category = {
  label: string;
  detail: string;
  href: string;
};

const customerScenarioCopy: Record<Language, CustomerScenario[]> = {
  EN: [{
    id: "roaming",
    label: "Roaming data",
    query: "customer cannot use data while roaming",
    intent: "Recognize travel + data failure",
    article: "Roaming services, bundles and Q&A",
    action: "Enable data roaming, check bundle via *225#, manually select partner network",
    related: ["Roaming prices", "Helpful tips", "International calls"],
    escalation: "Escalate only after bundle, handset and partner-network checks"
  }, {
    id: "sim",
    label: "SIM/eSIM",
    query: "SIM replacement and eSIM documents",
    intent: "Recognize identity + branch service",
    article: "SIM replacement requirements",
    action: "Show 5,000 IQD SIM swap, 10,000 IQD eSIM, valid ID and *315# store locator",
    related: ["Nearest Zain center", "Ownership documents", "4.5G+ SIM upgrade"],
    escalation: "Route to store when ownership or document checks are required"
  }, {
    id: "billing",
    label: "Balance/payment",
    query: "unexpected balance deduction",
    intent: "Recognize recharge, usage or bill dispute",
    article: "Recharge, balance and postpaid bill support",
    action: "Check balance via *100#, recharge via *101#, then review active services",
    related: ["Pay My Bill", "Recharge card", "Postpaid support"],
    escalation: "Route unresolved dispute to billing queue"
  }, {
    id: "products",
    label: "Bundles",
    query: "Super Card bundle support",
    intent: "Recognize prepaid bundle discovery",
    article: "Super Card and KAFOO bundle support",
    action: "Compare data, minutes, SMS, validity and subscription channel",
    related: ["KAFOO", "Data bundles", "Zain Iraq App"],
    escalation: "Offer live support if eligibility or subscription status is unclear"
  }],
  AR: [{
    id: "roaming",
    label: "بيانات التجوال",
    query: "العميل لا يستطيع استخدام البيانات أثناء التجوال",
    intent: "التعرّف على سفر ومشكلة بيانات",
    article: "خدمات التجوال والباقات والأسئلة الشائعة",
    action: "تفعيل بيانات التجوال، فحص الباقة عبر *225#، واختيار شبكة الشريك يدوياً",
    related: ["أسعار التجوال", "نصائح مفيدة", "المكالمات الدولية"],
    escalation: "صعّد فقط بعد فحص الباقة والجهاز وشبكة الشريك"
  }, {
    id: "sim",
    label: "الشريحة/eSIM",
    query: "مستندات استبدال الشريحة و eSIM",
    intent: "التعرّف على طلب هوية وخدمة فرع",
    article: "متطلبات استبدال الشريحة",
    action: "عرض 5,000 دينار لاستبدال SIM، و10,000 دينار لـ eSIM، والهوية ومحدد الفروع *315#",
    related: ["أقرب مركز زين", "وثائق الملكية", "ترقية شريحة 4.5G+"],
    escalation: "حوّل إلى الفرع عند الحاجة لفحص الملكية أو المستندات"
  }, {
    id: "billing",
    label: "الرصيد/الدفع",
    query: "خصم غير متوقع من الرصيد",
    intent: "التعرّف على شحن أو استخدام أو اعتراض فاتورة",
    article: "دعم الشحن والرصيد وفواتير الدفع الآجل",
    action: "فحص الرصيد عبر *100#، الشحن عبر *101#، ثم مراجعة الخدمات النشطة",
    related: ["دفع الفاتورة", "بطاقة الشحن", "دعم الدفع الآجل"],
    escalation: "حوّل الاعتراض غير المحلول إلى فريق الفوترة"
  }, {
    id: "products",
    label: "الباقات",
    query: "دعم باقة Super Card",
    intent: "التعرّف على بحث العميل عن باقة مسبقة الدفع",
    article: "دعم Super Card و KAFOO",
    action: "مقارنة البيانات والدقائق والرسائل والصلاحية وقناة الاشتراك",
    related: ["KAFOO", "باقات البيانات", "تطبيق زين العراق"],
    escalation: "اعرض دعماً مباشراً إذا كانت الأهلية أو حالة الاشتراك غير واضحة"
  }],
  KU: [{
    id: "roaming",
    label: "داتای ڕۆمینگ",
    query: "کڕیار ناتوانێت داتا بەکاربهێنێت لە کاتی ڕۆمینگ",
    intent: "ناسینی گەشت و کێشەی داتا",
    article: "خزمەتگوزاری ڕۆمینگ، پاکێج و پرسیارە باوەکان",
    action: "داتای ڕۆمینگ چالاک بکە، پاکێج بە *225# بپشکنە و تۆڕی هاوبەش بە دەستی هەڵبژێرە",
    related: ["نرخی ڕۆمینگ", "ئامۆژگاری", "پەیوەندی نێودەوڵەتی"],
    escalation: "تەنها دوای پشکنینی پاکێج، ئامێر و تۆڕی هاوبەش بەرزی بکەوە"
  }, {
    id: "sim",
    label: "SIM/eSIM",
    query: "بەڵگەنامەکانی گۆڕینی SIM و eSIM",
    intent: "ناسینی داواکاری ناسنامە و خزمەتی لق",
    article: "پێداویستییەکانی گۆڕینی SIM",
    action: "5,000 دینار بۆ گۆڕینی SIM، 10,000 دینار بۆ eSIM، ناسنامە و دۆزەرەوەی لق *315# پیشان بدە",
    related: ["نزیکترین ناوەندی زەین", "بەڵگەی خاوەندارێتی", "نوێکردنەوەی SIM ـی 4.5G+"],
    escalation: "کاتێک پشکنینی خاوەندارێتی یان بەڵگەنامە پێویستە بیگوازەوە بۆ لق"
  }, {
    id: "billing",
    label: "باڵانس/پارەدان",
    query: "کەمکردنەوەی چاوەڕواننەکراو لە باڵانس",
    intent: "ناسینی شحن، بەکارهێنان یان ناڕەزایەتی فاتورە",
    article: "پشتگیری شحن، باڵانس و فاتورەی پاشپارە",
    action: "باڵانس بە *100# بپشکنە، شحن بە *101# بکە، پاشان خزمەتە چالاکەکان بپشکنە",
    related: ["پارەدانی فاتورە", "کارتی شحن", "پشتگیری پاشپارە"],
    escalation: "ناڕەزایەتی چارەسەرنەکراو بۆ تیپی پارەدان بنێرە"
  }, {
    id: "products",
    label: "پاکێجەکان",
    query: "پشتگیری پاکێجی Super Card",
    intent: "ناسینی گەڕانی کڕیار بۆ پاکێجی پێشپارە",
    article: "پشتگیری Super Card و KAFOO",
    action: "داتا، خولەک، نامە، ماوە و کەناڵی بەشداربوون بەراورد بکە",
    related: ["KAFOO", "پاکێجی داتا", "ئەپی زەین عێراق"],
    escalation: "ئەگەر شیاوی یان دۆخی بەشداربوون ڕوون نەبوو پشتگیری زیندوو پێشکەش بکە"
  }]
};

const zainCategoryCopy: Record<Language, Category[]> = {
  EN: [
    { label: "Prepaid", detail: "KAFOO, Super Card, data bundles", href: "/customer?topic=prepaid" },
    { label: "Postpaid", detail: "Plans, bills, roaming", href: "/customer?topic=postpaid" },
    { label: "Zain-Fi", detail: "Devices, data offers, Connect SIM", href: "/customer?topic=zain-fi" },
    { label: "Services", detail: "Digital services, apps, devices", href: "/customer?topic=services" },
    { label: "Support", detail: "Knowledge Center, stores, contact", href: "/customer?topic=support" }
  ],
  AR: [
    { label: "مسبق الدفع", detail: "KAFOO و Super Card وباقات البيانات", href: "/customer?topic=prepaid" },
    { label: "الدفع الآجل", detail: "الخطط والفواتير والتجوال", href: "/customer?topic=postpaid" },
    { label: "Zain-Fi", detail: "الأجهزة وعروض البيانات و Connect SIM", href: "/customer?topic=zain-fi" },
    { label: "الخدمات", detail: "خدمات رقمية وتطبيقات وأجهزة", href: "/customer?topic=services" },
    { label: "الدعم", detail: "مركز المعرفة والفروع والتواصل", href: "/customer?topic=support" }
  ],
  KU: [
    { label: "پێشپارە", detail: "KAFOO، Super Card و پاکێجی داتا", href: "/customer?topic=prepaid" },
    { label: "پاشپارە", detail: "پلاندانان، فاتورە و ڕۆمینگ", href: "/customer?topic=postpaid" },
    { label: "Zain-Fi", detail: "ئامێر، پێشکەشکردنی داتا و Connect SIM", href: "/customer?topic=zain-fi" },
    { label: "خزمەتگوزاری", detail: "خزمەتی دیجیتاڵ، ئەپ و ئامێر", href: "/customer?topic=services" },
    { label: "پشتگیری", detail: "ناوەندی زانیاری، لقەکان و پەیوەندی", href: "/customer?topic=support" }
  ]
};

const guidedCopy = {
  EN: {
    demoChip: "Presenter demo path",
    demoTitle: "One telco issue, three role views",
    demoBody: "Start with a customer support question, show the agent resolution workspace, then show how Admin changes the source of truth.",
    customerStep: "Customer",
    customerStepTitle: "Find an answer",
    customerStepBody: "Public KB, Zain categories, app/store/contact channels",
    agentStep: "Agent",
    agentStepTitle: "Resolve the case",
    agentStepBody: "Internal checklist, pinned content, LLM grounded by KB",
    adminStep: "Admin",
    adminStepTitle: "Govern the source",
    adminStepBody: "Publish once, control visibility, monitor content gaps",
    journeyChip: "Zain-style Knowledge Center",
    journeyTitle: "Choose a customer intent",
    journeyBody: "The demo now starts where telecom customers usually start: roaming, SIM/eSIM, balance, bundles, app support and nearby stores.",
    customerLanguage: "Customer language",
    aiIntent: "AI intent",
    kbAnswer: "Zain KB answer",
    nextAction: "Next best action",
    relatedFaqs: "Related FAQs suggested",
    channelsTitle: "Telco support channels included",
    channelsBody: "Guide customers from common service questions to the right answer, action or support channel.",
    industryTailored: "Industry tailored",
    operationalWorkflow: "Operational workflow",
    agentPath: "Agent resolution path",
    agentBody: "The agent journey prioritizes troubleshooting, customer-safe responses, internal notes and escalation readiness.",
    copyReady: "Copy-ready response direction",
    governanceWorkflow: "Governance workflow",
    adminDemo: "Admin cause-and-effect demo",
    adminBody: "Admin actions show how one governed content source changes customer, agent and channel-ready outputs.",
    demoAction: "Demo action",
    selectAction: "Select a workflow action to see the demo impact.",
    sessionState: "POC state is session-based. Production would persist through API, workflow and database services.",
    publishedMessage: "Published demo update applied to the Customer KB and Agent Workspace.",
    remediatedMessage: "Search gap marked as remediated. The demo now shows how future low-confidence queries would be improved.",
    alertMessage: "Alert preview prepared for the customer banner and internal agent advisory.",
    maturityChip: "POC maturity disclosure",
    maturityTitle: "What is live, simulated and next",
    functional: "Functional today",
    functionalBody: "Role routes, guided workflows, multilingual UI, public/internal visibility, Netlify LLM endpoint and API sample contracts.",
    simulated: "Simulated for demo",
    simulatedBody: "RBAC, persistence, analytics logs, feedback storage, article approval workflow and search-gap remediation.",
    production: "Production next",
    productionBody: "Database, semantic/vector search, ingestion pipeline, real auth/RBAC, analytics events and channel integrations."
  },
  AR: {
    demoChip: "مسار عرض للمقدم",
    demoTitle: "مشكلة اتصالات واحدة، ثلاث واجهات حسب الدور",
    demoBody: "ابدأ بسؤال دعم من العميل، ثم اعرض مساحة حل الوكيل، ثم كيف يغيّر المسؤول مصدر المعرفة.",
    customerStep: "العميل",
    customerStepTitle: "العثور على إجابة",
    customerStepBody: "معرفة عامة، فئات زين، التطبيق، الفروع وقنوات التواصل",
    agentStep: "الوكيل",
    agentStepTitle: "حل الحالة",
    agentStepBody: "قائمة فحص داخلية، محتوى مثبت ومساعد LLM مستند إلى المعرفة",
    adminStep: "المسؤول",
    adminStepTitle: "حوكمة المصدر",
    adminStepBody: "نشر مرة واحدة، ضبط الرؤية ومتابعة فجوات المحتوى",
    journeyChip: "مركز معرفة بأسلوب زين",
    journeyTitle: "اختر نية العميل",
    journeyBody: "يبدأ العرض من المواضع التي يبدأ منها عملاء الاتصالات عادة: التجوال، الشريحة، الرصيد، الباقات، التطبيق والفروع القريبة.",
    customerLanguage: "لغة العميل",
    aiIntent: "نية الذكاء الاصطناعي",
    kbAnswer: "إجابة معرفة زين",
    nextAction: "أفضل إجراء تالٍ",
    relatedFaqs: "أسئلة مرتبطة مقترحة",
    channelsTitle: "قنوات دعم الاتصالات المشمولة",
    channelsBody: "وجّه العملاء من أسئلة الخدمة الشائعة إلى الإجابة أو الإجراء أو قناة الدعم المناسبة.",
    industryTailored: "مصمم للقطاع",
    operationalWorkflow: "سير عمل تشغيلي",
    agentPath: "مسار حل الوكيل",
    agentBody: "تركز رحلة الوكيل على استكشاف الأخطاء، الرد الآمن للعميل، الملاحظات الداخلية وجاهزية التصعيد.",
    copyReady: "اتجاه رد جاهز للنسخ",
    governanceWorkflow: "سير عمل الحوكمة",
    adminDemo: "عرض تأثير إجراءات المسؤول",
    adminBody: "توضح إجراءات المسؤول كيف يغيّر مصدر معرفة واحد مخرجات العميل والوكيل والقنوات.",
    demoAction: "إجراء العرض",
    selectAction: "اختر إجراء سير العمل لرؤية تأثير العرض.",
    sessionState: "حالة POC مؤقتة للجلسة. في الإنتاج تُحفظ عبر API وسير العمل وقاعدة البيانات.",
    publishedMessage: "تم تطبيق تحديث العرض على معرفة العميل ومساحة الوكيل.",
    remediatedMessage: "تمت معالجة فجوة البحث. يوضح العرض كيف تتحسن الاستفسارات منخفضة الثقة مستقبلاً.",
    alertMessage: "تم تجهيز معاينة التنبيه لشريط العميل والتنبيه الداخلي للوكيل.",
    maturityChip: "توضيح نضج POC",
    maturityTitle: "ما هو مباشر، وما هو محاكى، وما التالي",
    functional: "يعمل اليوم",
    functionalBody: "مسارات الأدوار، سير العمل الموجه، واجهة متعددة اللغات، الرؤية العامة/الداخلية، نقطة LLM في Netlify وعقود API نموذجية.",
    simulated: "محاكى للعرض",
    simulatedBody: "الصلاحيات، التخزين، سجلات التحليلات، حفظ الملاحظات، سير اعتماد المقالات ومعالجة فجوات البحث.",
    production: "التالي للإنتاج",
    productionBody: "قاعدة بيانات، بحث دلالي/متجهي، خط إدخال محتوى، صلاحيات حقيقية، أحداث تحليلات وتكاملات القنوات."
  },
  KU: {
    demoChip: "ڕێڕەوی نمایش بۆ پێشکەشکار",
    demoTitle: "یەک کێشەی پەیوەندی، سێ دیمەنی ڕۆڵ",
    demoBody: "لە پرسیاری پشتگیری کڕیارەوە دەست پێ بکە، دواتر شوێنی چارەسەری ئەجێنت پیشان بدە، پاشان چۆن بەڕێوەبەر سەرچاوەی زانیاری دەگۆڕێت.",
    customerStep: "کڕیار",
    customerStepTitle: "وەڵام بدۆزەوە",
    customerStepBody: "زانیاری گشتی، پۆلەکانی زەین، ئەپ، لق و کەناڵی پەیوەندی",
    agentStep: "ئەجێنت",
    agentStepTitle: "حاڵەتەکە چارەسەر بکە",
    agentStepBody: "لیستی پشکنینی ناوخۆ، ناوەڕۆکی جێگیر و یاریدەدەری LLM پشتبەستوو بە زانیاری",
    adminStep: "بەڕێوەبەر",
    adminStepTitle: "حوکمرانی سەرچاوە",
    adminStepBody: "یەکجار بڵاو بکەوە، بینین کۆنترۆڵ بکە و کەلێنی ناوەڕۆک چاودێری بکە",
    journeyChip: "ناوەندی زانیاری بە شێوازی زەین",
    journeyTitle: "مەبەستی کڕیار هەڵبژێرە",
    journeyBody: "نمایشەکە لەو شوێنانەوە دەست پێ دەکات کە کڕیارانی پەیوەندی زۆرجار لێی دەست پێ دەکەن: ڕۆمینگ، SIM/eSIM، باڵانس، پاکێج، پشتگیری ئەپ و لقە نزیکەکان.",
    customerLanguage: "زمانی کڕیار",
    aiIntent: "مەبەستی AI",
    kbAnswer: "وەڵامی زانیاری زەین",
    nextAction: "باشترین هەنگاوی دواتر",
    relatedFaqs: "پرسیاری پەیوەندیدار پێشنیارکراو",
    channelsTitle: "کەناڵەکانی پشتگیری پەیوەندی",
    channelsBody: "کڕیاران لە پرسیارە باوەکانی خزمەتەوە بەرەو وەڵام، کردار یان کەناڵی پشتگیری گونجاو ڕێنمایی بکە.",
    industryTailored: "تایبەت بە بوارەکە",
    operationalWorkflow: "ڕەوتی کارکردنی ئۆپەراسیۆن",
    agentPath: "ڕێڕەوی چارەسەری ئەجێنت",
    agentBody: "گەشتی ئەجێنت گرنگی بە چارەسەری کێشە، وەڵامی پارێزراوی کڕیار، تێبینی ناوخۆ و ئامادگی بەرزکردنەوە دەدات.",
    copyReady: "ئاراستەی وەڵامی ئامادە بۆ کۆپی",
    governanceWorkflow: "ڕەوتی حوکمرانی",
    adminDemo: "نمایشی کاریگەری کرداری بەڕێوەبەر",
    adminBody: "کردارەکانی بەڕێوەبەر پیشان دەدات چۆن یەک سەرچاوەی زانیاری دەرچووی کڕیار، ئەجێنت و کەناڵەکان دەگۆڕێت.",
    demoAction: "کرداری نمایش",
    selectAction: "کرداری ڕەوت هەڵبژێرە بۆ بینینی کاریگەری نمایش.",
    sessionState: "دۆخی POC تایبەتە بە دانیشتن. لە بەرهەمدا لە ڕێگەی API، ڕەوتی کار و بنکەدراوە هەڵدەگیرێت.",
    publishedMessage: "نوێکاری نمایش بۆ زانیاری کڕیار و شوێنی کاری ئەجێنت جێبەجێ کرا.",
    remediatedMessage: "کەلێنی گەڕان چارەسەر کرا. نمایشەکە پیشان دەدات پرسیاری کەم متمانە لە داهاتوودا چۆن باشتر دەبێت.",
    alertMessage: "پێشبینینی ئاگادارکردنەوە بۆ بەندی کڕیار و ئاگاداری ناوخۆی ئەجێنت ئامادە کرا.",
    maturityChip: "ڕوونکردنەوەی ئاستی POC",
    maturityTitle: "چی زیندووە، چی نمایشە و چی دواترە",
    functional: "ئەمڕۆ کاردەکات",
    functionalBody: "ڕێڕەوی ڕۆڵەکان، ڕەوتە ڕێنماییکراوەکان، UI چەندزمانە، بینینی گشتی/ناوخۆ، خاڵی LLM لە Netlify و گرێبەستی نموونەی API.",
    simulated: "بۆ نمایش هاوشێوەکراوە",
    simulatedBody: "RBAC، هەڵگرتن، تۆمارەکانی شیکاری، هەڵگرتنی بۆچوون، ڕەوتی پەسەندکردنی بابەت و چارەسەری کەلێنی گەڕان.",
    production: "دواتر بۆ بەرهەم",
    productionBody: "بنکەدراوە، گەڕانی مانایی/ڤێکتەر، ڕەوتی هێنانی ناوەڕۆک، ڕۆڵ و مۆڵەتی ڕاستەقینە، ڕووداوی شیکاری و یەکخستنی کەناڵەکان."
  }
} satisfies Record<Language, Record<string, string>>;

export function DemoPathNav({ current }: { current: "customer" | "agent" | "admin" }) {
  const { language } = useLanguage();
  const copy = guidedCopy[language];
  const steps = [
    { href: "/customer", label: copy.customerStep, key: "customer", title: copy.customerStepTitle, body: copy.customerStepBody },
    { href: "/agent", label: copy.agentStep, key: "agent", title: copy.agentStepTitle, body: copy.agentStepBody },
    { href: "/admin", label: copy.adminStep, key: "admin", title: copy.adminStepTitle, body: copy.adminStepBody }
  ];

  return (
    <section className="demo-path" aria-label="POC presenter demo path">
      <div>
        <span className="chip advisory">{copy.demoChip}</span>
        <h2>{copy.demoTitle}</h2>
        <p className="muted">{copy.demoBody}</p>
      </div>
      <div className="demo-path-steps">
        {steps.map((step, index) => (
          <Link className={`demo-step ${current === step.key ? "active" : ""}`} href={step.href} key={step.key}>
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
  const { language } = useLanguage();
  const copy = guidedCopy[language];
  const customerScenarios = customerScenarioCopy[language];
  const zainCategories = zainCategoryCopy[language];
  const [active, setActive] = useState(customerScenarios[0].id);
  const scenario = customerScenarios.find((item) => item.id === active) ?? customerScenarios[0];

  return (
    <section className="guided-journey customer-journey">
      <div className="journey-heading">
        <div>
          <span className="chip magenta">{copy.journeyChip}</span>
          <h2>{copy.journeyTitle}</h2>
          <p className="muted">{copy.journeyBody}</p>
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
          <span className="small">{copy.customerLanguage}</span>
          <strong>{scenario.query}</strong>
        </div>
        <div className="journey-step-card">
          <Bot size={18} />
          <span className="small">{copy.aiIntent}</span>
          <strong>{scenario.intent}</strong>
        </div>
        <div className="journey-step-card">
          <CheckCircle2 size={18} />
          <span className="small">{copy.kbAnswer}</span>
          <strong>{scenario.article}</strong>
        </div>
        <div className="journey-step-card">
          <ArrowRight size={18} />
          <span className="small">{copy.nextAction}</span>
          <strong>{scenario.action}</strong>
        </div>
      </div>

      <div className="journey-resolution">
        <div>
          <h3>{copy.relatedFaqs}</h3>
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

const supportChannelCopy = {
  EN: [{
    icon: Smartphone,
    title: "Zain Iraq App",
    body: "Manage account, check balance, subscribe to bundles and pay bills from the customer channel."
  }, {
    icon: MapPin,
    title: "Stores and service centers",
    body: "Route branch-required tasks like SIM/eSIM replacement, documents and ownership verification."
  }, {
    icon: CreditCard,
    title: "USSD and SMS actions",
    body: "Surface codes such as *100# balance, *101# recharge and *225# roaming usage where relevant."
  }, {
    icon: Wifi,
    title: "Network support",
    body: "Handle APN, 4.5G+, device, data bundle and coverage troubleshooting without mixing it into billing."
  }],
  AR: [{
    icon: Smartphone,
    title: "تطبيق زين العراق",
    body: "إدارة الحساب، فحص الرصيد، الاشتراك بالباقات ودفع الفواتير من قناة العميل."
  }, {
    icon: MapPin,
    title: "الفروع ومراكز الخدمة",
    body: "توجيه المهام التي تحتاج فرعاً مثل استبدال SIM/eSIM والمستندات والتحقق من الملكية."
  }, {
    icon: CreditCard,
    title: "إجراءات USSD و SMS",
    body: "إظهار أكواد مثل *100# للرصيد، *101# للشحن و *225# لاستخدام التجوال عند الحاجة."
  }, {
    icon: Wifi,
    title: "دعم الشبكة",
    body: "معالجة APN و 4.5G+ والجهاز وباقة البيانات والتغطية بدون خلطها مع الفوترة."
  }],
  KU: [{
    icon: Smartphone,
    title: "ئەپی زەین عێراق",
    body: "بەڕێوەبردنی هەژمار، پشکنینی باڵانس، بەشداربوون لە پاکێج و پارەدانی فاتورە لە کەناڵی کڕیارەوە."
  }, {
    icon: MapPin,
    title: "لق و ناوەندی خزمەت",
    body: "ئەرکە پێویست بە لقەکان ڕێنمایی بکە وەک گۆڕینی SIM/eSIM، بەڵگەنامە و پشتڕاستکردنەوەی خاوەندارێتی."
  }, {
    icon: CreditCard,
    title: "کردارەکانی USSD و SMS",
    body: "کۆدەکان پیشان بدە وەک *100# بۆ باڵانس، *101# بۆ شحن و *225# بۆ بەکارهێنانی ڕۆمینگ."
  }, {
    icon: Wifi,
    title: "پشتگیری تۆڕ",
    body: "APN، 4.5G+، ئامێر، پاکێجی داتا و داپۆشین چارەسەر بکە بەبێ تێکەڵکردن لەگەڵ پارەدان."
  }]
} satisfies Record<Language, Array<{ icon: typeof Smartphone; title: string; body: string }>>;

export function SupportChannelPanel() {
  const { language } = useLanguage();
  const copy = guidedCopy[language];
  const supportChannels = supportChannelCopy[language];

  return (
    <section className="section">
      <div className="section-title">
        <div>
          <h2>{copy.channelsTitle}</h2>
          <p className="muted">{copy.channelsBody}</p>
        </div>
        <span className="chip published">{copy.industryTailored}</span>
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
  const { language } = useLanguage();
  const copy = guidedCopy[language];
  const [active, setActive] = useState("roaming");
  const workflows = useMemo(
    () =>
      ({
        EN: {
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
        },
        AR: {
          roaming: {
            title: "حل شكوى التجوال",
            agentId: "roaming",
            query: "العميل لا يستطيع استخدام البيانات أثناء التجوال",
            steps: ["تأكيد الوجهة وباقة التجوال", "فحص بيانات التجوال في الجهاز", "التحقق من اتصال شبكة الشريك", "إرسال رد آمن للعميل", "التصعيد فقط بعد فحص الأهلية"],
            response: "اطلب من العميل إعادة تشغيل الجهاز، تفعيل بيانات التجوال واختيار شبكة شريك يدوياً."
          },
          escalation: {
            title: "سير عمل التصعيد",
            agentId: "technical",
            query: "بطء الإنترنت يحتاج تصعيداً فنياً",
            steps: ["التحقق من APN", "فحص الرصيد وأولوية العرض النشط", "مراجعة التغطية وحالة الشريحة", "جمع أدلة الاستكشاف المطلوبة", "فتح تذكرة شبكة إذا لم تُحل المشكلة"],
            response: "صعّد مع إرفاق فحوصات APN والرصيد والتغطية والجهاز."
          },
          restricted: {
            title: "الوصول إلى محتوى مقيد",
            agentId: "enterprise",
            query: "دعم enterprise push to x",
            steps: ["تغيير شخصية الوكيل", "تطبيق رؤية المجموعة", "عرض مقال PTX خاص", "إخفاء المحتوى المقيد عن العميل", "التوجيه إلى فريق دعم الأعمال"],
            response: "يرى وكلاء دعم الأعمال إرشادات PTX التي لا تظهر للعملاء العامين."
          }
        },
        KU: {
          roaming: {
            title: "چارەسەری سکاڵای ڕۆمینگ",
            agentId: "roaming",
            query: "کڕیار ناتوانێت داتا بەکاربهێنێت لە کاتی ڕۆمینگ",
            steps: ["شوێنی گەشت و پاکێجی ڕۆمینگ پشتڕاست بکە", "داتای ڕۆمینگ لە ئامێر بپشکنە", "پەیوەندی تۆڕی هاوبەش پشتڕاست بکە", "وەڵامی پارێزراو بۆ کڕیار بنێرە", "تەنها دوای پشکنینی شیاوی بەرزی بکەوە"],
            response: "داوا لە کڕیار بکە ئامێرەکە دووبارە پێبکاتەوە، داتای ڕۆمینگ چالاک بکات و تۆڕی هاوبەش بە دەستی هەڵبژێرێت."
          },
          escalation: {
            title: "ڕەوتی بەرزکردنەوە",
            agentId: "technical",
            query: "ئینتەرنێتی خاو پێویستی بە بەرزکردنەوەی تەکنیکی هەیە",
            steps: ["APN پشتڕاست بکە", "باڵانس و گرنگی پێشکەشکردنی چالاک بپشکنە", "داپۆشین و دۆخی SIM بپشکنە", "بەڵگەی پێویستی چارەسەری کێشە کۆبکەوە", "ئەگەر چارەسەر نەبوو تیکەتی تۆڕ بکەوە"],
            response: "لەگەڵ پشکنینی APN، باڵانس، داپۆشین و ئامێر بەرزی بکەوە."
          },
          restricted: {
            title: "دەستگەیشتن بە ناوەڕۆکی سنووردار",
            agentId: "enterprise",
            query: "پشتگیری enterprise push to x",
            steps: ["کەسایەتی ئەجێنت بگۆڕە", "بینینی گرووپ جێبەجێ بکە", "بابەتی تایبەتی PTX پیشان بدە", "ناوەڕۆکی سنووردار لە کڕیار بشارەوە", "بۆ تیپی پشتگیری بازرگانی ڕێنمایی بکە"],
            response: "ئەجێنتەکانی پشتگیری بازرگانی ڕێنمایی PTX دەبینن کە کڕیارانی گشتی نایبینن."
          }
        }
      }[language]),
    [language]
  );
  const workflow = workflows[active as keyof typeof workflows];

  return (
    <section className="guided-journey agent-journey">
      <div className="journey-heading">
        <div>
          <span className="chip published">{copy.operationalWorkflow}</span>
          <h2>{copy.agentPath}</h2>
          <p className="muted">{copy.agentBody}</p>
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
          <span className="small">{copy.copyReady}</span>
          <strong>{workflow.response}</strong>
        </div>
      </div>
    </section>
  );
}

export function AdminWorkflowPanel() {
  const { language } = useLanguage();
  const copy = guidedCopy[language];
  const { publishUpdate } = useDemoKnowledge();
  const [active, setActive] = useState("publish");
  const [actionMessage, setActionMessage] = useState(copy.selectAction);
  const workflows = {
    EN: {
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
    },
    AR: {
      publish: {
        title: "نشر تحديث",
        icon: FilePlus2,
        steps: ["تعديل مقال التجوال", "ضبط رؤية العميل والوكيل", "نشر التحديث المعتمد", "تحديث إجابة العميل", "تحديث إجراء الوكيل الداخلي"],
        action: "نشر تحديث العرض"
      },
      remediation: {
        title: "معالجة بحث فاشل",
        icon: Search,
        steps: ["مراجعة عمليات البحث الفاشلة", "تحديد استفسار تجوال منخفض الثقة", "إنشاء إجابة معرفة ناقصة", "اعتمادها ونشرها", "تحسين عمليات البحث التالية"],
        action: "تسجيل الفجوة كمعالجة"
      },
      notification: {
        title: "إدارة التنبيهات",
        icon: RadioTower,
        steps: ["إنشاء تنبيه انقطاع", "اختيار جمهور العميل والوكيل", "جدولة شريط الموقع", "نشر تنبيه داخلي", "قياس الإقرار"],
        action: "معاينة تأثير التنبيه"
      }
    },
    KU: {
      publish: {
        title: "بڵاوکردنەوەی نوێکاری",
        icon: FilePlus2,
        steps: ["بابەتی ڕۆمینگ دەستکاری بکە", "بینینی کڕیار و ئەجێنت ڕێکبخە", "نوێکاری پەسەندکراو بڵاو بکەوە", "وەڵامی کڕیار نوێ دەبێتەوە", "ڕێکاری ناوخۆی ئەجێنت نوێ دەبێتەوە"],
        action: "بڵاوکردنەوەی نوێکاری نمایش"
      },
      remediation: {
        title: "چارەسەری گەڕانی سەرنەکەوتوو",
        icon: Search,
        steps: ["گەڕانە سەرنەکەوتووەکان بپشکنە", "پرسیاری ڕۆمینگ بە متمانەی کەم دیاری بکە", "وەڵامی زانیاری کەم دروست بکە", "پەسەند و بڵاو بکەوە", "گەڕانەکانی داهاتوو باشتر دەبن"],
        action: "کەلێنەکە وەک چارەسەرکراو تۆمار بکە"
      },
      notification: {
        title: "بەڕێوەبردنی ئاگاداری",
        icon: RadioTower,
        steps: ["ئاگاداری پچڕانی خزمەت دروست بکە", "جەماوەری کڕیار و ئەجێنت هەڵبژێرە", "بەندی ماڵپەڕ کات بۆ دابنێ", "ئاگاداری ناوخۆ بڵاو بکەوە", "دانپێدان بپێوە"],
        action: "پێشبینینی کاریگەری ئاگاداری"
      }
    }
  }[language];
  const workflow = workflows[active as keyof typeof workflows];
  const Icon = workflow.icon;

  useEffect(() => {
    setActionMessage(copy.selectAction);
  }, [copy.selectAction]);

  const handleWorkflowAction = () => {
    if (active === "publish") {
      publishUpdate();
      setActionMessage(copy.publishedMessage);
      return;
    }

    if (active === "remediation") {
      setActionMessage(copy.remediatedMessage);
      return;
    }

    setActionMessage(copy.alertMessage);
  };

  return (
    <section className="guided-journey admin-journey">
      <div className="journey-heading">
        <div>
          <span className="chip magenta">{copy.governanceWorkflow}</span>
          <h2>{copy.adminDemo}</h2>
          <p className="muted">{copy.adminBody}</p>
        </div>
        <div className="scenario-tabs compact" role="tablist" aria-label="Admin workflows">
          {Object.entries(workflows).map(([key, item]) => (
            <button
              className={active === key ? "active" : ""}
              key={key}
              onClick={() => {
                setActive(key);
                setActionMessage(copy.selectAction);
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
          <span className="small">{copy.demoAction}</span>
          <button className="btn primary" onClick={handleWorkflowAction} type="button">
            {workflow.action}
          </button>
          <p className="small success-text">{actionMessage}</p>
          <p className="small">{copy.sessionState}</p>
        </div>
      </div>
    </section>
  );
}

export function PocMaturityPanel() {
  const { language } = useLanguage();
  const copy = guidedCopy[language];

  return (
    <section className="maturity-panel">
      <div>
        <span className="chip advisory">
          <AlertTriangle size={14} />
          {copy.maturityChip}
        </span>
        <h2>{copy.maturityTitle}</h2>
      </div>
      <div className="maturity-grid">
        <div>
          <strong>{copy.functional}</strong>
          <p>{copy.functionalBody}</p>
        </div>
        <div>
          <strong>{copy.simulated}</strong>
          <p>{copy.simulatedBody}</p>
        </div>
        <div>
          <strong>{copy.production}</strong>
          <p>{copy.productionBody}</p>
        </div>
      </div>
    </section>
  );
}
