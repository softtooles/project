import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const handleCopy = async (uuid?: string) => {
    const textToCopy = uuid || uuids.join("\n");
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">UUID Generator</h1>
          <p className="text-muted-foreground">
            Generate version 4 UUIDs (Universally Unique Identifiers) for your
            applications. Perfect for database keys, session IDs, and unique
            identifiers.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block mb-2 font-medium">
                Number of UUIDs to Generate
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) =>
                  setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
            <button
              onClick={handleGenerate}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium hover:from-orange-700 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Generate UUIDs
            </button>
          </div>
        </div>

        {/* Generated UUIDs */}
        {uuids.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Generated UUIDs</h2>
              <button
                onClick={() => handleCopy()}
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-2 text-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy All
                  </>
                )}
              </button>
            </div>
            <div className="space-y-3">
              {uuids.map((uuid, index) => (
                <div
                  key={uuid + index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
                >
                  <code className="flex-1 font-mono text-sm">{uuid}</code>
                  <button
                    onClick={() => handleCopy(uuid)}
                    className="p-2 rounded-md hover:bg-accent transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy this UUID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {uuids.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <RefreshCw className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Click "Generate UUIDs" to create unique identifiers
            </p>
          </div>
        )}

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is a UUID?</h2>
            <p className="text-muted-foreground mb-4">
              A UUID (Universally Unique Identifier) is a 128-bit number used to
              uniquely identify information in computer systems. Version 4 UUIDs
              are randomly generated and are extremely unlikely to collide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">UUID Format</h2>
            <p className="text-muted-foreground mb-4">
              UUIDs are typically displayed in this format:
            </p>
            <code className="block p-4 rounded-lg bg-muted font-mono text-sm">
              xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            </code>
            <p className="text-muted-foreground mt-4">
              Where x is any hexadecimal digit (0-9, a-f) and y is one of 8, 9,
              a, or b.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Database primary keys and unique identifiers</li>
              <li>Session IDs and authentication tokens</li>
              <li>File names for uploaded files</li>
              <li>Tracking IDs for analytics and logging</li>
              <li>Distributed system object identification</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Why Use UUIDs?</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>No central authority needed to generate unique IDs</li>
              <li>Can be generated offline without coordination</li>
              <li>Extremely low probability of collision</li>
              <li>Safe to use across distributed systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}