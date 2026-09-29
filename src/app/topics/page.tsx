import Link from "next/link";
import { db } from "@/lib/db";
import { SiteNav } from "@/components/SiteNav";
export const metadata = { title: "Topics" };
export const dynamic = "force-dynamic";
export default async function TopicsPage() {
 const groups = await db.article.groupBy({ by: ["category"], where: { status: "PUBLISHED", publishedAt: { lte: new Date() } }, _count: { _all: true }, orderBy: { category: "asc" } });
 return <main><SiteNav/><section className="page wrap"><div className="eyebrow">BROWSE BY SUBJECT</div><h1>Find your <em>curiosity.</em></h1><div className="topic-grid">{groups.map(g=><Link className="topic-card" key={g.category} href={`/articles?topic=${encodeURIComponent(g.category)}`}><span className="story-category">TOPIC</span><h2>{g.category}</h2><p>{g._count._all} published {g._count._all===1?"article":"articles"}</p></Link>)}</div>{groups.length===0?<p className="empty-state">Topics will appear when articles are published.</p>:null}</section></main>;
}