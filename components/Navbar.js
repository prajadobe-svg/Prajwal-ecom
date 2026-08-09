"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="focus-ring font-display text-lg tracking-widest2 uppercase"
        >
          Nomad <span className="text-brass">Audio</span>
        </Link>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest2 text-muted md:flex">
          <Link href="/shop" className="focus-ring hover:text-paper transition-colors">
            Shop
          </Link>
          <Link
            href="/shop?category=Headphones"
            className="focus-ring hover:text-paper transition-colors"
          >
            Headphones
          </Link>
          <Link
            href="/shop?category=Speakers"
            className="focus-ring hover:text-paper transition-colors"
          >
            Speakers
          </Link>
          <Link
            href="/shop?category=Turntables"
            className="focus-ring hover:text-paper transition-colors"
          >
            Turntables
          </Link>
        </nav>

        <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest2">
          {!loading && (
            <Link
              href={user ? "/account" : "/login"}
              className="focus-ring hover:text-brass transition-colors"
            >
              {user ? user.name.split(" ")[0] : "Sign in"}
            </Link>
          )}
          <Link href="/cart" className="focus-ring hover:text-brass transition-colors">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </div>
      </div>
    </header>
  );
}
