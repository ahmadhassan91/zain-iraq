"use client";

import { useState, useMemo, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, BookOpen, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell, useLanguage } from "@/components/AppChrome";
import { useDemoKnowledge, applyDemoKnowledgeToArticle } from "@/lib/demo-state";
import { articles } from "@/lib/data";

const searchCopy = {
  EN: {
    title: "Search Results",
    placeholder: "Search help articles...",
    resultsFor: "Results for",
    bestMatch: "Best AI Match",
    readTime: "3 min read",
    viewFullArticle: "Read Full Article",
    relatedArticles: "Related Articles",
    pricingTitle: "Standard Rates in Turkey",
    rates: [
      { region: "Turkey", rate: "2 IQD/MB" },
      { region: "Europe", rate: "2 IQD/MB" },
      { region: "USA", rate: "3 IQD/MB" }
    ],
    otherMatches: "Other Matches",
    noResults: "No exact matches found. Try refining your search query."
  },
  AR: {
    title: "نتائج البحث",
    placeholder: "ابحث في مقالات المساعدة...",
    resultsFor: "نتائج لـ",
    bestMatch: "أفضل تطابق ذكي",
    readTime: "3 دقائق قراءة",
    viewFullArticle: "قراءة المقال بالكامل",
    relatedArticles: "مقالات ذات صلة",
    pricingTitle: "الأسعار القياسية في تركيا",
    rates: [
      { region: "تركيا", rate: "2 دينار/ميجابايت" },
      { region: "أوروبا", rate: "2 دينار/ميجابايت" },
      { region: "الولايات المتحدة", rate: "3 دينار/ميجابايت" }
    ],
    otherMatches: "تطابقات أخرى",
    noResults: "لم يتم العثور على تطابقات دقيقة. يرجى محاولة تعديل استعلام البحث الخاص بك."
  },
  KU: {
    title: "ئەنجامەکانی گەڕان",
    placeholder: "بگەڕێ لە بابەتەکانی پشتگیری...",
    resultsFor: "ئەنجامەکان بۆ",
    bestMatch: "باشترین هاوتای AI",
    readTime: "3 خولەک خوێندنەوە",
    viewFullArticle: "بابەتەکە بە تەواوی بخوێنەوە",
    relatedArticles: "بابەتە پەیوەندیدارەکان",
    pricingTitle: "نرخە ستانداردەکان لە تورکیا",
    rates: [
      { region: "تورکیا", rate: "2 IQD/MB" },
      { region: "ئەوروپا", rate: "2 IQD/MB" },
      { region: "USA", rate: "3 IQD/MB" }
    ],
    otherMatches: "هاوتاکانی تر",
    noResults: "هیچ هاوتایەکی تەواو نەدۆزرایەوە. تکایە گەڕانەکەت چاکتر بکە."
  }
};

import { Suspense } from "react";

export default function SearchResultsPage() {
  return (
    <AppShell active="SEARCH + RESULTS">
      <Suspense fallback={<div className="empty-state"><p>Loading search results...</p></div>}>
        <SearchResultsContent />
      </Suspense>
    </AppShell>
  );
}

function SearchResultsContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state } = useDemoKnowledge();

  const qParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(qParam || "Turkey no data");
  const [activeQuery, setActiveQuery] = useState(qParam || "Turkey no data");

  const copy = searchCopy[language];
  const isRtl = language !== "EN";

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveQuery(query.trim());
      router.push(`/customer/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Find primary article (Understanding Roaming in Turkey)
  const primaryArticle = useMemo(() => {
    const rawArticle = articles.find(a => a.id === "roaming-activation") || articles[0];
    const resolved = applyDemoKnowledgeToArticle(rawArticle, state);
    
    // Map standard title to specification
    return {
      ...resolved,
      title: state.title === "Roaming support update" ? "Understanding Roaming in Turkey" : state.title,
    };
  }, [state]);

  const relatedArticles = useMemo(() => {
    return articles
      .filter(a => a.id !== "roaming-activation" && a.visibility === "Public")
      .slice(0, 2);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "960px", margin: "0 auto", paddingBottom: "48px" }}>
      {/* Search Input area */}
      <section style={{ backgroundColor: "#ffffff", border: "1px solid #d0d0d0", borderRadius: "4px", padding: "16px 24px" }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", border: "1px solid #d0d0d0", borderRadius: "4px", overflow: "hidden", backgroundColor: "#f5f5f5" }}>
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
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
              color: "#ffffff",
              border: "none",
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
            Search
          </button>
        </form>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", color: "#666666", fontSize: "12px" }}>
          <Search size={14} />
          <span>{copy.resultsFor} &ldquo;<strong>{activeQuery}</strong>&rdquo;</span>
        </div>
      </section>

      {/* Main Matched Result */}
      <section 
        style={{ 
          backgroundColor: "#ffffff", 
          border: "1px solid #d0d0d0", 
          borderRadius: "4px", 
          overflow: "hidden"
        }}
      >
        {/* Banner header for Best Match */}
        <div 
          style={{ 
            backgroundColor: "#1a1a1a", 
            color: "#ffffff", 
            padding: "10px 24px", 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}
        >
          <CheckCircle2 size={14} style={{ color: "#2ecc71" }} />
          <span>{copy.bestMatch} (94% CONFIDENCE)</span>
        </div>

        {/* Hero image for Turkey Roaming */}
        <div 
          style={{
            height: "180px",
            backgroundColor: "#eaeaea",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "24px",
            backgroundImage: "url('/brand/turkey-istanbul.jpg')", // simulated fallback
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.45)" }}></div>
          <div style={{ position: "relative", zIndex: 1, color: "#ffffff" }}>
            <span style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", padding: "4px 8px", backgroundColor: "#d12c89", borderRadius: "2px", textTransform: "uppercase" }}>
              {primaryArticle.category.toUpperCase()}
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", margin: "8px 0 0 0" }}>
              {primaryArticle.title}
            </h2>
          </div>
        </div>

        {/* Article Summary */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#666666" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={14} />
              {copy.readTime}
            </span>
            <span>&bull;</span>
            <span>Last updated: {primaryArticle.updatedAt}</span>
          </div>

          <p style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: "1.6", margin: 0 }}>
            {primaryArticle.summary}
          </p>

          <div style={{ fontSize: "13px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px", border: "1px solid #d0d0d0" }}>
            <strong style={{ display: "block", color: "#1a1a1a", marginBottom: "6px" }}>{copy.pricingTitle}:</strong>
            <div style={{ display: "flex", gap: "24px" }}>
              {copy.rates.map((rate, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "11px", color: "#666666", textTransform: "uppercase" }}>{rate.region}</span>
                  <strong style={{ fontSize: "14px", color: "#1a1a1a" }}>{rate.rate}</strong>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => router.push(`/customer/article/${primaryArticle.id}`)}
              style={{
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span>{copy.viewFullArticle}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section style={{ backgroundColor: "#ffffff", border: "1px solid #d0d0d0", borderRadius: "4px", padding: "24px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666666", marginTop: 0, marginBottom: "16px" }}>
          {copy.relatedArticles}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {relatedArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => router.push(`/customer/article/${article.id}`)}
              style={{
                border: "1px solid #d0d0d0",
                borderRadius: "4px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "border-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#1a1a1a"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#d0d0d0"}
            >
              <span style={{ fontSize: "10px", fontWeight: "bold", color: "#666666", textTransform: "uppercase" }}>
                {article.category}
              </span>
              <h4 style={{ fontSize: "14px", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>
                {article.title}
              </h4>
              <p style={{ fontSize: "12px", color: "#666666", margin: 0, lineHeight: "1.4" }}>
                {article.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
