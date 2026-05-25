import { AppShell } from "@/components/AppChrome";
import { ArticleDetailContent } from "./ArticleDetailContent";
import { articles } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default function CustomerArticleDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppShell active="ARTICLE DETAIL">
      <ArticleDetailContent id={params.id} />
    </AppShell>
  );
}
