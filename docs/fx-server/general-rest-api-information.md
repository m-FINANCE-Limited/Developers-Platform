# General REST API Information

## Table of contents

1. [HTTP status](#1-http-status)
2. [Authentication](#2-authentication)
   - [2.1 WebProxy Login](#21-webproxy-login)
   - [2.2 WebProxy Create API Key](#22-webproxy-create-api-key)
   - [2.3 Exchange Token](#23-exchange-token)
3. [FAQ](#3-faq)
   - [3.1 How to fill `amount`?](#31-how-to-fill-amount)
   - [3.2 How to use `priceMode`?](#32-how-to-use-pricemode)

Endpoint details live in the OpenAPI specifications: [FxServer Trader](./openapi-trader) and [WebProxy](../web-proxy/openapi).

---

## 1. HTTP status

| Code | Description |
| --- | --- |
| `200` | Request completed successfully. |
| `201` | Resource created successfully. |
| `202` | Request accepted for delayed, manual, or hedge processing. The trade is not complete yet. |
| `400` | Invalid request or business validation error. FxServer JSON errors usually identify the error in `msg`. |
| `401` | Missing, invalid, or expired authentication token. |
| `404` | Requested order, position, float record, account, or contract setting was not found. |
| `409` | The `clientOrderId` is duplicated; a request with this ID was already accepted. |
| `429` | Rate limit exceeded. The response is plain text. Rate limiting is account-scoped, and each account receives 20 request tokens per second. |
| `500` | Internal server error. |
| `503` | Service unavailable or dealer not available. |
| `504` | Dealer response timed out. |

---

## 2. Authentication

Every FxServer and WebProxy call needs a JWT `access_token`. Get one in three steps, each feeding the next:

`2.1 Login` → `2.2 Create API Key` → `2.3 Exchange Token`

| Variable | Value |
| --- | --- |
| `WEB_PROXY_URL` | `https://test.dev.34266223.xyz:50999` |

### 2.1 WebProxy Login

`POST ${WEB_PROXY_URL}/api/session`

Request:

```json
{
  "checks": {
    "user": { "userId": "99900025" },
    "password": { "password": "mF123456" }
  }
}
```

Response — keep `sessionToken` for step 2.2:

```json
{
  "sessionId": "f49c960c-5cba-40d4-8781-a9183b470eb5",
  "sessionToken": "eyJ0eX...",
  "challenge": null,
  "isFix": false,
  "reportGroupId": 0,
  "reportGroup": "DEMOPLATFM"
}
```

### 2.2 WebProxy Create API Key

`POST ${WEB_PROXY_URL}/api/tokens/new` with header `Authorization: Bearer <sessionToken>`.

Request:

```json
{
  "name": "R21",
  "permissions": ["READ", "TRADE", "WITHDRAW"],
  "expirationDate": "2036-12-31T00:00:00.000Z"
}
```

Response — the `apiKey` as plain text. Keep it for step 2.3:

```text
eyJ0eX...
```

### 2.3 Exchange Token

`POST ${WEB_PROXY_URL}/api/tokens/auth` with header `Authorization: Bearer <apiKey>`. No body.

Response:

```json
{
  "access_token": "eyJ0eXA...",
  "expires_in": 60
}
```

Send `access_token` as `Authorization: Bearer <access_token>` on every FxServer and WebProxy call. `expires_in` is in minutes; repeat step 2.3 when it expires.

---

## 3. FAQ

### 3.1 How to fill `amount`?

- Trade amount in contract units, not lots.
- Convert lots to amount by `amount = lots * contractSize`.
- For LLG, 0.1 lot with contractSize 100 requires amount 10.
- Make sure `amount % (contractSize * minLotIncrementUnit) == 0`, otherwise got rejected with `620` code.
- `contractSize` and `minLotIncrementUnit` come from `/api/contractSetting` (see the [WebProxy OpenAPI specification](../web-proxy/openapi)) for the contract.

---

### 3.2 How to use `priceMode`?

`addDeal` and `liquidate` (see the [FxServer Trader OpenAPI specification](./openapi-trader)) take a `priceMode` that decides which quote is used:

- `priceMode: 1` (Market): FxServer executes against its own latest quote. Do not send `price` or `priceTag`.
- `priceMode: 2` (Quoted): you supply a quote obtained from the Price Agent — send `price`, plus `priceTag` when the server has price checking enabled.

The Price Agent streams quotes over WebSocket as a `price` and a `tag`. In quoted mode:

- **`price`** — the quoted execution price. Must be greater than `0` and match the `tag`.
- **`priceTag`** — a quote-lookup token formatted as `${tag};${price}` (e.g. `LLG1775716357987;4762.9`). `tag` for price validation; `price` is informational, won't used for price validation.

Rejections:

- `710` — `priceTag` is stale or invalid.
- `2001` — `priceTag` is missing while the server has price checking enabled.

---
