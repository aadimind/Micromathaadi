"use client";
import { useRouter } from "next/navigation";
export function SignOutButton(){const router=useRouter();return <button className="signout" onClick={async()=>{await fetch("/api/auth/logout",{method:"POST"});router.push("/");router.refresh();}}>Sign out ↗</button>;}
