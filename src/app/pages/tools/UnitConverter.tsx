import { useState } from "react";
import { Ruler } from "lucide-react";
import { motion } from "motion/react";

export function UnitConverter() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [result, setResult] = useState("");

  const conversions: any = {
    length: {
      meters: 1,
      kilometers: 0.001,
      feet: 3.28084,
      miles: 0.000621371,
      inches: 39.3701,
      yards: 1.09361,
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001,
    },
    volume: {
      liters: 1,
      milliliters: 1000,
      gallons: 0.264172,
      cups: 4.22675,
      quarts: 1.05669,
    },
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const inBase = val / conversions[category][fromUnit];
    const converted = inBase * conversions[category][toUnit];
    setResult(converted.toFixed(4));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 mb-6">
            <Ruler className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Unit Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert between different units of measurement
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setFromUnit(Object.keys(conversions[e.target.value])[0]); setToUnit(Object.keys(conversions[e.target.value])[1]); }}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="volume">Volume</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onInput={convert}
              placeholder="Enter value"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          {result && (
            <div className="p-8 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500 text-center">
              <div className="text-sm text-muted-foreground mb-2">Result</div>
              <div className="text-4xl font-bold text-cyan-600">{result} {toUnit}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
