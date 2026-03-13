import { useState } from "react";
import { Copy, FileText } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export function LoremIpsumGenerator() {
  const [output, setOutput] = useState("");
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);

  const generateLorem = () => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = [];
      for (let j = 0; j < wordsPerParagraph; j++) {
        paragraph.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      let text = paragraph.join(" ");
      text = text.charAt(0).toUpperCase() + text.slice(1) + ".";
      result.push(text);
    }
    setOutput(result.join("\n\n"));
    toast.success("Lorem ipsum generated");
  };

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output);
      if (success) {
        toast.success("Copied to clipboard");
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-slate-500/10 to-gray-500/10 mb-6">
            <FileText className="h-12 w-12 text-slate-600 dark:text-slate-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Lorem Ipsum Generator</h1>
          <p className="text-xl text-muted-foreground">
            Generate placeholder text for your designs
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Number of Paragraphs</label>
              <input
                type="number"
                min="1"
                max="20"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Words per Paragraph</label>
              <input
                type="number"
                min="10"
                max="200"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
          </div>

          <button
            onClick={generateLorem}
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-slate-600 to-gray-600 text-white font-medium hover:from-slate-700 hover:to-gray-700 transition-all shadow-lg"
          >
            Generate Lorem Ipsum
          </button>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Generated Text</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-accent hover:bg-accent/80"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="p-6 rounded-lg bg-muted/50 max-h-96 overflow-y-auto whitespace-pre-wrap">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
