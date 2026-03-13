import { useState } from "react";
import { Copy, FileJson } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function CsvToJson() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  const convert = () => {
    if (!csv.trim()) {
      toast.error("Please enter CSV data");
      return;
    }

    try {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",").map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentLine = lines[i].split(",");
        
        headers.forEach((header, index) => {
          let value = currentLine[index]?.trim() || "";
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          obj[header] = value;
        });
        
        result.push(obj);
      }

      setJson(JSON.stringify(result, null, 2));
      toast.success("Converted to JSON");
    } catch (err) {
      toast.error("Invalid CSV format");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 mb-6">
            <FileJson className="h-12 w-12 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">CSV to JSON</h1>
          <p className="text-xl text-muted-foreground">
            Convert CSV data to JSON format
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">CSV Input</label>
            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              placeholder="name,age&#10;John,30&#10;Jane,25"
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">JSON Output</label>
              {json && (
                <button
                  onClick={() => copyToClipboard(json)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={json}
              readOnly
              placeholder="JSON output will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg"
        >
          Convert to JSON
        </button>
      </div>
    </div>
  );
}
