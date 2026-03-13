import { useState } from "react";
import { Copy, RefreshCw, Key } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      toast.error("Please select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    toast.success("Password generated");
  };

  const handleCopy = async () => {
    if (password) {
      const success = await copyToClipboard(password);
      if (success) {
        toast.success("Password copied to clipboard");
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
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6">
            <Key className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Password Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate secure random passwords
          </p>
        </motion.div>

        <div className="space-y-8">
          {password && (
            <div className="p-6 rounded-lg bg-card border-2 border-green-500">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 font-mono text-2xl break-all">{password}</div>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg bg-card border border-border space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold">Password Length</label>
                <span className="text-2xl font-bold text-green-600">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 rounded border-border"
                />
                <span>Include Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-5 h-5 rounded border-border"
                />
                <span>Include Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 rounded border-border"
                />
                <span>Include Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 rounded border-border"
                />
                <span>Include Symbols (!@#$...)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg text-lg"
          >
            <RefreshCw className="inline h-5 w-5 mr-2" />
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
