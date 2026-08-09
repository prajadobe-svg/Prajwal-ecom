import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="card-hover focus-ring group block border border-transparent"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest2 text-brass">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-base">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        </div>
        <span className="whitespace-nowrap font-mono text-sm text-brass">
          ${product.price}
        </span>
      </div>
    </Link>
  );
}
