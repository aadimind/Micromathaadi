import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArticleEditor } from "@/components/ArticleEditor";
type Props={params:Promise<{id:string}>};
export default async function EditArticlePage({params}:Props){if(!await getSession())redirect("/admin/login");const {id}=await params;const article=await db.article.findUnique({where:{id}});if(!article)notFound();return <main className="editor-shell"><ArticleEditor mode="edit" article={{id:article.id,title:article.title,slug:article.slug,excerpt:article.excerpt,content:article.content,category:article.category,tags:article.tags.join(", "),coverImage:article.coverImage??"",status:article.status}}/></main>;}
