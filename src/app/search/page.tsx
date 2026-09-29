import Link from "next/link";
import { db } from "@/lib/db";
import { SiteNav } from "@/components/SiteNav";
export const metadata = { title: "Search" };
export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ q?: string }> };
export default async function SearchPage({searchParams}:Props) {
 const {q=""}=await searchParams; const term=q.trim();
 const results=term.length>0?await db.article.findMany({where:{status:"PUBLISHED",publishedAt:{lte:new Date()},OR:[{title:{contains:term,mode:"insensitive"}},{excerpt:{contains:term,mode:"insensitive"}},{content:{contains:term,mode:"insensitive"}},{category:{contains:term,mode:"insensitive"}}]},orderBy:{publishedAt:"desc"},take:30}):[];
 return <main><SiteNav/><section className="page wrap"><div className="eyebrow">DISCOVER</div><h1>Search the <em>library.</em></h1><form className="search-form" action="/search"><input name="q" defaultValue={term} placeholder="Search ideas, topics, articles…" aria-label="Search articles"/><button type="submit">Search ↗</button></form>{term?<p className="result-count">{results.length} result{results.length===1?"":"s"} for “{term}”</p>:null}<div className="story-list">{results.map(a=><Link className="story" href={`/articles/${a.slug}`} key={a.id}><div className="story-main"><span className="story-category">{a.category}</span><h3>{a.title}</h3><p>{a.excerpt}</p></div><span className="story-arrow">↗</span></Link>)}</div>{term&&results.length===0?<p className="empty-state">No matching published articles found.</p>:null}</section></main>;
}