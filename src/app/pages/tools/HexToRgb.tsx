import { useState } from "react";
import { Copy, Palette } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function HexToRgb() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("");

  const convert = (hexValue: string) => {
    setHex(hexValue);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);
    } else {
      setRgb("");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 mb-6">
            <Palette className="h-12 w-12 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">HEX to RGB Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert HEX color codes to RGB format
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">HEX Color</label>
            <div className="flex gap-4">
              <input
                type="color"
                value={hex}
                onChange={(e) => convert(e.target.value)}
                className="w-20 h-12 rounded-lg border border-border cursor-pointer"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => convert(e.target.value)}
                placeholder="#3b82f6"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-pink-600 font-mono"
              />
            </div>
          </div>

          {rgb && (
            <div className="space-y-4">
              <div
                className="h-32 rounded-lg border border-border"
                style={{ backgroundColor: hex }}
              />
              <div className="p-6 rounded-lg bg-card border-2 border-pink-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">RGB</div>
                    <div className="text-2xl font-mono font-bold">{rgb}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(rgb)}
                    className="p-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
