---
title: Currency concepts
description: Understand base, quote, settlement, and display currencies in Trader API responses.
---

Trader API responses use several currency roles. Read the role from the relevant account or contract field instead of inferring it from a contract code.

## Base and quote currencies

An FX contract has a base currency and a quote currency. The quote expresses how much quote currency is required for one unit of the base currency.

For `EURUSD`:

- `EUR` is the base currency.
- `USD` is the quote currency, also called the counter currency.
- A price of `1.0850` means one euro is worth 1.0850 US dollars.

WebProxy returns these values as `baseCurr` and `counterCurr` in contract settings. Other product categories, such as bullion, commodities, CFDs, and crypto, use the same fields to identify the currencies associated with the contract.

## Settlement currency

The settlement currency is the currency used for the account balance and settlement calculations. WebProxy returns it as `settleCurr` in the account-information response.

The settlement currency can differ from a contract's base and quote currencies. Do not assume that every account settles in USD or that the settlement currency can be derived from the contract code.

## Display currency

The display currency controls how WebProxy presents monetary values in supported account and report responses. WebProxy returns it as `displayCurr`.

Display currency is a presentation setting. It does not change the contract code, order amount, or execution currency.

## Margin

FxServer calculates margin in the platform's system currency. The calculation and its conversion inputs are server-managed and are not part of the public integration contract.

Treat the margin values returned by the platform as authoritative. Applications should not attempt to reproduce the calculation from contract prices or currency fields.

## Conversion behavior

Some WebProxy account responses include `convRate` and `convOp` for converting displayed values. Apply those fields only as documented by the response schema for that endpoint.

Treat all server-calculated financial values as authoritative. Do not infer margin or settlement calculations from currency-pair names or public API fields.

## Related references

- Use [Contract concepts](./02-contract-overview.md) to interpret contract settings and calculate trade amounts.
- Use [Price concepts](./03-price-concept.md) to choose between market and quoted pricing.
- See the [WebProxy API](../web-proxy/openapi.mdx) for account-information and contract-setting schemas.
