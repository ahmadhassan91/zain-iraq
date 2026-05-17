import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { analytics } from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <AppShell active="Analytics">
      <SectionTitle title="Reporting and analytics" />
      <div className="grid four">
        <StatCard label="API calls today" value="18.4k" detail="Website, chatbot and WhatsApp simulation" />
        <StatCard label="Avg API response" value="118ms" detail="Search and article retrieval endpoints" />
        <StatCard label="Low confidence" value="64" detail="Queries below 70% confidence" />
        <StatCard label="Helpful rating" value="86%" detail="Customer and agent feedback" />
      </div>
      <section className="section">
        <div className="grid two">
          <div className="panel stat-bars">
            <h3>Search terms and failed searches</h3>
            {analytics.map((row) => (
              <div className="bar-row" key={row.label}>
                <div className="section-title">
                  <span>{row.label}</span>
                  <span className="small">{row.failures} gaps</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.min(100, row.failures)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="panel">
            <h3>Closed-loop feedback feed</h3>
            <div className="article-list">
              {[
                "Customer escalated after viewing roaming guide",
                "Chatbot answer rated unhelpful for app OTP",
                "Agent marked SIM replacement article as outdated",
                "WhatsApp variant requested for Super Card FAQ"
              ].map((item) => (
                <div className="result-item" key={item}>
                  <p>{item}</p>
                  <span className="chip magenta">Review</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
