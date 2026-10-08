import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { DEFAULT_OG_IMAGE_PATH, pageOpenGraph, SITE_NAME, SITE_URL, twitterSummaryLarge } from "@/lib/seo";

const defaultTitle = "Umrah & Hajj Packages | Zikhra Tours & Travels";
const defaultDescription =
  "Explore Umrah packages, Hajj guidance and family travel with Zikhra Tours and Travels in RT Nagar, Bangalore. Compare flights, prices and departure batches.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...pageOpenGraph({
      title: defaultTitle,
      description: defaultDescription,
      path: "/",
      imageUrl: DEFAULT_OG_IMAGE_PATH,
      imageAlt: "Zikhra - Umrah travel planner in Bangalore",
    }),
    siteName: SITE_NAME,
  },
  twitter: twitterSummaryLarge(defaultTitle, defaultDescription, DEFAULT_OG_IMAGE_PATH),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
