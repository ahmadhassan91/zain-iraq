"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Bot, Loader2, Send, BookOpen, Sparkles, AlertCircle } from "lucide-react";
import { useLanguage, type Language } from "./AppChrome";
import { articles, searchArticles } from "@/lib/data";
import { articleCopy, llmCopy } from "@/lib/localized-copy";

type AssistantResponse = {
  answer?: string;
  confidence?: number;
  citations?: Array<{ articleId: string; title: string; confidence: number }>;
  handoff?: { required: boolean; reason: string | null };
  error?: string;
  message?: string;
  simulated?: boolean;
};

const preComposedAnswers: Record<string, Record<Language, AssistantResponse>> = {
  roaming: {
    EN: {
      answer: "**Roaming Bundle & Device Activation Guide (Simulated Grounded Response)**\n\n1. **Verify Travel Bundle**: Confirm the destination is eligible and the customer has active travel credit. Usage & active offers can be verified by dialing ***225#**.\n2. **Device Cellular Settings**: Ensure that Cellular Data is turned ON and Data Roaming is toggled ON in mobile system settings.\n3. **Network Operator Selection**: In case of connectivity failure, advise the customer to manually search for a network in carrier settings and attach to a Zain partner network.\n4. **Balance or APN Check**: Ensure balance isn't depleted and high-speed internet limits are checked.",
      confidence: 0.96,
      citations: [{ articleId: "roaming-activation", title: "Roaming bundles and data setup", confidence: 0.96 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    AR: {
      answer: "**دليل تفعيل باقات التجوال والأجهزة (استجابة محاكاة موثقة)**\n\n1. **التحقق من باقة السفر**: تأكد من أهلية الوجهة ومن وجود رصيد سفر فعال للعميل. يمكن فحص العروض والاستخدام بالاتصال بـ ***225#**.\n2. **إعدادات خلوي الجهاز**: تأكد من تشغيل البيانات الخلوية وتفعيل بيانات التجوال من إعدادات النظام بالهاتف.\n3. **اختيار مشغل الشبكة**: في حال فشل الاتصال، انصح العميل بالبحث يدوياً عن الشبكة في إعدادات الناقل والاتصال بشبكة شريكة لزين.\n4. **التحقق من الرصيد أو APN**: تأكد من عدم نفاد الرصيد ومراجعة حدود الإنترنت فائق السرعة.",
      confidence: 0.96,
      citations: [{ articleId: "roaming-activation", title: "Roaming bundles and data setup", confidence: 0.96 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    KU: {
      answer: "**ڕێبەری چالاککردنی پاکێجی ڕۆمینگ و ئامێر (وەڵامی هاوشێوەکراوی پشتبەستوو)**\n\n1. **پشتڕاستکردنەوەی پاکێجی گەشت**: دڵنیا ببە شوێنی گەشتەکە شیاوە و کڕیار باڵانسی گەشتی چالاکی هەیە. پێشنیار و بەکارهێنان بە لێدانی ***225#** دەپشکنرێت.\n2. **ڕێکخستنی مۆبایلی ئامێر**: دڵنیا ببە کە Cellular Data هەڵکراوە و ڕۆمینگی داتا لە ڕێکخستنی سیستەمی مۆبایلەکە چالاک کراوە.\n3. **هەڵبژاردنی ئۆپەرەیتەری تۆڕ**: لە کاتی سەرنەکەوتنی پەیوەندی، ئامۆژگاری کڕیار بکە بە دەستی لە ڕێکخستنی تۆڕدا بگەڕێت و پەیوەست بێت بە تۆڕێکی هاوبەشی زەین.\n4. **پشکنینی باڵانس یان APN**: دڵنیا ببە باڵانس تەواو نەبووە و پشکنینی سنووری ئینتەرنێتی خێرا بکە.",
      confidence: 0.96,
      citations: [{ articleId: "roaming-activation", title: "Roaming bundles and data setup", confidence: 0.96 }],
      handoff: { required: false, reason: null },
      simulated: true
    }
  },
  internet: {
    EN: {
      answer: "**4.5G+ Internet Debug & Diagnostics Log (Simulated Grounded Response)**\n\n- **Tower Connection**: Active 4.5G+ link confirmed in area.\n- **Active Plan**: weekly or monthly data recharge cards.\n- **Resolution Steps for Agent Assist**:\n  1. Guide customer to dial ***101#** with recharge code if card registration failed.\n  2. Check data balance and expiration by sending an empty SMS to **21777**.\n  3. Verify phone APN settings (should be `zainmail.iraq` or `internet`).\n  4. Instruct the customer to cycle Airplane Mode to force cell re-attachment.",
      confidence: 0.93,
      citations: [{ articleId: "slow-internet", title: "4.5G+ internet recharge cards", confidence: 0.93 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    AR: {
      answer: "**سجل تشخيص واستكشاف أخطاء إنترنت 4.5G+ (استجابة محاكاة موثقة)**\n\n- **الاتصال بالبرج**: تم تأكيد اتصال خلوي فعال لـ 4.5G+ في المنطقة.\n- **الباقة الفعالة**: بطاقات شحن البيانات الأسبوعية أو الشهرية.\n- **خطوات الحل للمساعدة**:\n  1. وجّه العميل للاتصال بـ ***101#** مع رمز الشحن إذا فشل تسجيل البطاقة.\n  2. افحص رصيد البيانات والصلاحية بإرسال رسالة SMS فارغة إلى **21777**.\n  3. تحقق من إعدادات اسم نقطة الوصول APN (يجب أن تكون `zainmail.iraq` أو `internet`).\n  4. اطلب من العميل تشغيل وضع الطيران ثم إيقافه لإجبار الجهاز على إعادة الاتصال بالخلية.",
      confidence: 0.93,
      citations: [{ articleId: "slow-internet", title: "4.5G+ internet recharge cards", confidence: 0.93 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    KU: {
      answer: "**تۆماری دەستنیشانکردنی کێشە و چارەسەری ئینتەرنێتی 4.5G+ (وەڵامی هاوشێوەکراوی پشتبەستوو)**\n\n- **پەیوەندی تاوەر**: بەستنی چالاکی 4.5G+ لە ناوچەکەدا پشتڕاستکراوەتەوە.\n- **پاکێجی چالاک**: کارتی پڕکردنەوەی داتای هەفتانە یان مانگانە.\n- **هەنگاوەکانی چارەسەر بۆ یارمەتی ئەجێنت**:\n  1. ڕێنمایی کڕیار بکە لێبدات ***101#** لەگەڵ کۆدی پڕکردنەوە ئەگەر تۆمارکردنی کارتەکە سەرنەکەوت.\n  2. باڵانسی داتا و بەسەرچوون بپشکنە بە ناردنی SMSی بەتاڵ بۆ **21777**.\n  3. ڕێکخستنی APNی مۆبایلەکە بپشکنە (پێویستە لەسەر `zainmail.iraq` یان `internet` بێت).\n  4. داوا لە کڕیار بکە دۆخی فڕۆکە چالاک و ناچالاک بکات بۆ ناچارکردنی بەستنەوەی نوێی تۆڕ.",
      confidence: 0.93,
      citations: [{ articleId: "slow-internet", title: "4.5G+ internet recharge cards", confidence: 0.93 }],
      handoff: { required: false, reason: null },
      simulated: true
    }
  },
  sim: {
    EN: {
      answer: "**eSIM Availability & SIM Replacement Procedures (Simulated Grounded Response)**\n\n- **Technology**: Zain Iraq supports eSIM for all compatible devices (iPhones, Samsung Galaxy, and high-end Android models).\n- **Verification Rule**: For security, replacement of physical SIM cards or digital eSIM activation requires physical ID verification.\n- **Steps to Guide the Customer**:\n  1. Confirm the customer's device supports eSIM (check for EID in settings or dial *#06#).\n  2. Direct the customer to their nearest Zain Iraq official branch.\n  3. Instruct them to bring their active physical ID (national ID / residency card) for quick ownership check and instant QR-code issuance.",
      confidence: 0.89,
      citations: [{ articleId: "sim-replacement", title: "eSIM and SIM replacement support", confidence: 0.89 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    AR: {
      answer: "**إجراءات توفر eSIM واستبدال الشريحة (استجابة محاكاة موثقة)**\n\n- **التقنية**: تدعم زين العراق eSIM لجميع الأجهزة المتوافقة (آيفون، سامسونج جالاكسي، وأجهزة أندرويد الحديثة).\n- **قاعدة التحقق**: لدواعي الأمان، يتطلب استبدال الشريحة الفعلية أو تفعيل eSIM الرقمية التحقق من الهوية حضورياً.\n- **خطوات إرشاد العميل**:\n  1. تأكد من أن جهاز العميل يدعم eSIM (ابحث عن EID في الإعدادات أو اتصل بـ *#06#).\n  2. وجّه العميل إلى أقرب فرع رسمي لزين العراق.\n  3. اطلب منهم إحضار بطاقة هوية صالحة (الهوية الوطنية / بطاقة الإقامة) للتحقق السريع من الملكية وإصدار رمز QR فوراً.",
      confidence: 0.89,
      citations: [{ articleId: "sim-replacement", title: "eSIM and SIM replacement support", confidence: 0.89 }],
      handoff: { required: false, reason: null },
      simulated: true
    },
    KU: {
      answer: "**ڕێکاری بەردەستبوونی eSIM و گۆڕینی SIM (وەڵامی هاوشێوەکراوی پشتبەستوو)**\n\n- **تەکنەلۆژیا**: زەین عێراق پشتگیری eSIM دەکات بۆ هەموو ئامێرە گونجاوەکان (ئایفۆن، سامسۆنگ گالاکسی، و مۆدێلە بەرزەکانی ئەندرۆید).\n- **یاسای پشتڕاستکردنەوە**: بۆ پاراستنی ئاسایش، گۆڕینی کارتی فیزیکی SIM یان چالاککردنی دیجیتاڵی eSIM پێویستی بە پشتڕاستکردنەوەی فیزیکی ناسنامە هەیە.\n- **هەنگاوەکانی ڕێنمایی کڕیار**:\n  1. پشتڕاست بکەرەوە ئامێری کڕیار پشتگیری eSIM دەکات (بۆ EID لە ڕێکخستنەکان بگەڕێ یان لێبدە *#06#).\n  2. کڕیارەکە ئاراستەی نزیکترین لقی فەرمی زەین عێراق بکە.\n  3. داوایان لێبکە ناسنامەی چالاکی فیزیکی (ناسنامەی نیشتمانی / کارتی نشینگە) بهێنن بۆ پشکنینی خێرای خاوەندارێتی و پێدانی دەستبەجێی کۆدی QR.",
      confidence: 0.89,
      citations: [{ articleId: "sim-replacement", title: "eSIM and SIM replacement support", confidence: 0.89 }],
      handoff: { required: false, reason: null },
      simulated: true
    }
  }
};

const suggestionCopy = {
  EN: {
    roaming: "Roaming Activation",
    internet: "Slow Internet",
    sim: "eSIM Replacement"
  },
  AR: {
    roaming: "تفعيل التجوال",
    internet: "بطء الإنترنت",
    sim: "استبدال الشريحة"
  },
  KU: {
    roaming: "چالاککردنی ڕۆمینگ",
    internet: "ئینتەرنێتی خاو",
    sim: "گۆڕینی eSIM"
  }
};

function getFallbackAnswer(query: string, lang: Language): AssistantResponse {
  const normalized = query.toLowerCase();
  if (normalized.includes("roam") || normalized.includes("travel") || normalized.includes("abroad") || normalized.includes("international")) {
    return preComposedAnswers.roaming[lang] || preComposedAnswers.roaming.EN;
  }
  if (normalized.includes("internet") || normalized.includes("slow") || normalized.includes("apn") || normalized.includes("speed") || normalized.includes("data") || normalized.includes("connection")) {
    return preComposedAnswers.internet[lang] || preComposedAnswers.internet.EN;
  }
  if (normalized.includes("sim") || normalized.includes("esim") || normalized.includes("replace") || normalized.includes("card")) {
    return preComposedAnswers.sim[lang] || preComposedAnswers.sim.EN;
  }
  
  // Dynamic fallback based on local search!
  const matched = searchArticles(query);
  if (matched && matched.length > 0) {
    const article = matched[0];
    const localized = articleCopy(article, lang);
    const citations = [{ articleId: article.id, title: localized.title, confidence: article.confidence / 100 }];
    return {
      answer: `**Grounded AI Response from Zain Iraq Knowledge Base**\n\n${localized.customerAnswer}\n\n**Recommended Action Procedure:**\n${localized.steps.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}`,
      confidence: article.confidence / 100,
      citations: citations,
      handoff: { required: article.confidence < 85, reason: article.confidence < 85 ? "Low confidence score" : null },
      simulated: true
    };
  }
  
  // Ultimate fallback if no articles match at all
  return {
    answer: lang === "AR" 
      ? "عذراً، لم أتمكن من العثور على إجابة محددة في قاعدة المعرفة لطلبك. يرجى توجيه العميل إلى الاتصال بالدعم الفني المتقدم." 
      : lang === "KU"
      ? "ببوورە، نەمتوانی وەڵامێکی دیاریکراو لە بنکەی زانیاری بدۆزمەوە بۆ داواکارییەکەت. تکایە کڕیارەکە ئاراستەی پشتگیری تەکنیکی پێشکەوتوو بکە."
      : "I couldn't find a direct match in the Zain Iraq Knowledge Base for your request. Please assist the customer by checking standard network status or routing them to advanced technical support.",
    confidence: 0.65,
    citations: [],
    handoff: { required: true, reason: "No relevant KB articles were found for this query" },
    simulated: true
  };
}

export function LlmAssistant({ initialQuestion = "Customer cannot use data while roaming" }: { initialQuestion?: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const { language } = useLanguage();
  const copy = llmCopy[language];
  
  const streamIntervalRef = useRef<any>(null);

  useEffect(() => {
    setQuestion(initialQuestion);
  }, [initialQuestion]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  function citationTitle(citation: { articleId: string; title: string }) {
    const article = articles.find((item) => item.id === citation.articleId);
    return article ? articleCopy(article, language).title : citation.title;
  }

  function streamText(fullText: string) {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }
    
    const words = fullText.split(/(\s+)/);
    let currentIdx = 0;
    setDisplayedAnswer("");
    
    const intervalId = setInterval(() => {
      if (currentIdx >= words.length) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        return;
      }
      
      setDisplayedAnswer((prev) => prev + words[currentIdx]);
      currentIdx++;
    }, 35);
    
    streamIntervalRef.current = intervalId;
  }

  async function askAssistant(overrideQuestion?: string) {
    const activeQuestion = typeof overrideQuestion === "string" ? overrideQuestion : question;
    setLoading(true);
    setTyping(true);
    setResponse(null);
    setDisplayedAnswer("");

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1200));

    let apiResponse: AssistantResponse | null = null;
    try {
      const fetchPromise = fetch("/api/assistant/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQuestion,
          channel: "agent_portal",
          language: language.toLowerCase()
        })
      }).then(async (res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      });

      const [_, data] = await Promise.all([delayPromise, fetchPromise]);
      apiResponse = data as AssistantResponse;
    } catch (e) {
      console.warn("API error, falling back to local simulator", e);
      await delayPromise;
    }

    setTyping(false);

    const finalResponse = (apiResponse && !apiResponse.error && !apiResponse.message?.includes("unconfigured") && !apiResponse.message?.includes("unavailable") && apiResponse.answer)
      ? apiResponse
      : getFallbackAnswer(activeQuestion, language);

    setResponse(finalResponse);

    if (finalResponse.answer) {
      streamText(finalResponse.answer);
    }
    setLoading(false);
  }

  function handleSuggestionClick(questionText: string) {
    setQuestion(questionText);
    askAssistant(questionText);
  }

  return (
    <div className="panel assistant-panel hover-lift" style={{ transition: "all 0.3s ease", padding: "20px", display: "grid", gap: "16px" }}>
      <style>{`
        .typing-bubble {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 18px;
          background: #f4f7fb;
          border: 1px solid var(--border);
          border-radius: 16px 16px 16px 4px;
          width: fit-content;
          margin: 10px 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          background: var(--muted);
          border-radius: 50%;
          opacity: 0.5;
          animation: typing-bounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; }
          40% { transform: scale(1.0); opacity: 1; }
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(32, 36, 42, 0.06);
        }
      `}</style>

      <div className="section-title" style={{ margin: 0, paddingBottom: "10px", borderBottom: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "900", color: "var(--text)" }}>{copy.title}</h2>
        <span className="chip magenta" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "bold" }}>
          <Bot size={14} />
          {copy.badge}
        </span>
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <textarea 
          className="textarea" 
          value={question} 
          onChange={(event) => setQuestion(event.target.value)} 
          aria-label="LLM assistant question"
          style={{ minHeight: "100px", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "14.5px" }}
        />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div className="suggestion-chips" style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button 
              className="chip small hover-lift" 
              type="button"
              style={{ cursor: "pointer", background: "rgba(209, 44, 137, 0.05)", borderColor: "rgba(209, 44, 137, 0.15)", color: "var(--magenta)", fontWeight: "bold" }}
              onClick={() => handleSuggestionClick("Customer cannot use data while roaming")}
            >
              ✈️ {suggestionCopy[language].roaming}
            </button>
            <button 
              className="chip small hover-lift" 
              type="button"
              style={{ cursor: "pointer", background: "rgba(74, 158, 157, 0.05)", borderColor: "rgba(74, 158, 157, 0.15)", color: "var(--teal)", fontWeight: "bold" }}
              onClick={() => handleSuggestionClick("Slow internet speeds on 4.5G")}
            >
              ⚡ {suggestionCopy[language].internet}
            </button>
            <button 
              className="chip small hover-lift" 
              type="button"
              style={{ cursor: "pointer", background: "rgba(95, 50, 131, 0.05)", borderColor: "rgba(95, 50, 131, 0.15)", color: "var(--violet)", fontWeight: "bold" }}
              onClick={() => handleSuggestionClick("eSIM replacement and activation branch support")}
            >
              📲 {suggestionCopy[language].sim}
            </button>
          </div>

          <button className="btn primary hover-lift" onClick={() => askAssistant()} disabled={loading} style={{ alignSelf: "flex-end", minHeight: "38px" }}>
            {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
            {loading ? copy.asking : copy.ask}
          </button>
        </div>
      </div>

      {typing && (
        <div style={{ display: "grid", gap: "6px", marginTop: "4px" }}>
          <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={13} className="spin" /> Thinking and grounding answers...
          </span>
          <div className="typing-bubble">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}

      {!typing && response && (
        <div className="assistant-answer hover-lift" style={{ 
          marginTop: "4px", 
          padding: "16px", 
          borderRadius: "12px", 
          background: "var(--surface-soft)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
          display: "grid",
          gap: "14px",
          transition: "all 0.3s ease"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bot size={18} style={{ color: "var(--magenta)" }} />
              <strong style={{ fontSize: "14px", color: "var(--text)" }}>AI Grounded Knowledge</strong>
            </div>
            {response.confidence && (
              <span className="chip" style={{ 
                margin: 0, 
                padding: "2px 8px", 
                borderRadius: "12px", 
                background: "rgba(74, 158, 157, 0.1)", 
                borderColor: "rgba(74, 158, 157, 0.2)",
                color: "var(--teal)",
                fontSize: "11px",
                fontWeight: "900"
              }}>
                <Sparkles size={11} style={{ marginRight: "3px" }} />
                {Math.round(response.confidence * 100)}% Conf
              </span>
            )}
            <span className={response.simulated ? "chip advisory" : "chip published"}>
              {response.simulated ? "Simulated fallback" : "Live LLM"}
            </span>
          </div>

          <div className="answer-text" style={{ 
            fontSize: "14.5px", 
            lineHeight: "1.6", 
            color: "var(--text)", 
            whiteSpace: "pre-line", 
            fontWeight: 500 
          }}>
            {displayedAnswer}
          </div>

          {response.citations && response.citations.length > 0 && (
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "10px" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--muted)", fontWeight: "bold", marginBottom: "6px" }}>
                Grounded Citations
              </div>
              <div className="citation-list" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {response.citations.map((citation) => (
                  <Link 
                    href={`/agent/article/${citation.articleId}`}
                    key={citation.articleId}
                    className="chip small hover-lift"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(31, 63, 119, 0.05)",
                      borderColor: "rgba(31, 63, 119, 0.15)",
                      color: "var(--blue)",
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <BookOpen size={12} />
                    <span>{citationTitle(citation)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {response.handoff?.required && (
            <div style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: "8px", 
              padding: "10px 12px", 
              borderRadius: "8px", 
              background: "rgba(209, 44, 137, 0.08)", 
              border: "1px solid rgba(209, 44, 137, 0.15)",
              color: "var(--magenta)",
              fontSize: "13px"
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontWeight: "800" }}>{copy.handoff} Required:</strong>{" "}
                <span>{response.handoff.reason || "Low confidence score detected."}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
