import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="group min-w-0">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} priority className="shrink-0" />
          </Link>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-card/70 px-2 py-1">
            <Link href="/" className="px-3 py-1.5 rounded-full text-sm hover:bg-accent transition-colors">Home</Link>
            <Link href="/blog" className="px-3 py-1.5 rounded-full text-sm hover:bg-accent transition-colors">Blog</Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-full text-sm hover:bg-accent transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/tools"
              className="text-sm px-3 py-2 rounded-xl border border-border/60 hover:bg-accent transition-colors"
            >
              Tools
            </Link>
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl hover:bg-accent transition-colors border border-border/60"
              aria-label="Toggle theme"
            >
              {mounted && (
                <>
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3 flex items-center gap-2 overflow-x-auto">
          <Link href="/" className="px-3 py-1.5 rounded-full text-sm border border-border/60 whitespace-nowrap">Home</Link>
          <Link href="/blog" className="px-3 py-1.5 rounded-full text-sm border border-border/60 whitespace-nowrap">Blog</Link>
          <Link href="/contact" className="px-3 py-1.5 rounded-full text-sm border border-border/60 whitespace-nowrap">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
