# Contract Overview

- Contract contains two currency pairs
- E.g.
    - Contract: EURAUD
    - CurrencyPair1: EURAUD
    - CurrencyPair2: AUDUSD

# Steps to define a Contract

## 1. Decide System Currency

- Mostly USD

## 2. Decide the Currency Paris to be Contract

- EURAUD
- Base Currency: EUR
- Counter Currency: AUD

### Notes:

- Currency Pairs should contains two currency, but sometimes you may only see USD, HKD, RMB.
- Those currency pairs just hide the counter currency, their full name should be USDUSD, HKDUSD and RMBUSD

## 3. Define all related currency pairs first

### Currency Pair 1: EURAUD

- The core currency of this contract
- EquivCurrPair of Currency Pair 1: EURUSD

### Currency Pair 2: AUDUSD

- *Currency Pair 2 should link the counter currency to system currency*
- EquivCurrPair of CurrPair2: AUDUSD

#### How about Major currency or Exotic currency?
- If your base currency or counter currency is already the system currency, just use system currency
    - USDJPY → CurrPair2 = USD
    - EURUSD → CurrPair2 = USD


## 4. Whether this contract’s base currency is system currency?

- EUR is not USD, so BaseCurr = 0
- If contract is USDJPY, then BaseCurr = 1

## Result

| No. | Contract | Currency1 | Currency2 | Contract Size | BaseCurr |
| --- | --- | --- | --- | --- | --- |
| 1 | EURAUD | EURAUD | AUDUSD | 100000 | 0 |

| No. | Currency | EquivCurr | Bid | Ask | DirectQuote |
| --- | --- | --- | --- | --- | --- |
| 1 | EURAUD | EURUSD | 1.62 | 1.63 | 0 |
| 2 | AUDUSD | AUDUSD | 0.66 | 0.67 | 0 |
| 3 | EURUSD | EURUSD | 1.08 | 1.09 | 0 |
| 4 | USD | USD | 1 | 1 | 1 |

## Combine Contract and Currency

### 1. Bid, Ask of Contract

- Just use the bid ask from the currency pair 1
- Need to be aware of the direction:

```
if Contract.BaseCurr == CurrencyPair1.DirectQuote
  // Case 1
	Contract.Bid = Currency1.Bid
	Contract.Ask = Currency1.Ask
else:
  // Case 2
	Contract.Bid = 1 / Currency1.Ask
	Contract.Ask = 1 / Currency1.Bid
```

- When you have a contract like USDJPY, but your currency definition is JPYUSD, you need to use the Case 2 formula
- You need to know:
    - Contract.BaseCurr == Currency1.DirectQuote is equivalent to
    - Contract.BaseCurr xor Currency1.DirectQuote == 0

### 2. Make Sure you can convert any currency to System Currency

- Contract: EURAUD
- BaseCurrency: EUR
- CounterCurrency: AUD
- Base Currency to System Currency:
    - CurrencyPair1.EquivCurrPair: EURUSD
    - Find the EURUSD from currency table and get the bid ask
- Counter Currency to System Currency
    - Remember, Currency Pair 2 must link to System Currency
    - CurrencyPair2: AUDUSD
    - Find the AUDUSD from currency table and get the bid ask
- Finally, convert system currency to your desired currency



# Posibility
- O means is the system currency
- X means not the system currency
- '-' means don't care

|Case| CurrencyPair1 |  | CurrencyPair2 | |
| --- | --- | --- | --- | --- |
|| BaseCurr | QuoteCurr | BaseCurr | QuoteCurr |
| 1 | O | X | - | - |
| 2 | X | O | - | - |
| 3 | X | X | O | X |
| 4 | X | X | X | O |


## Example
- **USD is the system currency**

|Contract| CurrencyPair1 |  | CurrencyPair2 | | Case |
| --- | --- | --- | --- | --- | --- |
|| BaseCurr | QuoteCurr | BaseCurr | QuoteCurr | |
| XAUUSD | XAU | USD | USD | - | 2 |
| EURUSD | EUR | USD | USD | - | 2 |
| USDJPY | USD | JPY | USD | - | 1 |
| AUDCAD | AUD | CAD | USD | CAD | 3 |
| GBPNZD | GBP | NZD | NZD | USD | 4 |
