import { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) {
      toast.error("Please enter your birth date");
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({ years, months, days, totalDays, totalMonths, totalWeeks });
    toast.success("Age calculated");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-6">
            <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Age Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your exact age in years, months, and days
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={calculateAge}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Calculate Age
          </button>

          {result && (
            <div className="space-y-4">
              <div className="p-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {result.years}
                  </div>
                  <div className="text-lg text-muted-foreground">Years Old</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{result.months}</div>
                    <div className="text-sm text-muted-foreground">Months</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{result.days}</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.totalMonths}</div>
                  <div className="text-sm text-muted-foreground">Total Months</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-purple-600">{result.totalWeeks}</div>
                  <div className="text-sm text-muted-foreground">Total Weeks</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-pink-600">{result.totalDays}</div>
                  <div className="text-sm text-muted-foreground">Total Days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
