import Link from "next/link";
import { readProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", "Headphones", "Speakers", "Turntables", "Accessories"];

export default function ShopPage({ searchParams }) {
  const products = readProducts();
  const activeCategory = searchParams?.category || "All";
  const sort = searchParams?.sort || "featured";

  let filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  filtered = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-3 font-display text-3xl md:text-4xl">
        {activeCategory === "All" ? "All products" : activeCategory}
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const href = c === "All" ? "/shop" : `/shop?category=${c}`;
            const isActive = c === activeCategory;
            return (
              <Link
                key={c}
                href={href}
                className={`focus-ring border px-4 py-2 font-mono text-xs uppercase tracking-widest2 transition-colors ${
                  isActive
                    ? "border-brass text-brass"
                    : "border-line text-muted hover:text-paper"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-2 font-mono text-xs uppercase tracking-widest2 text-muted">
          <Link
            href={`/shop${activeCategory !== "All" ? `?category=${activeCategory}&` : "?"}sort=price-asc`}
            className={`focus-ring hover:text-paper ${sort === "price-asc" ? "text-brass" : ""}`}
          >
            Price ↑
          </Link>
          <span>/</span>
          <Link
            href={`/shop${activeCategory !== "All" ? `?category=${activeCategory}&` : "?"}sort=price-desc`}
            className={`focus-ring hover:text-paper ${sort === "price-desc" ? "text-brass" : ""}`}
          >
            Price ↓
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-muted">Nothing in this category yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
