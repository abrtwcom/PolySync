import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Poly-Sync — Smart Campus Dashboard",
  description: "Digital Notice Board & Campus Activity Points system for polytechnic colleges. Stay connected, stay updated.",
  keywords: ["campus", "notices", "events", "activity points", "polytechnic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AppProvider>
      </body>
    </html>
  );
}
