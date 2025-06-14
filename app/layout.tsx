import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "700"],
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Mappy",
  description: "Create Geo Spatial data on map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexSansThai.className}>
      <body>{children}</body>
    </html>
  );
}
