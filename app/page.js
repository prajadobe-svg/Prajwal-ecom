import Link from "next/link";
import Image from "next/image";
import { readProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const products = readProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="eyebrow">No app required</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
              Gear built to be
              <br />
              turned on, <span className="text-brass">not updated.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-muted">
              Headphones, speakers and turntables designed around one rule:
              if it needs a firmware update, it doesn&apos;t ship. Wood,
              copper and magnets — that&apos;s the whole feature list.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary focus-ring">
                Shop the catalog
              </Link>
              <Link href="/shop?category=Turntables" className="btn-outline focus-ring">
                See turntables
              </Link>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden border border-line">
            <Image
              src="https://picsum.photos/seed/nomad-hero/1000/1000"
              alt="Overland turntable on a wooden shelf"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">01 / Featured</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">
              Currently in rotation
            </h2>
          </div>
          <Link
            href="/shop"
            className="focus-ring hidden font-mono text-xs uppercase tracking-widest2 text-muted hover:text-brass md:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Passive by design",
              d: "No batteries, no companion app, no cloud account to lose access to.",
            },
            {
              n: "02",
              t: "Repairable",
              d: "Every cable, cup and cartridge is a spare part, not a reason to replace the unit.",
            },
            {
              n: "03",
              t: "Specified in full",
              d: "Real driver sizes, real impedance, real frequency response — on every product page.",
            },
          ].map((item) => (
            <div key={item.n}>
              <span className="font-mono text-xs text-brass">{item.n}</span>
              <h3 className="mt-3 font-display text-lg">{item.t}</h3>
              <p className="mt-2 text-sm text-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
