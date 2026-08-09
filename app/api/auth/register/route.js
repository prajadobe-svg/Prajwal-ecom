import { NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/lib/db";
import { hashPassword, createToken } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are all required." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  const user = {
    id: `u_${crypto.randomBytes(6).toString("hex")}`,
    name,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);

  const token = createToken({ sub: user.id, email: user.email });
  return NextResponse.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
