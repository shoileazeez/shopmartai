import { ReactNode } from "react";
import { GlobalLayout } from "@/src/components/layout/auth";
import { AuthProvider } from "@/src/components/layout/AuthContext"; 
import "./globals.css";

export const metadata = {
  title: "ShopSmart AI",
  description: "Your AI-powered shopping platform",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "ShopSmart AI",
    description: "Your AI-powered shopping platform",
    siteName: "ShopSmart AI",
    images: [{ url: "/social-share-image.png", width: 1200, height: 630 }],
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
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
