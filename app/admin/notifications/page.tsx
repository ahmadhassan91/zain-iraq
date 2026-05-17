import { Bell, CalendarClock, Radio } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppChrome";
import { DemoActionButton } from "@/components/DemoActionButton";
import { announcements } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <AppShell active="Notifications">
      <SectionTitle title="Notification and alert management">
        <span className="chip live">
          <Bell size={14} />
          {announcements.filter((item) => item.status === "Live").length} live
        </span>
      </SectionTitle>

      <div className="grid two">
        <div className="panel">
          <h3>Create announcement</h3>
          <div className="form-grid">
            <label>
              <span className="small">Title</span>
              <input className="field" defaultValue="Roaming service advisory" />
            </label>
            <label>
              <span className="small">Audience</span>
              <select className="field" defaultValue="All">
                <option>Customer</option>
                <option>Agent</option>
                <option>All</option>
              </select>
            </label>
            <label>
              <span className="small">Channel</span>
              <select className="field" defaultValue="Website">
                <option>Website</option>
                <option>Agent Portal</option>
                <option>Chatbot</option>
                <option>WhatsApp</option>
              </select>
            </label>
            <label>
              <span className="small">Schedule</span>
              <input className="field" defaultValue="2026-05-18 09:00" />
            </label>
            <label className="full">
              <span className="small">Banner message</span>
              <textarea className="textarea" defaultValue="Customers may experience intermittent roaming registration in selected destinations. Agents should verify partner network status before escalation." />
            </label>
          </div>
          <div className="inline-actions" style={{ marginTop: 14 }}>
            <DemoActionButton className="btn" message="Scheduled">Schedule</DemoActionButton>
            <DemoActionButton className="btn magenta" message="Published live">Publish now</DemoActionButton>
          </div>
        </div>

        <div className="panel">
          <SectionTitle title="Live and scheduled alerts">
            <CalendarClock size={18} color="#4a9e9d" />
          </SectionTitle>
          <div className="article-list">
            {announcements.map((announcement) => (
              <div className="result-item" key={announcement.id}>
                <div>
                  <h3>{announcement.title}</h3>
                  <p className="muted">{announcement.message}</p>
                  <div className="chip-row">
                    <span className={`chip ${announcement.status.toLowerCase()}`}>{announcement.status}</span>
                    <span className={`chip ${announcement.severity.toLowerCase()}`}>{announcement.severity}</span>
                    <span className="chip">{announcement.audience}</span>
                  </div>
                </div>
                <Radio size={22} color="#d12c89" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
