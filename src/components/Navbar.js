"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Publications", href: "#publications" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? "glass py-2 shadow-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Brand & Resume */}
          <div className="flex items-center space-x-10">
            <div className="hidden xs:block">
              <a href="#" className="text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors">Resume</a>
            </div>
          </div>

          {/* Right Side: Home, Work, Contact */}
          <div className="hidden xs:flex space-x-10 items-center">
            <a href="#home" className="text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors">Home</a>
            <a href="#projects" className="text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors">Work</a>
            <a href="#contact" className="text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors font-black">Contact</a>
          </div>

          {/* Mobile Toggle */}
          <div className="xs:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xs:hidden glass absolute top-full left-0 right-0 py-6"
        >
          <div className="flex flex-col items-center space-y-6">
            <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase tracking-widest text-foreground hover:text-primary">Home</a>
            <a href="#projects" onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase tracking-widest text-foreground hover:text-primary">Work</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase tracking-widest text-foreground hover:text-primary">Contact</a>
            <a href="#" className="text-lg font-bold uppercase tracking-widest text-primary pt-4 border-t w-1/2 text-center border-black/5">Resume</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
