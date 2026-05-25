"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Check, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useLanguage } from "@/components/AppChrome";
import { useDemoKnowledge, applyDemoKnowledgeToArticle } from "@/lib/demo-state";
import { articles } from "@/lib/data";

const articleDetailsCopy = {
  EN: {
    backButton: "Back to Search",
    readTime: "3 min read",
    lastUpdated: "Last updated",
    categoryLabel: "Roaming Support",
    whyChargedTitle: "Why am I charged for data roaming?",
    whyChargedBody: "When travelling outside of Iraq, your device connects to local partner networks rather than Zain's towers. Data roaming requires active packages, otherwise standard pay-as-you-go rates apply. Confirming your setup before departure ensures a seamless connection without bill surprises.",
    ratesTitle: "Standard Pay-As-You-Go Rates",
    ratesDesc: "If you do not subscribe to an active roaming bundle, the following standard data rates will apply during your stay:",
    tableZone: "Zone / Destination",
    tableRate: "Standard Rate",
    avoidChargesTitle: "How to connect and avoid unexpected charges",
    steps: [
      "Confirm roaming bundle subscription by dialing *225# or checking the MyZain App.",
      "Enable 'Data Roaming' inside your mobile settings under cellular/mobile data options.",
      "Restart your phone upon arrival in Turkey if the data connection does not activate automatically.",
      "Manually select our primary partner network (Turkcell or Vodafone Turkey) if you experience coverage drops."
    ],
    feedbackTitle: "Was this helpful?",
    feedbackYes: "Yes, this resolved my issue",
    feedbackNo: "No, I need more help",
    feedbackThankYou: "Thank you for your feedback!",
    feedbackImproveText: "Please let us know how we can improve this article:",
    feedbackPlaceholder: "Tell us what was missing or unclear...",
    feedbackSubmit: "Submit Feedback",
    feedbackFinalSubmit: "Thank you! Your feedback has been sent to our knowledge team."
  },
  AR: {
    backButton: "العودة إلى البحث",
    readTime: "3 دقائق قراءة",
    lastUpdated: "آخر تحديث",
    categoryLabel: "دعم التجوال",
    whyChargedTitle: "لماذا يتم محاسبتي على تجوال البيانات؟",
    whyChargedBody: "عند السفر خارج العراق، يتصل جهازك بشبكات الشركاء المحليين بدلاً من أبراج زين. يتطلب تجوال البيانات باقات نشطة، وإلا فسيتم تطبيق أسعار الدفع الفوري القياسية. يضمن لك تأكيد إعداداتك قبل المغادرة اتصالاً سلسًا دون مفاجآت في الفاتورة.",
    ratesTitle: "أسعار الدفع الفوري القياسية",
    ratesDesc: "إذا لم تشترك في باقة تجوال نشطة، فسيتم تطبيق أسعار البيانات القياسية التالية أثناء إقامتك:",
    tableZone: "المنطقة / الوجهة",
    tableRate: "السعر القياسي",
    avoidChargesTitle: "كيفية الاتصال وتجنب الرسوم غير المتوقعة",
    steps: [
      "قم بتأكيد الاشتراك في باقة التجوال عن طريق طلب *225# أو التحقق من تطبيق MyZain.",
      "قم بتمكين 'تجوال البيانات' داخل إعدادات هاتفك المحمول ضمن خيارات البيانات الخلوية.",
      "أعد تشغيل هاتفك عند وصولك إلى تركيا إذا لم يتم تفعيل اتصال البيانات تلقائيًا.",
      "اختر يدويًا شبكة شريكنا الأساسي (Turkcell أو Vodafone Turkey) إذا واجهت انخفاضًا في التغطية."
    ],
    feedbackTitle: "هل كان هذا مفيداً؟",
    feedbackYes: "نعم، لقد حل مشكلتي",
    feedbackNo: "لا، أحتاج إلى مزيد من المساعدة",
    feedbackThankYou: "شكرًا لك على ملاحظاتك!",
    feedbackImproveText: "يرجى إعلامنا بكيفية تحسين هذه المقالة:",
    feedbackPlaceholder: "أخبرنا بما كان ناقصًا أو غير واضح...",
    feedbackSubmit: "إرسال التعليقات",
    feedbackFinalSubmit: "شكرًا لك! تم إرسال ملاحظاتك إلى فريق المعرفة لدينا."
  },
  KU: {
    backButton: "گەڕانەوە بۆ گەڕان",
    readTime: "3 خولەک خوێندنەوە",
    lastUpdated: "دواین نوێکردنەوە",
    categoryLabel: "پشتیوانی ڕۆمینگ",
    whyChargedTitle: "بۆچی پارەی داتای ڕۆمینگم لێ وەردەگیرێت؟",
    whyChargedBody: "کاتێک گەشت دەکەیت بۆ دەرەوەی عێراق، ئامێرەکەت پەیوەندی دەکات بە تۆڕی هاوبەشە ناوخۆییەکانەوە نەک تاوەرەکانی زەین. داتای ڕۆمینگ پێویستی بە پاکێجی چالاک هەیە، بە پێچەوانەوە نرخە ستانداردەکانی pay-as-you-go جێبەجێ دەکرێن. دڵنیابوونەوە لە ڕێکخستنەکانت پێش بەڕێکەوتن، پەیوەندییەکی بێ کێشەت بۆ دابین دەکات بێ هیچ سوپرایزێکی فاتیورە.",
    ratesTitle: "نرخە ستانداردەکانی Pay-As-You-Go",
    ratesDesc: "ئەگەر لە پاکێجێکی ڕۆمینگی چالاکدا بەشدار نەبیت، نرخە ستانداردەکانی خوارەوەی داتا لە کاتی مانەوەتدا جێبەجێ دەکرێن:",
    tableZone: "ناوچە / شوێن",
    tableRate: "نرخی ستاندارد",
    avoidChargesTitle: "چۆن پەیوەندی بکەین و خۆمان لە تێچووی چاوەڕواننەکراو بپارێزین",
    steps: [
      "بەشداریکردنی پاکێجی ڕۆمینگ پشتڕاست بکەرەوە بە لێدانی *225# یان پشکنینی ئەپی MyZain.",
      "لە ناو ڕێکخستنەکانی مۆبایلەکەتدا لەژێر خزمەتگوزاری مۆبایلدا 'Data Roaming' چالاک بکە.",
      "مۆبایلەکەت لە کاتی گەیشتنت بە تورکیا ڕیستارت بکە ئەگەر پەیوەندی داتا بە شێوەیەکی ئۆتۆماتیکی چالاک نەبوو.",
      "تۆڕی هاوبەشی سەرەکیمان (Turkcell یان Vodafone Turkey) بە دەستی هەڵبژێرە ئەگەر کێشەی هێڵت هەبوو."
    ],
    feedbackTitle: "ئایا ئەمە یارمەتیدەر بوو؟",
    feedbackYes: "بەڵێ، کێشەکەی چارەسەر کردم",
    feedbackNo: "نەخێر، پێویستم بە یارمەتی زیاترە",
    feedbackThankYou: "سپاس بۆ فیدباکەکەت!",
    feedbackImproveText: "تکایە پێمان بڵێ چۆن دەتوانین ئەم بابەتە باشتر بکەین:",
    feedbackPlaceholder: "پێمان بڵێ چی کەم بوو یان ناڕوون بوو...",
    feedbackSubmit: "فیدباک بنێرە",
    feedbackFinalSubmit: "سوپاس! فیدباکەکەت بۆ تیمی زانیاری ئێمە نێردرا."
  }
};

export function ArticleDetailContent({ id }: { id: string }) {
  const { language } = useLanguage();
  const router = useRouter();
  const { state } = useDemoKnowledge();

  const [feedbackState, setFeedbackState] = useState<"initial" | "yes" | "no" | "submitted">("initial");
  const [comment, setComment] = useState("");

  const copy = articleDetailsCopy[language];
  const isRtl = language !== "EN";

  // Resolve article content
  const article = useMemo(() => {
    const rawArticle = articles.find(a => a.id === id) || articles.find(a => a.id === "roaming-activation") || articles[0];
    const resolved = applyDemoKnowledgeToArticle(rawArticle, state);
    
    return {
      ...resolved,
      title: state.title === "Roaming support update" ? "Understanding Roaming in Turkey" : state.title,
    };
  }, [id, state]);

  const handleFeedback = (response: "yes" | "no") => {
    if (response === "yes") {
      setFeedbackState("yes");
      // Save feedback in localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem("zain-demo-feedback", "yes");
        window.dispatchEvent(new Event("zain-demo-state-change"));
      }
    } else {
      setFeedbackState("no");
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setFeedbackState("submitted");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("zain-demo-feedback", `no: ${comment}`);
        window.dispatchEvent(new Event("zain-demo-state-change"));
      }
      setComment("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto", paddingBottom: "48px" }}>
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.push("/customer/search")}
          style={{
            background: "none",
            border: "none",
            color: "#666666",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: 0
          }}
        >
          <ArrowLeft size={16} />
          <span>{copy.backButton}</span>
        </button>
      </div>

      {/* Article Detail Card Container */}
      <article 
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d0d0d0",
          borderRadius: "4px",
          overflow: "hidden"
        }}
      >
        {/* Banner Hero Skyline Simulation */}
        <div 
          style={{
            height: "220px",
            backgroundColor: "#2c3e50",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "32px",
            backgroundImage: "url('/brand/turkey-istanbul.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
          <div style={{ position: "relative", zIndex: 1, color: "#ffffff" }}>
            <span style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", padding: "4px 8px", backgroundColor: "#d12c89", borderRadius: "2px", textTransform: "uppercase" }}>
              {copy.categoryLabel}
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#ffffff", margin: "8px 0 0 0" }}>
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Read time and metadata */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#666666", borderBottom: "1px solid #e5e5e5", paddingBottom: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={14} />
              {copy.readTime}
            </span>
            <span>&bull;</span>
            <span>{copy.lastUpdated}: {article.updatedAt}</span>
            <span>&bull;</span>
            <span style={{ fontWeight: "bold", color: "#d12c89" }}>{article.type.toUpperCase()}</span>
          </div>

          {/* Section 1: Why am I charged */}
          <section style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>
              {copy.whyChargedTitle}
            </h2>
            <p style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: "1.6", margin: 0 }}>
              {copy.whyChargedBody}
            </p>
          </section>

          {/* Section 2: Pay-As-You-Go Rates Table */}
          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>
              {copy.ratesTitle}
            </h2>
            <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}>
              {copy.ratesDesc}
            </p>
            <table 
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "4px",
                border: "1px solid #d0d0d0",
                fontSize: "14px"
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #d0d0d0" }}>
                  <th style={{ padding: "12px 16px", textAlign: isRtl ? "right" : "left", fontWeight: "bold", color: "#1a1a1a" }}>
                    {copy.tableZone}
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: isRtl ? "left" : "right", fontWeight: "bold", color: "#1a1a1a" }}>
                    {copy.tableRate}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "12px 16px", color: "#1a1a1a" }}>Turkey</td>
                  <td style={{ padding: "12px 16px", textAlign: isRtl ? "left" : "right", fontWeight: "bold", color: "#1a1a1a" }}>2 IQD/MB</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "12px 16px", color: "#1a1a1a" }}>Europe</td>
                  <td style={{ padding: "12px 16px", textAlign: isRtl ? "left" : "right", fontWeight: "bold", color: "#1a1a1a" }}>2 IQD/MB</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "#1a1a1a" }}>United States / USA</td>
                  <td style={{ padding: "12px 16px", textAlign: isRtl ? "left" : "right", fontWeight: "bold", color: "#1a1a1a" }}>3 IQD/MB</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 3: Connection Steps */}
          <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>
              {copy.avoidChargesTitle}
            </h2>
            <ol 
              style={{ 
                margin: 0, 
                paddingLeft: isRtl ? 0 : "20px", 
                paddingRight: isRtl ? "20px" : 0, 
                display: "flex", 
                flexDirection: "column", 
                gap: "10px",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#1a1a1a"
              }}
            >
              {copy.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Section 4: Was this helpful feedback module */}
          <section 
            style={{ 
              backgroundColor: "#f5f5f5", 
              border: "1px solid #d0d0d0", 
              borderRadius: "4px", 
              padding: "24px",
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            {feedbackState === "initial" && (
              <>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: 0, color: "#1a1a1a", display: "flex", alignItems: "center", gap: "8px" }}>
                  <HelpCircle size={16} style={{ color: "#d12c89" }} />
                  <span>{copy.feedbackTitle}</span>
                </h3>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => handleFeedback("yes")}
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <ThumbsUp size={14} />
                    <span>{copy.feedbackYes}</span>
                  </button>
                  <button
                    onClick={() => handleFeedback("no")}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#1a1a1a",
                      border: "1px solid #d0d0d0",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <ThumbsDown size={14} />
                    <span>{copy.feedbackNo}</span>
                  </button>
                </div>
              </>
            )}

            {feedbackState === "yes" && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2ecc71" }}>
                <Check size={18} />
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>{copy.feedbackThankYou}</span>
              </div>
            )}

            {feedbackState === "no" && (
              <form onSubmit={handleSubmitFeedback} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: 0, color: "#1a1a1a" }}>
                  {copy.feedbackImproveText}
                </h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={copy.feedbackPlaceholder}
                  required
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "4px",
                    padding: "10px",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "inherit",
                    backgroundColor: "#ffffff",
                    color: "#1a1a1a"
                  }}
                />
                <div>
                  <button
                    type="submit"
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
                    {copy.feedbackSubmit}
                  </button>
                </div>
              </form>
            )}

            {feedbackState === "submitted" && (
              <div style={{ color: "#1a1a1a", fontSize: "14px", fontWeight: "500" }}>
                {copy.feedbackFinalSubmit}
              </div>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}
