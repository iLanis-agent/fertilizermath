// Fertilizer Math engine: product pounds from a nitrogen rate and the product's analysis, whole bags and the room left, applications under a seasonal nitrogen cap, and the cost of a pound of nitrogen. Exact integers (hundredths), half-up on display only. Every number is the owner's own entry off the bag and the yard.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _RATE = "the nitrogen rate must be from 0.01 to 10 lb per 1000 sq ft with at most two decimal places";
var _AREA = "the area must be from 1 to 1000000 sq ft with no decimal places";
var _PCT = "the nitrogen analysis must be a whole number from 1 to 100 percent";
var _PROD = "the product amount must be from 0.01 to 100000 lb with at most two decimal places";
var _BAG = "the bag weight must be from 0.01 to 200 lb with at most two decimal places";
var _CAP = "the seasonal cap must be from 0.01 to 20 lb per 1000 sq ft with at most two decimal places";
var _PRICE = "the bag price must be from 0.01 to 1000 dollars with at most two decimal places";
var _CAPLOW = "the seasonal cap must cover at least one full application";
function _rate(t) { return _p(t, _RATE, 2, 2, 1, 1000); }
function _area(t) { return _i(t, _AREA, 7, 1, 1000000); }
function _pct(t) { return _i(t, _PCT, 3, 1, 100); }
function _prod(t) { return _p(t, _PROD, 6, 2, 1, 10000000); }
function _bag(t) { return _p(t, _BAG, 3, 2, 1, 20000); }
function _cap(t) { return _p(t, _CAP, 2, 2, 1, 2000); }
function _price(t) { return _p(t, _PRICE, 4, 2, 1, 100000); }
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function productTruth(rate, area, pct) {
  var r = _rate(rate), a = _area(area), p = _pct(pct);
  var prod100 = _hu(r * a, 10 * p); // lb of product, in hundredths: (r/100 lb N per 1000) * (a/1000) / (p/100)
  return "At " + _dec(r, 2) + " lb of nitrogen per 1000 sq ft over " + a + " sq ft with a " + p + "% nitrogen product, the spread is " + _dec(prod100, 2) + " lb of product.";
}
function bagsTruth(prod, bag) {
  var w = _prod(prod), b = _bag(bag);
  var n = Math.floor((w + b - 1) / b);
  var left = n * b - w;
  return "The spread of " + _dec(w, 2) + " lb takes " + n + (n === 1 ? " bag" : " bags") + " of " + _dec(b, 2) + " lb, leaving " + _dec(left, 2) + " lb of room.";
}
function seasonTruth(cap, rate) {
  var c = _cap(cap), r = _rate(rate);
  if (c < r) throw new Error(_CAPLOW);
  var apps = Math.floor(c / r);
  return "The seasonal cap of " + _dec(c, 2) + " lb of nitrogen per 1000 sq ft at " + _dec(r, 2) + " lb an application holds " + apps + (apps === 1 ? " application" : " applications") + ", using " + _dec(apps * r, 2) + " lb of the cap.";
}
function costTruth(price, bag, pct) {
  var pr = _price(price), b = _bag(bag), p = _pct(pct);
  var cents = _hu(pr * 10000, b * p); // cents per lb of nitrogen: price cents / (bag lb * pct/100)
  return "At $" + _dec(pr, 2) + " for a " + _dec(b, 2) + " lb bag of the " + p + "% nitrogen product, the nitrogen costs $" + _money(cents) + " per lb.";
}
