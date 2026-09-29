import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
type ArticleCardProps = { article: { slug: string; title: string; excerpt: string; category: string; publishedAt: Date | null; } };
export function ArticleCard({ article }: ArticleCardProps) {
  return <Link className="story" href={`/articles/${article.slug}`}><span className="story-number">↗</span><div className="story-main"><span className="story-category">{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p></div><span className="story-date">{article.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(article.publishedAt) : "READ"}</span><span className="story-arrow"><ArrowUpRight size={19}/></span></Link>;
}
