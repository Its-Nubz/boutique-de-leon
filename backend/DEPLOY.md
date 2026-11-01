# Deploy the private checkout (single owner)

The QR checkout interface is in `/checkout.html`. The API is in `/backend/worker.js` and uses the **existing Boutique de Leon Airtable base**.

## One-time setup

1. Create or sign in to a Cloudflare account, add a Worker, and configure Cloudflare Access to allow only your email identity. The Worker must be behind Access, and its JWT must be verified on every API request.
2. In `backend/`, configure `wrangler.toml` with the exact GitHub Pages origin and your Access team domain and application audience tag.
3. Create an Airtable personal access token with `data.records:read` and `data.records:write` scoped **only** to the Boutique de Leon base. Do not put it in GitHub or client-side HTML.
4. From a trusted local terminal run `npx wrangler secret put AIRTABLE_TOKEN` and `npx wrangler deploy`.
5. Open `checkout.html`, paste the deployed Worker HTTPS URL, and connect after authenticating through Access.
6. Test QR labels and checkout with a deliberately created test product before processing any actual sale. Verify the Sales Transactions record, inventory decrement, units sold, and Inventory Movements entry. Test cancellation and duplicate submissions.

## Operational limits

The existing API is an **initial integration**, not a fully production-hardened checkout engine. Airtable has no multi-record atomic transaction or compare-and-swap stock update. Do not enable parallel checkout sessions or retries after a partial failure; review any Failed/Processing orders manually before another checkout. A stronger deployment should add a Durable Object single-writer lock and a recovery workflow. For now, do not treat it as live-ready until end-to-end testing passes.

The browser checkout requires the staff API and cannot be made secure by pasting a PAT directly into HTML. Keep checkout out of public navigation and rely on Cloudflare Access for actual security, not obscurity.
