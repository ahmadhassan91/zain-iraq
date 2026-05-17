import { AppShell, SectionTitle } from "@/components/AppChrome";
import { PersonaCard } from "@/components/ArticleBlocks";
import { agents } from "@/lib/data";

export default function GroupsPage() {
  return (
    <AppShell active="Groups & Skills">
      <SectionTitle title="Agent groups and targeted skills">
        <span className="chip">5 targeted agents</span>
      </SectionTitle>
      <div className="grid two">
        <div className="persona-list">
          {agents.map((agent) => (
            <PersonaCard key={agent.id} agent={agent} />
          ))}
        </div>
        <div className="panel">
          <h3>Permission model</h3>
          <div className="timeline">
            {[
              "Public content is visible to all customers and digital channels",
              "Agent content is visible to authenticated contact center users",
              "Private Group content is restricted by agent group and skill",
              "Digital Channel content exposes safe variants for API consumers",
              "Admins can pin global content and assign group visibility"
            ].map((item, index) => (
              <div className="step" key={item}>
                <span className="step-number">{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
