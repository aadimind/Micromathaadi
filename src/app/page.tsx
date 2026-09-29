import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";

const stories = [
  { category: "MATHEMATICS", title: "The beauty of thinking in patterns", excerpt: "A journey into the structures that connect seemingly unrelated ideas.", date: "8 min read", slug: "thinking-in-patterns", number: "01" },
  { category: "COMPUTER SCIENCE", title: "How neural networks learn", excerpt: "Understanding the basic ideas behind learning systems, one concept at a time.", date: "12 min read", slug: "how-neural-networks-learn", number: "02" },
  { category: "RESEARCH NOTES", title: "Reading a research paper with clarity", excerpt: "A practical framework for moving from a dense paper to a clear mental model.", date: "6 min read", slug: "reading-research-papers", number: "03" }
];

export default function Home() {
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
    <section className="stories-section">
      <div className="wrap">
        <div className="section-heading"><div><div className="eyebrow">THE READING ROOM</div><h2>Ideas to <em>explore.</em></h2></div><Link className="text-link" href="/articles">View all articles <ArrowUpRight size={15}/></Link></div>
        <div className="story-list">{stories.map((story)=><Link className="story" href={"/articles/"+story.slug} key={story.slug}><span className="story-number">{story.number}</span><div className="story-main"><span className="story-category">{story.category}</span><h3>{story.title}</h3><p>{story.excerpt}</p></div><span className="story-date">{story.date}</span><span className="story-arrow"><ArrowUpRight size={19}/></span></Link>)}</div>
      </div>
    </section>
    <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">μ</span> micromath<span className="brand-dot">.</span></Link><span>Curiosity, carefully explained.</span><span>© {new Date().getFullYear()} Micromath</span></footer>
  </main>;
}