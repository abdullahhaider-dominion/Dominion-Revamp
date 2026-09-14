import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { BLOG_ARTICLES, getArticle } from "@/content/blog";

type ArticleParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticleParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Article" };
  }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticleRoute({ params }: ArticleParams) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <BlogArticlePage article={article} />;
}
