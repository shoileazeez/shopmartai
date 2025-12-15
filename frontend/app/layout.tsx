import { ReactNode } from "react";
import { GlobalLayout } from "@/src/components/layout/auth";
import "../styles/globals.css";

export const metadata = {
  title: "ShopSmart AI",
  description: "Your AI-powered shopping platform",
  openGraph: {
    title: "ShopSmart AI",
    description: "Your AI-powered shopping platform",
    url: "https://example.com",
    siteName: "ShopSmart AI",
    images: [
      {
        url: "/social-share-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopSmart AI",
    description: "Your AI-powered shopping platform",
    images: ["/social-share-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
