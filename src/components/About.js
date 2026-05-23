'use client';

import { motion } from 'framer-motion';

export default function About({ data, id }) {
  const paragraphs = data?.paragraphs || [];
  
  return (
    <section id={id || "about"} className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left column - Title area */}
          <motion.div 
            className="lg:col-span-4 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40 mb-4 block">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground leading-tight">
              Crafting the
              <span className="block font-medium italic text-foreground/80">future</span>
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-foreground/20" />
              <span className="text-xs font-medium tracking-wider text-foreground/40">01</span>
            </div>
          </motion.div>
          
          {/* Right column - Content */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="space-y-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <motion.p 
                    key={i} 
                    className={`text-base sm:text-lg leading-relaxed ${
                      i === 0 
                        ? 'text-foreground/90 font-normal' 
                        : 'text-foreground/60 font-light'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))
              ) : (
                <>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
                    I am a mechatronics engineer passionate about bridging the gap between 
                    mechanical systems and intelligent software. My work lies at the intersection 
                    of precision engineering and innovative technology.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/60 font-light">
                    With a foundation in robotics, automation, and embedded systems, I create 
                    solutions that are not only functional but elegantly designed. Every project 
                    is an opportunity to push boundaries and explore new possibilities.
                  </p>
                </>
              )}
            </div>
            
            {/* Elegant stats or highlights */}
            <motion.div 
              className="mt-16 pt-12 border-t border-foreground/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div className="group">
                  <span className="block text-2xl sm:text-3xl font-light text-foreground/80 mb-1 group-hover:text-primary transition-colors duration-300">
                    5+
                  </span>
                  <span className="text-xs tracking-wider uppercase text-foreground/40">
                    Years Experience
                  </span>
                </div>
                <div className="group">
                  <span className="block text-2xl sm:text-3xl font-light text-foreground/80 mb-1 group-hover:text-primary transition-colors duration-300">
                    20+
                  </span>
                  <span className="text-xs tracking-wider uppercase text-foreground/40">
                    Projects Delivered
                  </span>
                </div>
                <div className="group col-span-2 sm:col-span-1">
                  <span className="block text-2xl sm:text-3xl font-light text-foreground/80 mb-1 group-hover:text-primary transition-colors duration-300">
                    100%
                  </span>
                  <span className="text-xs tracking-wider uppercase text-foreground/40">
                    Dedication
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute right-0 bottom-0 w-32 h-32 opacity-[0.02]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
