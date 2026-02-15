import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tulaib Ahmed Siddiqui | Senior Software Engineer",
  description: "High-end AI-based personal portfolio of Tulaib Ahmed Siddiqui, specializing in React.js, Next.js, and Creative Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased cursor-none`}>
        <LoadingScreen />
        <CustomCursor />
        <Background3D />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
