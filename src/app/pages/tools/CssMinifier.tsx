import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";

export function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    try {
      // Simple CSS minification
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, "{") // Remove spaces around {
        .replace(/\s*}\s*/g, "}") // Remove spaces around }
        .replace(/\s*:\s*/g, ":") // Remove spaces around :
        .replace(/\s*;\s*/g, ";") // Remove spaces around ;
        .replace(/;\}/g, "}") // Remove last semicolon before }
        .trim();

      setOutput(minified);
    } catch (err) {
      setOutput("Error minifying CSS");
    }
  };

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const calculateSavings = () => {
    if (!input || !output) return null;
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([output]).size;
    const savings = ((originalSize - minifiedSize) / originalSize) * 100;
    return {
      original: originalSize,
      minified: minifiedSize,
      savings: savings.toFixed(1),
    };
  };

  const stats = calculateSavings();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">CSS Minifier</h1>
          <p className="text-muted-foreground">
            Compress your CSS code to reduce file size and improve page load
            speed. Remove unnecessary whitespace and comments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleMinify}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
          >
            Minify CSS
          </button>
          <button
            onClick={handleCopy}
            className="px-6 py-2 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Result
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mb-6 p-4 rounded-lg bg-accent/50 border border-border">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Original Size: </span>
                <span className="font-medium">{stats.original} bytes</span>
              </div>
              <div>
                <span className="text-muted-foreground">Minified Size: </span>
                <span className="font-medium">{stats.minified} bytes</span>
              </div>
              <div>
                <span className="text-muted-foreground">Savings: </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {stats.savings}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Input/Output Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div>
            <label className="block mb-2 font-medium">Input CSS</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Output Panel */}
          <div>
            <label className="block mb-2 font-medium">Minified Output</label>
            <div className="relative">
              <pre className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted overflow-auto font-mono text-sm whitespace-pre-wrap break-all">
                {output || "Minified CSS will appear here..."}
              </pre>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use CSS Minifier</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Paste your CSS code into the input field</li>
              <li>Click "Minify CSS" to compress the code</li>
              <li>View the size savings and compression statistics</li>
              <li>Copy the minified CSS using the "Copy Result" button</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Benefits of CSS Minification</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Reduces file size by removing whitespace and comments</li>
              <li>Improves page load speed and performance</li>
              <li>Reduces bandwidth usage for your website</li>
              <li>Essential for production-ready websites</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What Gets Removed?</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>All comments (/* ... */)</li>
              <li>Unnecessary whitespace and line breaks</li>
              <li>Extra spaces around brackets, colons, and semicolons</li>
              <li>Trailing semicolons before closing braces</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}