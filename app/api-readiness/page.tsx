"use client";

import Link from "next/link";
import { Bot, Braces, CheckCircle2, FileJson, Gauge, MessageSquareText, Radio, Search, Send, Signal } from "lucide-react";
import { AppShell, SectionTitle, StatCard, useLanguage, type Language } from "@/components/AppChrome";
import { apiCopy } from "@/lib/localized-copy";

const endpoints = [
  {
    id: "search",
    title: "Search API",
    method: "GET",
    path: "/api/search?q=roaming&channel=website&lang=en",
    icon: Search,
    detail: "Returns ranked articles, matched intents, channel-safe snippets and confidence score.",
    sample: "/api-demo/search.json"
  },
  {
    id: "article",
    title: "Article Retrieval API",
    method: "GET",
    path: "/api/articles/{articleId}?channel=agent",
    icon: FileJson,
    detail: "Returns article body, steps, internal notes, visibility and approved channel variants.",
    sample: "/api-demo/article.json"
  },
  {
    id: "feedback",
    title: "Feedback API",
    method: "POST",
    path: "/api/feedback",
    icon: MessageSquareText,
    detail: "Captures helpful votes, missing content flags, article issues and search-result feedback.",
    sample: "/api-demo/feedback.json"
  },
  {
    id: "analytics",
    title: "Analytics and Logging API",
    method: "POST",
    path: "/api/analytics/events",
    icon: Signal,
    detail: "Logs searches, channel, latency, selected article, confidence and failed queries.",
    sample: "/api-demo/analytics.json"
  },
  {
    id: "channel",
    title: "Channel Content API",
    method: "GET",
    path: "/api/channels/{channel}/articles/{articleId}",
    icon: Radio,
    detail: "Returns website, chatbot, WhatsApp or agent-specific response formats from the same article.",
    sample: "/api-demo/channel-response.json"
  },
  {
    id: "assistant",
    title: "LLM Assistant API",
    method: "POST",
    path: "/api/assistant/answer",
    icon: Bot,
    detail: "Live Netlify function that calls OpenAI with KB grounding and returns a cited answer with confidence.",
    sample: "/api-demo/llm-assistant.json"
  }
];

const endpointCopy: Record<Language, Partial<Record<string, { title: string; detail: string }>>> = {
  EN: {},
  AR: {
    search: {
      title: "واجهة البحث",
      detail: "تعيد مقالات مرتبة، نوايا مطابقة، مقتطفات آمنة للقناة ودرجة الثقة."
    },
    article: {
      title: "واجهة استرجاع المقال",
      detail: "تعيد نص المقال، الخطوات، الملاحظات الداخلية، الرؤية والنسخ المعتمدة للقنوات."
    },
    feedback: {
      title: "واجهة الملاحظات",
      detail: "تسجل تقييمات الفائدة، إشارات المحتوى الناقص، مشاكل المقالات وملاحظات نتائج البحث."
    },
    analytics: {
      title: "واجهة التحليلات والتسجيل",
      detail: "تسجل عمليات البحث، القناة، زمن الاستجابة، المقال المحدد، الثقة والاستفسارات الفاشلة."
    },
    channel: {
      title: "واجهة محتوى القنوات",
      detail: "تعيد صيغة الموقع أو الشات بوت أو واتساب أو الوكيل من نفس المقال."
    },
    assistant: {
      title: "واجهة مساعد LLM",
      detail: "دالة Netlify مباشرة تستدعي OpenAI بمحتوى قاعدة معرفة وتعيد إجابة موثقة مع درجة الثقة."
    }
  },
  KU: {
    search: {
      title: "API گەڕان",
      detail: "بابەتی ڕیزکراو، نیازی هاوتا، پارچەی پارێزراوی کەناڵ و نمرەی متمانە دەگەڕێنێتەوە."
    },
    article: {
      title: "API هێنانی بابەت",
      detail: "دەقی بابەت، هەنگاوەکان، تێبینی ناوخۆ، بینین و وەشانە پەسەندکراوەکانی کەناڵ دەگەڕێنێتەوە."
    },
    feedback: {
      title: "API بۆچوون",
      detail: "دەنگی یارمەتیدەر، ئاماژەی ناوەڕۆکی کەم، کێشەی بابەت و بۆچوونی ئەنجامی گەڕان تۆمار دەکات."
    },
    analytics: {
      title: "API شیکاری و تۆمار",
      detail: "گەڕان، کەناڵ، دواکەوتن، بابەتی هەڵبژێردراو، متمانە و پرسیاری سەرنەکەوتوو تۆمار دەکات."
    },
    channel: {
      title: "API ناوەڕۆکی کەناڵ",
      detail: "فۆرماتی ماڵپەڕ، چاتبۆت، واتساپ یان ئەجێنت لە هەمان بابەت دەگەڕێنێتەوە."
    },
    assistant: {
      title: "API یاریدەدەری LLM",
      detail: "فەنکشنی زیندووی Netlify کە بە پشتبەستن بە بنکەی زانیاری OpenAI بانگ دەکات و وەڵامی بە بەڵگە و متمانە دەدات."
    }
  }
} as const;

const responseExamples: Record<Language, string> = {
  EN: `{
  "query": "activate roaming",
  "channel": "chatbot",
  "language": "en",
  "answer": "Before travelling, confirm roaming is active...",
  "confidence": 0.94,
  "citations": [
    { "articleId": "roaming-activation", "title": "How to activate roaming" }
  ],
  "handoff": {
    "required": false,
    "reason": null
  }
}`,
  AR: `{
  "query": "تفعيل التجوال",
  "channel": "chatbot",
  "language": "ar",
  "answer": "قبل السفر، تأكد من أن التجوال مفعل...",
  "confidence": 0.94,
  "citations": [
    { "articleId": "roaming-activation", "title": "كيفية تفعيل التجوال" }
  ],
  "handoff": {
    "required": false,
    "reason": null
  }
}`,
  KU: `{
  "query": "چالاککردنی ڕۆمینگ",
  "channel": "chatbot",
  "language": "ku",
  "answer": "پێش گەشت، دڵنیا ببە ڕۆمینگ چالاکە...",
  "confidence": 0.94,
  "citations": [
    { "articleId": "roaming-activation", "title": "چۆنیەتی چالاککردنی ڕۆمینگ" }
  ],
  "handoff": {
    "required": false,
    "reason": null
  }
}`
};

export default function ApiReadinessPage() {
  return (
    <AppShell active="API Readiness">
      <ApiReadinessContent />
    </AppShell>
  );
}

function ApiReadinessContent() {
  const { language } = useLanguage();
  const copy = apiCopy[language];

  return (
    <>
      <section className="section flush-top">
        <SectionTitle title={copy.title} level={1}>
          <span className="chip">
            <CheckCircle2 size={14} />
            {copy.ready}
          </span>
        </SectionTitle>
        <div className="grid four">
          <StatCard label={copy.coreApis} value="6" detail={copy.coreDetail} />
          <StatCard label={copy.channelOutputs} value="4" detail={copy.channelDetail} />
          <StatCard label={copy.confidence} value="0.94" detail={copy.confidenceDetail} />
          <StatCard label={copy.llmLayer} value="RAG" detail={copy.llmDetail} />
        </div>
      </section>

      <section className="section">
        <div className="grid three api-grid">
          {endpoints.map((endpoint) => {
            const Icon = endpoint.icon;
            const localized = endpointCopy[language][endpoint.id];
            return (
              <div className="card endpoint-card" key={endpoint.title}>
                <div className="endpoint-head">
                  <Icon size={22} color="#d12c89" />
                  <span className="method-pill">{endpoint.method}</span>
                </div>
                <h3>{localized?.title || endpoint.title}</h3>
                <code>{endpoint.path}</code>
                <p className="muted">{localized?.detail || endpoint.detail}</p>
                <Link className="btn ghost compact" href={endpoint.sample}>
                  <Braces size={16} />
                  {copy.viewJson}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="panel">
            <SectionTitle title={copy.flowTitle}>
              <span className="chip magenta">
                <Bot size={14} />
                {copy.optionalLayer}
              </span>
            </SectionTitle>
            <div className="timeline">
              <div className="step">
                <span className="step-number">1</span>
                <p>{copy.step1}</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>{copy.step2}</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>{copy.step3}</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <p>{copy.step4}</p>
              </div>
            </div>
          </div>
          <div className="panel">
            <SectionTitle title={copy.contract}>
              <span className="chip">
                <Gauge size={14} />
                {copy.confidenceIncluded}
              </span>
            </SectionTitle>
            <pre className="code-block">{responseExamples[language]}</pre>
            <div className="inline-actions">
              <Link className="btn primary" href="/api-demo/llm-assistant.json">
                <Send size={16} />
                {copy.assistantJson}
              </Link>
              <Link className="btn" href="/api-demo/channel-response.json">
                {copy.channelJson}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
