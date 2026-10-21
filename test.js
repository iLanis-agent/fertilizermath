const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { product: productTruth, bags: bagsTruth, season: seasonTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the nitrogen rate must be from 0.01 to 10 lb per 1000 sq ft with at most two decimal places",
  "the area must be from 1 to 1000000 sq ft with no decimal places",
  "the nitrogen analysis must be a whole number from 1 to 100 percent",
  "the product amount must be from 0.01 to 100000 lb with at most two decimal places",
  "the bag weight must be from 0.01 to 200 lb with at most two decimal places",
  "the seasonal cap must be from 0.01 to 20 lb per 1000 sq ft with at most two decimal places",
  "the bag price must be from 0.01 to 1000 dollars with at most two decimal places",
  "the seasonal cap must cover at least one full application"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
