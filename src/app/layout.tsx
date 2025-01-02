import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: {
    default: "منظم أحذية دوار من - 7 طوابق",
    template: "%s | LuxeEnbois",
  },
  description:
    "نظم ما يصل إلى 35 زوجًا من الأحذية بفضل منظم الأحذية الدوار الأنيق من LuxeEnBois. حل تخزين عملي وأنيق. تسوق الآن!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="AR" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
