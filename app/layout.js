import Script from "next/script";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Nomad Audio — Passive listening gear",
  description:
    "Headphones, speakers and turntables built to be used, not updated.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/*
          Runs before React hydrates and before any other script on the
          page, so window.adobeDataLayer is guaranteed to exist the
          moment the browser starts parsing the page — including for
          the Adobe Launch / AEP Web SDK embed script below, which
          expects the array to already be there when it loads.
          This is the same pattern Adobe's own embed snippet uses.
        */}
        <Script
          id="adobe-data-layer-init"
          strategy="beforeInteractive"
        >
          {`window.adobeDataLayer = window.adobeDataLayer || [];`}
        </Script>

        {/*
          Adobe Experience Platform Launch / Web SDK embed script.
          Replace the src below with your real Launch property embed
          URL (Data Collection UI → your property → Environments →
          copy the "install code" script src). Until then this is a
          no-op placeholder — nothing is sent to Adobe.
        */}
        {/* <Script
          src="https://assets.adobedtm.com/xxxxxxxxxxxx/launch-xxxxxxxxxxxx.min.js"
          strategy="afterInteractive"
        /> */}
      </head>
      <body className="font-body bg-ink text-paper antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
