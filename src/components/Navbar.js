"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar({ navLinks = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-60 transition-all duration-300 ${
        scrolled ? "glass py-2 shadow-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Name */}
          <a
            href="#home"
            className={`text-2xl font-black uppercase tracking-widest transition-colors hover:text-primary ${scrolled ? 'text-foreground' : 'text-white drop-shadow-lg'}`}
          >
            KS
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-7 items-center">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary ${ scrolled ? 'text-foreground/70' : 'text-white/90 drop-shadow'}`}
              >
                {link.name}
              </a>
            ))}
            
            {navLinks.length > 3 && (
              <div className="relative group">
                <button className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary focus:outline-none ${ scrolled ? 'text-foreground/70' : 'text-white/90 drop-shadow'}`}>
                  Explore <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute right-0 top-full mt-6 w-48 py-2 rounded-xl bg-background border border-foreground/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-left">
                  {navLinks.slice(3).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground/70 hover:text-primary hover:bg-foreground/5 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-white drop-shadow-lg'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-full left-0 right-0 py-6"
        >
          <div className="flex flex-col items-center space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
