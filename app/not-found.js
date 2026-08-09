import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-3xl">Not on the shelf.</h1>
      <p className="mt-4 text-muted">
        That page doesn&apos;t exist — it may have been moved or never shipped.
      </p>
      <Link href="/shop" className="btn-primary focus-ring mt-8 inline-block">
        Back to the shop
      </Link>
    </div>
  );
}
