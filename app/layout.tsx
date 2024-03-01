import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volunteers",
  description: "Find your next volunteer opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="volunteer" />
        <meta
          name="description"
          content="Find your next volunteer opportunity"
        />
        <title>Volunteer APP</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
