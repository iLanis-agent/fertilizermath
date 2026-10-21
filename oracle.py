import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)

def product(r, a, p):
    prod100 = hu(r*a, 10*p)
    return (f"At {dec2(r)} lb of nitrogen per 1000 sq ft over {a} sq ft with a {p}% nitrogen product, "
            f"the spread is {dec2(prod100)} lb of product.")
def bags(w, b):
    n = (w + b - 1) // b
    left = n*b - w
    word = "bag" if n == 1 else "bags"
    return f"The spread of {dec2(w)} lb takes {n} {word} of {dec2(b)} lb, leaving {dec2(left)} lb of room."
def season(c, r):
    apps = c // r
    word = "application" if apps == 1 else "applications"
    return (f"The seasonal cap of {dec2(c)} lb of nitrogen per 1000 sq ft at {dec2(r)} lb an application "
            f"holds {apps} {word}, using {dec2(apps*r)} lb of the cap.")
def cost(pr, b, p):
    cents = hu(pr*10000, b*p)
    return (f"At ${dec2(pr)} for a {dec2(b)} lb bag of the {p}% nitrogen product, "
            f"the nitrogen costs ${money(cents)} per lb.")

random.seed(744)
cases = [
  dict(fn="product", args=["1","5000","24"], expect=product(100,5000,24)),
  dict(fn="bags", args=["20.83","50"], expect=bags(2083,5000)),
  dict(fn="season", args=["4","1"], expect=season(400,100)),
  dict(fn="cost", args=["30","50","24"], expect=cost(3000,5000,24)),
]
for _ in range(25):
    r = random.randint(1,1000); a = random.randint(1,1000000); p = random.randint(1,100)
    cases.append(dict(fn="product", args=[dec2(r),str(a),str(p)], expect=product(r,a,p)))
for _ in range(25):
    w = random.randint(1,10000000); b = random.randint(1,20000)
    cases.append(dict(fn="bags", args=[dec2(w),dec2(b)], expect=bags(w,b)))
for _ in range(20):
    r = random.randint(1,1000); c = random.randint(r,2000)
    cases.append(dict(fn="season", args=[dec2(c),dec2(r)], expect=season(c,r)))
for _ in range(20):
    pr = random.randint(1,100000); b = random.randint(1,20000); p = random.randint(1,100)
    cases.append(dict(fn="cost", args=[dec2(pr),dec2(b),str(p)], expect=cost(pr,b,p)))
errcases = [
  ["product", ["0","5000","24"]], ["product", ["10.01","5000","24"]],
  ["product", ["1","0","24"]], ["product", ["1","5000","0"]],
  ["product", ["1","5000","24.5"]],
  ["bags", ["0","50"]], ["bags", ["20.83","0"]],
  ["season", ["0","1"]], ["season", ["0.5","1"]],
  ["cost", ["0","50","24"]], ["cost", ["1000.01","50","24"]], ["cost", ["30","0","24"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
