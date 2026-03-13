import { useState } from "react";
import { Copy, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function SortTextLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const sortAscending = () => {
    if (!input.trim()) {
      toast.error("Please enter text to sort");
      return;
    }
    const lines = input.split("\n");
    const sorted = lines.sort((a, b) => a.localeCompare(b));
    setOutput(sorted.join("\n"));
    toast.success("Sorted A-Z");
  };

  const sortDescending = () => {
    if (!input.trim()) {
      toast.error("Please enter text to sort");
      return;
    }
    const lines = input.split("\n");
    const sorted = lines.sort((a, b) => b.localeCompare(a));
    setOutput(sorted.join("\n"));
    toast.success("Sorted Z-A");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mb-6">
            <ArrowDownAZ className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Sort Text Lines</h1>
          <p className="text-xl text-muted-foreground">
            Sort lines of text alphabetically
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter lines of text to sort..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Sorted Text</label>
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
              placeholder="Sorted text will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={sortAscending}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
          >
            <ArrowDownAZ className="h-5 w-5" />
            Sort A-Z
          </button>
          <button
            onClick={sortDescending}
            className="flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all"
          >
            <ArrowUpAZ className="h-5 w-5" />
            Sort Z-A
          </button>
        </div>
      </div>
    </div>
  );
}
