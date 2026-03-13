import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface AppProps {
  children?: ReactNode;
}

export default function App({ children }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
