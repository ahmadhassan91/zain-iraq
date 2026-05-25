"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppChrome";
import { ArrowLeft, Check, Copy, AlertCircle, ArrowUpRight, Send, CheckCircle } from "lucide-react";

export default function AgentResolutionPage() {
  return (
    <AppShell active="RESOLUTION">
      <AgentResolutionContent />
    </AppShell>
  );
}

function AgentResolutionContent() {
  const [responseText, setResponseText] = useState("");
  const [copiedState, setCopiedState] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [composerStatus, setComposerStatus] = useState<"idle" | "sent">("idle");
  const [queueStatus, setQueueStatus] = useState<"active" | "resolved" | "escalated" | "transferred">("active");
  const [transferTarget, setTransferTarget] = useState("");

  const customerName = "Fatima Al-Rashid";
  const customerQuery = "Turkey no data, business meeting in 2 hours";
  
  const recommendedArticle = {
    id: "roaming-activation",
    title: "Understanding Roaming in Turkey",
    confidence: 94,
    customerAnswer: "Before travelling, review the available roaming bundles for your destination, subscribe to the preferred bundle and make sure data roaming is enabled from your handset settings. Zain Iraq customers can check roaming offers and usage details through *225#.",
    internalNote: "If roaming data fails, verify bundle activation, destination/operator coverage, data roaming handset setting, partner network attachment and whether credit-balance internet was disabled for protection.",
    steps: [
      "Confirm roaming bundle and destination operator support",
      "Ask customer to enable data roaming settings on handset",
      "Check usage or offers through *225#",
      "Manually select a partner network (Turkcell/Vodafone) if needed",
      "Escalate only after eligibility and partner attach checks"
    ]
  };

  const handleCopyToResponse = () => {
    setResponseText(recommendedArticle.customerAnswer);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleSendResponse = () => {
    if (!responseText.trim()) return;
    setComposerStatus("sent");
    setTimeout(() => {
      setComposerStatus("idle");
      setResponseText("");
    }, 5000);
  };

  const handleResolve = () => {
    setQueueStatus("resolved");
  };

  const handleEscalate = () => {
    setQueueStatus("escalated");
  };

  const handleTransfer = (target: string) => {
    setTransferTarget(target);
    setQueueStatus("transferred");
  };

  const styles = {
    container: {
      backgroundColor: "#f5f5f5",
      color: "#1a1a1a",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "24px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px",
      minHeight: "100%",
    },
    backLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#666666",
      fontSize: "14px",
      textDecoration: "none",
      fontWeight: "bold" as const,
      marginBottom: "4px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: "24px",
    },
    card: {
      backgroundColor: "#ffffff",
      border: "1px solid #d0d0d0",
      borderRadius: "4px",
      padding: "24px",
      display: "flex",
      flexDirection: "column" as const,
      boxShadow: "none",
      position: "relative" as const,
    },
    sectionHeader: {
      fontSize: "14px",
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      color: "#1a1a1a",
      marginBottom: "16px",
      borderBottom: "1px solid #d0d0d0",
      paddingBottom: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    queryBox: {
      backgroundColor: "#f9f9f9",
      borderLeft: "4px solid #e74c3c",
      padding: "16px",
      borderRadius: "0 4px 4px 0",
      marginBottom: "16px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 8px",
      borderRadius: "2px",
      fontSize: "11px",
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
    },
    redBadge: {
      backgroundColor: "#fdf2f2",
      border: "1px solid #e74c3c",
      color: "#e74c3c",
    },
    greenBadge: {
      backgroundColor: "#ebfbf0",
      border: "1px solid #2ecc71",
      color: "#2ecc71",
    },
    grayBadge: {
      backgroundColor: "#f0f0f0",
      border: "1px solid #d0d0d0",
      color: "#666666",
    },
    primaryBtn: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "10px 20px",
      fontSize: "13px",
      fontWeight: "bold" as const,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.15s ease",
    },
    secondaryBtn: {
      backgroundColor: "#ffffff",
      color: "#1a1a1a",
      border: "1px solid #d0d0d0",
      borderRadius: "4px",
      padding: "10px 20px",
      fontSize: "13px",
      fontWeight: "bold" as const,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.15s ease",
    },
    alertBanner: {
      padding: "12px 16px",
      borderRadius: "4px",
      fontSize: "13px",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "bold" as const,
    },
    alertSuccess: {
      backgroundColor: "#ebfbf0",
      border: "1px solid #2ecc71",
      color: "#2ecc71",
    },
    alertWarning: {
      backgroundColor: "#fff6ed",
      border: "1px solid #e67e22",
      color: "#e67e22",
    },
    noteBox: {
      backgroundColor: "#fcfaf6",
      border: "1px solid #e67e22",
      borderRadius: "4px",
      padding: "16px",
      fontSize: "13px",
      lineHeight: "1.5",
      color: "#1a1a1a",
      marginBottom: "20px",
    },
    composerTextarea: {
      width: "100%",
      minHeight: "150px",
      padding: "12px",
      borderRadius: "4px",
      border: "1px solid #d0d0d0",
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#1a1a1a",
      fontFamily: "inherit",
      resize: "vertical" as const,
      marginBottom: "16px",
      outline: "none",
    },
    stepsList: {
      margin: "0 0 20px 0",
      paddingLeft: "20px",
      fontSize: "13px",
      lineHeight: "1.6",
      color: "#1a1a1a",
    },
  };

  return (
    <div style={styles.container}>
      {/* Back to Dashboard link */}
      <div>
        <Link href="/agent" style={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Agent Dashboard
        </Link>
      </div>

      {/* State Banners if actions are triggered */}
      {queueStatus === "resolved" && (
        <div style={{ ...styles.alertBanner, ...styles.alertSuccess }}>
          <CheckCircle size={18} />
          Case resolved successfully. Fatima Al-Rashid has been removed from your active queue.
        </div>
      )}

      {queueStatus === "escalated" && (
        <div style={{ ...styles.alertBanner, ...styles.alertWarning }}>
          <AlertCircle size={18} />
          Case escalated to L2 Roaming Technical Support.
        </div>
      )}

      {queueStatus === "transferred" && (
        <div style={{ ...styles.alertBanner, ...styles.alertWarning }}>
          <AlertCircle size={18} />
          Case transferred to the {transferTarget || "Technical Support"} queue.
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div style={styles.grid}>
        
        {/* Left Column: Customer details, Composer, and Queue actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Customer Case Overview */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>Active Conversation</span>
              <span style={{ ...styles.badge, ...styles.redBadge }}>
                Urgent - 8 min wait
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#666666", textTransform: "uppercase", fontWeight: "bold" }}>CUSTOMER</span>
                <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "4px 0 0 0" }}>{customerName}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "#666666", textTransform: "uppercase", fontWeight: "bold" }}>CHANNEL</span>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: "bold" }}>Zain Iraq Web Chat</p>
              </div>
            </div>

            <div style={styles.queryBox}>
              <span style={{ fontSize: "11px", color: "#e74c3c", fontWeight: "bold", textTransform: "uppercase" }}>INCOMING QUERY</span>
              <p style={{ margin: "6px 0 0 0", fontSize: "14px", fontWeight: "bold", lineHeight: "1.5" }}>
                &ldquo;{customerQuery}&rdquo;
              </p>
            </div>
          </div>

          {/* Response Composer */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>Response Composer</span>
              {composerStatus === "sent" && (
                <span style={{ color: "#2ecc71", fontSize: "12px", fontWeight: "bold" }}>
                  Sent to Fatima
                </span>
              )}
            </div>

            {composerStatus === "sent" && (
              <div style={{ ...styles.alertBanner, ...styles.alertSuccess }}>
                <Check size={18} />
                Message sent successfully to Fatima Al-Rashid.
              </div>
            )}

            <textarea
              style={styles.composerTextarea}
              placeholder="Write a personalized response, or copy the AI recommended answer on the right..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                style={styles.primaryBtn} 
                onClick={handleSendResponse}
                disabled={!responseText.trim()}
              >
                <Send size={14} />
                Send to Customer
              </button>
              <button 
                style={styles.secondaryBtn} 
                onClick={() => setResponseText("")}
                disabled={!responseText}
              >
                Clear Composer
              </button>
            </div>
          </div>

          {/* Queue Actions */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>Queue Operations</span>
            </div>

            <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#666666", lineHeight: "1.5" }}>
              Take action on this customer&apos;s queue status. Resolving or transferring the case will return you to your dashboard.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button 
                style={{ ...styles.primaryBtn, backgroundColor: "#2ecc71", color: "#ffffff" }} 
                onClick={handleResolve}
                disabled={queueStatus !== "active"}
              >
                <Check size={14} />
                Resolve Case
              </button>

              <button 
                style={{ ...styles.secondaryBtn, border: "1px solid #e67e22", color: "#e67e22" }} 
                onClick={handleEscalate}
                disabled={queueStatus !== "active"}
              >
                <ArrowUpRight size={14} />
                Escalate (L2)
              </button>

              <div style={{ display: "inline-flex", gap: "6px" }}>
                <select 
                  style={{
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #d0d0d0",
                    fontSize: "13px",
                    backgroundColor: "#ffffff",
                    color: "#1a1a1a",
                    outline: "none",
                  }}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleTransfer(e.target.value);
                    }
                  }}
                  disabled={queueStatus !== "active"}
                  defaultValue=""
                >
                  <option value="" disabled>Transfer Queue...</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Consumer Care">Consumer Care</option>
                  <option value="Business/PTX Desk">Business/PTX Desk</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI recommendation and internal guide */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* AI Suggested Article */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>AI Recommendation</span>
              <span style={{ ...styles.badge, ...styles.greenBadge }}>
                {recommendedArticle.confidence}% Match Confidence
              </span>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", color: "#666666", fontWeight: "bold" }}>APPROVED ARTICLE TITLE</span>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "4px 0 0 0" }}>
                {recommendedArticle.title}
              </h3>
            </div>

            {/* Customer Answer Copy Action */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: "#666666", fontWeight: "bold" }}>CUSTOMER-FACING RESPONSE</span>
                <button 
                  style={{
                    background: "none",
                    border: "none",
                    color: copiedState ? "#2ecc71" : "#1a1a1a",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                  onClick={handleCopyToResponse}
                >
                  {copiedState ? <Check size={14} /> : <Copy size={14} />}
                  {copiedState ? "Copied" : "Copy to Response"}
                </button>
              </div>
              
              <div style={{ 
                backgroundColor: "#f9f9f9", 
                border: "1px solid #d0d0d0", 
                borderRadius: "4px",
                padding: "14px",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#1a1a1a"
              }}>
                {recommendedArticle.customerAnswer}
              </div>
            </div>

            {/* Internal Note */}
            <div>
              <span style={{ fontSize: "11px", color: "#e67e22", fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                INTERNAL OPERATIONAL NOTE (AGENTS ONLY)
              </span>
              <div style={styles.noteBox}>
                {recommendedArticle.internalNote}
              </div>
            </div>

            {/* Troubleshooting Steps */}
            <div>
              <span style={{ fontSize: "11px", color: "#666666", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                GUIDED RESOLUTION PROCEDURES
              </span>
              <ol style={styles.stepsList}>
                {recommendedArticle.steps.map((step, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Article Action buttons */}
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              borderTop: "1px solid #d0d0d0", 
              paddingTop: "16px",
              marginTop: "12px"
            }}>
              <Link 
                href={`/agent/article/${recommendedArticle.id}`} 
                style={styles.secondaryBtn}
                target="_blank"
              >
                Open Full Article
                <ArrowUpRight size={14} />
              </Link>
              
              <button 
                style={styles.secondaryBtn}
                onClick={() => setIsPinned(!isPinned)}
              >
                {isPinned ? "Pinned for Later" : "Pin for Later"}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
