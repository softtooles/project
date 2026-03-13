import { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!startDate || !endDate) {
      toast.error("Please enter both dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      toast.error("End date must be after start date");
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const diffYears = end.getFullYear() - start.getFullYear();

    setResult({
      days: diffDays,
      weeks: diffWeeks,
      months: diffMonths,
      years: diffYears,
    });
    toast.success("Difference calculated");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-6">
            <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Date Difference Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate the difference between two dates
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            Calculate Difference
          </button>

          {result && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-lg bg-card border-2 border-purple-500 text-center">
                <div className="text-4xl font-bold text-purple-600">{result.years}</div>
                <div className="text-sm text-muted-foreground mt-1">Years</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border text-center">
                <div className="text-4xl font-bold text-pink-600">{result.months}</div>
                <div className="text-sm text-muted-foreground mt-1">Months</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border text-center">
                <div className="text-4xl font-bold text-violet-600">{result.weeks}</div>
                <div className="text-sm text-muted-foreground mt-1">Weeks</div>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border text-center">
                <div className="text-4xl font-bold text-fuchsia-600">{result.days}</div>
                <div className="text-sm text-muted-foreground mt-1">Days</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
