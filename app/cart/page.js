"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { pushRemoveFromCart, cartContext } from "@/lib/adobeDataLayer";

export default function CartPage() {
  const { items, updateQty, removeFromCart, hydrated } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  function handleRemove(product, qty) {
    removeFromCart(product.id);
    const remaining = items.filter((i) => i.productId !== product.id);
    pushRemoveFromCart(product, qty, user, cartContext(remaining, products));
  }

  if (!hydrated || loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-muted">
        Loading cart…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
      <p className="eyebrow">Your cart</p>
      <h1 className="mt-3 font-display text-3xl md:text-4xl">Cart</h1>

      {lines.length === 0 ? (
        <div className="mt-14 border border-line p-10 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary focus-ring mt-6 inline-block">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 divide-y divide-line border-y border-line">
            {lines.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 py-6">
                <Link
                  href={`/product/${product.id}`}
                  className="focus-ring relative h-24 w-24 flex-shrink-0 overflow-hidden bg-surface"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${product.id}`}
                        className="focus-ring font-display text-base hover:text-brass"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {product.sku}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-brass">
                      ${(product.price * qty).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-line font-mono text-sm">
                      <button
                        type="button"
                        className="focus-ring px-3 py-2 text-muted hover:text-paper"
                        onClick={() => updateQty(product.id, qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="w-8 text-center">{qty}</span>
                      <button
                        type="button"
                        className="focus-ring px-3 py-2 text-muted hover:text-paper"
                        onClick={() => updateQty(product.id, qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(product, qty)}
                      className="focus-ring font-mono text-xs uppercase tracking-widest2 text-muted hover:text-rust"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit border border-line p-6">
            <p className="eyebrow">Summary</p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="font-mono text-muted">Calculated at checkout</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-4 text-base">
              <span>Total</span>
              <span className="font-mono text-brass">${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn-primary focus-ring mt-6 block text-center">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
