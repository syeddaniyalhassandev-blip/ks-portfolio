"use client";

import { useState, useEffect, useRef } from "react";
import Section from "./Section";
import Image from "next/image";

const certificationsData = [
  { 
    title: "Generative AI Application Developer", 
    provider: "Pakistan Engineering Council",
    badge: "Top Performer ⭐",
    image: "/certificates/cert-generative-ai.jpg"
  },
  { 
    title: "Professional Industrial Automation",
    provider: "AutoCon — Siemens S71200",
    badge: "PLC & SCADA",
    image: "/certificates/cert-plc-automation.jpg"
  },
  { 
    title: "Crash Course on Python", 
    provider: "Google / Coursera",
    badge: "Aug 2023",
    image: "/certificates/cert-python.jpg"
  },
  { 
    title: "What is Data Science?", 
    provider: "IBM / Coursera",
    badge: "Aug 2023",
    image: "/certificates/cert-data-science.jpg"
  },
  { 
    title: "Machine Learning for All", 
    provider: "University of London / Coursera",
    badge: "Oct 2023",
    image: "/certificates/cert-machine-learning.jpg"
  },
  { 
    title: "PCB Design", 
    provider: "KIET — IMR Lab",
    badge: "Jan 2024",
    image: "/certificates/cert-pcb-design.jpg"
  },
  { 
    title: "Developing CubeSats",
    provider: "NCGSA / PAF-KIET",
    badge: "Mar 2023",
    image: "/certificates/cert-cubesat.jpg"
  },
  { 
    title: "Microcontroller vs Microprocessor",
    provider: "Embedded Edge Academy",
    badge: "Mar 2025",
    image: "/certificates/cert-microcontroller.jpg"
  }
];

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Non-passive wheel listener for zoom (must be imperative, not onWheel prop)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setZoom((prev) => {
        const next = prev - e.deltaY * 0.001;
        return Math.min(Math.max(next, 1), 4); // clamp 1x(full fit) – 4x
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [selected]);

  const handleClose = () => { setSelected(null); setZoom(1); };

  return (
    <Section id="certifications" title="Certifications">

      {/* Lightbox Modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-999 flex flex-col items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

          {/* Modal panel */}
          <div
            className="relative z-10 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: title + controls */}
            <div className="flex items-center justify-between bg-black/80 px-5 py-3 gap-4">
              <div className="min-w-0">
                <p className="text-white font-black text-xs uppercase tracking-widest truncate">
                  {certificationsData[selected].title}
                </p>
                <p className="text-white/40 text-[10px] mt-0.5 truncate">
                  {certificationsData[selected].provider}
                </p>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
                  title="Zoom Out"
                >−</button>
                <span className="text-white/60 text-[10px] font-mono w-10 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
                  title="Zoom In"
                >+</button>
                <button
                  onClick={() => setZoom(1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-black flex items-center justify-center transition-colors"
                  title="Reset Zoom"
                >1:1</button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/60 text-white font-bold text-base flex items-center justify-center transition-colors ml-1"
                >✕</button>
              </div>
            </div>

            {/* Image area — object-contain at zoom=1, scrollable when zoomed */}
            <div
              ref={scrollRef}
              className="overflow-auto bg-white flex items-center justify-center"
              style={{ height: "76vh" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificationsData[selected].image}
                alt={certificationsData[selected].title}
                style={{
                  maxWidth:  zoom === 1 ? "100%"  : `${zoom * 100}%`,
                  maxHeight: zoom === 1 ? "76vh"  : "none",
                  width:     zoom === 1 ? "auto"  : `${zoom * 100}%`,
                  height:    zoom === 1 ? "auto"  : "auto",
                  display: "block",
                  transition: "max-width 0.15s ease, width 0.15s ease"
                }}
              />
            </div>
          </div>

          {/* Hint */}
          <p className="relative z-10 text-white/30 text-[10px] mt-3 tracking-widest uppercase">
            Scroll to zoom • Click outside to close
          </p>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificationsData.map((cert, i) => (
          <div
            key={i}
            onClick={() => { setSelected(i); setZoom(1); }}
            className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/20 cursor-pointer"
          >
            <div className="relative w-full h-48 bg-black/10">
              <Image 
                src={cert.image} 
                alt={cert.title} 
                fill 
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <span className="text-white font-bold uppercase tracking-widest text-[10px] border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                  View Certificate
                </span>
              </div>
            </div>
            
            <div className="p-6 relative">
              <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50" />
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary line-clamp-1">{cert.provider}</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-foreground/30 bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap ml-2">{cert.badge}</span>
              </div>
              <p className="font-bold text-sm leading-snug text-foreground/90 line-clamp-2 min-h-[2.5em]">
                {cert.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
