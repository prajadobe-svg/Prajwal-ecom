import Image from "next/image";
import { notFound } from "next/navigation";
import { readProducts } from "@/lib/db";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductCard from "@/components/ProductCard";
import ProductViewTracker from "@/components/ProductViewTracker";

export function generateStaticParams() {
  return readProducts().map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }) {
  const products = readProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <ProductViewTracker product={product} />
      <div className="grid gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden bg-surface">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={img}
                  alt={`${product.name} detail ${i + 2}`}
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{product.category} / {product.sku}</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted">{product.tagline}</p>
          <p className="mt-6 font-mono text-2xl text-brass">${product.price}</p>

          <p className="mt-6 max-w-[54ch] text-sm leading-relaxed text-paper/90">
            {product.description}
          </p>

          <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-muted">
            {product.stock > 0 ? `${product.stock} in stock` : "Currently unavailable"}
          </p>

          <AddToCartPanel product={product} />

          {/* Spec sheet */}
          <div className="mt-12">
            <p className="eyebrow">Spec sheet</p>
            <div className="mt-4">
              {product.specs.map((spec, i) => (
                <div key={spec.label} className="spec-row">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted">{spec.label}</span>
                  <span className="text-right font-mono text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 border-t border-line pt-14">
          <p className="eyebrow">Also in {product.category}</p>
          <h2 className="mt-3 font-display text-2xl">You might also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
