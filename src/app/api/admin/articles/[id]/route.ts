import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession, isSameOriginRequest } from "@/lib/auth";
import { slugify } from "@/lib/slug";

type Ctx = { params: Promise<{ id: string }> };
const schema = z.object({
  title: z.string().trim().min(1).max(180),
  slug: z.string().trim().max(100).optional().default(""),
  excerpt: z.string().trim().min(1).max(320),
  content: z.string().min(1).max(200000),
  category: z.string().trim().min(1).max(80),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  coverImage: z.string().url().max(2048).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export async function PATCH(request: Request, { params }: Ctx) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid article fields", details: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const slug = slugify(d.slug || d.title);
  if (!slug) return NextResponse.json({ error: "Valid slug required" }, { status: 400 });
  try {
    const old = await db.article.findUnique({ where: { id } });
    if (!old) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    const article = await db.article.update({ where: { id }, data: { ...d, slug, coverImage: d.coverImage || null, publishedAt: d.status === "PUBLISHED" ? (old.publishedAt ?? new Date()) : null } });
    return NextResponse.json({ id: article.id, slug: article.slug });
  } catch {
    return NextResponse.json({ error: "Slug already exists or database write failed" }, { status: 409 });
  }
}

export async function DELETE(request: Request, { params }: Ctx) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await db.article.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
}