import { useState } from "react";
import { Copy, Palette } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function GradientGenerator() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [direction, setDirection] = useState("to right");

  const getCss = () => {
    return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getCss());
    if (success) {
      toast.success("CSS copied to clipboard");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-6">
            <Palette className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Gradient Generator</h1>
          <p className="text-xl text-muted-foreground">
            Create beautiful CSS gradients
          </p>
        </motion.div>

        <div className="space-y-6">
          <div
            className="h-64 rounded-lg border border-border"
            style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Color 1</label>
              <div className="flex gap-4">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-20 h-12 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Color 2</label>
              <div className="flex gap-4">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-20 h-12 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="to right">To Right →</option>
              <option value="to left">To Left ←</option>
              <option value="to bottom">To Bottom ↓</option>
              <option value="to top">To Top ↑</option>
              <option value="to bottom right">To Bottom Right ↘</option>
              <option value="to bottom left">To Bottom Left ↙</option>
              <option value="to top right">To Top Right ↗</option>
              <option value="to top left">To Top Left ↖</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">CSS Code</label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
              {getCss()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
