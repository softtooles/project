import { useState } from "react";
import { Copy, Link, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error("Please enter text to encode");
      return;
    }
    try {
      const result = encodeURIComponent(input);
      setEncoded(result);
      toast.success("URL encoded successfully");
    } catch (err) {
      toast.error("Failed to encode URL");
    }
  };

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error("Please enter text to decode");
      return;
    }
    try {
      const result = decodeURIComponent(input);
      setDecoded(result);
      toast.success("URL decoded successfully");
    } catch (err) {
      toast.error("Failed to decode URL");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 mb-6">
            <Link className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">URL Encoder/Decoder</h1>
          <p className="text-xl text-muted-foreground">
            Encode and decode URL strings
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or URL to encode/decode"
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleEncode}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Encode
            </button>
            <button
              onClick={handleDecode}
              className="px-8 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all"
            >
              Decode
            </button>
          </div>

          {encoded && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Encoded URL</label>
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
                <label className="text-lg font-semibold">Decoded URL</label>
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
