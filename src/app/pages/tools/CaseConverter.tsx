import { useState } from "react";
import { Type } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function CaseConverter() {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    if (!text.trim()) {
      toast.error("Please enter text to convert");
      return;
    }

    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = text.toLowerCase().replace(/\s+/g, "_");
        break;
      case "kebab":
        result = text.toLowerCase().replace(/\s+/g, "-");
        break;
    }
    setText(result);
    toast.success("Text converted");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 mb-6">
            <Type className="h-12 w-12 text-fuchsia-600 dark:text-fuchsia-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Case Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert text between different cases
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-64 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-fuchsia-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => convertCase("upper")}
              className="px-4 py-3 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => convertCase("lower")}
              className="px-4 py-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={() => convertCase("title")}
              className="px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Title Case
            </button>
            <button
              onClick={() => convertCase("sentence")}
              className="px-4 py-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Sentence case
            </button>
            <button
              onClick={() => convertCase("camel")}
              className="px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              camelCase
            </button>
            <button
              onClick={() => convertCase("snake")}
              className="px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              snake_case
            </button>
            <button
              onClick={() => convertCase("kebab")}
              className="px-4 py-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
            >
              kebab-case
            </button>
            <button
              onClick={() => setText("")}
              className="px-4 py-3 rounded-lg border-2 border-border hover:bg-accent transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
