"use client";

import { AppShell, SectionTitle } from "@/components/AppChrome";
import { PersonaCard } from "@/components/ArticleBlocks";
import { agents } from "@/lib/data";
import { useLanguage } from "@/components/AppChrome";
import { groupsCopy } from "@/lib/localized-copy";

export default function GroupsPage() {
  return (
    <AppShell active="Groups & Skills">
      <GroupsContent />
    </AppShell>
  );
}

function GroupsContent() {
  const { language } = useLanguage();
  const copy = groupsCopy[language];
  const permissionItems = [copy.item1, copy.item2, copy.item3, copy.item4, copy.item5];

  return (
    <>
      <SectionTitle title={copy.title} level={1}>
        <span className="chip">{copy.target}</span>
      </SectionTitle>
      <div className="grid two">
        <div className="persona-list">
          {agents.map((agent) => (
            <PersonaCard key={agent.id} agent={agent} />
          ))}
        </div>
        <div className="panel">
          <h3>{copy.permission}</h3>
          <div className="timeline">
            {permissionItems.map((item, index) => (
              <div className="step" key={item}>
                <span className="step-number">{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
