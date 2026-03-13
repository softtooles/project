import { useState } from "react";
import { Copy, Palette, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function ColorPaletteGenerator() {
  const [colors, setColors] = useState<string[]>([]);

  const generatePalette = () => {
    const palette = [];
    for (let i = 0; i < 5; i++) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      palette.push(color);
    }
    setColors(palette);
    toast.success("Palette generated");
  };

  const handleCopy = async (color: string) => {
    const success = await copyToClipboard(color);
    if (success) {
      toast.success(`Copied ${color}`);
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 mb-6">
            <Palette className="h-12 w-12 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Color Palette Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate beautiful color palettes randomly
          </p>
        </motion.div>

        <button
          onClick={generatePalette}
          className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg text-lg mb-8"
        >
          <RefreshCw className="inline h-5 w-5 mr-2" />
          Generate Palette
        </button>

        {colors.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {colors.map((color, idx) => (
                <div key={idx} className="space-y-2">
                  <div
                    className="h-48 rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handleCopy(color)}
                  />
                  <div className="text-center">
                    <div className="font-mono font-semibold">{color}</div>
                    <button
                      onClick={() => handleCopy(color)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Click to copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => copyToClipboard(colors.join(", "))}
              className="w-full px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Copy className="inline h-4 w-4 mr-2" />
              Copy All Colors
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
