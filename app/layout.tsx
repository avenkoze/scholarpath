import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Scholarship — Find Your Perfect Scholarship",
  description:
    "Explore 50+ international scholarships from Fulbright to DAAD to Chevening. AI-powered matching and personalized motivation letters.",
  keywords: "scholarship database, international scholarships, study abroad, Fulbright, DAAD, Chevening, Erasmus",
  openGraph: {
    title: "Easy Scholarship — Find Your Perfect Scholarship",
    description: "50+ international scholarships. AI finds your best matches.",
    type: "website",
    siteName: "Easy Scholarship",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Scholarship",
    description: "50+ scholarships, AI matching, personalized motivation letters.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
