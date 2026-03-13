import { useState } from "react";
import { Copy, FileSpreadsheet } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function JsonToCsv() {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");

  const convert = () => {
    if (!json.trim()) {
      toast.error("Please enter JSON data");
      return;
    }

    try {
      const data = JSON.parse(json);
      const array = Array.isArray(data) ? data : [data];
      
      if (array.length === 0) {
        toast.error("Empty JSON array");
        return;
      }

      const headers = Object.keys(array[0]);
      const csvRows = [
        headers.join(","),
        ...array.map(row => 
          headers.map(header => JSON.stringify(row[header] || "")).join(",")
        )
      ];

      setCsv(csvRows.join("\n"));
      toast.success("Converted to CSV");
    } catch (err) {
      toast.error("Invalid JSON format");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6">
            <FileSpreadsheet className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">JSON to CSV</h1>
          <p className="text-xl text-muted-foreground">
            Convert JSON data to CSV format
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">JSON Input</label>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder='[{"name": "John", "age": 30}]'
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">CSV Output</label>
              {csv && (
                <button
                  onClick={() => copyToClipboard(csv)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={csv}
              readOnly
              placeholder="CSV output will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          Convert to CSV
        </button>
      </div>
    </div>
  );
}
