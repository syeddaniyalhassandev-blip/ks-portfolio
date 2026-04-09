"use client";

import { useRef } from "react";
import Section from "./Section";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Experience({ data, id }) {
  const experienceData = data || [];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id={id || "experience"} title="Work Experience">
      <div className="max-w-4xl mx-auto pb-20">
        <div ref={containerRef} className="relative">
          
          {/* Continuous Timeline Rail */}
          <div className="absolute left-[9px] top-2 bottom-0 w-0.5 bg-foreground/10" />
          
          {/* Scroll Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[9px] top-2 bottom-0 w-0.5 bg-primary shadow-[0_0_15px_rgba(52,152,219,0.8)] z-0"
          />

          {experienceData.map((exp, i) => (
            <div key={i} className="flex gap-4 md:gap-10 group relative mb-12 last:mb-0">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center shrink-0 relative z-10">
                 <div className="w-5 h-5 rounded-full bg-black border-4 border-foreground/20 group-hover:border-primary transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(52,152,219,0.6)]" />
              </div>

              {/* Content Card */}
              <div className="grow">
                 <div className="glass-card p-6 md:p-8 rounded-4xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-black/3 relative group-hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4 text-left">
                      <div className="flex items-center gap-4">
                        {exp.logo && (
                          <div className="w-16 h-16 md:w-20 md:h-20 relative shrink-0 bg-white rounded-2xl p-2 shadow-inner border border-black/5">
                            <Image src={exp.logo} alt={exp.company} fill className="object-contain" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm md:text-base font-black tracking-tight text-foreground uppercase">{exp.role}</h3>
                          <p className="text-primary font-bold text-sm md:text-base">{exp.company}</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-foreground/60 font-medium leading-relaxed mb-4">
                      {exp.desc}
                    </p>
                    {exp.letter && (
                      <a
                        href={exp.letter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary transition-colors pb-0.5"
                      >
                        View Internship Letter ↗
                      </a>
                    )}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
