import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ArticleEditor } from "@/components/ArticleEditor";
export default async function NewArticlePage(){if(!await getSession())redirect("/admin/login");return <main className="editor-shell"><ArticleEditor mode="create"/></main>;}
