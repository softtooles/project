import { useState } from "react";
import { DollarSign } from "lucide-react";
import { motion } from "motion/react";

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);

    if (!bill || !tip || !numPeople || bill <= 0 || numPeople <= 0) {
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const total = bill + tipAmount;
    const perPerson = total / numPeople;
    const tipPerPerson = tipAmount / numPeople;

    setResult({
      billAmount: bill.toFixed(2),
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
    });
  };

  const quickTip = (percent: number) => {
    setTipPercent(percent.toString());
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-6">
            <DollarSign className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tip Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate tips and split bills
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Bill Amount ($)</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => { setBillAmount(e.target.value); }}
              onInput={calculate}
              placeholder="100.00"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tip Percentage ({tipPercent}%)</label>
            <input
              type="range"
              min="0"
              max="30"
              value={tipPercent}
              onChange={(e) => { setTipPercent(e.target.value); calculate(); }}
              className="w-full"
            />
            <div className="flex gap-2 mt-2">
              {[10, 15, 18, 20, 25].map(percent => (
                <button
                  key={percent}
                  onClick={() => { quickTip(percent); }}
                  className="flex-1 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-sm"
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Split Between (People)</label>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => { setPeople(e.target.value); }}
              onInput={calculate}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-8 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Tip Amount</div>
                    <div className="text-3xl font-bold text-emerald-600">${result.tipAmount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total</div>
                    <div className="text-3xl font-bold text-emerald-600">${result.total}</div>
                  </div>
                </div>
              </div>

              {parseInt(people) > 1 && (
                <div className="p-6 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Per Person</div>
                  <div className="text-4xl font-bold text-teal-600">${result.perPerson}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    (${result.tipPerPerson} tip per person)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
