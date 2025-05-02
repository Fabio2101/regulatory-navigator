import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // ✅ AGGIUNTA PER USARE LINK

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Regulatory Navigator",
  description: "Classificazione MDR e normative per dispositivi medici",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gradient-to-b from-white to-blue-50 text-gray-900">
        <nav className="w-full bg-white shadow-md border-b border-blue-100">
  <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
    <h1 className="text-xl font-bold text-blue-900 tracking-tight">🩺 Regulatory Navigator</h1>
    <div className="flex gap-6 text-sm text-blue-700 font-medium">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/libreria" className="hover:underline">Libreria normativa</Link>
      <Link href="/valutazioni" className="hover:underline">Valutazioni salvate</Link>
      <Link href="/marcaturaCE" className="hover:underline">Processo marcatura CE</Link>
    </div>
  </div>
</nav>
        <main className="p-6 max-w-6xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
