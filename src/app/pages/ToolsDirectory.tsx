import { useState } from "react";
import { ToolCard } from "../components/ToolCard";
import Image from "next/image";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import {
  FileJson,
  Minimize2,
  Binary,
  Fingerprint,
  FileSearch,
  Palette,
  Type,
  RotateCw,
  Trash2,
  FileCode,
  Code,
  Link as LinkIcon,
  Clock,
  Hash,
  Key,
  Activity,
  Calendar,
  Percent,
  DollarSign,
  Calculator,
  Thermometer,
  Ruler,
  Dices,
  FileText,
  QrCode,
  Database,
  FileSpreadsheet,
  Tag,
  Link2,
  ArrowDownAZ,
  RotateCcw,
} from "lucide-react";

const allTools = [
  // Developer Tools
  {
    icon: FileJson,
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting",
    href: "/tools/json-formatter",
    gradient: "from-emerald-500 to-teal-600",
    category: "Developer Tools",
  },
  {
    icon: FileJson,
    title: "JSON Validator",
    description: "Validate JSON syntax and structure",
    href: "/tools/json-validator",
    gradient: "from-teal-500 to-cyan-600",
    category: "Developer Tools",
  },
  {
    icon: Minimize2,
    title: "CSS Minifier",
    description: "Compress CSS code to reduce file size",
    href: "/tools/css-minifier",
    gradient: "from-blue-500 to-cyan-600",
    category: "Developer Tools",
  },
  {
    icon: Code,
    title: "CSS Beautifier",
    description: "Format and beautify CSS code",
    href: "/tools/css-beautifier",
    gradient: "from-indigo-500 to-blue-600",
    category: "Developer Tools",
  },
  {
    icon: FileCode,
    title: "HTML Formatter",
    description: "Format and beautify HTML code",
    href: "/tools/html-formatter",
    gradient: "from-red-500 to-orange-600",
    category: "Developer Tools",
  },
  {
    icon: Minimize2,
    title: "HTML Minifier",
    description: "Compress HTML code to reduce file size",
    href: "/tools/html-minifier",
    gradient: "from-orange-500 to-red-600",
    category: "Developer Tools",
  },
  {
    icon: FileSearch,
    title: "Regex Tester",
    description: "Test and debug regular expressions",
    href: "/tools/regex-tester",
    gradient: "from-pink-500 to-rose-600",
    category: "Developer Tools",
  },
  {
    icon: Key,
    title: "JWT Decoder",
    description: "Decode JSON Web Tokens",
    href: "/tools/jwt-decoder",
    gradient: "from-orange-500 to-red-600",
    category: "Developer Tools",
  },
  {
    icon: Database,
    title: "SQL Formatter",
    description: "Format and beautify SQL queries",
    href: "/tools/sql-formatter",
    gradient: "from-blue-500 to-indigo-600",
    category: "Developer Tools",
  },
  {
    icon: Code,
    title: "XML Formatter",
    description: "Format and beautify XML code",
    href: "/tools/xml-formatter",
    gradient: "from-green-500 to-emerald-600",
    category: "Developer Tools",
  },
  {
    icon: FileText,
    title: "Markdown Preview",
    description: "Preview markdown in real-time",
    href: "/tools/markdown-preview",
    gradient: "from-blue-500 to-indigo-600",
    category: "Developer Tools",
  },

  // Encoding Tools
  {
    icon: Binary,
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    href: "/tools/base64-encoder",
    gradient: "from-violet-500 to-purple-600",
    category: "Encoding Tools",
  },
  {
    icon: LinkIcon,
    title: "URL Encoder",
    description: "Encode and decode URL strings",
    href: "/tools/url-encoder",
    gradient: "from-indigo-500 to-blue-600",
    category: "Encoding Tools",
  },
  {
    icon: Code,
    title: "HTML Encoder",
    description: "Encode and decode HTML entities",
    href: "/tools/html-encoder",
    gradient: "from-yellow-500 to-orange-600",
    category: "Encoding Tools",
  },
  {
    icon: Binary,
    title: "Binary Converter",
    description: "Convert text to binary and vice versa",
    href: "/tools/binary-converter",
    gradient: "from-green-500 to-teal-600",
    category: "Encoding Tools",
  },

  // Generator Tools
  {
    icon: Fingerprint,
    title: "UUID Generator",
    description: "Generate unique identifiers",
    href: "/tools/uuid-generator",
    gradient: "from-orange-500 to-red-600",
    category: "Generator Tools",
  },
  {
    icon: Key,
    title: "Password Generator",
    description: "Generate secure random passwords",
    href: "/tools/password-generator",
    gradient: "from-green-500 to-emerald-600",
    category: "Generator Tools",
  },
  {
    icon: Dices,
    title: "Random Number Generator",
    description: "Generate random numbers",
    href: "/tools/random-number-generator",
    gradient: "from-violet-500 to-purple-600",
    category: "Generator Tools",
  },
  {
    icon: FileText,
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    href: "/tools/lorem-ipsum-generator",
    gradient: "from-slate-500 to-gray-600",
    category: "Generator Tools",
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    href: "/tools/qr-code-generator",
    gradient: "from-purple-500 to-pink-600",
    category: "Generator Tools",
  },
  {
    icon: Hash,
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes",
    href: "/tools/hash-generator",
    gradient: "from-indigo-500 to-purple-600",
    category: "Generator Tools",
  },
  {
    icon: Palette,
    title: "Color Palette Generator",
    description: "Generate beautiful color palettes",
    href: "/tools/color-palette-generator",
    gradient: "from-pink-500 to-purple-600",
    category: "Generator Tools",
  },
  {
    icon: Palette,
    title: "Gradient Generator",
    description: "Create beautiful CSS gradients",
    href: "/tools/gradient-generator",
    gradient: "from-purple-500 to-pink-600",
    category: "Generator Tools",
  },

  // Converter Tools
  {
    icon: Clock,
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to dates",
    href: "/tools/timestamp-converter",
    gradient: "from-cyan-500 to-teal-600",
    category: "Converter Tools",
  },
  {
    icon: Palette,
    title: "Color Converter",
    description: "Convert between color formats",
    href: "/tools/color-converter",
    gradient: "from-amber-500 to-yellow-600",
    category: "Converter Tools",
  },
  {
    icon: Palette,
    title: "HEX to RGB",
    description: "Convert HEX colors to RGB",
    href: "/tools/hex-to-rgb",
    gradient: "from-pink-500 to-rose-600",
    category: "Converter Tools",
  },
  {
    icon: Palette,
    title: "RGB to HEX",
    description: "Convert RGB colors to HEX",
    href: "/tools/rgb-to-hex",
    gradient: "from-rose-500 to-red-600",
    category: "Converter Tools",
  },
  {
    icon: Thermometer,
    title: "Temperature Converter",
    description: "Convert between temperature units",
    href: "/tools/temperature-converter",
    gradient: "from-orange-500 to-red-600",
    category: "Converter Tools",
  },
  {
    icon: Ruler,
    title: "Unit Converter",
    description: "Convert between different units",
    href: "/tools/unit-converter",
    gradient: "from-cyan-500 to-blue-600",
    category: "Converter Tools",
  },
  {
    icon: FileSpreadsheet,
    title: "JSON to CSV",
    description: "Convert JSON data to CSV format",
    href: "/tools/json-to-csv",
    gradient: "from-green-500 to-emerald-600",
    category: "Converter Tools",
  },
  {
    icon: FileJson,
    title: "CSV to JSON",
    description: "Convert CSV data to JSON format",
    href: "/tools/csv-to-json",
    gradient: "from-teal-500 to-cyan-600",
    category: "Converter Tools",
  },

  // Text Tools
  {
    icon: Type,
    title: "Word Counter",
    description: "Count words, characters, and more",
    href: "/tools/word-counter",
    gradient: "from-purple-500 to-pink-600",
    category: "Text Tools",
  },
  {
    icon: Type,
    title: "Case Converter",
    description: "Convert text between different cases",
    href: "/tools/case-converter",
    gradient: "from-fuchsia-500 to-pink-600",
    category: "Text Tools",
  },
  {
    icon: Link2,
    title: "Slug Generator",
    description: "Generate URL-friendly slugs",
    href: "/tools/slug-generator",
    gradient: "from-teal-500 to-emerald-600",
    category: "Text Tools",
  },
  {
    icon: RotateCcw,
    title: "Text Reverser",
    description: "Reverse your text instantly",
    href: "/tools/text-reverser",
    gradient: "from-violet-500 to-purple-600",
    category: "Text Tools",
  },
  {
    icon: Trash2,
    title: "Remove Duplicates",
    description: "Remove duplicate lines from text",
    href: "/tools/remove-duplicates",
    gradient: "from-slate-500 to-gray-600",
    category: "Text Tools",
  },
  {
    icon: ArrowDownAZ,
    title: "Sort Text Lines",
    description: "Sort lines of text alphabetically",
    href: "/tools/sort-text-lines",
    gradient: "from-blue-500 to-cyan-600",
    category: "Text Tools",
  },

  // Calculators
  {
    icon: Activity,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    href: "/tools/bmi-calculator",
    gradient: "from-green-500 to-teal-600",
    category: "Calculators",
  },
  {
    icon: Calendar,
    title: "Age Calculator",
    description: "Calculate your exact age",
    href: "/tools/age-calculator",
    gradient: "from-blue-500 to-purple-600",
    category: "Calculators",
  },
  {
    icon: Percent,
    title: "Percentage Calculator",
    description: "Calculate percentages and changes",
    href: "/tools/percentage-calculator",
    gradient: "from-amber-500 to-orange-600",
    category: "Calculators",
  },
  {
    icon: Tag,
    title: "Discount Calculator",
    description: "Calculate discounted prices",
    href: "/tools/discount-calculator",
    gradient: "from-red-500 to-pink-600",
    category: "Calculators",
  },
  {
    icon: DollarSign,
    title: "Tip Calculator",
    description: "Calculate tips and split bills",
    href: "/tools/tip-calculator",
    gradient: "from-emerald-500 to-teal-600",
    category: "Calculators",
  },
  {
    icon: Calculator,
    title: "Loan/EMI Calculator",
    description: "Calculate loan payments and EMI",
    href: "/tools/loan-calculator",
    gradient: "from-blue-500 to-cyan-600",
    category: "Calculators",
  },
  {
    icon: Calendar,
    title: "Date Difference Calculator",
    description: "Calculate difference between dates",
    href: "/tools/date-difference-calculator",
    gradient: "from-purple-500 to-pink-600",
    category: "Calculators",
  },
];

const categories = [
  "All Tools",
  "Developer Tools",
  "Text Tools",
  "Encoding Tools",
  "Generator Tools",
  "Converter Tools",
  "Calculators",
];

export function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tools");

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Tools" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-card/60 text-xs mb-4">
                <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
                Premium Directory
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Developer Tools Directory</h1>
              <p className="text-muted-foreground max-w-2xl">
                {allTools.length}+ fast tools with polished UI, live utilities, and mobile-ready workflow.
              </p>
            </div>
            <LinkStat count={filteredTools.length} label="Showing" />
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-3xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools, keywords, use-cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/70 glass-panel focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 glass-panel rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 max-h-[60vh] overflow-auto pr-1">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-all ${
                        selectedCategory === category
                          ? "logo-gradient text-white shadow-md"
                          : "hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            {filteredTools.length === 0 ? (
              <div className="text-center py-14 glass-panel rounded-2xl">
                <p className="text-muted-foreground">
                  No tools found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.title} {...tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkStat({ count, label }: { count: number; label: string }) {
  return (
    <div className="glass-panel rounded-2xl p-4 min-w-32 text-center">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-300">{count}</p>
    </div>
  );
}
