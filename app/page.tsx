"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { 
  Smartphone, 
  CreditCard, 
  Wifi, 
  Layers, 
  HelpCircle, 
  Search, 
  ArrowRight 
} from "lucide-react";
import { AppShell, useLanguage } from "@/components/AppChrome";

const landingCopy = {
  EN: {
    heroTitle: "How can we help you today?",
    heroSubtitle: "Search our knowledge base for instant answers or explore categories below",
    searchPlaceholder: "Type your question here (e.g., Turkey roaming)...",
    searchButton: "Search",
    featuredCategories: "Featured Categories",
    trendingFaqs: "Trending FAQs",
    supportPathTitle: "Need further assistance?",
    supportPathDesc: "If you cannot find the answer to your query, you can escalate directly to our human support team.",
    categories: [
      { id: "prepaid", title: "Prepaid", desc: "Super Card, KAFOO, and reload guides", icon: Smartphone },
      { id: "postpaid", title: "Postpaid", desc: "Monthly bill payment and credit limits", icon: CreditCard },
      { id: "zainfi", title: "Zain-Fi Devices", desc: "4G/5G router setup and high-speed plans", icon: Wifi },
      { id: "services", title: "Services", desc: "SIM activation, eSIM transfer, and value add-ons", icon: Layers },
      { id: "support", title: "Support", desc: "Store locations, complaints, and contact info", icon: HelpCircle }
    ],
    faqs: [
      { q: "How do I activate roaming before travelling to Turkey?", query: "Turkey roaming activation", articleId: "roaming-activation" },
      { q: "What are the rates for roaming data in Europe?", query: "Europe roaming rates" },
      { q: "How do I check my remaining high-speed Zain-Fi balance?", query: "Zain-Fi balance check" },
      { q: "What is required to swap my physical SIM card to an eSIM?", query: "SIM card to eSIM swap" }
    ]
  },
  AR: {
    heroTitle: "كيف يمكننا مساعدتك اليوم؟",
    heroSubtitle: "ابحث في قاعدة المعرفة للحصول على إجابات فورية أو تصفح الفئات أدناه",
    searchPlaceholder: "اكتب سؤالك هنا (مثال: تجوال تركيا)...",
    searchButton: "بحث",
    featuredCategories: "الفئات المميزة",
    trendingFaqs: "الأسئلة الشائعة الرائجة",
    supportPathTitle: "هل تحتاج إلى مزيد من المساعدة؟",
    supportPathDesc: "إذا لم تتمكن من العثور على إجابة لاستفسارك، يمكنك التصعيد مباشرة إلى فريق الدعم البشري لدينا.",
    categories: [
      { id: "prepaid", title: "الدفع المسبق", desc: "سوبر كارد، كافو، وأدلة إعادة الشحن", icon: Smartphone },
      { id: "postpaid", title: "الدفع الآجل", desc: "دفع الفواتير الشهرية والحدود الائتمانية", icon: CreditCard },
      { id: "zainfi", title: "أجهزة زين-فاي", desc: "إعداد راوتر 4G/5G وباقات السرعة العالية", icon: Wifi },
      { id: "services", title: "الخدمات", desc: "تفعيل الشريحة، نقل eSIM، والإضافات ذات القيمة", icon: Layers },
      { id: "support", title: "الدعم", desc: "مواقع الفروع، الشكاوى، ومعلومات الاتصال", icon: HelpCircle }
    ],
    faqs: [
      { q: "كيف يمكنني تفعيل التجوال قبل السفر إلى تركيا؟", query: "تفعيل تجوال تركيا", articleId: "roaming-activation" },
      { q: "ما هي أسعار بيانات التجوال في أوروبا؟", query: "أسعار التجوال في أوروبا" },
      { q: "كيف يمكنني التحقق من رصيد زين-فاي المتبقي؟", query: "فحص رصيد زين فاي" },
      { q: "ما هي المتطلبات لتحويل شريحتي العادية إلى eSIM؟", query: "تحويل الشريحة إلى eSIM" }
    ]
  },
  KU: {
    heroTitle: "ئەمڕۆ چۆن دەتوانین یارمەتیت بدەین؟",
    heroSubtitle: "لە بنکەی زانیاریمان بگەڕێ بۆ وەڵامی خێرا یان هاوپۆلەکان لە خوارەوە ببینە",
    searchPlaceholder: "پرسیارەکەت لێرە بنووسە (بۆ نموونە، ڕۆمینگی تورکیا)...",
    searchButton: "گەڕان",
    featuredCategories: "هاوپۆلە تایبەتەکان",
    trendingFaqs: "پرسیارە باوەکانی ئێستا",
    supportPathTitle: "پێویستت بە یارمەتی زیاترە؟",
    supportPathDesc: "ئەگەر نەتوانی وەڵامی پرسیارەکەت بدۆزیتەوە، دەتوانیت ڕاستەوخۆ پەیوەندی بکەیت بە تیمی پشتگیری مرۆیی ئێمە.",
    categories: [
      { id: "prepaid", title: "پێشەکی", desc: "سۆپەر کارت، کافۆ، و ڕێنماییەکانی بارکردنەوە", icon: Smartphone },
      { id: "postpaid", title: "پاشەکی", desc: "دانی فاتیورەی مانگانە و سنووری قەرز", icon: CreditCard },
      { id: "zainfi", title: "ئامێرەکانی زەین-فای", desc: "ڕێکخستنی ڕاوتەری 4G/5G و پاکێجەکانی خێرایی بەرز", icon: Wifi },
      { id: "services", title: "خزمەتگوزارییەکان", desc: "چالاککردنی سیم، گواستنەوەی eSIM، و زیادکراوەکان", icon: Layers },
      { id: "support", title: "پشتگیری", desc: "شوێنی لقەکان، سکاڵاکان، و زانیاری پەیوەندی", icon: HelpCircle }
    ],
    faqs: [
      { q: "چۆن ڕۆمینگ چالاک بکەم پێش گەشتکردن بۆ تورکیا؟", query: "چالاککردنی ڕۆمینگی تورکیا", articleId: "roaming-activation" },
      { q: "نرخی داتای ڕۆمینگ لە ئەوروپا چەندە؟", query: "نرخی ڕۆمینگ لە ئەوروپا" },
      { q: "چۆن باڵانسی متبووی زەین-فای بپشکنم؟", query: "پشکنینی باڵانسی زەین-فای" },
      { q: "چی پێویستە بۆ گۆڕینی سیمکارتەکەم بۆ eSIM؟", query: "گۆڕینی سیمکارت بۆ eSIM" }
    ]
  }
};

export default function CustomerHome() {
  return (
    <AppShell active="HOME">
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
      router.push(`/customer/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/customer/search");
    }
  };

  const handleCategoryClick = (categoryTitle: string) => {
    router.push(`/customer/search?q=${encodeURIComponent(categoryTitle)}`);
  };

  const handleFaqClick = (faq: { q: string; query: string; articleId?: string }) => {
    if (faq.articleId) {
      router.push(`/customer/article/${faq.articleId}`);
    } else {
      router.push(`/customer/search?q=${encodeURIComponent(faq.query)}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "960px", margin: "0 auto", paddingBottom: "48px" }}>
      {/* Hero Section */}
      <section 
        className="hero-flat"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d0d0d0",
          borderRadius: "4px",
          padding: "48px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#1a1a1a" }}>
          {copy.heroTitle}
        </h1>
        <p style={{ fontSize: "14px", color: "#666666", margin: 0, maxWidth: "600px" }}>
          {copy.heroSubtitle}
        </p>
        
        <form 
          onSubmit={handleSearchSubmit}
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            border: "1px solid #d0d0d0",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "12px",
            backgroundColor: "#f5f5f5"
          }}
        >
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder={copy.searchPlaceholder}
            aria-label="Search help center"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              padding: "12px 16px",
              fontSize: "14px",
              color: "#1a1a1a",
              outline: "none"
            }}
          />
          <button 
            type="submit"
            style={{
              backgroundColor: "#1a1a1a",
              border: "none",
              color: "#ffffff",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            <Search size={16} />
            {copy.searchButton}
          </button>
        </form>
      </section>

      {/* Featured Categories */}
      <section>
        <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666666", marginBottom: "16px" }}>
          {copy.featuredCategories}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "16px" }}>
          {copy.categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.title)}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  transition: "border-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#1a1a1a"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#d0d0d0"}
              >
                <div style={{ color: "#d12c89", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: 0, color: "#1a1a1a" }}>{category.title}</h3>
                <p style={{ fontSize: "12px", color: "#666666", margin: 0, lineHeight: "1.4" }}>{category.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending FAQs */}
      <section style={{ backgroundColor: "#ffffff", border: "1px solid #d0d0d0", borderRadius: "4px", padding: "24px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666666", marginBottom: "16px", marginTop: 0 }}>
          {copy.trendingFaqs}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {copy.faqs.map((faq, idx) => (
            <div 
              key={idx}
              onClick={() => handleFaqClick(faq)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            >
              <span style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: "500" }}>{faq.q}</span>
              <ArrowRight size={16} style={{ color: "#666666" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Escalate Support Banner */}
      <section 
        style={{
          border: "1px solid #d0d0d0",
          borderRadius: "4px",
          padding: "24px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#1a1a1a" }}>{copy.supportPathTitle}</h3>
        <p style={{ fontSize: "13px", color: "#666666", margin: 0, lineHeight: "1.5" }}>{copy.supportPathDesc}</p>
        <div style={{ marginTop: "8px" }}>
          <button 
            onClick={() => router.push("/agent")}
            style={{
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Escalate to Agent Chat
          </button>
        </div>
      </section>
    </div>
  );
}
