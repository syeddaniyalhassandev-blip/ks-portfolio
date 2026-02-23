"use client";

import Section from "./Section";

const educationData = [
  { 
    degree: "Bachelor of Engineering", 
    school: "Mechatronics Engineering, KIET", 
    year: "Graduated", 
    badge: "KIET",
    image: "/kiet.jpg",
    bgSize: "cover"
  },
  { 
    degree: "Intermediate", 
    school: "Govt. Dehli College Karachi", 
    year: "Pre-engineering", 
    badge: "DEHLI",
    image: "/dehli.jpg",
    bgSize: "cover"
  },
  { 
    degree: "Matriculation", 
    school: "U & V School System", 
    year: "Science", 
    badge: "SCHOOL",
    image: "/uv.jpg",
    bgSize: "70%"
  }
];

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid md:grid-cols-3 gap-8">
        {educationData.map((edu, i) => (
          <div 
            key={i} 
            className="glass-card relative overflow-hidden p-6 sm:p-8 rounded-3xl text-center flex flex-col items-center group min-h-[320px]"
            style={edu.image ? { 
              backgroundImage: `url(${edu.image})`, 
              backgroundSize: edu.bgSize || 'cover', 
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}}
          >
            {/* Dark Overlay for images */}
            {edu.image && <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors z-0" />}
            
            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <div className={`px-4 py-2 ${edu.image ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'} rounded-xl mb-6 inline-flex items-center justify-center font-black text-[10px] uppercase tracking-widest`}>
                {edu.badge}
              </div>
              <h3 className={`text-sm sm:text-base font-black mb-1 leading-tight ${edu.image ? 'text-white' : ''}`}>{edu.degree}</h3>
              <p className={`text-sm sm:text-base font-bold mb-2 ${edu.image ? 'text-white/80' : 'text-foreground/40'}`}>{edu.school}</p>
              <p className={`font-bold mt-auto text-xs sm:text-sm ${edu.image ? 'text-white' : 'text-primary'}`}>{edu.year}</p>
              <button className={`mt-6 text-[10px] font-black uppercase tracking-widest border-b transition-all ${edu.image ? 'text-white border-white/20 hover:border-white' : 'text-primary border-primary/20 hover:border-primary'}`}>
                EXPLORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
