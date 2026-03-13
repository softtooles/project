import { useState } from "react";
import { Copy, Dices } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (minNum >= maxNum) {
      toast.error("Minimum must be less than maximum");
      return;
    }

    const result: number[] = [];
    for (let i = 0; i < countNum; i++) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      result.push(random);
    }
    setNumbers(result);
    toast.success("Random numbers generated");
  };

  const handleCopy = async () => {
    if (numbers.length > 0) {
      const success = await copyToClipboard(numbers.join(", "));
      if (success) {
        toast.success("Copied to clipboard");
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 mb-6">
            <Dices className="h-12 w-12 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Random Number Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate random numbers within a range
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Minimum</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Maximum</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Count</label>
              <input
                type="number"
                value={count}
                min="1"
                max="100"
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Dices className="inline h-5 w-5 mr-2" />
            Generate
          </button>

          {numbers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Generated Numbers</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-6 rounded-lg bg-card border-2 border-violet-500">
                <div className="flex flex-wrap gap-3">
                  {numbers.map((num, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-900 dark:text-violet-100 font-mono font-bold text-xl">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
