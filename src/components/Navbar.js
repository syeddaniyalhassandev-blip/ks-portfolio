"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar({ navLinks = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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
          {/* Logo */}
          <a
            href="#home"
            className={`text-3xl font-black uppercase tracking-widest transition-colors hover:text-primary ${scrolled ? 'text-foreground' : 'text-white drop-shadow-lg'}`}
          >
            KS
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-7 items-center">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary ${scrolled ? 'text-foreground/70' : 'text-white/90 drop-shadow'}`}
              >
                {link.name}
              </a>
            ))}

            {navLinks.length > 3 && (
              <div className="relative" ref={exploreRef}>
                <button
                  onClick={() => setExploreOpen(prev => !prev)}
                  className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary focus:outline-none ${scrolled ? 'text-foreground/70' : 'text-white/90 drop-shadow'}`}
                >
                  Explore
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${exploreOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-48 py-2 rounded-xl bg-white border border-gray-200 shadow-xl text-left z-50"
                  >
                    {navLinks.slice(3).map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setExploreOpen(false)}
                        className="block px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
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
          className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute top-full left-0 right-0 py-6"
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
