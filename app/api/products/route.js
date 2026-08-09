import { NextResponse } from "next/server";
import { readProducts } from "@/lib/db";

export async function GET() {
  const products = readProducts();
  return NextResponse.json({ products });
}
