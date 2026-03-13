import { useState, useEffect } from "react";
import { Type, FileText } from "lucide-react";
import { motion } from "motion/react";

export function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

    setStats({ characters, charactersNoSpaces, words, lines, sentences, paragraphs });
  }, [text]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-6">
            <Type className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Word Counter</h1>
          <p className="text-xl text-muted-foreground">
            Count words, characters, sentences, and more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-96 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.words}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.characters}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.sentences}</div>
              <div className="text-sm text-muted-foreground">Sentences</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.lines}</div>
              <div className="text-sm text-muted-foreground">Lines</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-3xl font-bold text-purple-600">{stats.paragraphs}</div>
              <div className="text-sm text-muted-foreground">Paragraphs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
