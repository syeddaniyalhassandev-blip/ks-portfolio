"use client";

import Section from "./Section";

import Image from "next/image";

export default function Skills({ data, id }) {
  const skillsData = data || [];
  return (
    <Section id={id || "skills"} title="Technical Skills">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {skillsData.map(skill => (
          <div key={skill.name} className="glass-card flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-primary/5 transition-all duration-300 border-black/[0.03] hover:-translate-y-1 group">
             <div className="w-12 h-12 relative mb-4 transition-transform group-hover:scale-110">
                <Image 
                  src={skill.icon} 
                  alt={skill.name} 
                  fill 
                  className="object-contain filter transition-all"
                  unoptimized // Simple icons / external SVGs often work better unoptimized by Next.js
                />
             </div>
             <p className="font-black uppercase tracking-tighter text-[9px] md:text-[10px] text-center text-foreground/70 group-hover:text-primary transition-colors">
               {skill.name}
             </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
