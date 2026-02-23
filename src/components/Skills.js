"use client";

import Section from "./Section";

import Image from "next/image";

const skillsData = [
  { name: 'SolidWorks', icon: '/icons/solidworks.png' },
  { name: 'C++', icon: '/icons/cplusplus.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Arduino', icon: '/icons/arduino.svg' },
  { name: 'Raspberry Pi', icon: '/icons/raspberrypi.svg' },
  { name: 'ESP32', icon: '/icons/espressif.svg' },
  { name: 'TIA Portal', icon: '/icons/siemens.svg' },
  { name: 'Easy EDA', icon: '/icons/easyeda.svg' },
  { name: 'Proteus', icon: '/icons/proteus.png' },
  { name: 'Multisim', icon: '/icons/multisim.svg' },
  { name: 'Thinker CAD', icon: '/icons/tinkercad.svg' },
  { name: 'WPL Soft', icon: '/icons/delta.svg' },
  { name: 'MATLAB', icon: '/icons/matlab.png' },
  { name: 'MS Office', icon: '/icons/microsoftoffice.svg' }
];

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
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
