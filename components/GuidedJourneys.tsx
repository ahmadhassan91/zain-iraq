"use client";

import {
  FilePlus2,
  RadioTower,
  Search,
  ShieldCheck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage, type Language } from "@/components/AppChrome";
import { useDemoKnowledge } from "@/lib/demo-state";

const guidedCopy = {
  EN: {
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
    alertMessage: "Alert preview prepared for the customer banner and internal agent advisory."
  },
  AR: {
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
    alertMessage: "تم تجهيز معاينة التنبيه لشريط العميل والتنبيه الداخلي للوكيل."
  },
  KU: {
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
    alertMessage: "پێشبینینی ئاگادارکردنەوە بۆ بەندی کڕیار و ئاگاداری ناوخۆ ئامادە کرا."
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
