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


