import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hein Htoo Naing | Computer Science Portfolio",
  description:
    "Portfolio of Hein Htoo Naing — Computer Science graduate (B.Sc.) from Assumption University of Thailand. Builder of ISSA Assess, a workplace language assessment platform for English and Thai, plus full-stack web and machine learning projects.",
  keywords: [
    "Hein Htoo Naing",
    "Computer Science",
    "Software Engineering",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "Machine Learning",
  ],
  authors: [{ name: "Hein Htoo Naing" }],
  icons: {
    icon: "https://avatars.githubusercontent.com/u/171913285?v=4",
  },
  openGraph: {
    title: "Hein Htoo Naing | Computer Science Portfolio",
    description:
      "CS graduate building full-stack web apps and machine learning projects. Explore my projects and skills.",
    siteName: "Hein Htoo Naing Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hein Htoo Naing | Computer Science Portfolio",
    description: "CS graduate building full-stack web apps and machine learning projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
