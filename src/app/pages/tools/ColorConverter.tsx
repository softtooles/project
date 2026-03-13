import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState("");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    if (newRgb) {
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Color Converter</h1>
          <p className="text-muted-foreground">
            Convert colors between HEX, RGB, and HSL formats. Perfect for web
            development and design work.
          </p>
        </div>

        {/* Color Preview */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              className="w-48 h-48 rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 flex-shrink-0"
              style={{ backgroundColor: hex }}
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Current Color</h2>
              <p className="text-muted-foreground">
                Adjust any format below to see the color change in real-time
              </p>
            </div>
          </div>
        </div>

        {/* HEX Input */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="font-semibold">HEX</label>
            <button
              onClick={() => handleCopy(hex, "hex")}
              className="px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors flex items-center gap-2 text-sm"
            >
              {copied === "hex" ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* RGB Input */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="font-semibold">RGB</label>
            <button
              onClick={() =>
                handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")
              }
              className="px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors flex items-center gap-2 text-sm"
            >
              {copied === "rgb" ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Red
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Green
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Blue
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>
        </div>

        {/* HSL Input */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="font-semibold">HSL</label>
            <button
              onClick={() =>
                handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")
              }
              className="px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors flex items-center gap-2 text-sm"
            >
              {copied === "hsl" ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Hue (0-360)
              </label>
              <input
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Saturation (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Lightness (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Color Format Guide</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">HEX (Hexadecimal)</h3>
                <p className="text-muted-foreground text-sm">
                  A 6-digit code representing RGB values in base-16. Format:
                  #RRGGBB. Most common in web development.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">RGB (Red Green Blue)</h3>
                <p className="text-muted-foreground text-sm">
                  Three values (0-255) representing red, green, and blue
                  channels. Format: rgb(r, g, b).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">HSL (Hue Saturation Lightness)</h3>
                <p className="text-muted-foreground text-sm">
                  Hue (0-360°), Saturation (0-100%), Lightness (0-100%). More
                  intuitive for color adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}