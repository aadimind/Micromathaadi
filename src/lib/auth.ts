import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const cookieName = "micromathaadi_session";
function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters");
  return new TextEncoder().encode(value);
}
export async function createSession(adminId: string) {
  const token = await new SignJWT({ sub: adminId, role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret());
  const jar = await cookies();
  jar.set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 604800 });
}
export async function getSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret()); return typeof payload.sub === "string" ? payload.sub : null; }
  catch { return null; }
}
export async function clearSession() { (await cookies()).delete(cookieName); }
