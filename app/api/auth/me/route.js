import { NextResponse } from "next/server";
import { readUsers } from "@/lib/db";
import { getBearerToken, verifyToken } from "@/lib/auth";

export async function GET(request) {
  const token = getBearerToken(request);
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const users = readUsers();
  const user = users.find((u) => u.id === payload.sub);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
}
