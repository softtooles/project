import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="text-center glass-panel rounded-3xl p-8 md:p-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 mb-6">
          <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
          <span className="text-sm text-muted-foreground">Softtooles</span>
        </div>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
          <h1 className="relative text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Try browsing our tools instead.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
