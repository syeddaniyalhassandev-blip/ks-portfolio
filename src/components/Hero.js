'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero({ data, id }) {
  const titles = data?.titles || ["Mechatronics Engineer"];
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Set mounted on client to avoid hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect - Robust implementation
  useEffect(() => {
    if (!mounted) return;

    let timeoutId;
    const currentTitle = titles[index] || "";

    if (subIndex === currentTitle.length + 1 && !reverse) {
      // Pause at the end of the title
      timeoutId = setTimeout(() => {
        setReverse(true);
      }, 2000);
    } else if (subIndex === 0 && reverse) {
      // Finished deleting, move to next title
      timeoutId = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }, 500); // Small pause before typing next
    } else {
      // Character typing/deleting
      timeoutId = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }, reverse ? 30 : 75);
    }

    return () => clearTimeout(timeoutId);
  }, [subIndex, index, reverse, mounted]);

  if (!mounted) {
    return <section id={id || "home"} className="h-screen bg-white" />;
  }

  const currentTitle = titles[index] || "";

  return (
    <section id={id || "home"} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950">

      {/* Premium Tech Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('/hero-bg-new.png')" }}
      />
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white leading-[1.1] sm:leading-none"
        >
          <span className="font-extrabold opacity-80">Hi, I am</span> <span className="text-white">{data?.name || 'Engr. Khubaib Salman'}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-8 h-8 md:h-12 leading-tight tracking-tight"
        >
          <span className="font-semibold opacity-70">I am a</span> <span className="text-red-400">{currentTitle.substring(0, subIndex)}</span>
          <span className="inline-block w-1 h-5 md:h-8 ml-1 bg-white animate-pulse align-middle" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={data?.cvPath || "/Khubaib_Salman_CV.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs sm:text-sm px-8 sm:px-10 py-3 rounded-xl shadow-lg hover:shadow-primary/30 inline-flex items-center justify-center uppercase tracking-[0.15em] font-extrabold transition-all hover:scale-105 active:scale-95"
            >
              VIEW RESUME
            </a>
            <a
              href={data?.cvPath || "/Khubaib_Salman_CV.pdf"}
              download="Khubaib_Salman_CV.pdf"
              className="text-xs sm:text-sm px-8 sm:px-10 py-3 rounded-xl border-2 border-white/30 hover:border-primary text-white/80 hover:text-primary inline-flex items-center justify-center uppercase tracking-[0.15em] font-extrabold transition-all hover:scale-105 active:scale-95">
              DOWNLOAD ↓
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-80">
        <div className="w-6 h-10 border-[2.5px] border-primary rounded-full flex justify-center pt-2 shadow-[0_0_15px_rgba(52,152,219,0.3)]">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
