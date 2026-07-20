---
title: Price streaming
description: Use bid, ask, and price-tag values from the configured price feed.
---

The price feed configured for your environment provides quotes for Trader integrations. Obtain the feed endpoint, transport settings, and credentials from the environment configuration supplied to your integration.

## Quote fields

Each quote identifies a market and provides pricing values used by Trader clients:

| Field | Purpose |
| --- | --- |
| `market` | Market or contract identifier associated with the quote. |
| `bid` | Price used when the trader sells. |
| `ask` | Price used when the trader buys. |
| `tag` | Opaque identifier for the quote. |
| `highBid`, `lowBid` | Optional bid-side high and low values. |
| `highAsk`, `lowAsk` | Optional ask-side high and low values. |

Treat `tag` as an opaque value. Do not parse, generate, or alter it, even if part of the value resembles a market code or timestamp.

## Use a quote in a request

Market-mode requests do not include feed values. Set `priceMode` to `1` and omit `price` and `priceTag`.

For quoted mode:

1. Select the current bid for a sell request or ask for a buy request.
2. Send that value as `price`.
3. Format `priceTag` as `${tag};${price}` when server-side price checking is enabled.
4. Send the request without modifying the price or tag.

FxServer can reject stale, unknown, or mismatched quote data. Retrieve a new quote rather than retrying indefinitely with an old tag.

## Protocol details

Price-feed framing and numeric encoding are transport-specific. Use the client library or protocol specification supplied for your environment. Do not implement a binary parser from field names alone; byte order, message length, numeric scaling, and optional-field rules must match the deployed feed version.

See [Price concepts](../business-logic/03-price-concept.md) for price-mode behavior and [REST API essentials](./general-rest-api-information.md) for error handling.
