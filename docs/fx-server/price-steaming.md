# Price Streaming

```bnf
message-length = 2OCTET
market = 1*VCHAR
price-tag = 1*VCHAR
body-field-delimiter  = %x17
signed-integer = 4OCTET
bid = signed-integer
ask = signed-integer
high-bid = signed-integer
low-bid = signed-integer
high-ask = signed-integer
low-ask = signed-integer
price-message = OCTET %x07.04 message-length market body-field-delimiter  price-tag body-field-delimiter bid ask [high-bid low-bid high-ask low-ask]
```
