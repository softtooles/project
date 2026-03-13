import type { AppProps } from "next/app";
import Head from "next/head";
import App from "@/app/App";
import { Root } from "@/app/components/Root";
import "@/styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Head>
        <link rel="icon" href="/logo.png?v=2" />
        <meta name="theme-color" content="#12b5d0" />
      </Head>
      <Root>
        <Component {...pageProps} />
      </Root>
    </App>
  );
}
