import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Image src="/logo.png?v=2" alt="Softtooles Logo" width={200} height={200} />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/variant-hub" className="hover:text-foreground transition-colors">
                  Tool landing pages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
