import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Qasim | Full Stack & AI Developer",
  description:
    "Premium portfolio of Muhammad Qasim, Full Stack and AI Developer. Available for internships and freelance projects.",
  keywords: [
    "Muhammad Qasim",
    "Full Stack Developer",
    "AI Developer",
    "Portfolio",
    "Next.js",
    "Freelance Developer",
  ],
  openGraph: {
    title: "Muhammad Qasim | Full Stack & AI Developer",
    description:
      "Modern, fast portfolio showcasing projects, services, and experience in full stack and AI development.",
    type: "website",
  },
  metadataBase: new URL("https://muhammadqasim.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
