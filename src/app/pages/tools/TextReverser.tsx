import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function TextReverser() {
  const [input, setInput] = useState("");
  const [reversed, setReversed] = useState("");

  const reverse = (text: string) => {
    setInput(text);
    setReversed(text.split("").reverse().join(""));
  };

  const handleCopy = async () => {
    if (reversed) {
      const success = await copyToClipboard(reversed);
      if (success) {
        toast.success("Copied to clipboard");
      }
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 mb-6">
            <RotateCcw className="h-12 w-12 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Text Reverser</h1>
          <p className="text-xl text-muted-foreground">
            Reverse your text instantly
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => reverse(e.target.value)}
              placeholder="Enter text to reverse..."
              className="w-full h-64 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none"
            />
          </div>

          {reversed && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Reversed Text</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-6 rounded-lg bg-card border-2 border-violet-500">
                <div className="text-lg break-all">{reversed}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
