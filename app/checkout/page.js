"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { pushCheckoutEvent, cartContext } from "@/lib/adobeDataLayer";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, clearCart, hydrated } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ address: "", city: "", postcode: "" });
  const trackedBeginCheckout = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/checkout");
    }
  }, [loading, user, router]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  // Fire once, as soon as we have a logged-in user, a hydrated cart, and
  // the product data needed to compute totals.
  useEffect(() => {
    if (trackedBeginCheckout.current) return;
    if (loading || !user || !hydrated || products.length === 0) return;
    if (lines.length === 0) return;
    pushCheckoutEvent("beginCheckout", user, cartContext(items, products));
    trackedBeginCheckout.current = true;
  }, [loading, user, hydrated, products, items, lines.length]);

  function handlePlaceOrder(e) {
    e.preventDefault();
    pushCheckoutEvent("purchase", user, cartContext(items, products));
    clearCart();
    setPlaced(true);
  }

  if (loading || !user || !hydrated) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-muted">Loading…</div>;
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="eyebrow">Order placed</p>
        <h1 className="mt-3 font-display text-3xl">Thanks, {user.name.split(" ")[0]}.</h1>
        <p className="mt-4 text-muted">
          This is a demo storefront, so nothing actually ships — but that
          flow just worked end to end.
        </p>
        <button onClick={() => router.push("/shop")} className="btn-primary focus-ring mt-8">
          Keep browsing
        </button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-muted">Your cart is empty.</p>
        <button onClick={() => router.push("/shop")} className="btn-primary focus-ring mt-6">
          Browse the catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 font-display text-3xl md:text-4xl">Shipping details</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <form onSubmit={handlePlaceOrder} className="space-y-5 md:col-span-2">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest2 text-muted">
              Address
            </label>
            <input
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="focus-ring mt-2 w-full border border-line bg-surface px-4 py-3 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest2 text-muted">
                City
              </label>
              <input
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="focus-ring mt-2 w-full border border-line bg-surface px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest2 text-muted">
                Postcode
              </label>
              <input
                required
                value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                className="focus-ring mt-2 w-full border border-line bg-surface px-4 py-3 text-sm"
              />
            </div>
          </div>

          <p className="text-xs text-muted">
            Demo checkout — no payment is collected and this form doesn&apos;t
            store anything.
          </p>

          <button type="submit" className="btn-primary focus-ring w-full">
            Place order — ${subtotal.toFixed(2)}
          </button>
        </form>

        <div className="h-fit border border-line p-6">
          <p className="eyebrow">Order summary</p>
          <div className="mt-4 space-y-3">
            {lines.map((l) => (
              <div key={l.product.id} className="flex justify-between text-sm">
                <span className="text-muted">
                  {l.product.name} × {l.qty}
                </span>
                <span className="font-mono">${(l.product.price * l.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-base">
            <span>Total</span>
            <span className="font-mono text-brass">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
