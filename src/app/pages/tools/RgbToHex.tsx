import { useState } from "react";
import { Copy, Palette } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function RgbToHex() {
  const [r, setR] = useState("59");
  const [g, setG] = useState("130");
  const [b, setB] = useState("246");
  const [hex, setHex] = useState("#3b82f6");

  const convert = (red: string, green: string, blue: string) => {
    const rNum = parseInt(red) || 0;
    const gNum = parseInt(green) || 0;
    const bNum = parseInt(blue) || 0;

    if (rNum >= 0 && rNum <= 255 && gNum >= 0 && gNum <= 255 && bNum >= 0 && bNum <= 255) {
      const hexValue = "#" + ((1 << 24) + (rNum << 16) + (gNum << 8) + bNum).toString(16).slice(1);
      setHex(hexValue);
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 to-red-500/10 mb-6">
            <Palette className="h-12 w-12 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">RGB to HEX Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert RGB color values to HEX format
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Red (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={r}
                onChange={(e) => { setR(e.target.value); convert(e.target.value, g, b); }}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Green (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={g}
                onChange={(e) => { setG(e.target.value); convert(r, e.target.value, b); }}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Blue (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={b}
                onChange={(e) => { setB(e.target.value); convert(r, g, e.target.value); }}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="h-32 rounded-lg border border-border"
              style={{ backgroundColor: hex }}
            />
            <div className="p-6 rounded-lg bg-card border-2 border-rose-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">HEX</div>
                  <div className="text-2xl font-mono font-bold">{hex}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(hex)}
                  className="p-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
