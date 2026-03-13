import { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "motion/react";

export function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const interest = parseFloat(rate) / 100 / 12;
    const payments = parseFloat(years) * 12;

    if (!principal || !interest || !payments) return;

    const monthly = (principal * interest * Math.pow(1 + interest, payments)) / (Math.pow(1 + interest, payments) - 1);
    const totalPayment = monthly * payments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mb-6">
            <Calculator className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Loan/EMI Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate loan payments and EMI
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); }}
                onInput={calculate}
                placeholder="10000"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => { setRate(e.target.value); }}
                onInput={calculate}
                placeholder="5"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => { setYears(e.target.value); }}
                onInput={calculate}
                placeholder="5"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Monthly Payment (EMI)</div>
                  <div className="text-5xl font-bold text-blue-600">${result.monthlyPayment}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Principal Amount</div>
                  <div className="text-2xl font-bold">${result.principal}</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-orange-600">${result.totalInterest}</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border text-center">
                  <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                  <div className="text-2xl font-bold text-blue-600">${result.totalPayment}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
