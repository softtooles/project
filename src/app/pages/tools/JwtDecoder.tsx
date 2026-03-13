import { useState } from "react";
import { Key } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  const decode = (token: string) => {
    setJwt(token);
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        setError("Invalid JWT format");
        setHeader("");
        setPayload("");
        return;
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError("");
      toast.success("JWT decoded");
    } catch (err) {
      setError("Failed to decode JWT");
      setHeader("");
      setPayload("");
      toast.error("Invalid JWT");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 mb-6">
            <Key className="h-12 w-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">JWT Decoder</h1>
          <p className="text-xl text-muted-foreground">
            Decode JSON Web Tokens
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">JWT Token</label>
            <textarea
              value={jwt}
              onChange={(e) => decode(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-orange-600 font-mono text-sm resize-none"
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-500 text-red-600">
              {error}
            </div>
          )}

          {header && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold mb-2">Header</label>
                <pre className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm overflow-x-auto">
                  {header}
                </pre>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Payload</label>
                <pre className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm overflow-x-auto">
                  {payload}
                </pre>
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2 text-orange-600">⚠️ Security Warning</h3>
            <p className="text-sm text-muted-foreground">
              This tool decodes JWT tokens but does not verify signatures. Never share your JWT tokens publicly as they may contain sensitive information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
