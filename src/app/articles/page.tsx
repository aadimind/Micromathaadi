import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleCard } from "@/components/ArticleCard";
import { SiteNav } from "@/components/SiteNav";
export const metadata: Metadata = { title: "Articles", description: "Explore clear explanations across mathematics, science and technology." };
export const dynamic = "force-dynamic";
type Props={searchParams:Promise<{topic?:string}>};
export default async function ArticlesPage({searchParams}:Props) {
  const {topic}=await searchParams;
  const articles = await db.article.findMany({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() }, ...(topic?{category:topic}:{}) }, orderBy: { publishedAt: "desc" } });
  return <main><SiteNav/><section className="page wrap"><div className="eyebrow">THE LIBRARY</div><h1>Ideas to <em>explore.</em></h1><p className="hero-copy">{topic? `Exploring ${topic}.`:"A growing collection of carefully considered explanations."}</p><div className="story-list">{articles.length ? articles.map(a=><ArticleCard key={a.id} article={a}/>) : <p className="empty-state">No articles published in this collection yet.</p>}</div></section></main>;
}