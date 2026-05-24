"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, X, Play, RotateCcw, Send, Users, LayoutDashboard, 
  Globe2, Search, Bot, ChevronRight, ChevronDown 
} from "lucide-react";
import { useDemoKnowledge } from "@/lib/demo-state";

export function PresenterControls() {
  const [open, setOpen] = useState(false);
  const [storyMode, setStoryMode] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const { state, publishUpdate, resetUpdate } = useDemoKnowledge();
  const isUpdated = state.version === "v1.1";

  // Keyboard shortcut: Ctrl+Shift+P
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const storySteps = [
    { label: "Customer searches for roaming help", href: "/customer?q=roaming+data+setup", icon: Globe2 },
    { label: "Agent resolves the case internally", href: "/agent", icon: Search },
    { label: "Admin publishes an updated answer", href: "/admin", icon: LayoutDashboard },
    { label: "Customer sees the updated content", href: "/customer?q=roaming+data+setup", icon: Globe2 },
    { label: "API readiness for all channels", href: "/api-readiness", icon: Bot }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className="presenter-fab"
        onClick={() => setOpen(!open)}
        aria-label="Toggle presenter controls"
        title="Presenter controls (Ctrl+Shift+P)"
      >
        {open ? <X size={20} /> : <Zap size={20} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="presenter-panel">
          <div className="presenter-header">
            <h3>Presenter Controls</h3>
            <span className="chip advisory">Demo only</span>
          </div>

          {/* Story Mode */}
          <div className="presenter-section">
            <button 
              className="presenter-toggle"
              onClick={() => setStoryMode(!storyMode)}
            >
              <Play size={16} />
              <span>Story Mode</span>
              {storyMode ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {storyMode && (
              <div className="story-steps">
                {storySteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <Link 
                      key={i}
                      href={step.href}
                      className={`story-step ${i === storyStep ? 'active' : ''} ${i < storyStep ? 'done' : ''}`}
                      onClick={() => setStoryStep(i)}
                    >
                      <span className="story-step-number">{i + 1}</span>
                      <Icon size={14} />
                      <span>{step.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="presenter-section">
            <span className="presenter-label">Demo Actions</span>
            <div className="presenter-actions">
              <button 
                className={`btn ${isUpdated ? '' : 'primary'}`}
                onClick={publishUpdate}
                disabled={isUpdated}
              >
                <Send size={14} />
                {isUpdated ? 'Published ✓' : 'Publish update'}
              </button>
              <button className="btn ghost" onClick={resetUpdate}>
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
            <p className="small muted">State: {state.version} · {state.publishedAt}</p>
          </div>

          {/* Role Quick Switch */}
          <div className="presenter-section">
            <span className="presenter-label">Quick Switch</span>
            <div className="presenter-nav">
              <Link href="/" className="presenter-link"><Globe2 size={14} /> Home</Link>
              <Link href="/customer" className="presenter-link"><Users size={14} /> Customer</Link>
              <Link href="/agent" className="presenter-link"><Search size={14} /> Agent</Link>
              <Link href="/admin" className="presenter-link"><LayoutDashboard size={14} /> Admin</Link>
              <Link href="/api-readiness" className="presenter-link"><Bot size={14} /> API</Link>
            </div>
          </div>

          <p className="presenter-shortcut">⌘⇧P to toggle</p>
        </div>
      )}
    </>
  );
}
