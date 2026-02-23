"use client";

import { useRef } from "react";
import Section from "./Section";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const experienceData = [
  {
    company: "Atlas Honda Limited",
    role: "Internship",
    period: "Jul – Aug 2023",
    desc: "Completed 4-week internship in the Production department. Gained hands-on experience in industrial processes, quality control, and motorcycle assembly operations.",
    logo: "/atlas-honda.png",
    letter: "/internships/atlas-honda.jpg"
  },
  {
    company: "ABC Hygiene Industries Pvt. Ltd.",
    role: "Internship",
    period: "Aug – Sep 2023",
    desc: "Completed 4-week internship in the Production department. Actively participated in automation, production line maintenance, and demonstrated strong work ethic.",
    logo: "/abc.png",
    letter: "/internships/abc-hygiene.jpg"
  },
  {
    company: "Atlas Battery Limited",
    role: "Internship",
    period: "Aug 2024",
    desc: "Completed internship in the Plant Division from Aug 01 to Aug 28, 2024. Gained advanced exposure to assembly line optimization, battery manufacturing, and automation.",
    logo: "/atlas-battery.png",
    letter: "/internships/atlas-battery.jpg"
  },
  {
    company: "Pakistan Aeronautical Complex (PAC) Kamra",
    role: "Internship",
    period: "Sep 2024",
    desc: "Completed 3-week internship training at Aircraft Manufacturing Factory PAC Kamra. Assisted in aerospace component design and quality assurance testing.",
    logo: "/pacc.png",
    letter: "/internships/pac-kamra.jpg"
  },
  {
    company: "Karachi Shipyard & Engineering Works",
    role: "Internship",
    period: "Jan – Feb 2025",
    desc: "Completed 1-month internship across SLTS, Yard Engineering, and SB-Hall departments. Participated in mechanical and electrical overhauling of marine vessels.",
    logo: "/ksew.png",
    letter: "/internships/ksew.jpg"
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" title="Work Experience">
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
