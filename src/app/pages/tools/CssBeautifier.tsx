import { useState } from "react";
import { Copy, Code, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function CssBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautifyCss = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code");
      return;
    }

    try {
      let formatted = input.trim();
      formatted = formatted.replace(/\s*{\s*/g, " {\n  ");
      formatted = formatted.replace(/\s*}\s*/g, "\n}\n\n");
      formatted = formatted.replace(/;\s*/g, ";\n  ");
      formatted = formatted.replace(/,\s*/g, ", ");
      formatted = formatted.replace(/\n\s*\n\s*\n/g, "\n\n");
      
      setOutput(formatted.trim());
      toast.success("CSS beautified successfully");
    } catch (err) {
      toast.error("Failed to beautify CSS");
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
            <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">CSS Beautifier</h1>
          <p className="text-xl text-muted-foreground">
            Format and beautify your CSS code with proper indentation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input CSS</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="body{margin:0;padding:0;}"
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Beautified CSS</label>
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
              placeholder="Beautified CSS will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={beautifyCss}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Beautify CSS
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
