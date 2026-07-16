# Price Concepts

# Platform Price Stream

- We have a price stream from “Price Server”
- let us called them “Original Price Stream”

### Format

| Currency | Bid | Ask | PriceTag |
| --- | --- | --- | --- |
| EURUSD | 1.082 | 1.083 | EURUSD1730017407123 |
- Please be aware that this price stream is currency level, not contract level
- PriceTag is Currency Name + timestamp in millisecond

# Customer’s Price Stream

## Bid Ask Spread

- For a trader, he will not directly see the original price stream
- They adjusted price spread base on their assigned bid spread and ask spread
- Each customer will have his own customised bid spread and ask spread
- So Customer’s Price Stream should look like this:

```
Customer Bid = Original Bid + Bid Spread
Customer Ask = Original Ask + Ask Spread
Customer High Bid = Original High Bid + Bid Spread
Customer Low Bid = Original Low Bid + Bid Spread
Customer High Ask = Original High Ask + Ask Spread
Customer Low Ask = Original Low Ask + Ask Spread
```

- Bid Spread is negative
- Apply a large spread value to customers who always make money

# Valid Price Stream

- Only prices sent out from our platform will be treat as “Valid”
- Customer cannot use a random price as the market order’s request price
- Customer have to use the price received from platform as the market order request price
- Each price sent out from our platform has a Price Tag

## Validation 1: Price Tag

- Platform will remember the latest N prices that send out to traders
- If trade send a market order request, it should contains a request price and the corresponding price tag
- If platform cannot recognise the price tag from you market order, it will reject your order
- If the price tag is too old, it will also reject your order
- TODO: more details about the price tag validation

## Validation 2: Request Price

- Given a price tag, platform can retrieve the Original Bid and Ask price
    - EURUSD1730017407123 → 1.082/1.083
- Make sure satisfy below formula

```
Customer Request Bid/Ask Price = Original Bid/Ask Price + Customer Spread
```

# Request Price

- The price that request by customer for making order
- It should be a member of customer price stream

```
Request Bid = Customer Bid
Request Ask = Customer Ask
```

# Market Price

- Basically the latest Customer Bid Ask
- Each Customer will have his own Market Price

```
Market Bid (Customer) = Latest Original Bid + Customer Bid Spread
Market Ask (Customer) = Latest Original Ask + Customer Ask Spread 
```

# Rebate Price

- *This is the actual price used for execute a deal, not the request price or market price !!!*
- add new rebate spread
- Take more advantage from the customer, so company have more money to share with the upline

```
Rebate Bid = Request Bid + Rebate Bid Spread
Rebate Ask = Request Ask + Rebate Ask Spread
```

# Hedge Price

- TODO

# SettleRate

- The conversion rate between System Currency and Settlement Currency
- Use Mid Price

```
SettleRate = (SystemToSettleRateBid + SystemToSettleRateAsk) / 2
```

# Execution Price

- The Rebate Price