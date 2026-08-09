# Nomad Audio

A demo ecommerce storefront built with **Next.js 14 (App Router)** and
**Tailwind CSS**. Passive audio gear (headphones, speakers, turntables) is
the theme — chosen so the design has real specs and a real catalog to work
with rather than filler placeholder text.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — a dev default is used otherwise
npm run dev
```

Then open http://localhost:3000.

## What's included

- **Pages**: home, shop (with category filter + sort via URL params),
  product detail (gallery + spec sheet), cart, checkout, login, register,
  account.
- **JSON-based authentication**: `data/users.json` acts as the user store.
  `app/api/auth/register` and `app/api/auth/login` hash/verify passwords
  with Node's built-in `crypto.scrypt` and issue a signed, HMAC-SHA256
  token (a small JWT-like structure, no external auth library). The token
  is kept in `localStorage` on the client and sent as a `Bearer` header;
  `app/api/auth/me` resolves it back to a user server-side.
- **Product catalog**: `data/products.json`, served through
  `app/api/products`. Images are placeholder photography from
  `picsum.photos`, seeded per-product so each product keeps a consistent
  set of images.
- **Cart**: React context persisted to `localStorage`, no backend needed.

## Notes on the "JSON auth"

This is intentionally simple — a flat JSON file instead of a real
database — so the whole auth flow is readable in a few files. Swapping
`lib/db.js` for a real database client (Postgres, SQLite, etc.) is the
natural next step; the API routes and token logic don't need to change.

## Project structure

```
app/
  api/auth/login|register|me/route.js   JSON auth endpoints
  api/products/route.js                 Product catalog endpoint
  shop/, product/[id]/, cart/,          Pages
  checkout/, login/, register/, account/
  layout.js, providers.js, globals.css
components/                             Navbar, Footer, ProductCard, AddToCartPanel
context/                                AuthContext, CartContext
data/                                   users.json, products.json
lib/                                    auth.js, db.js
```
