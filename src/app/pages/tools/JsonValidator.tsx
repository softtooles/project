import { useState } from "react";
import { Copy, CheckCircle2, XCircle, FileJson } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function JsonValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const validateJson = () => {
    if (!input.trim()) {
      setError("Please enter JSON to validate");
      setIsValid(null);
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
      toast.success("Valid JSON");
    } catch (err: any) {
      setIsValid(false);
      setError(err.message || "Invalid JSON");
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-6">
            <FileJson className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">JSON Validator</h1>
          <p className="text-xl text-muted-foreground">
            Validate your JSON data and catch syntax errors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-lg font-semibold mb-2">JSON Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono text-sm resize-none"
            />
          </div>

          <button
            onClick={validateJson}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Validate JSON
          </button>

          {isValid !== null && (
            <div className={`p-6 rounded-lg border-2 ${isValid ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500' : 'bg-red-50 dark:bg-red-950/20 border-red-500'}`}>
              <div className="flex items-center gap-3">
                {isValid ? (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Valid JSON</h3>
                      <p className="text-emerald-700 dark:text-emerald-300">Your JSON is properly formatted</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-8 w-8 text-red-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Invalid JSON</h3>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
