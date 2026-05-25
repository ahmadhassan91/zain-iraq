"use client";

import { AppShell } from "@/components/AppChrome";
import { ArticleDetailContent } from "../[id]/ArticleDetailContent";

export default function CustomerArticleDetailPageStatic() {
  return (
    <AppShell active="ARTICLE DETAIL">
      <ArticleDetailContent id="roaming-activation" />
    </AppShell>
  );
}
