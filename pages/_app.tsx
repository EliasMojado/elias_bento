import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const neueRegrade = localFont({
  src: "./fonts/Neue-Regrade-ExtraBold-Italic-BF65af35d8315f8.otf",
  variable: "--font-neue-regrade",
  weight: "100 900",
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}