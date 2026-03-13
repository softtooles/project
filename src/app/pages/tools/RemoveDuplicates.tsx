import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function RemoveDuplicates() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const removeDuplicates = (text: string) => {
    setInput(text);
    const lines = text.split("\n");
    const unique = [...new Set(lines)];
    setOutput(unique.join("\n"));
    setStats({
      original: lines.length,
      unique: unique.length,
      removed: lines.length - unique.length,
    });
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-slate-500/10 to-gray-500/10 mb-6">
            <Trash2 className="h-12 w-12 text-slate-600 dark:text-slate-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Remove Duplicate Lines</h1>
          <p className="text-xl text-muted-foreground">
            Remove duplicate lines from your text
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => removeDuplicates(e.target.value)}
              placeholder="Enter text with duplicate lines..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-slate-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Unique Lines</label>
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
              placeholder="Unique lines will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        {output && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold">{stats.original}</div>
              <div className="text-sm text-muted-foreground">Original Lines</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-green-600">{stats.unique}</div>
              <div className="text-sm text-muted-foreground">Unique Lines</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-red-600">{stats.removed}</div>
              <div className="text-sm text-muted-foreground">Duplicates Removed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
