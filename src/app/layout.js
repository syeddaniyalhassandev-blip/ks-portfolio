import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import fs from 'fs';
import path from 'path';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Khubaib Salman | Mechatronics Engineer",
  description: "Portfolio of Engr. Khubaib Salman — Mechatronics Engineer specializing in robotics, automation, and embedded systems.",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({ children }) {
  let navLinks = [];
  try {
    const sections = await prisma.portfolioSection.findMany({
      orderBy: { order: 'asc' }
    });
    if (sections && sections.length > 0) {
      navLinks = sections.map(s => ({
        name: s.navTitle,
        href: s.type === 'Hero' ? '#home' : `#${s.id}`
      }));
    }
  } catch(e) {
    console.error("Error fetching nav links from Prisma", e);
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased selection:bg-primary/20`} suppressHydrationWarning>
        <Navbar navLinks={navLinks} />
        {children}
      </body>
    </html>
  );
}
