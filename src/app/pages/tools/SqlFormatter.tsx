import { useState } from "react";
import { Copy, Database, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatSql = () => {
    if (!input.trim()) {
      toast.error("Please enter SQL code");
      return;
    }

    try {
      let formatted = input
        .replace(/\s+/g, " ")
        .replace(/\(/g, " (")
        .replace(/\)/g, ") ")
        .replace(/,/g, ",\n  ")
        .replace(/SELECT/gi, "\nSELECT\n  ")
        .replace(/FROM/gi, "\nFROM\n  ")
        .replace(/WHERE/gi, "\nWHERE\n  ")
        .replace(/AND/gi, "\n  AND ")
        .replace(/OR/gi, "\n  OR ")
        .replace(/ORDER BY/gi, "\nORDER BY\n  ")
        .replace(/GROUP BY/gi, "\nGROUP BY\n  ")
        .replace(/HAVING/gi, "\nHAVING\n  ")
        .replace(/JOIN/gi, "\nJOIN\n  ")
        .replace(/LEFT JOIN/gi, "\nLEFT JOIN\n  ")
        .replace(/RIGHT JOIN/gi, "\nRIGHT JOIN\n  ")
        .replace(/INNER JOIN/gi, "\nINNER JOIN\n  ")
        .replace(/INSERT INTO/gi, "\nINSERT INTO\n  ")
        .replace(/VALUES/gi, "\nVALUES\n  ")
        .replace(/UPDATE/gi, "\nUPDATE\n  ")
        .replace(/SET/gi, "\nSET\n  ")
        .replace(/DELETE FROM/gi, "\nDELETE FROM\n  ")
        .trim();

      setOutput(formatted);
      toast.success("SQL formatted");
    } catch (err) {
      toast.error("Failed to format SQL");
    }
  };

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output);
      if (success) {
        toast.success("Copied to clipboard");
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-6">
            <Database className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">SQL Formatter</h1>
          <p className="text-xl text-muted-foreground">
            Format and beautify SQL queries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input SQL</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SELECT * FROM users WHERE id = 1"
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Formatted SQL</label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted SQL will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={formatSql}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Format SQL
          </button>
          <button
            onClick={() => { setInput(""); setOutput(""); }}
            className="px-8 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
