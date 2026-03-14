import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopProvider } from "@/context/ShopContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Antia — Buy & Rent Air Purifiers in India",
    template: "%s | Antia",
  },
  description: "Breathe pure air with India's #1 Air Purifier Rental & Sales service. Top brands like Philips, Dyson, Coway available in Delhi, Mumbai, Bangalore.",
  keywords: ["Air Purifier Rent", "Buy Air Purifier", "Air Purifier India", "Pollution Control", "HEPA Filter", "Rent Dyson", "Rent Philips"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Antia",
    title: "Antia — Buy & Rent Air Purifiers in India",
    description: "Affordable air purifier rentals and sales. Free delivery and maintenance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antia — Buy & Rent Air Purifiers",
    description: "Don't let pollution harm your family. Rent or buy top-rated air purifiers today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = db.settings.get();
  const headCode = settings?.globalHeadCode || "";
  const bodyCode = settings?.globalBodyCode || "";

  return (
    <html lang="en">
      <body className={inter.className}>
        {headCode && <div dangerouslySetInnerHTML={{ __html: headCode }} />}
        {bodyCode && <div dangerouslySetInnerHTML={{ __html: bodyCode }} />}
        <ShopProvider>
          <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <WhatsAppWidget />
            <Footer />
          </CartProvider>
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
