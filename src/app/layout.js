import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Steven Feng Portfolio | Hi, I'm Steven",
  description: "Personal portfolio showcasing robotics research and engineering.",
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
