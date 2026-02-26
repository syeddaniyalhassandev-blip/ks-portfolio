import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Khubaib Salman | Mechatronics Engineer",
  description: "Portfolio of Engr. Khubaib Salman — Mechatronics Engineer specializing in robotics, automation, and embedded systems.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased selection:bg-primary/20`} suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
