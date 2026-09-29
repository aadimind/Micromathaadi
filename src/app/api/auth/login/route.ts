import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, isSameOriginRequest } from "@/lib/auth";
const schema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)});
export async function POST(request:Request){if(!isSameOriginRequest(request))return NextResponse.json({error:"Forbidden origin"},{status:403});try{const body=schema.safeParse(await request.json());if(!body.success)return NextResponse.json({error:"Invalid credentials format."},{status:400});const admin=await db.admin.findUnique({where:{email:body.data.email.toLowerCase()}});if(!admin||!(await compare(body.data.password,admin.passwordHash)))return NextResponse.json({error:"Invalid email or password."},{status:401});await createSession(admin.id);return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Authentication service unavailable."},{status:500});}}
