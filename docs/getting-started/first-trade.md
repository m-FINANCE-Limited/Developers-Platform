---
sidebar_position: 1
title: Make your first trade
description: Authenticate, inspect the contract, and submit a market deal through Trader OpenAPI.
---

# Make your first trade

This sequence uses WebProxy to establish access and FxServer to submit a market deal. Replace the sample hosts and values with those assigned to your environment.

## 1. Set your environment

```bash
export WEB_PROXY_URL="https://your-webproxy-host"
export TRADER_API_URL="https://your-fxserver-host"
export TRADER_USER="your-user-id"
export TRADER_PASSWORD="your-password"
```

Keep credentials in a secret manager in production. The shell variables here are only for a local test session.

## 2. Create a login session

```bash
curl --request POST "$WEB_PROXY_URL/api/session" \
  --header 'Content-Type: application/json' \
  --data "{
    \"checks\": {
      \"user\": {\"userId\": \"$TRADER_USER\"},
      \"password\": {\"password\": \"$TRADER_PASSWORD\"}
    }
  }"
```

Store the `sessionToken` from the response. Accounts protected by OTP may require a follow-up `PATCH /api/session/{sessionId}` before a session token is issued.

## 3. Create and exchange an API key

Create a key with only the permissions your integration requires:

```bash
curl --request POST "$WEB_PROXY_URL/api/tokens/new" \
  --header "Authorization: Bearer $SESSION_TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "local-onboarding",
    "permissions": ["READ", "TRADE"],
    "expirationDate": "2030-12-31T00:00:00.000Z"
  }'
```

The response body is the API key as plain text. Exchange it for a short-lived access token:

```bash
curl --request POST "$WEB_PROXY_URL/api/tokens/auth" \
  --header "Authorization: Bearer $API_KEY"
```

Set the returned JWT for the remaining requests:

```bash
export ACCESS_TOKEN="your-access-token"
```

The `expires_in` value is in minutes. Exchange the API key again when the access token expires.

## 4. Inspect the contract

Read contract settings before you calculate an amount:

```bash
curl "$WEB_PROXY_URL/api/contractSetting" \
  --header "Authorization: Bearer $ACCESS_TOKEN"
```

Amounts are contract units, not lots:

```text
amount = lots × contractSize
```

For a `contractSize` of `100,000`, an order for `0.01` lot has an `amount` of `1,000`. The amount must also align with `contractSize × minLotIncrementUnit`.

## 5. Submit a market deal

Market mode (`priceMode: 1`) uses FxServer's latest quote. Do not include `price` or `priceTag`.

```bash
curl --request POST "$TRADER_API_URL/addDeal" \
  --header "Authorization: Bearer $ACCESS_TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
    "clientOrderId": 10001,
    "priceMode": 1,
    "contractCode": "EURUSD",
    "amount": 1000,
    "buyOrSell": true,
    "acceptPips": 0
  }'
```

Use a new `clientOrderId` for each logical request. Retrying an accepted ID produces `409` rather than placing a duplicate trade.

## 6. Handle the outcome

- `200` means the request completed successfully.
- `202` with `HEDGE`, `DELAY`, or `MANUAL` means processing continues. Do not treat it as a completed deal.
- `400` contains a business or validation error.
- `401` usually means the JWT is missing or expired.
- `429` means the account-scoped request limit was exceeded.

Subscribe to `GET /updateEventStream` for position, order, execution, and cancellation events. Reconcile streamed updates with your own `clientOrderId` and server references.

## Next steps

- Read [REST API essentials](../fx-server/general-rest-api-information.md) before implementing retries or quoted pricing.
- Explore every request and schema in the [FxServer Trader API](../fx-server/openapi-trader.mdx).
- Use the [WebProxy API](../web-proxy/openapi.mdx) for account information, contract metadata, token lifecycle, and history.
