"use client";

/**
 * Thin wrapper around the Adobe Client Data Layer (ACDL) convention:
 * https://github.com/adobe/adobe-client-data-layer
 *
 * `window.adobeDataLayer` is an ARRAY (not a plain object) that Adobe's
 * tags/Launch, Web SDK, or Analytics extensions listen to via `.push()`.
 * Every entry is an event object with an `event` name plus whatever
 * context (user, product, cart) is relevant to that event.
 *
 * We deliberately never push raw PII (email, name) into the data layer —
 * only the authenticated flag and an internal, non-guessable user id.
 * That's the same reason real AEP/Analytics implementations tokenize or
 * hash identifiers before they leave the browser.
 */

export function getDataLayer() {
  if (typeof window === "undefined") return null;
  window.adobeDataLayer = window.adobeDataLayer || [];
  return window.adobeDataLayer;
}

export function pushToDataLayer(entry) {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push({
    ...entry,
    eventInfo: {
      ...entry.eventInfo,
      timestamp: new Date().toISOString(),
    },
  });
}

export function userContext(user) {
  return {
    authenticated: Boolean(user),
    ...(user ? { id: user.id } : {}),
  };
}

export function productContext(product, extra = {}) {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    category: product.category,
    price: product.price,
    ...extra,
  };
}

export function cartContext(items, products) {
  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
  const totalItems = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);
  return { totalItems, subtotal: Number(subtotal.toFixed(2)) };
}

/** Convenience helpers for the specific events this storefront emits. */

export function pushProductView(product, user) {
  pushToDataLayer({
    event: "productView",
    user: userContext(user),
    product: productContext(product),
  });
}

export function pushAddToCart(product, quantity, user, cart) {
  pushToDataLayer({
    event: "addToCart",
    user: userContext(user),
    product: productContext(product, { quantity }),
    ...(cart ? { cart } : {}),
  });
}

export function pushRemoveFromCart(product, quantity, user, cart) {
  pushToDataLayer({
    event: "removeFromCart",
    user: userContext(user),
    product: productContext(product, { quantity }),
    ...(cart ? { cart } : {}),
  });
}

export function pushAuthEvent(eventName, user) {
  pushToDataLayer({
    event: eventName, // "login" | "logout" | "signUp"
    user: userContext(user),
  });
}

export function pushCheckoutEvent(eventName, user, cart) {
  pushToDataLayer({
    event: eventName, // "beginCheckout" | "purchase"
    user: userContext(user),
    ...(cart ? { cart } : {}),
  });
}
