import { NextResponse } from "next/server";
import { readUsers } from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const token = createToken({ sub: user.id, email: user.email });
  return NextResponse.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
