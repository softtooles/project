import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setOutput("Error: Unable to encode. Check your input.");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setOutput("Error: Invalid Base64 string.");
    }
  };

  const handleProcess = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Base64 Encoder / Decoder</h1>
          <p className="text-muted-foreground">
            Encode text to Base64 or decode Base64 strings back to plain text.
            Perfect for encoding data in URLs or APIs.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("encode")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === "encode"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                : "border border-border hover:bg-accent"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === "decode"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                : "border border-border hover:bg-accent"
            }`}
          >
            Decode
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleProcess}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
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

        {/* Input/Output Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div>
            <label className="block mb-2 font-medium">
              {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 string to decode..."
              }
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          {/* Output Panel */}
          <div>
            <label className="block mb-2 font-medium">
              {mode === "encode" ? "Base64 Output" : "Plain Text Output"}
            </label>
            <div className="relative">
              <pre className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-muted overflow-auto font-mono text-sm whitespace-pre-wrap break-all">
                {output ||
                  `${
                    mode === "encode" ? "Encoded" : "Decoded"
                  } result will appear here...`}
              </pre>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              How to Use Base64 Encoder/Decoder
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Choose whether you want to encode or decode</li>
              <li>Paste your text or Base64 string into the input field</li>
              <li>
                Click the encode/decode button to process your input
              </li>
              <li>Copy the result using the "Copy Result" button</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What is Base64?</h2>
            <p className="text-muted-foreground mb-4">
              Base64 is an encoding scheme that converts binary data into ASCII
              text format. It's commonly used to encode data in URLs, emails, and
              APIs.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Encodes data using 64 characters (A-Z, a-z, 0-9, +, /)</li>
              <li>Makes binary data safe for text-based systems</li>
              <li>Increases data size by approximately 33%</li>
              <li>Used in web development, APIs, and email attachments</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Encoding images for data URIs in CSS/HTML</li>
              <li>Transmitting binary data over text-based protocols</li>
              <li>Basic obfuscation of simple data (not encryption!)</li>
              <li>Encoding credentials for HTTP Basic Authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}