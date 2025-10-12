import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { AxiomWebVitals } from "next-axiom";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mail Service",
  description: "Sending your emails is now easy!!! Try us Now ",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {children}
        </body>
        <AxiomWebVitals />
      </html>
    </ClerkProvider>
  );
}
