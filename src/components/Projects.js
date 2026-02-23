"use client";

import Section from "./Section";

const projectsData = [
  { name: "Remote Controlled Car", id: "rc-car" },
  { name: "Light Weight RoboWar", id: "robowar" },
  { name: "Soccer Robot", id: "soccer-robot" },
  { name: "Home Automation", id: "home-automation" },
  { name: "Fire and Safety", id: "fire-safety" },
  { name: "Line Following Robot", id: "lfr" },
  { name: "Pipe Inspection Robot", id: "pipe-bot" },
  { name: "GPS Tracking", id: "gps-tracking" },
  { name: "Bike Accident Indication", id: "bike-accident" }
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((proj, i) => (
          <div key={i} className="glass-card overflow-hidden group rounded-3xl flex flex-col h-full ring-1 ring-black/5">
            <div className="aspect-video bg-foreground/5 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center font-black text-foreground/10 text-xl text-center p-4">
                 {proj.name.toUpperCase()}
               </div>
            </div>
            <div className="p-6 flex-grow flex flex-col items-center text-center">
              <h3 className="text-sm sm:text-base font-black uppercase tracking-tighter mb-4">{proj.name}</h3>
              <button className="btn-primary w-full py-3 text-xs font-black uppercase tracking-widest rounded-xl mt-auto">
                 VIEW PROJECT
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
