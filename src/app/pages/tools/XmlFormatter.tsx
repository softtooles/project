import { useState } from "react";
import { Copy, Code, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatXml = () => {
    if (!input.trim()) {
      toast.error("Please enter XML code");
      return;
    }

    try {
      const formatted = input
        .replace(/>\s*</g, ">\n<")
        .split("\n")
        .map((line, index, array) => {
          let indent = 0;
          for (let i = 0; i < index; i++) {
            if (array[i].match(/<[^/][^>]*[^/]>$/)) indent++;
            if (array[i].match(/<\/[^>]+>$/)) indent--;
          }
          if (line.match(/<\/[^>]+>$/)) indent--;
          return "  ".repeat(Math.max(0, indent)) + line.trim();
        })
        .join("\n");

      setOutput(formatted);
      setError("");
      toast.success("XML formatted");
    } catch (err) {
      setError("Failed to format XML");
      toast.error("Invalid XML");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6">
            <Code className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">XML Formatter</h1>
          <p className="text-xl text-muted-foreground">
            Format and beautify XML code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Input XML</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<root><item>data</item></root>"
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Formatted XML</label>
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
              placeholder="Formatted XML will appear here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={formatXml}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            Format XML
          </button>
          <button
            onClick={() => { setInput(""); setOutput(""); setError(""); }}
            className="px-8 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
