"use client";

import { useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";

type AssistantResponse = {
  answer?: string;
  confidence?: number;
  citations?: Array<{ articleId: string; title: string; confidence: number }>;
  handoff?: { required: boolean; reason: string | null };
  error?: string;
  message?: string;
};

export function LlmAssistant({ initialQuestion = "Customer cannot use data while roaming" }: { initialQuestion?: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function askAssistant() {
    setLoading(true);
    setResponse(null);

    try {
      const result = await fetch("/api/assistant/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          channel: "agent_portal",
          language: "en"
        })
      });

      const body = (await result.json().catch(() => ({
        error: "Assistant unavailable",
        message: "The assistant endpoint did not return JSON. Redeploy the full Netlify project with Functions enabled."
      }))) as AssistantResponse;

      setResponse(
        result.ok
          ? body
          : {
              error: body.error || "Assistant unavailable",
              message:
                body.message ||
                "The assistant function is reachable, but the live LLM is not configured. Check OPENAI_API_KEY in Netlify environment variables."
            }
      );
    } catch {
      setResponse({
        error: "Assistant unavailable",
        message: "The LLM endpoint could not be reached. Deploy the full Netlify project, not only the static out folder."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel assistant-panel">
      <div className="section-title">
        <h2>LLM assistant</h2>
        <span className="chip magenta">
          <Bot size={14} />
          Grounded by KB
        </span>
      </div>
      <textarea className="textarea" value={question} onChange={(event) => setQuestion(event.target.value)} aria-label="LLM assistant question" />
      <button className="btn primary" onClick={askAssistant} disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        {loading ? "Asking" : "Ask assistant"}
      </button>
      {response && (
        <div className="assistant-answer">
          {response.error ? (
            <p className="muted">{response.message || response.error}</p>
          ) : (
            <>
              <p>{response.answer}</p>
              <div className="chip-row">
                <span className="chip">Confidence {Math.round((response.confidence || 0) * 100)}%</span>
                {response.handoff?.required && <span className="chip magenta">Agent handoff</span>}
              </div>
              <div className="citation-list">
                {response.citations?.map((citation) => (
                  <span className="small" key={citation.articleId}>
                    {citation.title} · {Math.round(citation.confidence * 100)}%
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
