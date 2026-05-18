import { AppShell } from "@/components/AppChrome";
import { ArticleViewer } from "@/components/ArticleBlocks";
import { articles, findArticle } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default function CustomerArticlePage({ params }: { params: { id: string } }) {
  const article = findArticle(params.id);

  if (article.visibility !== "Public") {
    notFound();
  }

  return (
    <AppShell active="Customer KB">
      <ArticleViewer article={article} mode="customer" />
    </AppShell>
  );
}
