import { useState } from "react";
import { Copy, Link2 } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = (text: string) => {
    setInput(text);
    const slugValue = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(slugValue);
  };

  const handleCopy = async () => {
    if (slug) {
      const success = await copyToClipboard(slug);
      if (success) {
        toast.success("Slug copied to clipboard");
      }
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 mb-6">
            <Link2 className="h-12 w-12 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Slug Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate URL-friendly slugs from text
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Input Text</label>
            <input
              type="text"
              value={input}
              onChange={(e) => generateSlug(e.target.value)}
              placeholder="My Awesome Blog Post Title"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {slug && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Generated Slug</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-6 rounded-lg bg-card border-2 border-teal-500">
                <div className="font-mono text-xl text-teal-600 dark:text-teal-400 break-all">
                  {slug}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">Preview URL:</div>
                <div className="font-mono text-sm break-all">
                  https://example.com/{slug}
                </div>
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-3">Slug Rules:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Converts to lowercase</li>
              <li>• Replaces spaces with hyphens (-)</li>
              <li>• Removes special characters</li>
              <li>• Removes leading/trailing hyphens</li>
              <li>• Perfect for URLs and filenames</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
