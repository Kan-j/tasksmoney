import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "@/app/globals.css";
import AuthProvider from "@/components/custom/AuthProvider";


const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omnicom Group",
  description: "Get Paid for Your Honest Opinions!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
