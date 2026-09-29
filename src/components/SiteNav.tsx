import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
export function SiteNav() {
  return <header className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">μ</span> micromath<span className="brand-dot">.</span></Link><nav><Link href="/articles">Articles</Link><Link href="/topics">Topics</Link><Link href="/about">About</Link></nav><div className="nav-actions"><Link className="search-link" href="/search" aria-label="Search"><Search size={18}/></Link><Link className="admin-link" href="/admin">Admin <BookOpen size={14}/></Link></div></header>;
}
