---
title: Price concepts
description: Choose market or quoted pricing and handle price tags correctly.
---

FxServer supports market and quoted pricing for deal and liquidation requests. The selected `priceMode` determines which price fields the request must include.

## Bid and ask

A quote contains two sides:

- **Bid** is the price at which the trader can sell.
- **Ask** is the price at which the trader can buy.

Use the side that matches the requested direction. Do not calculate an execution price by averaging bid and ask.

Quotes can include account-specific pricing adjustments. Use the values delivered to the authenticated trader rather than values observed from another account or environment.

## Market mode

Set `priceMode` to `1` when FxServer should use its latest eligible quote. Omit `price` and `priceTag`.

Market mode does not guarantee a specific execution price. The final deal, position, order, and event data returned by the server are authoritative.

## Quoted mode

Set `priceMode` to `2` when submitting a quote obtained from the price feed configured for your environment.

- Send `price` with the quoted bid or ask selected for the request direction.
- Send `priceTag` when server-side price checking is enabled.
- Format `priceTag` as `${tag};${price}`.
- Do not modify or synthesize the tag.

Example:

```json
{
  "priceMode": 2,
  "contractCode": "XAUUSD",
  "amount": 100,
  "buyOrSell": true,
  "price": 4762.9,
  "priceTag": "LLG1775716357987;4762.9"
}
```

FxServer can reject a stale or invalid price tag with `msg: "710"`. When price checking is enabled, a missing price tag can return `msg: "2001"`.

## Request and execution prices

The request price expresses the quote selected by the client in quoted mode. It is not proof of execution.

Processing can complete immediately or continue asynchronously through hedge, delay, or manual handling. Use the completed server response and subsequent account, position, order, and event state to determine the execution outcome and price.

## Related guidance

- See [Price streaming](../fx-server/price-steaming.md) for the fields used by quoted mode.
- See [REST API essentials](../fx-server/general-rest-api-information.md) for response handling and duplicate-request protection.
- See the [FxServer Trader API](../fx-server/openapi-trader.mdx) for complete request schemas.
