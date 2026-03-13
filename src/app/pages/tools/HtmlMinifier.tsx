import { useState } from "react";
import { Copy, Minimize2, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function HtmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyHtml = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code");
      return;
    }

    try {
      let minified = input.trim();
      minified = minified.replace(/\s+/g, " ");
      minified = minified.replace(/>\s+</g, "><");
      minified = minified.replace(/\s+>/g, ">");
      minified = minified.replace(/<!--.*?-->/g, "");
      
      setOutput(minified.trim());
      const reduction = ((1 - minified.length / input.length) * 100).toFixed(1);
      toast.success(`Minified! Reduced by ${reduction}%`);
    } catch (err) {
      toast.error("Failed to minify HTML");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 mb-6">
            <Minimize2 className="h-12 w-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">HTML Minifier</h1>
          <p className="text-xl text-muted-foreground">
            Compress HTML code to reduce file size
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input HTML</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<html>...</html>"
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-orange-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Minified HTML</label>
              {output && (
                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80">
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Minified HTML will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={minifyHtml}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium hover:from-orange-700 hover:to-red-700 transition-all shadow-lg"
          >
            Minify HTML
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
