"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppChrome";
import { Clock, MessageSquare, ShieldAlert, Award, Star, BookOpen, Pin } from "lucide-react";

export default function AgentDashboardPage() {
  return (
    <AppShell active="DASHBOARD">
      <AgentDashboardContent />
    </AppShell>
  );
}

function AgentDashboardContent() {
  // Styles for the flat light-gray Zain dashboard
  const styles = {
    container: {
      backgroundColor: "#f5f5f5",
      color: "#1a1a1a",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "24px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
      minHeight: "100%",
    },
    headerCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #d0d0d0",
      borderRadius: "4px",
      padding: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "none",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold" as const,
      color: "#1a1a1a",
      margin: 0,
    },
    subtitle: {
      fontSize: "14px",
      color: "#666666",
      margin: "4px 0 0 0",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
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
    },
    metricLabel: {
      fontSize: "11px",
      textTransform: "uppercase" as const,
      color: "#666666",
      fontWeight: "bold" as const,
      letterSpacing: "0.05em",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    metricValue: {
      fontSize: "36px",
      fontWeight: "bold" as const,
      color: "#1a1a1a",
      lineHeight: 1.1,
    },
    metricDetail: {
      fontSize: "12px",
      color: "#999999",
      marginTop: "8px",
    },
    layoutGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
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
    queueTable: {
      width: "100%",
      borderCollapse: "collapse" as const,
      textAlign: "left" as const,
    },
    queueTh: {
      fontSize: "11px",
      textTransform: "uppercase" as const,
      color: "#666666",
      padding: "12px 16px",
      borderBottom: "1px solid #d0d0d0",
      fontWeight: "bold" as const,
    },
    queueTr: {
      borderBottom: "1px solid #e0e0e0",
      transition: "background-color 0.15s ease",
    },
    queueTd: {
      padding: "16px",
      fontSize: "14px",
      verticalAlign: "middle",
    },
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "2px",
      fontSize: "11px",
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
    },
    redAlert: {
      backgroundColor: "#fdf2f2",
      border: "1px solid #e74c3c",
      color: "#e74c3c",
    },
    normalBadge: {
      backgroundColor: "#f0f0f0",
      border: "1px solid #d0d0d0",
      color: "#666666",
    },
    insightCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #d0d0d0",
      borderLeft: "4px solid #2ecc71",
      borderRadius: "4px",
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    insightTitle: {
      fontSize: "14px",
      fontWeight: "bold" as const,
      color: "#1a1a1a",
      margin: 0,
    },
    insightText: {
      fontSize: "13px",
      color: "#666666",
      margin: "4px 0 0 0",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #e0e0e0",
    },
    listItemLast: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0 0 0",
    },
    articleTitle: {
      fontSize: "14px",
      fontWeight: "bold" as const,
      color: "#1a1a1a",
      margin: 0,
    },
    articleMeta: {
      fontSize: "12px",
      color: "#666666",
      margin: "2px 0 0 0",
    },
    actionBtn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      fontWeight: "bold" as const,
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.15s ease",
    },
    secondaryBtn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      color: "#1a1a1a",
      border: "1px solid #d0d0d0",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      fontWeight: "bold" as const,
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.15s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Personalized Greeting */}
      <div style={styles.headerCard}>
        <div>
          <h1 style={styles.title}>Good morning, Ahmed</h1>
          <p style={styles.subtitle}>
            Support Agent - Roaming Desk | You are currently active in the support queue.
          </p>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "#666666", fontWeight: "bold" }}>
            SHIFT STATUS: ACTIVE
          </span>
        </div>
      </div>

      {/* Quick Performance Stats */}
      <div style={styles.statsRow}>
        <div style={styles.card}>
          <span style={styles.metricLabel}>
            <MessageSquare size={14} color="#666666" />
            CHATS TODAY
          </span>
          <span style={styles.metricValue}>5</span>
          <span style={styles.metricDetail}>Conversations assigned</span>
        </div>

        <div style={styles.card}>
          <span style={styles.metricLabel}>
            <Clock size={14} color="#666666" />
            AVG RESOLUTION TIME
          </span>
          <span style={styles.metricValue}>4 min</span>
          <span style={styles.metricDetail}>2 min faster than team average</span>
        </div>

        <div style={styles.card}>
          <span style={styles.metricLabel}>
            <Star size={14} color="#666666" />
            SATISFACTION SCORE
          </span>
          <span style={styles.metricValue}>88%</span>
          <span style={styles.metricDetail}>Based on 25 customer ratings</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={styles.layoutGrid}>
        {/* Left Column: Active Queue */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>Active Chat Queue</span>
              <span style={{ color: "#666666", fontSize: "12px", fontWeight: "normal" }}>
                4 customers in queue
              </span>
            </div>
            
            <table style={styles.queueTable}>
              <thead>
                <tr>
                  <th style={styles.queueTh}>Customer</th>
                  <th style={styles.queueTh}>Subject / Query</th>
                  <th style={styles.queueTh}>Wait Time</th>
                  <th style={styles.queueTh}>Status</th>
                  <th style={{ ...styles.queueTh, textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Urgent alert for Fatima */}
                <tr style={{ ...styles.queueTr, backgroundColor: "#fdf2f2" }}>
                  <td style={{ ...styles.queueTd, fontWeight: "bold" }}>Fatima Al-Rashid</td>
                  <td style={styles.queueTd}>Turkey no data, business meeting in 2 hours</td>
                  <td style={{ ...styles.queueTd, color: "#e74c3c", fontWeight: "bold" }}>8 min</td>
                  <td style={styles.queueTd}>
                    <span style={{ ...styles.badge, ...styles.redAlert }}>Urgent Alert</span>
                  </td>
                  <td style={{ ...styles.queueTd, textAlign: "right" }}>
                    <Link href="/agent/resolution" style={styles.actionBtn}>
                      Resolve Case
                    </Link>
                  </td>
                </tr>

                <tr style={styles.queueTr}>
                  <td style={{ ...styles.queueTd, fontWeight: "bold" }}>Mohammed Ali</td>
                  <td style={styles.queueTd}>eSIM activation failed during registration</td>
                  <td style={styles.queueTd}>3 min</td>
                  <td style={styles.queueTd}>
                    <span style={{ ...styles.badge, ...styles.normalBadge }}>Waiting</span>
                  </td>
                  <td style={{ ...styles.queueTd, textAlign: "right" }}>
                    <Link href="/agent/resolution" style={styles.secondaryBtn}>
                      Open
                    </Link>
                  </td>
                </tr>

                <tr style={styles.queueTr}>
                  <td style={{ ...styles.queueTd, fontWeight: "bold" }}>Ali Hussein</td>
                  <td style={styles.queueTd}>Zain Super Card bundle recharge issue</td>
                  <td style={styles.queueTd}>1 min</td>
                  <td style={styles.queueTd}>
                    <span style={{ ...styles.badge, ...styles.normalBadge }}>Waiting</span>
                  </td>
                  <td style={{ ...styles.queueTd, textAlign: "right" }}>
                    <Link href="/agent/resolution" style={styles.secondaryBtn}>
                      Open
                    </Link>
                  </td>
                </tr>

                <tr style={{ ...styles.queueTr, borderBottom: "none" }}>
                  <td style={{ ...styles.queueTd, fontWeight: "bold" }}>Zaid Saad</td>
                  <td style={styles.queueTd}>Zain-Fi home device setup query</td>
                  <td style={styles.queueTd}>5 min</td>
                  <td style={styles.queueTd}>
                    <span style={{ ...styles.badge, ...styles.normalBadge }}>Waiting</span>
                  </td>
                  <td style={{ ...styles.queueTd, textAlign: "right" }}>
                    <Link href="/agent/resolution" style={styles.secondaryBtn}>
                      Open
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Pinned Resources & Performance Insight */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Performance Insight callout block */}
          <div style={styles.insightCard}>
            <Award size={24} color="#2ecc71" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={styles.insightTitle}>Performance Insight</h4>
              <p style={styles.insightText}>
                You&apos;re resolving roaming queries 35% faster than last week. Keep it up!
              </p>
            </div>
          </div>

          {/* Frequently used articles and pinned resources */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <span>Pinned Resources</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={styles.listItem}>
                <div>
                  <h5 style={styles.articleTitle}>Understanding Roaming in Turkey</h5>
                  <p style={styles.articleMeta}>Rates: 2 IQD/MB | Status: Active</p>
                </div>
                <Link href="/agent/article/roaming-activation" style={{ color: "#666666" }}>
                  <BookOpen size={16} />
                </Link>
              </div>

              <div style={styles.listItem}>
                <div>
                  <h5 style={styles.articleTitle}>SIM Card Activation Procedure</h5>
                  <p style={styles.articleMeta}>KYC verification & ownership branch steps</p>
                </div>
                <Link href="/agent/article/sim-replacement" style={{ color: "#666666" }}>
                  <BookOpen size={16} />
                </Link>
              </div>

              <div style={styles.listItemLast}>
                <div>
                  <h5 style={styles.articleTitle}>Zain Super Card Bundles</h5>
                  <p style={styles.articleMeta}>Recharge codes, renewal & units checking</p>
                </div>
                <Link href="/agent/article/super-card" style={{ color: "#666666" }}>
                  <BookOpen size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
