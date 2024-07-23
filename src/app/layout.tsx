import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { DateProvider } from "@/context/DateContext";

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Portfólio Taynan Z.Hott",
  description: "Portfólio Taynan Z.Hott",
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
        </head>
        <body className="bg-gray-100">
          <DateProvider>
            {children}
          </ DateProvider>
        </body>
      </html>
    </>
  )
}