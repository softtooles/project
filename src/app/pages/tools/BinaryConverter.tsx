import { useState } from "react";
import { Copy, Binary } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function BinaryConverter() {
  const [input, setInput] = useState("");
  const [binary, setBinary] = useState("");
  const [text, setText] = useState("");

  const textToBinary = () => {
    if (!input.trim()) {
      toast.error("Please enter text to convert");
      return;
    }
    const result = input
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    setBinary(result);
    setText("");
    toast.success("Converted to binary");
  };

  const binaryToText = () => {
    if (!input.trim()) {
      toast.error("Please enter binary to convert");
      return;
    }
    try {
      const result = input
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
      setText(result);
      setBinary("");
      toast.success("Converted to text");
    } catch (err) {
      toast.error("Invalid binary format");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 mb-6">
            <Binary className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Binary Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert text to binary and binary to text
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or binary (e.g., 01001000 01101001)"
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={textToBinary}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
            >
              Text to Binary
            </button>
            <button
              onClick={binaryToText}
              className="px-8 py-3 rounded-lg border-2 border-green-600 text-green-600 dark:text-green-400 font-medium hover:bg-green-50 dark:hover:bg-green-950/20 transition-all"
            >
              Binary to Text
            </button>
          </div>

          {binary && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Binary Output</label>
                <button
                  onClick={() => copyToClipboard(binary)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm break-all">
                {binary}
              </div>
            </div>
          )}

          {text && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Text Output</label>
                <button
                  onClick={() => copyToClipboard(text)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm break-all">
                {text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
