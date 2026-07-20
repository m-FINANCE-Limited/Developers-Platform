---
title: Contract concepts
description: Read contract settings and calculate valid trade amounts.
---

A contract is a tradable instrument identified by its contract code. WebProxy returns the contract code in the `market` field of `GET /api/contractSetting`. FxServer uses the same value in fields such as `contractCode`.

Examples include `EURUSD` for an FX contract and `XAUUSD` for a bullion contract. Do not assume that every contract is an FX currency pair; use the `category` and currency fields returned by WebProxy.

## Read contract settings

Retrieve contract settings before constructing a trade request. Select the record whose `market` matches the contract you plan to trade.

| Field | Purpose |
| --- | --- |
| `market` | Contract code sent to FxServer. |
| `enabled` | Whether the contract is enabled in the current environment. |
| `category` | Product category, such as forex, bullion, commodity, CFD, or crypto. |
| `baseCurr` | Base currency associated with the contract. |
| `counterCurr` | Quote or counter currency associated with the contract. |
| `contractSize` | Number of contract units in one lot. |
| `minTradeLot` | Minimum supported lot quantity. |
| `minLotIncrementUnit` | Supported increment between lot quantities. |
| `decimalPlace` | Display precision for contract prices. |

Treat these settings as environment-specific. Do not hard-code values from another account, product, or deployment.

## Calculate amount

FxServer accepts `amount` in contract units, not lots:

```text
amount = lotQuantity × contractSize
minimumAmount = minTradeLot × contractSize
incrementAmount = minLotIncrementUnit × contractSize
```

Send an amount that is at least `minimumAmount` and is a multiple of `incrementAmount`.

For example, if `contractSize` is `100,000` and the requested quantity is `0.01` lot:

```text
amount = 0.01 × 100,000 = 1,000
```

## Distinguish contract and chart codes

Trading endpoints use the contract code. Realtime Chart Server endpoints use a chart code, which can be different.

Call FxServer `GET /chartCode` to map a contract code to its chart code before requesting chart data. See [Realtime Chart Server](../realtime-chart-server/overview.md) for the complete workflow.

## Server authority

Contract settings describe request constraints, but FxServer remains authoritative for validation, pricing, margin, and execution. Re-read settings when your environment indicates that configuration changed, and handle validation errors rather than relying only on client-side checks.
