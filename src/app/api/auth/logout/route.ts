import { NextResponse } from "next/server";
import { clearSession, isSameOriginRequest } from "@/lib/auth";
export async function POST(request:Request){if(!isSameOriginRequest(request))return NextResponse.json({error:"Forbidden origin"},{status:403});await clearSession();return NextResponse.json({ok:true});}
