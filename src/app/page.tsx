import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stories = await db.article.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { id: true, category: true, title: true, excerpt: true, slug: true, publishedAt: true },
  });
  return <main>
    <header className="nav wrap">
      <Link className="brand" href="/"><span className="brand-mark">μ</span> micromath<span className="brand-dot">.</span></Link>
      <nav><Link href="/articles">Articles</Link><Link href="/topics">Topics</Link><Link href="/about">About</Link></nav>
      <div className="nav-actions"><Link className="search-link" href="/search" aria-label="Search"><Search size={18}/></Link><Link className="admin-link" href="/admin">Admin <ArrowUpRight size={14}/></Link></div>
    </header>
    <section className="hero wrap">
      <div className="eyebrow"><span className="eyebrow-line"/> AN OPEN SPACE FOR IDEAS</div>
      <h1>Understand the<br/><em>why</em> behind the <span className="serif">what.</span></h1>
      <p className="hero-copy">Thoughtful explanations of mathematics, science and technology. Complex ideas, made clear — without losing their depth.</p>
      <div className="hero-bottom"><Link className="primary-button" href="/articles">Explore the library <ArrowUpRight size={16}/></Link><span className="hero-note"><BookOpen size={15}/> A growing collection of ideas</span></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-core">μ</div><span className="orbit-label label-a">01 / THINK</span><span className="orbit-label label-b">02 / QUESTION</span><span className="orbit-label label-c">03 / UNDERSTAND</span></div>
    </section>
    <section className="stories-section"><div className="wrap">
      <div className="section-heading"><div><div className="eyebrow">THE READING ROOM</div><h2>Ideas to <em>explore.</em></h2></div><Link className="text-link" href="/articles">View all articles <ArrowUpRight size={15}/></Link></div>
      <div className="story-list">{stories.map((story,i)=><Link className="story" href={"/articles/"+story.slug} key={story.id}><span className="story-number">{String(i+1).padStart(2,"0")}</span><div className="story-main"><span className="story-category">{story.category}</span><h3>{story.title}</h3><p>{story.excerpt}</p></div><span className="story-date">{story.publishedAt ? new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric"}).format(story.publishedAt) : ""}</span><span className="story-arrow"><ArrowUpRight size={19}/></span></Link>)}{stories.length===0?<p className="empty-state">The reading room is being prepared. Published articles will appear here.</p>:null}</div>
    </div></section>
    <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">μ</span> micromath<span className="brand-dot">.</span></Link><span>Curiosity, carefully explained.</span><span>© {new Date().getFullYear()} Micromath</span></footer>
  </main>;
}