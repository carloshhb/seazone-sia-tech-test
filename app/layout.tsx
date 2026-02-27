import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Sans_Mono({
  weight: "500",
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIA - Inteligência de Expansão",
  description:
    "Portal para corretores parceiros enviarem oportunidades de terrenos para analise da SIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
