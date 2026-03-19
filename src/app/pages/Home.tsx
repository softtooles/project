import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Lock, Orbit, Sparkles, Layers3, Rocket } from "lucide-react";
import { ToolCard } from "../components/ToolCard";
import { motion } from "motion/react";
import {
  FileJson,
  Minimize2,
  Binary,
  Fingerprint,
  FileSearch,
  Palette,
  FileCode,
  Clock,
} from "lucide-react";

const popularTools = [
  {
    icon: FileJson,
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting",
    href: "/tools/json-formatter",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Minimize2,
    title: "CSS Minifier",
    description: "Compress CSS code to reduce file size",
    href: "/tools/css-minifier",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: FileCode,
    title: "HTML Formatter",
    description: "Format and beautify HTML code with proper structure",
    href: "/tools/html-formatter",
    gradient: "from-red-500 to-orange-600",
  },
  {
    icon: Binary,
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings instantly",
    href: "/tools/base64-encoder",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Clock,
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates",
    href: "/tools/timestamp-converter",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    icon: Fingerprint,
    title: "UUID Generator",
    description: "Generate unique identifiers for your applications",
    href: "/tools/uuid-generator",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: FileSearch,
    title: "Regex Tester",
    description: "Test and debug regular expressions with live results",
    href: "/tools/regex-tester",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Palette,
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL color formats",
    href: "/tools/color-converter",
    gradient: "from-amber-500 to-yellow-600",
  },
];

const features = [
  {
    icon: Zap,
    title: "Ultra Fast",
    description: "Every tool runs with instant browser-based processing for a fast workflow.",
  },
  {
    icon: Lock,
    title: "Private by Default",
    description: "Your data stays with you, without relying on external processing.",
  },
  {
    icon: Layers3,
    title: "Premium UX",
    description: "modern motion, clean hierarchy, distraction-free workflow",
  },
  {
    icon: Rocket,
    title: "No Setup",
    description: "Start working immediately with no account creation or setup friction.",
  },
];

export function Home() {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative overflow-hidden pt-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-14 left-[10%] h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl float-orb" />
          <div className="absolute top-28 right-[8%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl float-orb-delayed" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 text-sm">
                <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                Logo-Based Premium Developer Platform
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-[1.04]">
                <span className="bg-clip-text text-transparent logo-gradient">Softtooles</span>
                <br />
                Next-Gen Developer Toolkit
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                A premium interface, advanced motion, and ultra-fast online tools built for mobile-ready,
                SEO-friendly, privacy-first workflows.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl logo-gradient text-white font-semibold shadow-xl shadow-cyan-700/25"
                >
                  Browse All Tools
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-border glass-panel"
                >
                  Contact Team
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, rotateY: -8, y: 26 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="glass-panel premium-card rounded-3xl p-7 md:p-9">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} priority />
                    <div>
                      <p className="font-semibold">Live Preview</p>
                      <p className="text-xs text-muted-foreground">3D Motion Interface</p>
                    </div>
                  </div>
                  <Orbit className="h-5 w-5 text-cyan-500" />
                </div>

                <div className="space-y-4">
                  <div className="h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-300/30" />
                  <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 border border-cyan-300/20" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-500/20 border border-cyan-300/20" />
                    <div className="h-16 rounded-xl bg-gradient-to-r from-teal-300/20 to-cyan-500/20 border border-cyan-300/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Why Teams Choose SoftTools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-performance frontend architecture, polished interaction design, and clear UX.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass-panel premium-card rounded-2xl p-6"
              >
                <div className="inline-flex p-3 rounded-xl logo-gradient mb-4 text-white shadow-md">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="popular-tools" className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Developer Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most-used utilities, reimagined with a premium tool dashboard experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              View All Tools
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="glass-panel rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Build Faster With Premium Tools</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mobile-friendly, fast-loading, SEO-ready developer tools ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl logo-gradient text-white font-semibold shadow-lg"
              >
                Browse All Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-border hover:bg-accent transition-colors">Read Blog</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}