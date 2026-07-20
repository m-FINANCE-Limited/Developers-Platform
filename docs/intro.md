---
sidebar_position: 1
slug: /intro
title: Platform overview
description: Understand the Trader APIs and follow the recommended integration workflow.
---

Trader OpenAPI separates authentication, trading, and chart data into three APIs:

| Surface | Use it for |
| --- | --- |
| **WebProxy API** | Create sessions, manage API keys and access tokens, and retrieve account and contract data. |
| **FxServer Trader API** | Submit market deals, manage orders, liquidate positions, retrieve account state, and receive live updates. |
| **Realtime Chart Server API** | Use chart codes from FxServer `/chartCode` to retrieve OHLC bars, open prices, and market statistics. |

## Integration workflow

1. Create a WebProxy session with the trader credentials.
2. Create an API key with the required permissions.
3. Exchange the API key for a short-lived access token.
4. Retrieve the selected contract settings and calculate a valid amount.
5. Submit a market deal or order to FxServer.
6. Connect to `GET /updateEventStream` and reconcile asynchronous updates.

Follow [Make your first trade](./getting-started/first-trade.md) for a complete request sequence. See [REST API essentials](./fx-server/general-rest-api-information.md) for authentication, response handling, amount calculation, and price modes.

## Before you trade

> **Warning:** Trade requests can create real financial positions. Use a test
> environment first. Before sending a production request, verify the
> environment, account, contract, direction, and amount.

- Store API keys and access tokens in a server-side secret manager. Do not expose them in client-side code, logs, or version control.
- The `amount` field uses contract units, not lots. Calculate it from the selected contract settings.
- A `202 Accepted` response means processing continues asynchronously. It does not confirm a completed trade.
- Generate one `clientOrderId` for each logical trade request. Reuse that ID only when retrying the same request.
- Handle authentication, validation, duplicate-request, rate-limit, service, and dealer failures explicitly.

## Choose a reference

- [FxServer Trader API](./fx-server/openapi-trader.mdx) for trading and live state.
- [WebProxy API](./web-proxy/openapi.mdx) for sessions, tokens, account data, and contract settings.
- [Realtime Chart Server](./realtime-chart-server/overview.md) for chart data and period types.
