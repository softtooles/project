import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
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
    setError("");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Formatter</h1>
          <p className="text-muted-foreground">
            Format and validate JSON data with syntax highlighting. Beautify or
            minify JSON instantly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleFormat}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
          >
            Format JSON
          </button>
          <button
            onClick={handleMinify}
            className="px-6 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            Minify JSON
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Input/Output Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div>
            <label className="block mb-2 font-medium">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here... e.g., {"name":"Softtooles","status":"awesome"}'
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Output Panel */}
          <div>
            <label className="block mb-2 font-medium">Formatted Output</label>
            <div className="relative">
              <pre className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted overflow-auto font-mono text-sm">
                {output || "Formatted JSON will appear here..."}
              </pre>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use JSON Formatter</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Paste your JSON data into the input field</li>
              <li>Click "Format JSON" to beautify or "Minify JSON" to compress</li>
              <li>Copy the formatted result using the "Copy Result" button</li>
              <li>Use "Clear" to reset and start over</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Benefits of Formatting JSON</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Easier to read and understand JSON structure</li>
              <li>Quickly identify syntax errors in your JSON</li>
              <li>Validate JSON before using it in your applications</li>
              <li>Minify JSON to reduce file size for production</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Common JSON Errors</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Missing or extra commas between properties</li>
              <li>Unquoted property names (must use double quotes)</li>
              <li>Trailing commas after the last property</li>
              <li>Single quotes instead of double quotes</li>
              <li>Unclosed brackets or braces</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}