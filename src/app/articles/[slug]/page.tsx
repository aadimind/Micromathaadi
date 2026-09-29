import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { SiteNav } from "@/components/SiteNav";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const article = await db.article.findFirst({ where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } } });
  return article ? { title: article.title, description: article.excerpt, openGraph:{title:article.title,description:article.excerpt,type:"article",images:article.coverImage?[article.coverImage]:[]} } : { title: "Article not found" };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params; const article = await db.article.findFirst({ where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } } });
  if (!article) notFound();
  return <main><SiteNav/><article className="article-page wrap"><Link className="back-link" href="/articles">← All articles</Link><div className="eyebrow">{article.category}</div><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><div className="article-meta">{article.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(article.publishedAt) : ""}</div>{article.coverImage ? <img className="article-cover" src={article.coverImage} alt=""/> : null}<div className="article-content">{article.content.split(/\n{2,}/).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div>{article.tags.length ? <div className="tag-row">{article.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div> : null}</article></main>;
}