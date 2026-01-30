import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Topbar } from "@/components/ui/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mateus Tube",
  description: "Plataforma de streaming de vídeos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Topbar />
        <div className="pt-14">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
