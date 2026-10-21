# Fertilizer Math

Fertilizer rate arithmetic. At 1 lb of nitrogen per 1000 sq ft over 5000 sq ft with a 24% nitrogen product, the spread is 20.83 lb of product.

## What it computes

- **The product truth** - product to spread: the nitrogen rate (0.01 to 10 lb per 1000 sq ft) times the area, divided by the analysis (whole percent).
- **The bags truth** - whole bags: the product amount (0.01 to 100000 lb) rounded up into bag weights (0.01 to 200 lb), and the room left in the last bag.
- **The season truth** - applications under a seasonal nitrogen cap (0.01 to 20 lb per 1000 sq ft): floor division, nothing rounded up.
- **The cost truth** - the cost of a pound of nitrogen: the bag price (0.01 to 1000 dollars) over the nitrogen in the bag.

## Boundary

Arithmetic only. Rates, analyses and prices applied as written. It has not tested any soil and does not know the grass, the weather, the water rules or the label's timing and burn limits, and it gives no verdict that a rate is right for any ground. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/fertilizermath/
Repo: https://github.com/iLanis-agent/fertilizermath
