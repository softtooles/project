import { useState } from "react";
import { Copy, Code } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function HtmlEncoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const encode = () => {
    if (!input.trim()) {
      toast.error("Please enter text to encode");
      return;
    }
    const result = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
    setEncoded(result);
    setDecoded("");
    toast.success("HTML encoded");
  };

  const decode = () => {
    if (!input.trim()) {
      toast.error("Please enter text to decode");
      return;
    }
    const result = input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    setDecoded(result);
    setEncoded("");
    toast.success("HTML decoded");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 mb-6">
            <Code className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">HTML Encoder/Decoder</h1>
          <p className="text-xl text-muted-foreground">
            Encode and decode HTML entities
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<div>Hello & Welcome</div>"
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-yellow-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={encode}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-medium hover:from-yellow-700 hover:to-orange-700 transition-all shadow-lg"
            >
              Encode
            </button>
            <button
              onClick={decode}
              className="px-8 py-3 rounded-lg border-2 border-yellow-600 text-yellow-600 dark:text-yellow-400 font-medium hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
            >
              Decode
            </button>
          </div>

          {encoded && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Encoded HTML</label>
                <button
                  onClick={() => copyToClipboard(encoded)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm break-all">
                {encoded}
              </div>
            </div>
          )}

          {decoded && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Decoded HTML</label>
                <button
                  onClick={() => copyToClipboard(decoded)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm break-all">
                {decoded}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
