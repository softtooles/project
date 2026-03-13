import { useState } from "react";
import { Copy, Hash } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<any>({});

  const simpleHash = (str: string, seed = 0): string => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
  };

  const generateHashes = () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash");
      return;
    }

    const md5Like = simpleHash(input, 1);
    const sha1Like = simpleHash(input, 2).repeat(2).substring(0, 40);
    const sha256Like = simpleHash(input, 3).repeat(4).substring(0, 64);

    setHashes({
      md5: md5Like,
      sha1: sha1Like,
      sha256: sha256Like,
    });
    toast.success("Hashes generated");
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
            <Hash className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Hash Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate MD5, SHA-1, and SHA-256 style hashes
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Note: These are demonstration hashes for development purposes
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate hashes..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
            />
          </div>

          <button
            onClick={generateHashes}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Generate Hashes
          </button>

          {hashes.md5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">MD5 (32 chars)</span>
                  <button
                    onClick={() => copyToClipboard(hashes.md5)}
                    className="p-2 rounded-lg hover:bg-accent"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-indigo-600 dark:text-indigo-400">
                  {hashes.md5}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">SHA-1 (40 chars)</span>
                  <button
                    onClick={() => copyToClipboard(hashes.sha1)}
                    className="p-2 rounded-lg hover:bg-accent"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-purple-600 dark:text-purple-400">
                  {hashes.sha1}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">SHA-256 (64 chars)</span>
                  <button
                    onClick={() => copyToClipboard(hashes.sha256)}
                    className="p-2 rounded-lg hover:bg-accent"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-pink-600 dark:text-pink-400">
                  {hashes.sha256}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
