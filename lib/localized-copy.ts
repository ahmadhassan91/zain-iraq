import type { Agent, Announcement, Article } from "./data";
import type { Language } from "@/components/AppChrome";

export const customerCopy = {
  EN: {
    query: "How do I activate roaming?",
    heroTitle: "How can we help you today?",
    heroBody: "Search Zain Iraq support content across roaming, bundles, SIM services, internet, app support and business FAQs.",
    search: "Search",
    searched: "Searched",
    bestMatches: "Best matches",
    aiRanked: "AI ranked results",
    whatsNew: "What's New",
    missingTitle: "What are we missing?",
    missingPlaceholder: "Tell us what support content you could not find.",
    submitFeedback: "Submit feedback",
    feedbackSubmitted: "Feedback submitted",
    trending: "Trending FAQs and most viewed",
    views: "views",
    helpful: "helpful"
  },
  AR: {
    query: "كيف أفعّل خدمة التجوال؟",
    heroTitle: "كيف يمكننا مساعدتك اليوم؟",
    heroBody: "ابحث في محتوى دعم زين العراق حول التجوال، الباقات، خدمات الشريحة، الإنترنت، التطبيق، والأسئلة الخاصة بالأعمال.",
    search: "بحث",
    searched: "تم البحث",
    bestMatches: "أفضل النتائج",
    aiRanked: "نتائج مرتبة بالذكاء الاصطناعي",
    whatsNew: "ما الجديد",
    missingTitle: "ما المحتوى غير المتوفر؟",
    missingPlaceholder: "أخبرنا عن محتوى الدعم الذي لم تتمكن من العثور عليه.",
    submitFeedback: "إرسال الملاحظات",
    feedbackSubmitted: "تم إرسال الملاحظات",
    trending: "الأسئلة الشائعة والأكثر مشاهدة",
    views: "مشاهدة",
    helpful: "مفيد"
  },
  KU: {
    query: "چۆن ڕۆمینگ چالاک بکەم؟",
    heroTitle: "ئەمڕۆ چۆن دەتوانین یارمەتیت بدەین؟",
    heroBody: "لە ناوەڕۆکی پشتگیری زەین عێراق بگەڕێ بۆ ڕۆمینگ، پاکێجەکان، خزمەتگوزاری SIM، ئینتەرنێت، ئەپ و پرسیارەکانی کار.",
    search: "گەڕان",
    searched: "گەڕا",
    bestMatches: "باشترین ئەنجامەکان",
    aiRanked: "ئەنجامە ڕیزکراوەکانی AI",
    whatsNew: "چی نوێیە",
    missingTitle: "چی کەمە؟",
    missingPlaceholder: "پێمان بڵێ کام ناوەڕۆکی پشتگیریت نەدۆزییەوە.",
    submitFeedback: "ناردنی بۆچوون",
    feedbackSubmitted: "بۆچوون نێردرا",
    trending: "FAQ و بابەتە زۆر بینراوەکان",
    views: "بینین",
    helpful: "یارمەتیدەر"
  }
} satisfies Record<Language, Record<string, string>>;

export const agentCopy = {
  EN: {
    query: "customer cannot use data while roaming",
    title: "Agent assist workspace",
    search: "Search",
    searched: "Searched",
    category: "Category",
    language: "Language",
    status: "Status",
    channel: "Channel",
    contentType: "Content type",
    ranked: "Ranked knowledge results",
    confidence: "Confidence score included",
    updates: "Operational updates",
    pinned: "Personal pinned content",
    tabs: "Open article tabs"
  },
  AR: {
    query: "العميل لا يستطيع استخدام البيانات أثناء التجوال",
    title: "مساحة مساعدة الوكيل",
    search: "بحث",
    searched: "تم البحث",
    category: "الفئة",
    language: "اللغة",
    status: "الحالة",
    channel: "القناة",
    contentType: "نوع المحتوى",
    ranked: "نتائج المعرفة المرتبة",
    confidence: "يتضمن درجة الثقة",
    updates: "تحديثات تشغيلية",
    pinned: "محتوى مثبت للوكيل",
    tabs: "المقالات المفتوحة"
  },
  KU: {
    query: "کڕیار ناتوانێت داتا بەکاربهێنێت لە کاتی ڕۆمینگ",
    title: "شوێنی یارمەتی ئەجێنت",
    search: "گەڕان",
    searched: "گەڕا",
    category: "پۆل",
    language: "زمان",
    status: "دۆخ",
    channel: "کەناڵ",
    contentType: "جۆری ناوەڕۆک",
    ranked: "ئەنجامە ڕیزکراوەکانی زانیاری",
    confidence: "نمرەی متمانە لەگەڵدایە",
    updates: "نوێکارییە کارگێڕییەکان",
    pinned: "ناوەڕۆکی جێگیرکراوی تایبەت",
    tabs: "بابەتە کراوەکان"
  }
} satisfies Record<Language, Record<string, string>>;

const articleTranslations: Record<string, Partial<Record<Language, Partial<Article>>>> = {
  "roaming-activation": {
    AR: {
      title: "كيفية تفعيل التجوال",
      category: "التجوال",
      summary: "إرشاد العملاء لفحص جاهزية التجوال وخطوات التفعيل والدعم أثناء السفر."
    },
    KU: {
      title: "چۆنیەتی چالاککردنی ڕۆمینگ",
      category: "ڕۆمینگ",
      summary: "ڕێنمایی کڕیار بۆ ئامادەیی ڕۆمینگ، پشکنینی چالاککردن و پشتگیری گەشت."
    }
  },
  "slow-internet": {
    AR: {
      title: "بطء الإنترنت أو عدم توفر البيانات",
      category: "الدعم الفني",
      summary: "تدفق فني منظم لمشاكل بطء البيانات، انقطاع الإنترنت وإعدادات APN."
    },
    KU: {
      title: "خاوبوونی ئینتەرنێت یان نەبوونی داتا",
      category: "پشتگیری تەکنیکی",
      summary: "ڕێکاری تەکنیکی بۆ خاو داتا، نەبوونی ئینتەرنێت و کێشەکانی APN."
    }
  },
  "sim-replacement": {
    AR: {
      title: "إجراءات استبدال الشريحة",
      category: "خدمات الشريحة",
      summary: "إرشادات الوكيل والعميل لاستبدال الشريحة التالفة أو المفقودة أو المحدثة."
    },
    KU: {
      title: "پرۆسەی گۆڕینی سیم کارت",
      category: "خزمەتگوزاری SIM",
      summary: "ڕێنمایی ئەجێنت و کڕیار بۆ گۆڕینی سیم کارت لە کاتی تێکچوون، ونبوون یان نوێکردنەوە."
    }
  },
  "app-login": {
    AR: {
      title: "مشكلة تسجيل الدخول إلى تطبيق زين العراق",
      category: "القنوات الرقمية",
      summary: "تدفق دعم لمشاكل تسجيل الدخول، رمز OTP، كلمة المرور والجهاز."
    },
    KU: {
      title: "کێشەی چوونەژوورەوەی ئەپی زەین عێراق",
      category: "کەناڵە دیجیتاڵەکان",
      summary: "پشتگیری بۆ چوونەژوورەوە، OTP، وشەی نهێنی و کێشەی ئامێر."
    }
  },
  "balance-deduction": {
    AR: {
      title: "خصم غير متوقع من الرصيد",
      category: "الفوترة",
      summary: "إرشادات للوكيل عند مراجعة شكاوى خصم الرصيد."
    },
    KU: {
      title: "کەمبوونەوەی چاوەڕواننەکراوی باڵانس",
      category: "پارەدان",
      summary: "ڕێنمایی ئەجێنت بۆ پشکنینی سکاڵای کەمبوونەوەی باڵانس."
    }
  }
};

const announcementTranslations: Record<string, Partial<Record<Language, Partial<Announcement>>>> = {
  "network-maintenance": {
    AR: {
      title: "صيانة مخطط لها في بغداد",
      message: "قد يلاحظ بعض العملاء انقطاعاً متقطعاً في خدمة البيانات بين 01:00 و03:00 أثناء أعمال تحسين الشبكة."
    },
    KU: {
      title: "چاکسازی پلاندانراو لە بەغدا",
      message: "هەندێک کڕیار لە نێوان 01:00 و 03:00 کێشەی کاتی لە خزمەتی داتا دەبینن لە کاتی باشترکردنی تۆڕ."
    }
  },
  "roaming-advisory": {
    AR: {
      title: "تنبيه خاص بشريك التجوال",
      message: "عند فشل اتصال التجوال، يرجى تأكيد شبكة الشريك في وجهة السفر قبل إنشاء تذكرة فنية."
    },
    KU: {
      title: "ئاگاداری هاوبەشی ڕۆمینگ",
      message: "لە کاتی سەرنەکەوتنی پەیوەندی ڕۆمینگ، پێش دروستکردنی تیکەتی تەکنیکی تۆڕی هاوبەش پشتڕاست بکەرەوە."
    }
  },
  "super-card-update": {
    AR: {
      title: "تحديث مقال دعم Super Card",
      message: "سيتم دفع محتوى دعم الباقة إلى نسخ الشات بوت وواتساب بعد الموافقة."
    },
    KU: {
      title: "نوێکردنەوەی بابەتی پشتگیری Super Card",
      message: "ناوەڕۆکی پشتگیری پاکێج دوای پەسەندکردن بۆ چاتبۆت و واتساپ دەنێردرێت."
    }
  }
};

const agentTranslations: Record<string, Partial<Record<Language, Partial<Agent>>>> = {
  roaming: {
    AR: { role: "وكيل رعاية - التجوال", skill: "تفعيل التجوال، دعم السفر، المكالمات الدولية", group: "مكتب التجوال" },
    KU: { role: "ئەجێنتی پشتیوانی - ڕۆمینگ", skill: "چالاککردنی ڕۆمینگ، پشتگیری گەشت، پەیوەندی نێودەوڵەتی", group: "مێزی ڕۆمینگ" }
  },
  technical: {
    AR: { role: "وكيل رعاية - الدعم الفني", skill: "الإنترنت، 4.5G، الشريحة، APN، الجهاز والتغطية", group: "الدعم الفني" },
    KU: { role: "ئەجێنتی پشتیوانی - تەکنیکی", skill: "ئینتەرنێت، 4.5G، SIM، APN، ئامێر و داپۆشین", group: "پشتگیری تەکنیکی" }
  }
};

const terms: Record<Language, Record<string, string>> = {
  EN: {},
  AR: {
    Published: "منشور",
    Approved: "معتمد",
    "Ready to Publish": "جاهز للنشر",
    Public: "عام",
    Agent: "وكيل",
    "Private Group": "مجموعة خاصة",
    "Digital Channel": "قناة رقمية",
    Website: "الموقع",
    "Agent Portal": "بوابة الوكيل",
    Chatbot: "الشات بوت",
    WhatsApp: "واتساب",
    Critical: "حرج",
    Advisory: "تنبيه",
    Info: "معلومة",
    Live: "مباشر",
    Scheduled: "مجدول",
    All: "الكل"
  },
  KU: {
    Published: "بڵاوکراوە",
    Approved: "پەسەندکراو",
    "Ready to Publish": "ئامادەی بڵاوکردنەوە",
    Public: "گشتی",
    Agent: "ئەجێنت",
    "Private Group": "گرووپی تایبەت",
    "Digital Channel": "کەناڵی دیجیتاڵ",
    Website: "ماڵپەڕ",
    "Agent Portal": "دەروازەی ئەجێنت",
    Chatbot: "چاتبۆت",
    WhatsApp: "واتساپ",
    Critical: "گرنگ",
    Advisory: "ئاگاداری",
    Info: "زانیاری",
    Live: "زیندوو",
    Scheduled: "خشتەکراو",
    All: "هەموو"
  }
};

export function term(value: string, language: Language) {
  return terms[language][value] || value;
}

export function articleCopy(article: Article, language: Language): Article {
  return { ...article, ...(articleTranslations[article.id]?.[language] || {}) };
}

export function announcementCopy(announcement: Announcement, language: Language): Announcement {
  return { ...announcement, ...(announcementTranslations[announcement.id]?.[language] || {}) };
}

export function agentLocalized(agent: Agent, language: Language): Agent {
  return { ...agent, ...(agentTranslations[agent.id]?.[language] || {}) };
}
