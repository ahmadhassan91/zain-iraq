"use client";

import { useEffect, useState } from "react";
import type { Article } from "./data";

export type DemoKnowledgeState = {
  title: string;
  customerSummary: string;
  agentNote: string;
  visibility: "Customer + Agent" | "Agent only";
  version: string;
  publishedAt: string;
};

export const defaultDemoKnowledge: DemoKnowledgeState = {
  title: "Roaming support update",
  customerSummary: "Customers should confirm roaming is enabled before travel and restart the device after arrival.",
  agentNote: "Agents must check roaming eligibility, spend controls, partner network status and active package before escalation.",
  visibility: "Customer + Agent",
  version: "v1.0",
  publishedAt: "2026-05-18 09:00"
};

const updatedDemoKnowledge: DemoKnowledgeState = {
  title: "Roaming data fix for travel customers",
  customerSummary: "If roaming data is not working, ask the customer to restart the device and manually select a partner network from mobile settings.",
  agentNote: "Before opening a technical ticket, verify roaming eligibility, data bar status, APN settings and destination partner availability.",
  visibility: "Customer + Agent",
  version: "v1.1",
  publishedAt: "Just published by Admin"
};

const storageKey = "zain-demo-knowledge-state";

function readState() {
  if (typeof window === "undefined") return defaultDemoKnowledge;

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? ({ ...defaultDemoKnowledge, ...JSON.parse(stored) } as DemoKnowledgeState) : defaultDemoKnowledge;
  } catch {
    return defaultDemoKnowledge;
  }
}

function writeState(next: DemoKnowledgeState) {
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new Event("zain-demo-state-change"));
}

export function useDemoKnowledge() {
  const [state, setState] = useState(defaultDemoKnowledge);

  useEffect(() => {
    setState(readState());

    function syncState() {
      setState(readState());
    }

    window.addEventListener("storage", syncState);
    window.addEventListener("zain-demo-state-change", syncState);
    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("zain-demo-state-change", syncState);
    };
  }, []);

  function publishUpdate() {
    writeState(updatedDemoKnowledge);
  }

  function resetUpdate() {
    writeState(defaultDemoKnowledge);
  }

  return { state, publishUpdate, resetUpdate };
}

export function applyDemoKnowledgeToArticle(article: Article, state: DemoKnowledgeState): Article {
  if (article.id !== "roaming-activation") return article;

  return {
    ...article,
    title: state.title,
    summary: state.customerSummary,
    customerAnswer: state.customerSummary,
    internalNote: state.agentNote,
    updatedAt: state.publishedAt
  };
}
