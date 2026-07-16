---
sidebar_position: 1
slug: /intro
title: Platform overview
description: Understand the Trader OpenAPI surface and the fastest path to your first integration.
---

# Build on Trader OpenAPI

Trader OpenAPI gives applications a single route from account authentication to live trade execution. The platform is split into two focused API surfaces:

| Surface | Use it for |
| --- | --- |
| **WebProxy API** | Sign in, manage API keys, exchange access tokens, discover account data, and load contract settings. |
| **FxServer Trader API** | Place and edit orders, add deals, liquidate positions, read balances and positions, and subscribe to execution updates. |

## Recommended integration path

1. Create a WebProxy session with the trader's credentials.
2. Create an API key with the permissions your integration needs.
3. Exchange the API key for a short-lived JWT access token.
4. Read account and contract settings before calculating an amount.
5. Send a deal or order to FxServer.
6. Consume the server-sent event stream to reconcile asynchronous updates.

Start with [Make your first trade](./getting-started/first-trade.md) for an end-to-end request sequence. Keep [REST API essentials](./fx-server/general-rest-api-information.md) nearby for status codes, authentication details, amount conversion, and price modes.

## Before you trade

:::warning Use a test environment first
Trading calls can create real financial positions. Confirm the target environment, account, contract, direction, and amount before sending a request.
:::

- Treat API keys and access tokens as secrets. Never put them in browser code or source control.
- Trade amounts are expressed in contract units, not lots.
- A `202` response means processing continues asynchronously; it is not a completed trade.
- Use a unique `clientOrderId` to protect retries from duplicate execution.
- Design for `401`, `409`, `429`, `503`, and `504` responses from the start.

## Choose a reference

- [FxServer Trader API](./fx-server/openapi-trader.mdx) for trading and live state.
- [WebProxy API](./web-proxy/openapi.mdx) for identity, configuration, and history.
