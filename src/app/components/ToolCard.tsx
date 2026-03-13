import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient?: string;
}

export function ToolCard({ icon: Icon, title, description, href, gradient = "from-blue-500 to-purple-600" }: ToolCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative h-full"
      >
        <div className="absolute inset-0 logo-gradient opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl blur-2xl" />
        <div className="relative h-full p-6 rounded-2xl border border-border/50 glass-panel premium-card overflow-hidden">
          <div className="absolute -right-14 -top-12 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 shadow-lg shadow-cyan-600/20`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="text-xs uppercase tracking-[0.12em] text-cyan-600 dark:text-cyan-300 font-semibold">
            Open Tool
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
