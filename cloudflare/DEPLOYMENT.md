# Boutique de Leon private checkout

Cloudflare Worker entrypoint: `cloudflare/private-checkout-worker.js`.

Cloudflare Builds deploy command: `npx wrangler deploy --config cloudflare/wrangler.toml`.

Required production secrets: `AIRTABLE_TOKEN` and `CHECKOUT_API_KEY`.

Current implementation is a secure scaffold for product lookup only. Do not use for sales until the checkout and inventory transaction flow has been implemented and tested.
