import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import App from "@/app/App";
import { Root } from "@/app/components/Root";
import "@/styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Head>
        <link rel="icon" href="/logo.png?v=2" />
        <meta name="theme-color" content="#12b5d0" />
        <meta
          name="google-site-verification"
          content="Ed-SdrFPMFrE46VBzMnHc4yQ2uOgE7OSJjXjeIG9xUU"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L72RY0CHXB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L72RY0CHXB');
        `}
      </Script>
      <Root>
        <Component {...pageProps} />
      </Root>
    </App>
  );
}
