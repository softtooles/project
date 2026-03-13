import { useState } from "react";
import { QrCode } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQr = () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL");
      return;
    }
    // Using a public QR code API
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
    setQrUrl(url);
    toast.success("QR Code generated");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-6">
            <QrCode className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate QR codes from text or URLs
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Text or URL</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or any data..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
          </div>

          <button
            onClick={generateQr}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            Generate QR Code
          </button>

          {qrUrl && (
            <div className="p-8 rounded-lg bg-card border border-border text-center">
              <img src={qrUrl} alt="QR Code" className="mx-auto rounded-lg border border-border" />
              <a
                href={qrUrl}
                download="qrcode.png"
                className="inline-block mt-6 px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Download QR Code
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
