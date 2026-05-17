import { AppShell } from "@/components/AppChrome";
import { ArticleViewer } from "@/components/ArticleBlocks";
import { articles, findArticle } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default function AgentArticlePage({ params }: { params: { id: string } }) {
  return (
    <AppShell active="Agent Workspace">
      <ArticleViewer article={findArticle(params.id)} mode="agent" />
    </AppShell>
  );
}
