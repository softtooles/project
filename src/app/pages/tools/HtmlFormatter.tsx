import { useState } from "react";
import { Copy, FileCode, RotateCw, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatHtml = () => {
    if (!input.trim()) {
      setError("Please enter HTML code to format");
      setOutput("");
      return;
    }

    try {
      setError("");
      const formatted = prettifyHtml(input);
      setOutput(formatted);
      toast.success("HTML formatted successfully");
    } catch (err) {
      setError("Failed to format HTML");
      setOutput("");
      toast.error("Failed to format HTML");
    }
  };

  const prettifyHtml = (html: string): string => {
    let formatted = "";
    let indent = 0;
    const tab = "  ";

    // Remove extra whitespace
    html = html.replace(/>\s+</g, "><").trim();

    // Split by tags
    const tokens = html.split(/(<\/?[^>]+>)/g).filter((token) => token.trim());

    tokens.forEach((token) => {
      if (token.match(/^<\/\w/)) {
        // Closing tag
        indent = Math.max(0, indent - 1);
        formatted += tab.repeat(indent) + token + "\n";
      } else if (token.match(/^<\w[^>]*[^/]>$/)) {
        // Opening tag
        formatted += tab.repeat(indent) + token + "\n";
        indent += 1;
      } else if (token.match(/^<\w[^>]*\/>$/)) {
        // Self-closing tag
        formatted += tab.repeat(indent) + token + "\n";
      } else {
        // Text content
        const trimmed = token.trim();
        if (trimmed) {
          formatted += tab.repeat(indent) + trimmed + "\n";
        }
      }
    });

    return formatted.trim();
  };

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output);
      if (success) {
        toast.success("Copied to clipboard");
      } else {
        toast.error("Failed to copy");
      }
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 mb-6">
            <FileCode className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">HTML Formatter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Format and beautify your HTML code with proper indentation and
            structure
          </p>
        </motion.div>

        {/* Main Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Input HTML</label>
              <span className="text-sm text-muted-foreground">
                {input.length} characters
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-red-600 font-mono text-sm resize-none"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Formatted HTML</label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Formatted HTML will appear here..."
                className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted/50 font-mono text-sm resize-none"
              />
              {error && (
                <div className="absolute top-4 left-4 right-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={formatHtml}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            <FileCode className="h-5 w-5" />
            Format HTML
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-8 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <RotateCw className="h-5 w-5" />
            Clear
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Auto Indentation</h3>
            <p className="text-sm text-muted-foreground">
              Automatically adds proper indentation to your HTML code
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Syntax Structure</h3>
            <p className="text-sm text-muted-foreground">
              Organizes HTML elements with proper nesting
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Fast Processing</h3>
            <p className="text-sm text-muted-foreground">
              Instant formatting with no server delays
            </p>
          </div>
        </motion.div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Paste HTML Code</h4>
                <p className="text-sm text-muted-foreground">
                  Copy your unformatted HTML code and paste it into the input
                  area
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Click Format HTML</h4>
                <p className="text-sm text-muted-foreground">
                  Press the format button to beautify your HTML code
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Copy Result</h4>
                <p className="text-sm text-muted-foreground">
                  Copy the formatted HTML code using the copy button
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
