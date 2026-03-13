import { useState } from "react";
import { FileText } from "lucide-react";
import { motion } from "motion/react";

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **bold** and this is *italic*.\n\n## List\n- Item 1\n- Item 2\n- Item 3");

  const convertMarkdown = (md: string) => {
    return md
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/\n/gim, '<br />');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-6">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Markdown Preview</h1>
          <p className="text-xl text-muted-foreground">
            Write markdown and see the preview in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-lg font-semibold">Markdown</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[600px] px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Preview</label>
            <div
              className="w-full h-[600px] px-6 py-4 rounded-lg border border-border bg-muted/50 overflow-y-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: convertMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
