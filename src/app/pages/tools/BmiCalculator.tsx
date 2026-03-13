import { useState } from "react";
import { Activity } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (!w || !h || w <= 0 || h <= 0) {
      toast.error("Please enter valid weight and height");
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    let cat = "";
    if (bmiValue < 18.5) cat = "Underweight";
    else if (bmiValue < 25) cat = "Normal weight";
    else if (bmiValue < 30) cat = "Overweight";
    else cat = "Obese";
    
    setCategory(cat);
    toast.success("BMI calculated");
  };

  const getBmiColor = () => {
    if (!bmi) return "text-gray-600";
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 mb-6">
            <Activity className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">BMI Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your Body Mass Index
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <button
            onClick={calculateBmi}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
          >
            Calculate BMI
          </button>

          {bmi !== null && (
            <div className="p-8 rounded-lg bg-card border-2 border-green-500">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
                <div className={`text-6xl font-bold mb-2 ${getBmiColor()}`}>{bmi}</div>
                <div className={`text-2xl font-semibold mb-6 ${getBmiColor()}`}>{category}</div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <div className="font-semibold text-blue-600">Underweight</div>
                    <div className="text-blue-600/70">&lt; 18.5</div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div className="font-semibold text-green-600">Normal</div>
                    <div className="text-green-600/70">18.5 - 24.9</div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                    <div className="font-semibold text-orange-600">Overweight</div>
                    <div className="text-orange-600/70">25 - 29.9</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <div className="font-semibold text-red-600">Obese</div>
                    <div className="text-red-600/70">&ge; 30</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
