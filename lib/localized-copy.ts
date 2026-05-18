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
    trending: "پرسیارە باوەکان و بابەتە زۆر بینراوەکان",
    views: "بینین",
    helpful: "یارمەتیدەر"
  }
} satisfies Record<Language, Record<string, string>>;

export const homeCopy = {
  EN: {
    heroTitle: "One Zain knowledge source for customers, agents and digital channels.",
    heroBody: "AI-assisted search, targeted agent guidance, content governance, analytics, multilingual support and channel-ready knowledge delivery.",
    customerCenter: "Customer Knowledge Center",
    agentWorkspace: "Agent Workspace",
    adminDashboard: "Admin Dashboard",
    seedArticles: "Seed articles",
    seedDetail: "FAQs, guides and troubleshooting flows",
    targetedAgents: "Targeted agents",
    targetedDetail: "Billing, technical, roaming, digital and PTX",
    channelVariants: "Channel variants",
    channelDetail: "Website, Agent Portal, Chatbot, WhatsApp",
    aiConfidence: "AI confidence",
    aiConfidenceDetail: "Shown on ranked search results",
    journeys: "Role-based journeys",
    publicCustomer: "Public customer",
    publicCustomerDetail: "Search Zain FAQs, roaming, bundles, app support and public troubleshooting guides.",
    contactAgent: "Contact center agent",
    contactAgentDetail: "Use skill-based recommendations, copy-ready answers and restricted procedures.",
    knowledgeAdmin: "Knowledge administrator",
    knowledgeAdminDetail: "Create, approve, publish, archive and analyze content across channels.",
    skillsTitle: "4-5 targeted agent skills",
    fiveAgents: "5 targeted agents",
    gapSignal: "Knowledge gap signal",
    gapSignalDetail: "Admin sees failed or low-confidence searches from all channels.",
    gaps: "gaps",
    viewApi: "View API readiness",
    apiFirst: "API-first delivery",
    knowledgeApis: "Knowledge APIs",
    knowledgeApisDetail: "Search, article retrieval and channel-specific content responses for website, agent portal, chatbot and WhatsApp.",
    qualitySignals: "Quality signals",
    qualitySignalsDetail: "Confidence scores, feedback capture, missing-content flags and analytics events are part of the response model.",
    llmReady: "LLM-ready assistant",
    llmReadyDetail: "A grounded assistant can use approved KB articles as context and return cited answers with handoff rules."
  },
  AR: {
    heroTitle: "مصدر معرفة واحد من زين للعملاء والوكلاء والقنوات الرقمية.",
    heroBody: "بحث مدعوم بالذكاء الاصطناعي، إرشاد موجه للوكلاء، حوكمة المحتوى، التحليلات، دعم متعدد اللغات، وتسليم معرفة جاهز للقنوات.",
    customerCenter: "مركز معرفة العملاء",
    agentWorkspace: "مساحة الوكيل",
    adminDashboard: "لوحة الإدارة",
    seedArticles: "مقالات أولية",
    seedDetail: "أسئلة شائعة وأدلة وتدفقات استكشاف الأخطاء",
    targetedAgents: "وكلاء مستهدفون",
    targetedDetail: "الفوترة، الفني، التجوال، الرقمي و PTX",
    channelVariants: "نسخ القنوات",
    channelDetail: "الموقع، بوابة الوكيل، الشات بوت، واتساب",
    aiConfidence: "ثقة الذكاء الاصطناعي",
    aiConfidenceDetail: "تظهر في نتائج البحث المرتبة",
    journeys: "رحلات حسب الدور",
    publicCustomer: "العميل العام",
    publicCustomerDetail: "البحث في أسئلة زين الشائعة والتجوال والباقات ودعم التطبيق وأدلة الاستكشاف العامة.",
    contactAgent: "وكيل مركز الاتصال",
    contactAgentDetail: "استخدام توصيات حسب المهارة، إجابات جاهزة للنسخ وإجراءات مقيدة.",
    knowledgeAdmin: "مسؤول المعرفة",
    knowledgeAdminDetail: "إنشاء المحتوى واعتماده ونشره وأرشفته وتحليله عبر القنوات.",
    skillsTitle: "4-5 مهارات وكلاء مستهدفة",
    fiveAgents: "5 وكلاء مستهدفين",
    gapSignal: "إشارة فجوات المعرفة",
    gapSignalDetail: "يرى المسؤول عمليات البحث الفاشلة أو منخفضة الثقة من كل القنوات.",
    gaps: "فجوة",
    viewApi: "عرض جاهزية API",
    apiFirst: "تسليم قائم على API أولاً",
    knowledgeApis: "واجهات معرفة API",
    knowledgeApisDetail: "بحث واسترجاع مقالات واستجابات محتوى خاصة بالقنوات للموقع وبوابة الوكيل والشات بوت وواتساب.",
    qualitySignals: "إشارات الجودة",
    qualitySignalsDetail: "درجات الثقة، جمع الملاحظات، إشارات المحتوى الناقص وأحداث التحليلات جزء من نموذج الاستجابة.",
    llmReady: "مساعد جاهز لـ LLM",
    llmReadyDetail: "يمكن لمساعد مستند إلى المعرفة استخدام المقالات المعتمدة كسياق وإرجاع إجابات موثقة مع قواعد التحويل."
  },
  KU: {
    heroTitle: "یەک سەرچاوەی زانیاری زەین بۆ کڕیاران، ئەجێنتەکان و کەناڵە دیجیتاڵەکان.",
    heroBody: "گەڕانی پاڵپشتی کراو بە AI، ڕێنمایی ئامانجدار بۆ ئەجێنت، حوکمرانی ناوەڕۆک، شیکاری، پشتگیری چەندزمانە و گەیاندنی زانیاری ئامادە بۆ کەناڵ.",
    customerCenter: "ناوەندی زانیاری کڕیار",
    agentWorkspace: "شوێنی کاری ئەجێنت",
    adminDashboard: "داشبۆردی بەڕێوەبەر",
    seedArticles: "بابەتی سەرەتایی",
    seedDetail: "پرسیارە باوەکان، ڕێنماکان و ڕەوتی چارەسەری کێشە",
    targetedAgents: "ئەجێنتە ئامانجدارەکان",
    targetedDetail: "پارەدان، تەکنیکی، ڕۆمینگ، دیجیتاڵ و PTX",
    channelVariants: "وەشانی کەناڵەکان",
    channelDetail: "ماڵپەڕ، دەروازەی ئەجێنت، چاتبۆت، واتساپ",
    aiConfidence: "متمانەی AI",
    aiConfidenceDetail: "لە ئەنجامە ڕیزکراوەکانی گەڕان پیشان دەدرێت",
    journeys: "گەشتەکان بە پێی ڕۆڵ",
    publicCustomer: "کڕیاری گشتی",
    publicCustomerDetail: "گەڕان لە پرسیارە باوەکانی زەین، ڕۆمینگ، پاکێج، پشتگیری ئەپ و ڕێنمایی گشتی.",
    contactAgent: "ئەجێنتی سەنتەری پەیوەندی",
    contactAgentDetail: "بەکارهێنانی پێشنیاری شارەزایی، وەڵامی ئامادە بۆ کۆپی و ڕێکاری سنووردار.",
    knowledgeAdmin: "بەڕێوەبەری زانیاری",
    knowledgeAdminDetail: "دروستکردن، پەسەندکردن، بڵاوکردنەوە، ئەرشیف و شیکاری ناوەڕۆک لە کەناڵەکاندا.",
    skillsTitle: "4-5 شارەزایی ئامانجدار بۆ ئەجێنت",
    fiveAgents: "5 ئەجێنتی ئامانجدار",
    gapSignal: "ئاماژەی کەلێنی زانیاری",
    gapSignalDetail: "بەڕێوەبەر گەڕانی سەرنەکەوتوو یان کەم متمانە لە هەموو کەناڵەکان دەبینێت.",
    gaps: "کەلێن",
    viewApi: "بینینی ئامادەیی API",
    apiFirst: "گەیاندن بە API وەک بنەما",
    knowledgeApis: "API زانیاری",
    knowledgeApisDetail: "گەڕان، هێنانی بابەت و وەڵامی تایبەتی کەناڵ بۆ ماڵپەڕ، دەروازەی ئەجێنت، چاتبۆت و واتساپ.",
    qualitySignals: "ئاماژەکانی کوالیتی",
    qualitySignalsDetail: "نمرەی متمانە، وەرگرتنی بۆچوون، ئاماژەی ناوەڕۆکی کەم و ڕووداوە شیکارییەکان بەشێکن لە مۆدێلی وەڵام.",
    llmReady: "یاریدەدەری ئامادە بۆ LLM",
    llmReadyDetail: "یاریدەدەری پشتبەستوو دەتوانێت بابەتە پەسەندکراوەکان وەک چوارچێوە بەکاربهێنێت و وەڵامی بە بەڵگە و یاسای گواستنەوە بدات."
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
      title: "باقات التجوال وإعداد البيانات",
      category: "التجوال",
      summary: "إرشاد عام لاختيار باقة التجوال وتشغيل بيانات الجهاز ومتابعة الاستخدام أثناء السفر.",
      customerAnswer: "قبل السفر، راجع باقات التجوال المتاحة للوجهة، اشترك في الباقة المناسبة وتأكد من تفعيل بيانات التجوال من إعدادات الجهاز. يمكن متابعة عروض واستخدام التجوال عبر *225#.",
      internalNote: "عند فشل بيانات التجوال، تحقق من تفعيل الباقة، تغطية الوجهة أو المشغل، إعداد بيانات التجوال، اتصال شبكة الشريك، وحماية رصيد الإنترنت.",
      steps: ["تأكيد باقة التجوال والوجهة", "طلب تفعيل بيانات التجوال من الجهاز", "فحص العروض أو الاستخدام عبر *225#", "اختيار شبكة شريك يدوياً عند الحاجة", "التصعيد بعد فحص الأهلية واتصال الشريك"]
    },
    KU: {
      title: "پاکێجی ڕۆمینگ و ڕێکخستنی داتا",
      category: "ڕۆمینگ",
      summary: "ڕێنمایی گشتی بۆ هەڵبژاردنی پاکێجی ڕۆمینگ، چالاککردنی داتای ئامێر و پشکنینی بەکارهێنان لە گەشت.",
      customerAnswer: "پێش گەشت، پاکێجەکانی ڕۆمینگ بۆ شوێنی گەشت ببینە، بەشداری لە پاکێجی گونجاو بکە و دڵنیا ببە داتای ڕۆمینگ لە ڕێکخستنی ئامێر چالاکە. دەتوانرێت بە *225# پێشنیار و بەکارهێنانی ڕۆمینگ بپشکنرێت.",
      internalNote: "ئەگەر داتای ڕۆمینگ کار نەکرد، چالاکی پاکێج، داپۆشینی شوێن/ئۆپەرەیتەر، ڕێکخستنی داتا، بەستنی تۆڕی هاوبەش و پاراستنی باڵانسی ئینتەرنێت بپشکنە.",
      steps: ["پشتڕاستکردنەوەی پاکێج و شوێنی گەشت", "داواکردنی چالاککردنی داتای ڕۆمینگ لە ئامێر", "پشکنینی پێشنیار یان بەکارهێنان بە *225#", "هەڵبژاردنی دەستی تۆڕی هاوبەش ئەگەر پێویست بوو", "بەرزکردنەوە دوای پشکنینی شیاوی و بەستنی هاوبەش"]
    }
  },
  "slow-internet": {
    AR: {
      title: "بطاقات إنترنت 4.5G+",
      category: "الدعم الفني",
      summary: "تدفق دعم لبطاقات إنترنت الدفع المسبق وفحص الرصيد وأسئلة استخدام 4.5G+.",
      customerAnswer: "بطاقات إنترنت زين للدفع المسبق تشمل خيارات أسبوعية وشهرية. يتم الشحن بالطريقة المعتادة عبر *101# رقم البطاقة، ويمكن فحص رصيد الإنترنت بإرسال SMS فارغ إلى 21777.",
      internalNote: "تحقق من صلاحية البطاقة، الرصيد المتبقي، أهلية السوشيال المجاني، إعدادات APN والجهاز، وأولوية أي عرض إنترنت آخر قبل إنشاء تذكرة شبكة.",
      steps: ["تأكيد نوع البطاقة وصلاحيتها", "طلب فحص الرصيد عبر SMS فارغ إلى 21777", "تأكيد APN وبيانات الهاتف", "فحص أولوية أي عرض إنترنت آخر", "التصعيد بعد فحص التغطية والشريحة"]
    },
    KU: {
      title: "کارتی ئینتەرنێتی 4.5G+",
      category: "پشتگیری تەکنیکی",
      summary: "ڕەوتی پشتگیری بۆ کارتی ئینتەرنێتی پێشپارە، پشکنینی باڵانس و پرسیارەکانی 4.5G+.",
      customerAnswer: "کارتەکانی ئینتەرنێتی پێشپارەی زەین هەڵبژاردەی هەفتانە و مانگانەیان هەیە. شحن بە ڕێگای ئاسایی *101# ژمارەی کارت دەکرێت، و باڵانسی ئینتەرنێت بە ناردنی SMSی بەتاڵ بۆ 21777 دەپشکنرێت.",
      internalNote: "پێش تیکەتی تۆڕ، ماوەی کارت، باڵانسی ماوە، شیاوی سۆشیالی خۆڕایی، ڕێکخستنی APN/ئامێر و پێشینەی هەر پێشنیارێکی ئینتەرنێتی تر بپشکنە.",
      steps: ["پشتڕاستکردنەوەی جۆر و ماوەی کارت", "داواکردنی پشکنینی باڵانس بە SMSی بەتاڵ بۆ 21777", "پشتڕاستکردنەوەی APN و داتای مۆبایل", "پشکنینی پێشینەی پێشنیاری ئینتەرنێتی تر", "بەرزکردنەوە دوای پشکنینی داپۆشین و SIM"]
    }
  },
  "sim-replacement": {
    AR: {
      title: "دعم eSIM واستبدال الشريحة",
      category: "خدمات الشريحة",
      summary: "إرشادات للعميل حول توفر eSIM واستبدال الشريحة والتحقق من الملكية في الفرع.",
      customerAnswer: "توفر زين العراق eSIM كنسخة رقمية من الشريحة العادية. لطلبات استبدال الشريحة أو التحديثات الحساسة للملكية، يرجى زيارة فرع زين مع هوية صالحة للتحقق من الطلب.",
      internalNote: "حافظ على قواعد التحقق داخلية. في حالات eSIM أو الاستبدال، أكد دعم الجهاز، حالة الخط ومتطلبات الفرع دون كشف قواعد التحقق.",
      steps: ["تحديد ما إذا كان الطلب eSIM أو شريحة مفقودة أو تالفة", "فحص دعم الجهاز لـ eSIM عند الحاجة", "توجيه العميل إلى الفرع للتحقق من الملكية", "تسجيل ملاحظة التفاعل"]
    },
    KU: {
      title: "پشتگیری eSIM و گۆڕینی SIM",
      category: "خزمەتگوزاری SIM",
      summary: "ڕێنمایی کڕیار بۆ بەردەستبوونی eSIM، گۆڕینی SIM و پشتڕاستکردنەوەی خاوەندارێتی لە لق.",
      customerAnswer: "زەین عێراق eSIM وەک وەشانی دیجیتاڵی SIMی ئاسایی دابین دەکات. بۆ گۆڕینی SIM یان نوێکردنەوەی پەیوەندیدار بە خاوەندارێتی، تکایە لەگەڵ ناسنامەی دروست بچۆ بۆ لقەی زەین.",
      internalNote: "یاساکانی پشتڕاستکردنەوە بە ناوخۆیی بهێڵەوە. بۆ eSIM یان گۆڕین، پشتگیری ئامێر، دۆخی هێڵ و پێویستی لق پشتڕاست بکەرەوە بەبێ ئاشکراکردنی یاساکان.",
      steps: ["دیاریکردنی داواکاری eSIM، SIMی ونبوو یان تێکچوو", "پشکنینی پشتگیری ئامێر بۆ eSIM ئەگەر پێویست بوو", "ڕێنمایی کڕیار بۆ لق بۆ پشتڕاستکردنەوەی خاوەندارێتی", "تۆمارکردنی تێبینی پەیوەندی"]
    }
  },
  "app-login": {
    AR: {
      title: "مشكلة تسجيل الدخول إلى تطبيق زين العراق",
      category: "القنوات الرقمية",
      summary: "تدفق دعم لمشاكل تسجيل الدخول، رمز OTP، كلمة المرور والجهاز.",
      customerAnswer: "حدّث تطبيق زين العراق، تأكد من أن رقمك فعال، اطلب رمز OTP جديداً وتأكد من أن الرسائل تصل إلى جهازك.",
      internalNote: "إذا تأخر OTP لدى عدة مستخدمين، افحص لوحة الحوادث الرقمية قبل التصعيد الفردي.",
      steps: ["تأكيد نسخة التطبيق", "تأكيد أن الخط فعال", "إعادة طلب OTP", "مسح ذاكرة التخزين المؤقت", "التصعيد للدعم الرقمي"]
    },
    KU: {
      title: "کێشەی چوونەژوورەوەی ئەپی زەین عێراق",
      category: "کەناڵە دیجیتاڵەکان",
      summary: "پشتگیری بۆ چوونەژوورەوە، OTP، وشەی نهێنی و کێشەی ئامێر.",
      customerAnswer: "ئەپی زەین عێراق نوێ بکەرەوە، دڵنیا ببە ژمارەکەت چالاکە، OTPی نوێ داوا بکە و دڵنیا ببە SMS دەگاتە ئامێرەکەت.",
      internalNote: "ئەگەر OTP بۆ چەند بەکارهێنەر دوا کەوت، پێش بەرزکردنەوەی تاکەکەسی تەختەی ڕووداوی دیجیتاڵ بپشکنە.",
      steps: ["پشتڕاستکردنەوەی وەشانی ئەپ", "پشتڕاستکردنەوەی چالاکی هێڵ", "دووبارە داواکردنی OTP", "پاککردنەوەی کاش", "بەرزکردنەوە بۆ پشتگیری دیجیتاڵ"]
    }
  },
  "balance-deduction": {
    AR: {
      title: "دعم خدمة العملاء والفواتير",
      category: "الفوترة",
      summary: "إرشادات لقنوات خدمة العملاء ومساعدة خطوط الدفع الآجل والفواتير.",
      customerAnswer: "للدعم العام يمكن لعملاء زين العراق الاتصال بخدمة العملاء على 107. ويمكن لعملاء الدفع الآجل استخدام 307، بينما يمكن معالجة طلبات الفواتير عبر قنوات الدعم أو الفروع.",
      internalNote: "في حالات الفوترة، تحقق من نوع الخط، الاستخدام الأخير، الاشتراكات الفعالة، حالة الفاتورة وملكية الحساب قبل مشاركة الخطوات التالية.",
      steps: ["تحديد نوع الخط: مسبق الدفع أو دفع آجل أو شركة", "تأكيد نوع الطلب", "مراجعة الفاتورة أو سجل الاستخدام", "التوجيه إلى 107 أو 307 أو الفرع أو قائمة الفوترة", "تصعيد النزاعات غير المحلولة"]
    },
    KU: {
      title: "پشتگیری خزمەتی کڕیار و فاتورە",
      category: "پارەدان",
      summary: "ڕێنمایی بۆ کەناڵەکانی خزمەتی کڕیار، یارمەتی هێڵی پاشپارە و فاتورە.",
      customerAnswer: "بۆ پشتگیری گشتی، کڕیارانی زەین عێراق دەتوانن پەیوەندی بە 107 بکەن. کڕیارانی پاشپارە دەتوانن 307 بەکاربهێنن، و داواکاری فاتورە لە ڕێی کەناڵەکانی پشتگیری یان لق چارەسەر دەکرێت.",
      internalNote: "لە کەیسی فاتورەدا، جۆری هێڵ، بەکارهێنانی دوایی، بەشدارییە چالاکەکان، دۆخی فاتورە و خاوەندارێتی هەژمار بپشکنە پێش هاوبەشکردنی هەنگاوەکان.",
      steps: ["دیاریکردنی جۆری هێڵ: پێشپارە، پاشپارە یان کۆمپانیا", "پشتڕاستکردنەوەی جۆری داواکاری", "پێداچوونەوەی فاتورە یان مێژووی بەکارهێنان", "ڕێنمایی بۆ 107، 307، لق یان ڕیزی فاتورە", "بەرزکردنەوەی ناکۆکی چارەسەرنەکراو"]
    }
  },
  "international-calls": {
    AR: {
      title: "المكالمات والأسعار الدولية",
      category: "دولي",
      summary: "شرح صيغة الاتصال الدولي ومكان تأكيد أسعار الوجهات.",
      customerAnswer: "اتصل بـ 00 ثم رمز الدولة ورمز المنطقة ورقم الهاتف. تختلف الأسعار حسب الوجهة والباقة.",
      internalNote: "استخدم فقط أحدث جدول أسعار من مصدر تجاري معتمد.",
      steps: ["تأكيد الوجهة", "فحص نوع الباقة", "مشاركة صيغة الاتصال", "الإشارة إلى تفاصيل السعر"]
    },
    KU: {
      title: "پەیوەندی و نرخە نێودەوڵەتییەکان",
      category: "نێودەوڵەتی",
      summary: "ڕوونکردنەوەی شێوازی ژمارەکردنی نێودەوڵەتی و شوێنی پشتڕاستکردنەوەی نرخەکان.",
      customerAnswer: "00 پاشان کۆدی وڵات، کۆدی ناوچە و ژمارەی تەلەفۆن بنووسە. نرخەکان بە پێی شوێن و پاکێج دەگۆڕێن.",
      internalNote: "تەنها نوێترین خشتەی نرخ لە سەرچاوەی بازرگانی پەسەندکراو بەکاربهێنە.",
      steps: ["پشتڕاستکردنەوەی شوێن", "پشکنینی جۆری پاکێج", "هاوبەشکردنی شێوازی ژمارەکردن", "ئاماژەدان بە وردەکاری نرخ"]
    }
  },
  "push-to-x": {
    AR: {
      title: "دعم أعمال Zain Push-to-X",
      category: "الأعمال",
      summary: "معرفة مقيدة لدعم عملاء Push-to-X والتحقق من الأهلية.",
      customerAnswer: "يدعم Zain Push-to-X التواصل الفوري للفرق لعملاء الأعمال في العراق عبر شبكة زين.",
      internalNote: "محتوى Enterprise/PTX مقيد بوكلاء ومشرفي دعم الأعمال.",
      steps: ["تأكيد الحساب التجاري", "تحديد خطة PTX", "فحص توافق الجهاز", "التحويل إلى قائمة دعم الأعمال"]
    },
    KU: {
      title: "پشتگیری کاری Zain Push-to-X",
      category: "بازرگانی",
      summary: "زانیاری سنووردار بۆ پشتگیری کڕیارانی Push-to-X و پشکنینی شیاوی.",
      customerAnswer: "Zain Push-to-X پەیوەندی دەستبەجێی تیمەکانی کڕیارانی بازرگانی لە عێراق لەسەر تۆڕی زەین پشتگیری دەکات.",
      internalNote: "ناوەڕۆکی Enterprise/PTX تەنها بۆ ئەجێنت و سەرپەرشتیارانی پشتگیری بازرگانییە.",
      steps: ["پشتڕاستکردنەوەی هەژماری کۆمپانیا", "دیاریکردنی پلانی PTX", "پشکنینی گونجانی ئامێر", "ناردن بۆ ڕیزی پشتگیری بازرگانی"]
    }
  },
  "super-card": {
    AR: {
      title: "دعم باقة Super Card",
      category: "الباقات",
      summary: "أسئلة عامة حول باقات Super Card وقنوات الشحن والتجديد والوحدات المتبقية.",
      customerAnswer: "تتضمن باقات Super Card بيانات ودقائق محلية ورسائل SMS بصلاحية أسبوعية أو شهرية. يمكن الشحن عبر الطريقة المعتادة *101#، التعليمات الصوتية على 116، تطبيق زين العراق أو قنوات الاشتراك المدعومة.",
      internalNote: "تأكد من فئة Super Card المختارة، كود الاشتراك أو الإلغاء، حالة التجديد والوحدات المتبقية قبل إرشاد العميل.",
      steps: ["تحديد فئة Super Card", "تأكيد قناة الشحن أو الاشتراك", "فحص الوحدات المتبقية والصلاحية", "شرح حالة التجديد أو الإلغاء", "التصعيد إذا لم يطابق سجل الشحن قواعد الباقة"]
    },
    KU: {
      title: "پشتگیری پاکێجی Super Card",
      category: "پاکێجەکان",
      summary: "پرسیارە گشتییەکان بۆ پاکێجی Super Card، کەناڵی شحن، نوێکردنەوە و یەکە ماوەکان.",
      customerAnswer: "پاکێجەکانی Super Card داتا، خولەکی ناوخۆ و SMS لەگەڵ ماوەی هەفتانە یان مانگانە دەگرنەخۆ. شحن بە ڕێگای ئاسایی *101#، ڕێنمایی دەنگی 116، ئەپی زەین عێراق یان کەناڵە پشتگیریکراوەکان دەکرێت.",
      internalNote: "پێش ڕێنمایی کڕیار، پلەی Super Card، کۆدی بەشداری/لابردن، دۆخی نوێکردنەوە و یەکە ماوەکان پشتڕاست بکەرەوە.",
      steps: ["دیاریکردنی پلەی Super Card", "پشتڕاستکردنەوەی کەناڵی شحن یان بەشداری", "پشکنینی یەکە ماوەکان و ماوەی بەکارهێنان", "ڕوونکردنەوەی دۆخی نوێکردنەوە یان لابردن", "بەرزکردنەوە ئەگەر مێژووی شحن لەگەڵ یاسای پاکێج نەگونجا"]
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
  billing: {
    AR: { role: "وكيل رعاية - الفوترة", skill: "الشحن، الرصيد، الفواتير، مشاكل الدفع", group: "رعاية المستهلك" },
    KU: { role: "ئەجێنتی پشتیوانی - پارەدان", skill: "پڕکردنەوە، باڵانس، فاتورەکان و کێشەی پارەدان", group: "پشتیوانی بەکارهێنەر" }
  },
  roaming: {
    AR: { role: "وكيل رعاية - التجوال", skill: "تفعيل التجوال، دعم السفر، المكالمات الدولية", group: "مكتب التجوال" },
    KU: { role: "ئەجێنتی پشتیوانی - ڕۆمینگ", skill: "چالاککردنی ڕۆمینگ، پشتگیری گەشت، پەیوەندی نێودەوڵەتی", group: "مێزی ڕۆمینگ" }
  },
  technical: {
    AR: { role: "وكيل رعاية - الدعم الفني", skill: "الإنترنت، 4.5G، الشريحة، APN، الجهاز والتغطية", group: "الدعم الفني" },
    KU: { role: "ئەجێنتی پشتیوانی - تەکنیکی", skill: "ئینتەرنێت، 4.5G، SIM، APN، ئامێر و داپۆشین", group: "پشتگیری تەکنیکی" }
  },
  digital: {
    AR: { role: "وكيل رعاية - القنوات الرقمية", skill: "تطبيق زين، الموقع، الشات بوت ورحلات الخدمة الذاتية", group: "الرعاية الرقمية" },
    KU: { role: "ئەجێنتی پشتیوانی - کەناڵە دیجیتاڵەکان", skill: "ئەپی زەین، ماڵپەڕ، چاتبۆت و گەشتی خزمەتی خۆکار", group: "پشتیوانی دیجیتاڵ" }
  },
  enterprise: {
    AR: { role: "وكيل رعاية - الأعمال/PTX", skill: "خدمات الشركات، Push-to-X ودعم الأعمال", group: "دعم الأعمال" },
    KU: { role: "ئەجێنتی پشتیوانی - بازرگانی/PTX", skill: "خزمەتگوزاری کۆمپانیا، Push-to-X و پشتگیری بازرگانی", group: "پشتگیری بازرگانی" }
  }
};

export const llmCopy = {
  EN: {
    title: "LLM assistant",
    badge: "Grounded by KB",
    ask: "Ask assistant",
    asking: "Asking",
    confidence: "Confidence",
    handoff: "Agent handoff"
  },
  AR: {
    title: "مساعد الذكاء الاصطناعي",
    badge: "مرتبط بقاعدة المعرفة",
    ask: "اسأل المساعد",
    asking: "جارٍ السؤال",
    confidence: "الثقة",
    handoff: "تحويل إلى وكيل"
  },
  KU: {
    title: "یاریدەدەری AI",
    badge: "بە بنکەی زانیاری پشتبەستووە",
    ask: "پرسیار لە یاریدەدەر بکە",
    asking: "دەپرسێت",
    confidence: "متمانە",
    handoff: "گواستنەوە بۆ ئەجێنت"
  }
} satisfies Record<Language, Record<string, string>>;

export const adminCopy = {
  EN: {
    title: "Knowledge admin dashboard",
    createArticle: "Create article",
    publishedContent: "Published content",
    publishedDetail: "Public, agent and digital channel articles",
    drafts: "Drafts in workflow",
    draftsDetail: "Ready for approval or publish scheduling",
    failedSearches: "Failed searches",
    failedDetail: "Across agent and digital channels",
    apiResponse: "API response",
    apiDetail: "Average search endpoint response",
    announcements: "Announcements requiring action",
    manageAlerts: "Manage alerts",
    contentAttention: "Content requiring attention",
    gaps: "Knowledge gaps",
    integrations: "Integration readiness",
    searchTrends: "Search trend monitoring",
    workflow: "Workflow management",
    workflowDetail: "Draft, approve, ready to publish, scheduled publish and archive statuses.",
    articleManagement: "Article management",
    articleManagementDetail: "Edit existing content, manage pinned articles, archive stale entries and review performance.",
    apiAnalytics: "API analytics",
    apiAnalyticsDetail: "Track API volume, response time, low confidence results and chatbot feedback.",
    groups: "Groups and skills",
    groupsDetail: "Assign content visibility by group, agent skill and channel."
  },
  AR: {
    title: "لوحة إدارة المعرفة",
    createArticle: "إنشاء مقال",
    publishedContent: "محتوى منشور",
    publishedDetail: "مقالات عامة وللوكلاء والقنوات الرقمية",
    drafts: "مسودات في سير العمل",
    draftsDetail: "جاهزة للموافقة أو جدولة النشر",
    failedSearches: "عمليات بحث فاشلة",
    failedDetail: "عبر الوكلاء والقنوات الرقمية",
    apiResponse: "استجابة API",
    apiDetail: "متوسط استجابة واجهة البحث",
    announcements: "تنبيهات تحتاج إجراء",
    manageAlerts: "إدارة التنبيهات",
    contentAttention: "محتوى يحتاج مراجعة",
    gaps: "فجوات المعرفة",
    integrations: "جاهزية التكامل",
    searchTrends: "مراقبة اتجاهات البحث",
    workflow: "إدارة سير العمل",
    workflowDetail: "مسودة، موافقة، جاهز للنشر، نشر مجدول، وأرشفة.",
    articleManagement: "إدارة المقالات",
    articleManagementDetail: "تعديل المحتوى، إدارة المقالات المثبتة، أرشفة المحتوى القديم ومراجعة الأداء.",
    apiAnalytics: "تحليلات API",
    apiAnalyticsDetail: "تتبع حجم الطلبات، زمن الاستجابة، النتائج منخفضة الثقة وملاحظات الشات بوت.",
    groups: "المجموعات والمهارات",
    groupsDetail: "تعيين رؤية المحتوى حسب المجموعة ومهارة الوكيل والقناة."
  },
  KU: {
    title: "داشبۆردی بەڕێوەبردنی زانیاری",
    createArticle: "دروستکردنی بابەت",
    publishedContent: "ناوەڕۆکی بڵاوکراوە",
    publishedDetail: "بابەتی گشتی، ئەجێنت و کەناڵی دیجیتاڵ",
    drafts: "ڕەشنووس لە کارڕەوتدا",
    draftsDetail: "ئامادە بۆ پەسەندکردن یان خشتەکردنی بڵاوکردنەوە",
    failedSearches: "گەڕانە سەرنەکەوتووەکان",
    failedDetail: "لە ئەجێنت و کەناڵە دیجیتاڵەکاندا",
    apiResponse: "وەڵامی API",
    apiDetail: "تێکڕای وەڵامی خاڵی گەڕان",
    announcements: "ئاگادارکردنەوەی پێویستی بە کردار",
    manageAlerts: "بەڕێوەبردنی ئاگاداری",
    contentAttention: "ناوەڕۆکی پێویستی بە پێداچوونەوە",
    gaps: "کەلێنی زانیاری",
    integrations: "ئامادەیی یەکخستن",
    searchTrends: "چاودێری ڕەوتی گەڕان",
    workflow: "بەڕێوەبردنی کارڕەوت",
    workflowDetail: "ڕەشنووس، پەسەند، ئامادەی بڵاوکردنەوە، بڵاوکردنەوەی خشتەکراو و ئەرشیف.",
    articleManagement: "بەڕێوەبردنی بابەتەکان",
    articleManagementDetail: "دەستکاریکردنی ناوەڕۆک، بابەتی جێگیرکراو، ئەرشیفکردن و پێداچوونەوەی کارایی.",
    apiAnalytics: "شیکاری API",
    apiAnalyticsDetail: "چاودێری ژمارەی داواکاری، کاتی وەڵام، ئەنجامی کەم متمانە و بۆچوونی چاتبۆت.",
    groups: "گرووپ و شارەزایی",
    groupsDetail: "دانانی بینینی ناوەڕۆک بە پێی گرووپ، شارەزایی ئەجێنت و کەناڵ."
  }
} satisfies Record<Language, Record<string, string>>;

export const articleAdminCopy = {
  EN: {
    title: "Article list and lifecycle management",
    create: "Create article",
    all: "All articles",
    articles: "articles",
    views: "views",
    edit: "Edit",
    archive: "Archive",
    removed: "Removed",
    archived: "Archived",
    mostViewed: "Most viewed articles",
    helpful: "helpful",
    pinned: "Global pinned articles",
    savePins: "Save pin order",
    savedPins: "Pin order saved"
  },
  AR: {
    title: "إدارة المقالات ودورة الحياة",
    create: "إنشاء مقال",
    all: "كل المقالات",
    articles: "مقالات",
    views: "مشاهدة",
    edit: "تعديل",
    archive: "أرشفة",
    removed: "تم الحذف",
    archived: "تمت الأرشفة",
    mostViewed: "المقالات الأكثر مشاهدة",
    helpful: "مفيد",
    pinned: "المقالات المثبتة العامة",
    savePins: "حفظ ترتيب التثبيت",
    savedPins: "تم حفظ ترتيب التثبيت"
  },
  KU: {
    title: "بەڕێوەبردنی بابەت و ژیانی ناوەڕۆک",
    create: "دروستکردنی بابەت",
    all: "هەموو بابەتەکان",
    articles: "بابەت",
    views: "بینین",
    edit: "دەستکاری",
    archive: "ئەرشیف",
    removed: "سڕایەوە",
    archived: "ئەرشیف کرا",
    mostViewed: "زۆرترین بابەتی بینراو",
    helpful: "یارمەتیدەر",
    pinned: "بابەتە جێگیرکراوە گشتییەکان",
    savePins: "پاشەکەوتی ڕیزکردن",
    savedPins: "ڕیزکردن پاشەکەوت کرا"
  }
} satisfies Record<Language, Record<string, string>>;

export const notificationsCopy = {
  EN: {
    title: "Notification and alert management",
    live: "live",
    create: "Create announcement",
    fieldTitle: "Title",
    audience: "Audience",
    channel: "Channel",
    schedule: "Schedule",
    message: "Banner message",
    scheduleBtn: "Schedule",
    publish: "Publish now",
    scheduled: "Scheduled",
    published: "Published live",
    list: "Live and scheduled alerts"
  },
  AR: {
    title: "إدارة التنبيهات والإعلانات",
    live: "مباشر",
    create: "إنشاء إعلان",
    fieldTitle: "العنوان",
    audience: "الجمهور",
    channel: "القناة",
    schedule: "الجدولة",
    message: "رسالة الشريط",
    scheduleBtn: "جدولة",
    publish: "نشر الآن",
    scheduled: "تمت الجدولة",
    published: "تم النشر",
    list: "تنبيهات مباشرة ومجدولة"
  },
  KU: {
    title: "بەڕێوەبردنی ئاگاداری و ڕاگەیاندن",
    live: "زیندوو",
    create: "دروستکردنی ڕاگەیاندن",
    fieldTitle: "ناونیشان",
    audience: "بینەر",
    channel: "کەناڵ",
    schedule: "خشتە",
    message: "پەیامی بانەر",
    scheduleBtn: "خشتەکردن",
    publish: "ئێستا بڵاو بکەوە",
    scheduled: "خشتە کرا",
    published: "بڵاوکرایەوە",
    list: "ئاگاداری زیندوو و خشتەکراو"
  }
} satisfies Record<Language, Record<string, string>>;

export const apiCopy = {
  EN: {
    title: "API-first knowledge delivery",
    ready: "Integration-ready",
    coreApis: "Core APIs",
    coreDetail: "Search, article, feedback, analytics, channel and assistant",
    channelOutputs: "Channel outputs",
    channelDetail: "Website, Agent Portal, Chatbot, WhatsApp",
    confidence: "AI confidence",
    confidenceDetail: "Returned with every ranked result and answer",
    llmLayer: "LLM layer",
    llmDetail: "Grounded answers from approved KB content",
    viewJson: "View sample JSON",
    flowTitle: "LLM assistant flow",
    optionalLayer: "Optional AI layer",
    step1: "Customer, agent or chatbot sends a natural-language question with channel and language.",
    step2: "Search API retrieves approved KB articles and returns ranked results with confidence.",
    step3: "LLM generates a grounded answer only from retrieved content and includes citations.",
    step4: "Low confidence, restricted content or missing answers trigger agent handoff and analytics logging.",
    contract: "AI response contract",
    confidenceIncluded: "Confidence included",
    assistantJson: "Assistant JSON",
    channelJson: "Channel JSON"
  },
  AR: {
    title: "تسليم المعرفة عبر واجهات API أولاً",
    ready: "جاهز للتكامل",
    coreApis: "واجهات API الأساسية",
    coreDetail: "البحث، المقالات، الملاحظات، التحليلات، القنوات والمساعد",
    channelOutputs: "مخرجات القنوات",
    channelDetail: "الموقع، بوابة الوكيل، الشات بوت، واتساب",
    confidence: "ثقة الذكاء الاصطناعي",
    confidenceDetail: "تُعاد مع كل نتيجة مرتبة وكل إجابة",
    llmLayer: "طبقة LLM",
    llmDetail: "إجابات مستندة إلى محتوى قاعدة المعرفة المعتمد",
    viewJson: "عرض مثال JSON",
    flowTitle: "تدفق مساعد LLM",
    optionalLayer: "طبقة ذكاء اصطناعي اختيارية",
    step1: "يرسل العميل أو الوكيل أو الشات بوت سؤالاً طبيعياً مع القناة واللغة.",
    step2: "تسترجع واجهة البحث مقالات قاعدة المعرفة المعتمدة وتعيد نتائج مرتبة مع درجة الثقة.",
    step3: "ينشئ LLM إجابة مستندة فقط إلى المحتوى المسترجع مع المراجع.",
    step4: "الثقة المنخفضة أو المحتوى المقيد أو الإجابات غير المتوفرة تؤدي إلى تحويل للوكيل وتسجيل تحليلي.",
    contract: "عقد استجابة الذكاء الاصطناعي",
    confidenceIncluded: "الثقة مضمنة",
    assistantJson: "JSON المساعد",
    channelJson: "JSON القناة"
  },
  KU: {
    title: "گەیاندنی زانیاری بە API وەک بنەما",
    ready: "ئامادە بۆ یەکخستن",
    coreApis: "API بنەڕەتییەکان",
    coreDetail: "گەڕان، بابەت، بۆچوون، شیکاری، کەناڵ و یاریدەدەر",
    channelOutputs: "دەرچوونی کەناڵەکان",
    channelDetail: "ماڵپەڕ، دەروازەی ئەجێنت، چاتبۆت، واتساپ",
    confidence: "متمانەی AI",
    confidenceDetail: "لەگەڵ هەر ئەنجامی ڕیزکراو و هەر وەڵام دەگەڕێتەوە",
    llmLayer: "چینی LLM",
    llmDetail: "وەڵامە پشتبەستووەکان بە ناوەڕۆکی پەسەندکراوی بنکەی زانیاری",
    viewJson: "بینینی نموونەی JSON",
    flowTitle: "ڕەوتی یاریدەدەری LLM",
    optionalLayer: "چینی AI هەڵبژاردە",
    step1: "کڕیار، ئەجێنت یان چاتبۆت پرسیارێکی ئاسایی لەگەڵ کەناڵ و زمان دەنێرێت.",
    step2: "API گەڕان بابەتە پەسەندکراوەکانی بنکەی زانیاری دەهێنێت و ئەنجامی ڕیزکراو لەگەڵ متمانە دەدات.",
    step3: "LLM تەنها لە ناوەڕۆکی هێنراوەوە وەڵامی پشتبەستوو بە بەڵگە دروست دەکات.",
    step4: "متمانەی کەم، ناوەڕۆکی سنووردار یان نەبوونی وەڵام دەبنە هۆی گواستنەوە بۆ ئەجێنت و تۆمارکردنی شیکاری.",
    contract: "گرێبەستی وەڵامی AI",
    confidenceIncluded: "متمانە لەگەڵدایە",
    assistantJson: "JSON یاریدەدەر",
    channelJson: "JSON کەناڵ"
  }
} satisfies Record<Language, Record<string, string>>;

export const analyticsCopy = {
  EN: {
    title: "Reporting and analytics",
    apiCalls: "API calls today",
    apiCallsDetail: "Website, chatbot and WhatsApp simulation",
    avgResponse: "Avg API response",
    avgResponseDetail: "Search and article retrieval endpoints",
    lowConfidence: "Low confidence",
    lowConfidenceDetail: "Queries below 70% confidence",
    helpfulRating: "Helpful rating",
    helpfulRatingDetail: "Customer and agent feedback",
    searchTerms: "Search terms and failed searches",
    gaps: "gaps",
    feedbackFeed: "Closed-loop feedback feed",
    review: "Review"
  },
  AR: {
    title: "التقارير والتحليلات",
    apiCalls: "طلبات API اليوم",
    apiCallsDetail: "محاكاة الموقع والشات بوت وواتساب",
    avgResponse: "متوسط استجابة API",
    avgResponseDetail: "واجهات البحث واسترجاع المقالات",
    lowConfidence: "ثقة منخفضة",
    lowConfidenceDetail: "استفسارات أقل من 70% ثقة",
    helpfulRating: "تقييم الفائدة",
    helpfulRatingDetail: "ملاحظات العملاء والوكلاء",
    searchTerms: "مصطلحات البحث والعمليات الفاشلة",
    gaps: "فجوة",
    feedbackFeed: "تغذية راجعة مغلقة الحلقة",
    review: "مراجعة"
  },
  KU: {
    title: "ڕاپۆرت و شیکاری",
    apiCalls: "بانگەکانی API ئەمڕۆ",
    apiCallsDetail: "هاوشێوەسازی ماڵپەڕ، چاتبۆت و واتساپ",
    avgResponse: "تێکڕای وەڵامی API",
    avgResponseDetail: "خاڵەکانی گەڕان و هێنانی بابەت",
    lowConfidence: "متمانەی کەم",
    lowConfidenceDetail: "پرسیارەکانی خوار 70% متمانە",
    helpfulRating: "هەڵسەنگاندنی یارمەتیدەر",
    helpfulRatingDetail: "بۆچوونی کڕیار و ئەجێنت",
    searchTerms: "زاراوەکانی گەڕان و گەڕانە سەرنەکەوتووەکان",
    gaps: "کەلێن",
    feedbackFeed: "ڕەوتی بۆچوونی داخراو",
    review: "پێداچوونەوە"
  }
} satisfies Record<Language, Record<string, string>>;

export const groupsCopy = {
  EN: {
    title: "Agent groups and targeted skills",
    target: "5 targeted agents",
    permission: "Permission model",
    item1: "Public content is visible to all customers and digital channels",
    item2: "Agent content is visible to authenticated contact center users",
    item3: "Private Group content is restricted by agent group and skill",
    item4: "Digital Channel content exposes safe variants for API consumers",
    item5: "Admins can pin global content and assign group visibility"
  },
  AR: {
    title: "مجموعات الوكلاء والمهارات المستهدفة",
    target: "5 وكلاء مستهدفين",
    permission: "نموذج الصلاحيات",
    item1: "المحتوى العام ظاهر لكل العملاء والقنوات الرقمية",
    item2: "محتوى الوكلاء ظاهر لمستخدمي مركز الاتصال الموثقين",
    item3: "محتوى المجموعة الخاصة مقيد حسب مجموعة الوكيل والمهارة",
    item4: "محتوى القناة الرقمية يعرض نسخاً آمنة لمستهلكي API",
    item5: "يمكن للمشرفين تثبيت محتوى عام وتعيين رؤية المجموعات"
  },
  KU: {
    title: "گرووپی ئەجێنت و شارەزاییە ئامانجدارەکان",
    target: "5 ئەجێنتی ئامانجدار",
    permission: "مۆدێلی دەسەڵات",
    item1: "ناوەڕۆکی گشتی بۆ هەموو کڕیاران و کەناڵە دیجیتاڵەکان دیارە",
    item2: "ناوەڕۆکی ئەجێنت بۆ بەکارهێنەرانی پشتڕاستکراوی سەنتەری پەیوەندی دیارە",
    item3: "ناوەڕۆکی گرووپی تایبەت بە پێی گرووپ و شارەزایی ئەجێنت سنووردارە",
    item4: "ناوەڕۆکی کەناڵی دیجیتاڵ وەشانی پارێزراو بۆ بەکارهێنەرانی API پیشان دەدات",
    item5: "بەڕێوەبەران دەتوانن ناوەڕۆکی گشتی جێگیر بکەن و بینینی گرووپ دیاری بکەن"
  }
} satisfies Record<Language, Record<string, string>>;

export const defaultFormCopy = {
  EN: {
    title: "Roaming service advisory",
    message: "Customers may experience intermittent roaming registration in selected destinations. Agents should verify partner network status before escalation."
  },
  AR: {
    title: "تنبيه خدمة التجوال",
    message: "قد يواجه العملاء تسجيلاً متقطعاً للتجوال في وجهات محددة. يجب على الوكلاء التحقق من حالة شبكة الشريك قبل التصعيد."
  },
  KU: {
    title: "ئاگاداری خزمەتی ڕۆمینگ",
    message: "لە هەندێک شوێنی دیاریکراودا کڕیاران ڕەنگە تۆمارکردنی ڕۆمینگ بە شێوەی کاتی تووشی کێشە ببێت. ئەجێنتەکان پێش بەرزکردنەوە دۆخی تۆڕی هاوبەش پشتڕاست بکەنەوە."
  }
} satisfies Record<Language, Record<string, string>>;

export const viewerCopy = {
  EN: {
    copyReady: "Copy-ready answer",
    copied: "Copied",
    copy: "Copy",
    procedure: "Troubleshooting procedure",
    internalNote: "Internal operational note",
    delivery: "Delivery channels",
    confidence: "AI confidence",
    feedback: "Customer feedback",
    helpfulRatings: "helpful from recent ratings",
    helpful: "Helpful",
    missingInfo: "Missing info",
    helpfulCaptured: "Helpful feedback captured",
    missingSent: "Missing-info signal sent to Knowledge Gaps",
    back: "Back to workspace",
    guest: "Guest view link"
  },
  AR: {
    copyReady: "إجابة جاهزة للنسخ",
    copied: "تم النسخ",
    copy: "نسخ",
    procedure: "إجراءات استكشاف المشكلة",
    internalNote: "ملاحظة تشغيلية داخلية",
    delivery: "قنوات التسليم",
    confidence: "ثقة الذكاء الاصطناعي",
    feedback: "ملاحظات العملاء",
    helpfulRatings: "مفيد من التقييمات الأخيرة",
    helpful: "مفيد",
    missingInfo: "معلومة ناقصة",
    helpfulCaptured: "تم تسجيل ملاحظة مفيدة",
    missingSent: "تم إرسال إشارة معلومة ناقصة إلى فجوات المعرفة",
    back: "العودة إلى مساحة العمل",
    guest: "رابط عرض العميل"
  },
  KU: {
    copyReady: "وەڵامی ئامادە بۆ کۆپی",
    copied: "کۆپی کرا",
    copy: "کۆپی",
    procedure: "ڕێکاری چارەسەری کێشە",
    internalNote: "تێبینی کارگێڕی ناوخۆ",
    delivery: "کەناڵەکانی گەیاندن",
    confidence: "متمانەی AI",
    feedback: "بۆچوونی کڕیار",
    helpfulRatings: "یارمەتیدەر لە هەڵسەنگاندنە نوێکان",
    helpful: "یارمەتیدەر",
    missingInfo: "زانیاری کەم",
    helpfulCaptured: "بۆچوونی یارمەتیدەر تۆمار کرا",
    missingSent: "ئاماژەی زانیاری کەم بۆ کەلێنی زانیاری نێردرا",
    back: "گەڕانەوە بۆ شوێنی کار",
    guest: "لینکی بینینی میوان"
  }
} satisfies Record<Language, Record<string, string>>;

export const editorCopy = {
  EN: {
    createTitle: "Create troubleshooting article",
    editTitle: "Edit article workflow",
    autosaved: "Autosaved 1 min ago",
    title: "Title",
    category: "Category",
    contentType: "Content type",
    visibility: "Visibility",
    richAnswer: "Rich answer editor",
    internalNote: "Internal note",
    mediaUpload: "Media upload",
    mediaHint: "Branch photo, coverage map or support image",
    video: "Video tutorial",
    videoHint: "Add walkthrough video URL",
    attachments: "Attachments",
    attachmentsHint: "PDF, rate sheet, service advisory or training file",
    workflow: "Workflow",
    channels: "Channel variants",
    saveDraft: "Save draft",
    approve: "Approve",
    publish: "Publish",
    archive: "Archive",
    saved: "Draft saved"
  },
  AR: {
    createTitle: "إنشاء مقال استكشاف مشكلة",
    editTitle: "سير تعديل المقال",
    autosaved: "تم الحفظ تلقائياً قبل دقيقة",
    title: "العنوان",
    category: "الفئة",
    contentType: "نوع المحتوى",
    visibility: "الرؤية",
    richAnswer: "محرر الإجابة",
    internalNote: "ملاحظة داخلية",
    mediaUpload: "رفع وسائط",
    mediaHint: "صورة فرع، خريطة تغطية أو صورة دعم",
    video: "شرح فيديو",
    videoHint: "إضافة رابط فيديو توضيحي",
    attachments: "المرفقات",
    attachmentsHint: "PDF، جدول أسعار، تنبيه خدمة أو ملف تدريب",
    workflow: "سير العمل",
    channels: "نسخ القنوات",
    saveDraft: "حفظ المسودة",
    approve: "اعتماد",
    publish: "نشر",
    archive: "أرشفة",
    saved: "تم حفظ المسودة"
  },
  KU: {
    createTitle: "دروستکردنی بابەتی چارەسەری کێشە",
    editTitle: "ڕەوتی دەستکاریکردنی بابەت",
    autosaved: "خۆکارانە پاشەکەوت کرا پێش 1 خولەک",
    title: "ناونیشان",
    category: "پۆل",
    contentType: "جۆری ناوەڕۆک",
    visibility: "بینین",
    richAnswer: "دەستکاریکەری وەڵام",
    internalNote: "تێبینی ناوخۆ",
    mediaUpload: "بارکردنی میدیا",
    mediaHint: "وێنەی لق، نەخشەی داپۆشین یان وێنەی پشتگیری",
    video: "ڤیدیۆی ڕێنما",
    videoHint: "زیادکردنی لینکی ڤیدیۆی ڕێنمایی",
    attachments: "پاشکۆکان",
    attachmentsHint: "PDF، خشتەی نرخ، ئاگاداری خزمەت یان فایلی ڕاهێنان",
    workflow: "کارڕەوت",
    channels: "وەشانی کەناڵەکان",
    saveDraft: "پاشەکەوتی ڕەشنووس",
    approve: "پەسەندکردن",
    publish: "بڵاوکردنەوە",
    archive: "ئەرشیف",
    saved: "ڕەشنووس پاشەکەوت کرا"
  }
} satisfies Record<Language, Record<string, string>>;

const analyticsTerms: Record<Language, Record<string, string>> = {
  EN: {},
  AR: {
    "Roaming activation": "تفعيل التجوال",
    "Slow internet": "بطء الإنترنت",
    "App login": "تسجيل دخول التطبيق",
    "SIM replacement": "استبدال الشريحة",
    "Balance deduction": "خصم الرصيد"
  },
  KU: {
    "Roaming activation": "چالاککردنی ڕۆمینگ",
    "Slow internet": "خاوبوونی ئینتەرنێت",
    "App login": "چوونەژوورەوەی ئەپ",
    "SIM replacement": "گۆڕینی SIM",
    "Balance deduction": "کەمبوونەوەی باڵانس"
  }
};

const integrationTerms: Record<Language, Record<string, { name: string; detail: string }>> = {
  EN: {},
  AR: {
    "Zain Website": { name: "موقع زين", detail: "عرض المقالات العامة والأسئلة الشائعة" },
    Chatbot: { name: "الشات بوت", detail: "شكل استجابة البحث والملاحظات" },
    WhatsApp: { name: "واتساب", detail: "نسخة الإجابة القصيرة للقناة" },
    Sprinklr: { name: "Sprinklr", detail: "الموصل ينتظر وصول العميل" },
    AVAYA: { name: "AVAYA", detail: "تكامل أحداث مركز الاتصال" },
    Genesys: { name: "Genesys", detail: "تكامل مساعدة الوكيل" }
  },
  KU: {
    "Zain Website": { name: "ماڵپەڕی زەین", detail: "پیشاندانی بابەتی گشتی و پرسیارە باوەکان" },
    Chatbot: { name: "چاتبۆت", detail: "شێوازی وەڵامی گەڕان و بۆچوون" },
    WhatsApp: { name: "واتساپ", detail: "وەشانی وەڵامی کورتی کەناڵ" },
    Sprinklr: { name: "Sprinklr", detail: "پەیوەستکەر چاوەڕێی دەستپێگەیشتنی کڕیارە" },
    AVAYA: { name: "AVAYA", detail: "یەکخستنی ڕووداوی سەنتەری پەیوەندی" },
    Genesys: { name: "Genesys", detail: "یەکخستنی یارمەتی ئەجێنت" }
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
    FAQ: "أسئلة شائعة",
    Troubleshooting: "استكشاف مشكلة",
    Guide: "دليل",
    Announcement: "إعلان",
    Website: "الموقع",
    "Agent Portal": "بوابة الوكيل",
    Chatbot: "الشات بوت",
    WhatsApp: "واتساب",
    Critical: "حرج",
    Advisory: "تنبيه",
    Info: "معلومة",
    Live: "مباشر",
    Scheduled: "مجدول",
    All: "الكل",
    Billing: "الفوترة",
    Bundles: "الباقات",
    Enterprise: "الأعمال",
    International: "دولي",
    "Technical Support": "الدعم الفني",
    "SIM Services": "خدمات الشريحة",
    "Digital Channels": "القنوات الرقمية",
    views: "مشاهدة",
    pinned: "مثبت",
    searches: "بحث",
    failed: "فشل",
    Customer: "عميل",
    "Demo Connected": "متصل للعرض",
    "API Ready": "جاهز API",
    "Production Integration Required": "يتطلب تكامل إنتاجي"
  },
  KU: {
    Published: "بڵاوکراوە",
    Approved: "پەسەندکراو",
    "Ready to Publish": "ئامادەی بڵاوکردنەوە",
    Public: "گشتی",
    Agent: "ئەجێنت",
    "Private Group": "گرووپی تایبەت",
    "Digital Channel": "کەناڵی دیجیتاڵ",
    FAQ: "پرسیارە باوەکان",
    Troubleshooting: "چارەسەری کێشە",
    Guide: "ڕێنما",
    Announcement: "ڕاگەیاندن",
    Website: "ماڵپەڕ",
    "Agent Portal": "دەروازەی ئەجێنت",
    Chatbot: "چاتبۆت",
    WhatsApp: "واتساپ",
    Critical: "گرنگ",
    Advisory: "ئاگاداری",
    Info: "زانیاری",
    Live: "زیندوو",
    Scheduled: "خشتەکراو",
    All: "هەموو",
    Billing: "پارەدان",
    Bundles: "پاکێجەکان",
    Enterprise: "بازرگانی",
    International: "نێودەوڵەتی",
    "Technical Support": "پشتگیری تەکنیکی",
    "SIM Services": "خزمەتگوزاری SIM",
    "Digital Channels": "کەناڵە دیجیتاڵەکان",
    views: "بینین",
    pinned: "جێگیرکراو",
    searches: "گەڕان",
    failed: "سەرنەکەوتوو",
    Customer: "کڕیار",
    "Demo Connected": "پەیوەستە بۆ نمایش",
    "API Ready": "API ئامادەیە",
    "Production Integration Required": "یەکخستنی بەرهەم پێویستە"
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

export function analyticsLabel(label: string, language: Language) {
  return analyticsTerms[language][label] || label;
}

export function integrationCopy(
  integration: { name: string; detail: string; status: string },
  language: Language
) {
  const localized = integrationTerms[language][integration.name];
  return {
    ...integration,
    name: localized?.name || integration.name,
    detail: localized?.detail || integration.detail
  };
}
