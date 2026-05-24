"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, 
  Smartphone, 
  CreditCard, 
  Package, 
  AppWindow, 
  Wifi, 
  Search, 
  ArrowRight,
  Globe2,
  Users,
  LayoutDashboard
} from "lucide-react";
import { AppShell, useLanguage } from "@/components/AppChrome";

const landingCopy = {
  EN: {
    heroTitle: "How can we help you today?",
    heroBody: "Search roaming, bundles, SIM, internet, app and more support FAQs",
    searchPlaceholder: "Search help articles...",
    searchButton: "Search",
    popularTopics: "Popular topics",
    explorePlatform: "Explore the platform",
    platformSubtitle: "Access different portals within the unified Zain Knowledge Base",
    topics: [
      { id: "roaming", title: "Roaming & Travel", desc: "Bundles, data setup, partner networks", icon: Plane },
      { id: "sim", title: "SIM & eSIM", desc: "Replacement, activation, branch services", icon: Smartphone },
      { id: "billing", title: "Balance & Payments", desc: "Recharge, bills, balance checks", icon: CreditCard },
      { id: "bundles", title: "Data Bundles", desc: "Super Card, KAFOO, internet packages", icon: Package },
      { id: "app", title: "Zain Iraq App", desc: "Login, self-service, OTP support", icon: AppWindow },
      { id: "network", title: "Network & Coverage", desc: "4.5G+, APN, internet troubleshooting", icon: Wifi }
    ],
    platforms: [
      { title: "Customer Knowledge Center", desc: "Public self-service FAQs, guides and troubleshooting", href: "/customer", icon: Globe2 },
      { title: "Agent Workspace", desc: "AI-grounded assist, procedures and checklists", href: "/agent", icon: Users },
      { title: "Admin Dashboard", desc: "Governance, article editor, visibility controls and analytics", href: "/admin", icon: LayoutDashboard }
    ]
  },
  AR: {
    heroTitle: "كيف يمكننا مساعدتك اليوم؟",
    heroBody: "ابحث عن التجوال، الباقات، الشريحة، الإنترنت، التطبيق والمزيد من الأسئلة الشائعة",
    searchPlaceholder: "ابحث في مقالات المساعدة...",
    searchButton: "بحث",
    popularTopics: "المواضيع الشائعة",
    explorePlatform: "استكشاف المنصة",
    platformSubtitle: "الدخول إلى البوابات المختلفة داخل قاعدة معرفة زين الموحدة",
    topics: [
      { id: "roaming", title: "التجوال والسفر", desc: "الباقات، إعداد البيانات، شبكات الشركاء", icon: Plane },
      { id: "sim", title: "الشريحة و eSIM", desc: "الاستبدال، التفعيل، خدمات الفروع", icon: Smartphone },
      { id: "billing", title: "الرصيد والدفع", desc: "الشحن، الفواتير، فحص الرصيد", icon: CreditCard },
      { id: "bundles", title: "باقات البيانات", desc: "سوبر كارد، كافو، باقات الإنترنت", icon: Package },
      { id: "app", title: "تطبيق زين العراق", desc: "تسجيل الدخول، الخدمة الذاتية، دعم رمز OTP", icon: AppWindow },
      { id: "network", title: "الشبكة والتغطية", desc: "شبكة 4.5G+، إعدادات APN، استكشاف أخطاء الإنترنت", icon: Wifi }
    ],
    platforms: [
      { title: "مركز معرفة العملاء", desc: "الأسئلة الشائعة العامة والخدمة الذاتية وأدلة استكشاف الأخطاء", href: "/customer", icon: Globe2 },
      { title: "مساحة عمل الوكيل", desc: "المساعد الذكي للوكلاء، الإجراءات وقوائم التحقق", href: "/agent", icon: Users },
      { title: "لوحة الإدارة", desc: "الحوكمة، محرر المقالات، التحكم بالظهور والتحليلات", href: "/admin", icon: LayoutDashboard }
    ]
  },
  KU: {
    heroTitle: "ئەمڕۆ چۆن دەتوانین یارمەتیت بدەین؟",
    heroBody: "بگەڕێ بۆ ڕۆمینگ، پاکێج، SIM، ئینتەرنێت، ئەپ و پرسیارە باوەکانی تری پشتگیری",
    searchPlaceholder: "بگەڕێ لە بابەتەکانی پشتگیری...",
    searchButton: "گەڕان",
    popularTopics: "بابەتە باوەکان",
    explorePlatform: "پلاتفۆرمەکە ببینە",
    platformSubtitle: "چوونە ناو دەروازە جیاوازەکانی بنکەی زانیاری یەکگرتووی زەین",
    topics: [
      { id: "roaming", title: "ڕۆمینگ و گەشت", desc: "پاکێجەکان، ڕێکخستنی داتا، تۆڕی هاوبەش", icon: Plane },
      { id: "sim", title: "SIM & eSIM", desc: "گۆڕین، چالاککردن، خزمەتگوزاری لق", icon: Smartphone },
      { id: "billing", title: "باڵانس و پارەدان", desc: "شحن، فاتورە، پشکنینی باڵانس", icon: CreditCard },
      { id: "bundles", title: "پاکێجی داتا", desc: "سۆپەر کارت، کافو، پاکێجی ئینتەرنێت", icon: Package },
      { id: "app", title: "ئەپی زەین عێراق", desc: "چوونە ژوورەوە، خزمەتگوزاری خۆیی، پشتگیری OTP", icon: AppWindow },
      { id: "network", title: "تۆڕ و داپۆشین", desc: "تۆڕی 4.5G+، APN، چارەسەری کێشەی ئینتەرنێت", icon: Wifi }
    ],
    platforms: [
      { title: "ناوەندی زانیاری کڕیاران", desc: "پرسیارە باوەکانی خۆیی، ڕێنماییەکان و چارەسەری کێشە بۆ کڕیار", href: "/customer", icon: Globe2 },
      { title: "شوێنی کاری ئەجێنت", desc: "یاریدەدەری ئامادە بە AI، ڕێکارەکان و لیستی پشکنین", href: "/agent", icon: Users },
      { title: "داشبۆردی بەڕێوەبەر", desc: "حوکمرانی، دەستکاری بابەت، کۆنترۆڵی بینین و شیکاری", href: "/admin", icon: LayoutDashboard }
    ]
  }
};

export default function Home() {
  return (
    <AppShell active="Home" variant="public">
      <LandingContent />
    </AppShell>
  );
}

function LandingContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const copy = landingCopy[language];

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/customer?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/customer");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", paddingBottom: "3rem" }}>
      {/* Hero Section */}
      <section className="landing-hero">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroBody}</p>
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder={copy.searchPlaceholder}
            aria-label="Search Zain support articles" 
          />
          <button className="btn primary" type="submit">
            <Search size={18} />
            {copy.searchButton}
          </button>
        </form>
      </section>

      {/* Popular Topics Section */}
      <section className="section" style={{ padding: "0 1rem" }}>
        <div className="section-title" style={{ marginBottom: "1.5rem" }}>
          <h2>{copy.popularTopics}</h2>
        </div>
        <div className="topic-grid">
          {copy.topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <a 
                key={topic.id}
                onClick={() => router.push(`/customer?topic=${topic.id}`)}
                className="topic-card"
              >
                <div className="topic-icon">
                  <Icon size={22} />
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.desc}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Platform Explore Section */}
      <section className="section" style={{ padding: "0 1rem", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
        <div className="section-title" style={{ marginBottom: "0.5rem" }}>
          <h2>{copy.explorePlatform}</h2>
        </div>
        <p className="muted" style={{ marginBottom: "1.5rem", fontSize: "0.92rem" }}>{copy.platformSubtitle}</p>
        <div className="platform-grid">
          {copy.platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a 
                key={platform.title}
                onClick={() => router.push(platform.href)}
                className="platform-card"
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                  <div style={{ color: "var(--magenta)", display: "flex" }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ margin: 0 }}>{platform.title}</h3>
                </div>
                <p style={{ margin: 0 }}>{platform.desc}</p>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
