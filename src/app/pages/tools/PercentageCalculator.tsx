import { useState } from "react";
import { Percent } from "lucide-react";
import { motion } from "motion/react";

export function PercentageCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (!v1 || !v2) return;

    const percentage = (v1 / v2) * 100;
    const increase = ((v2 - v1) / v1) * 100;
    const decrease = ((v1 - v2) / v1) * 100;
    const percentOf = (v1 * v2) / 100;

    setResults({
      percentage: percentage.toFixed(2),
      increase: increase.toFixed(2),
      decrease: decrease.toFixed(2),
      percentOf: percentOf.toFixed(2),
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 mb-6">
            <Percent className="h-12 w-12 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Percentage Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate percentages, increases, and decreases
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Value 1</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                onInput={calculate}
                placeholder="100"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Value 2</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                onInput={calculate}
                placeholder="200"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-card border-2 border-amber-500">
                <div className="text-sm text-muted-foreground mb-1">What % is {value1} of {value2}?</div>
                <div className="text-3xl font-bold text-amber-600">{results.percentage}%</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">{value1}% of {value2} is:</div>
                <div className="text-3xl font-bold text-amber-600">{results.percentOf}</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Percentage Increase:</div>
                <div className="text-3xl font-bold text-green-600">+{results.increase}%</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Percentage Decrease:</div>
                <div className="text-3xl font-bold text-red-600">-{results.decrease}%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
