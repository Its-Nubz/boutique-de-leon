# Boutique de Leon — QR Checkout (staff-only prototype)

Open `checkout.html` to preview the mobile checkout interface. This page is **not live** until a secure backend is configured. Do not link this private staff page from the public storefront.

## Airtable mapping
Base: Boutique de Leon. Table: Products & Private Inventory.
- Record ID = permanent QR identifier.
- Product = display name.
- Boutique Price = checkout unit price.
- Inventory On Hand — PRIVATE = stock.
- Units Sold — PRIVATE = sold counter.
- Inventory Movements = audit trail.

## Required private API
Deploy an authenticated HTTPS backend with:
- `GET /health` → `{"name":"Boutique de Leon"}`
- `GET /products/:recordId` → `{"name":"...","price":25,"available":3}`
- `POST /checkout` with `{"items":[{"id":"rec...","qty":1}],"paymentMethod":"Cash"}` and `Idempotency-Key` header → `{"orderId":"..."}`

The backend MUST validate staff authentication, prices, stock, quantities and payment method server-side; reject duplicate idempotency keys; write inventory movements; update stock and sold counters; and implement rollback/reconciliation for partial Airtable write failures. Airtable updates are not multi-record transactions. For a reliable multi-item checkout, use a transactional order database as source of truth and reconcile Airtable, rather than trusting browser-side stock counts.

Never embed Airtable API tokens or credentials in GitHub Pages HTML/JS. The public storefront must never expose private costs, quantities, or movement records. Protect staff API with access control (e.g. Cloudflare Access), enforce CORS to the trusted origin, and require CSRF protection if using cookie sessions.

## Status
Frontend prototype committed. No live Airtable mutations or inventory deductions enabled. Backend and authentication are required before accepting real sales.
