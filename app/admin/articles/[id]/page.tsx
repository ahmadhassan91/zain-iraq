import { AppShell } from "@/components/AppChrome";
import { AdminArticleEditor } from "@/components/AdminArticleEditor";
import { articles, findArticle } from "@/lib/data";

export function generateStaticParams() {
  return [{ id: "new" }, ...articles.map((article) => ({ id: article.id }))];
}

export default function AdminArticlePage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const article = isNew ? findArticle("app-login") : findArticle(params.id);

  return (
    <AppShell active="Articles">
      <AdminArticleEditor article={article} isNew={isNew} />
    </AppShell>
  );
}
