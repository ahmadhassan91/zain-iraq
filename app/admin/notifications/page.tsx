"use client";

import { Bell, CalendarClock, Radio } from "lucide-react";
import { AppShell, SectionTitle, useLanguage } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import { announcements } from "@/lib/data";
import { announcementCopy, defaultFormCopy, notificationsCopy, term } from "@/lib/localized-copy";

export default function NotificationsPage() {
  return (
    <AppShell active="Notifications">
      <NotificationsContent />
    </AppShell>
  );
}

function NotificationsContent() {
  const { language } = useLanguage();
  const copy = notificationsCopy[language];
  const defaultCopy = defaultFormCopy[language];

  return (
    <>
      <SectionTitle title={copy.title}>
        <span className="chip live">
          <Bell size={14} />
          {announcements.filter((item) => item.status === "Live").length} {copy.live}
        </span>
      </SectionTitle>

      <div className="grid two">
        <div className="panel">
          <h3>{copy.create}</h3>
          <div className="form-grid">
            <label>
              <span className="small">{copy.fieldTitle}</span>
              <input className="field" value={defaultCopy.title} readOnly />
            </label>
            <label>
              <span className="small">{copy.audience}</span>
              <select className="field" defaultValue="All">
                <option>{term("Customer", language)}</option>
                <option>{term("Agent", language)}</option>
                <option>{term("All", language)}</option>
              </select>
            </label>
            <label>
              <span className="small">{copy.channel}</span>
              <select className="field" defaultValue="Website">
                <option>{term("Website", language)}</option>
                <option>{term("Agent Portal", language)}</option>
                <option>{term("Chatbot", language)}</option>
                <option>{term("WhatsApp", language)}</option>
              </select>
            </label>
            <label>
              <span className="small">{copy.schedule}</span>
              <input className="field" defaultValue="2026-05-18 09:00" />
            </label>
            <label className="full">
              <span className="small">{copy.message}</span>
              <textarea className="textarea" value={defaultCopy.message} readOnly />
            </label>
          </div>
          <div className="inline-actions" style={{ marginTop: 14 }}>
            <DemoActionButton className="btn" message={copy.scheduled}>{copy.scheduleBtn}</DemoActionButton>
            <DemoActionButton className="btn magenta" message={copy.published}>{copy.publish}</DemoActionButton>
          </div>
        </div>

        <div className="panel">
          <SectionTitle title={copy.list}>
            <CalendarClock size={18} color="#4a9e9d" />
          </SectionTitle>
          <div className="article-list">
            {announcements.map((announcement) => {
              const localized = announcementCopy(announcement, language);
              return (
                <div className="result-item" key={announcement.id}>
                  <div>
                    <h3>{localized.title}</h3>
                    <p className="muted">{localized.message}</p>
                    <div className="chip-row">
                      <span className={`chip ${announcement.status.toLowerCase()}`}>{term(announcement.status, language)}</span>
                      <span className={`chip ${announcement.severity.toLowerCase()}`}>{term(announcement.severity, language)}</span>
                      <span className="chip">{term(announcement.audience, language)}</span>
                    </div>
                  </div>
                  <Radio size={22} color="#d12c89" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
