import { useState } from "react";
import { Tag } from "lucide-react";
import { motion } from "motion/react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (!price || !discount || price <= 0 || discount < 0 || discount > 100) {
      return;
    }

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    const savings = discountAmount;

    setResult({
      originalPrice: price.toFixed(2),
      discountPercent: discount.toFixed(0),
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 mb-6">
            <Tag className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Discount Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate discounted prices and savings
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Original Price ($)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => { setOriginalPrice(e.target.value); }}
                onInput={calculate}
                placeholder="100"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Discount (%)</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => { setDiscountPercent(e.target.value); }}
                onInput={calculate}
                placeholder="20"
                min="0"
                max="100"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-8 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border-2 border-red-500">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Final Price</div>
                  <div className="text-5xl font-bold text-red-600 mb-1">${result.finalPrice}</div>
                  <div className="text-lg text-green-600">You save ${result.savings} ({result.discountPercent}%)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Original Price</div>
                  <div className="text-2xl font-bold">${result.originalPrice}</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Discount Amount</div>
                  <div className="text-2xl font-bold text-red-600">-${result.discountAmount}</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">You Pay</div>
                  <div className="text-2xl font-bold text-green-600">${result.finalPrice}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
