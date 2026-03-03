"use client";

import Section from "./Section";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Trophy, Medal, Star, Award } from "lucide-react";

const achievements = [
  {
    title: "AIRICE '25 – Runner Up (CAD Craze)",
    org: "Air University",
    badge: "Runner-Up",
    badgeType: "silver",
    points: [
      "Secured Runner-Up position in CAD Craze at AIRICE '25.",
      "Demonstrated advanced CAD modeling skills and structured design methodology under competitive constraints.",
    ],
    image: "/achienements/AIRICE CAD CRAZE RUNNER UP.png",
    icon: <Medal size={18} />,
  },
  {
    title: "AIRICE '25 – Winner (Robo Soccer)",
    org: "Air University",
    badge: "1st Place",
    badgeType: "gold",
    points: [
      "Won 1st place in Robo Soccer at AIRICE '25.",
      "Developed a precision-controlled robotic system focused on strategy, responsiveness, and system optimization.",
    ],
    image: "/achienements/AIRICE ROBO SOCCER WINNER.png",
    icon: <Trophy size={18} />,
  },
  {
    title: "PROBATTLE 25 – Winner (Line Following Robot)",
    org: "PROBATTLE",
    badge: "1st Place",
    badgeType: "gold",
    points: [
      "Achieved 1st position in Line Following Robot competition.",
      "Engineered a high-speed autonomous robot with optimized sensor calibration and control algorithms.",
    ],
    image: "/achienements/PROBATTLE LFR WINNER.png",
    icon: <Trophy size={18} />,
  },
  {
    title: "DUETECH '25 – Runner Up (Robo Race)",
    org: "DUETECH",
    badge: "Runner-Up",
    badgeType: "silver",
    points: [
      "Secured Runner-Up position in Robo Race.",
      "Designed a mechanically optimized racing robot emphasizing speed, stability, and control efficiency.",
    ],
    image: "/achienements/DUETECH ROBO RACE RUNNER UP.png",
    icon: <Medal size={18} />,
  },
  {
    title: "TEKNOFEST Pakistan – Excellence Award",
    org: "TEKNOFEST Pakistan",
    badge: "Excellence Award",
    badgeType: "special",
    points: [
      "Awarded Excellence Award at TEKNOFEST Pakistan.",
      "Recognized for innovation, technical execution, and performance at a national-level technology platform.",
    ],
    image: "/achienements/TEKNOFEST RUNNER UP CAD CRAZE.png",
    icon: <Award size={18} />,
  },
  {
    title: "SPEC '24 – Winner (Project Exhibition, KIET)",
    org: "KIET",
    badge: "1st Place",
    badgeType: "gold",
    points: [
      "Won 1st position at SPEC'24 Semester Project Competition.",
      "Presented an engineering solution evaluated for innovation, technical depth, and practical implementation.",
    ],
    image: "/achienements/KIET SPEC WINNER.png",
    icon: <Trophy size={18} />,
  },
  {
    title: "APEC '25 x MechTech '25 – Winner (Robo Soccer)",
    org: "APEC x MechTech",
    badge: "1st Place",
    badgeType: "gold",
    points: [
      "Secured 1st place in Robo Soccer competition.",
      "Focused on robotic control systems, strategy design, and hardware integration.",
    ],
    image: "/achienements/APEC ROBO SOCCER WINNER.png",
    icon: <Trophy size={18} />,
  },
  {
    title: "APEC '25 x MechTech '25 – Winner (RC Car)",
    org: "APEC x MechTech",
    badge: "1st Place",
    badgeType: "gold",
    points: [
      "Won 1st position in RC Car competition.",
      "Optimized mechanical structure and suspension system for speed and maneuverability.",
    ],
    image: "/achienements/APEC ROBO RACE WINNER.png",
    icon: <Trophy size={18} />,
  },
  {
    title: "Adamjee Coaching Centre – SSC Part-II (83%)",
    org: "Adamjee Coaching Centre",
    badge: "83%",
    badgeType: "academic",
    points: [
      "Achieved 83% in SSC Part-II.",
      "Demonstrated academic consistency and strong foundational performance.",
    ],
    image: "/achienements/SSC 2.png",
    icon: <Star size={18} />,
  },
  {
    title: "Adamjee Coaching Centre – HSC Part-I (90%)",
    org: "Adamjee Coaching Centre",
    badge: "90%",
    badgeType: "academic",
    points: [
      "Secured 90% in HSC Part-I.",
      "Maintained high academic standards alongside technical achievements.",
    ],
    image: "/achienements/HSC 1.png",
    icon: <Star size={18} />,
  },
  {
    title: "U & V School System – Annual Academic Achievements",
    org: "U & V School System",
    badge: "Top Position",
    badgeType: "academic",
    points: [
      "Recognized for securing top positions in multiple academic sessions.",
      "Maintained consistent academic excellence throughout early education.",
    ],
    image: "/achienements/13-14.png",
    extraImages: [
      "/achienements/14-15.png",
      "/achienements/15-16.png",
      "/achienements/16-17.png",
    ],
    icon: <Star size={18} />,
  },
];

const badgeStyles = {
  gold: "bg-yellow-400 text-yellow-900 font-black shadow-lg shadow-yellow-400/40",
  silver: "bg-slate-200 text-slate-800 font-black shadow-lg shadow-slate-400/40",
  special: "bg-purple-500 text-white font-black shadow-lg shadow-purple-500/40",
  academic: "bg-blue-500 text-white font-black shadow-lg shadow-blue-500/40",
};

const iconColors = {
  gold: "text-yellow-400",
  silver: "text-slate-300",
  special: "text-purple-400",
  academic: "text-blue-400",
};

export default function Achievements() {
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const openModal = (ach) => {
    setSelected(ach);
    setImgIndex(0);
  };

  const closeModal = () => {
    setSelected(null);
    setImgIndex(0);
  };

  const allImages = selected
    ? [selected.image, ...(selected.extraImages || [])]
    : [];

  return (
    <Section id="achievements" title="Achievements">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => openModal(ach)}
            className="glass-card rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            {/* Certificate thumbnail */}
            <div className="relative w-full h-64 bg-black/20 overflow-hidden">
              <Image
                src={ach.image}
                alt={ach.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                unoptimized
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              {/* Badge */}
              <span
                className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${badgeStyles[ach.badgeType]}`}
              >
                {ach.badge}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 ${iconColors[ach.badgeType]}`}>
                  {ach.icon}
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest mt-0.5">
                    {ach.org}
                  </p>
                </div>
              </div>
              <div className="h-px bg-foreground/5 w-full" />
              <ul className="space-y-1.5">
                {ach.points.map((pt, j) => (
                  <li
                    key={j}
                    className="text-[11px] text-foreground/55 font-medium leading-relaxed flex gap-2"
                  >
                    <span className="text-primary mt-0.5 shrink-0">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
              {ach.extraImages && (
                <p className="text-[9px] text-primary/60 font-bold uppercase tracking-widest">
                  +{ach.extraImages.length} more certificates →
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal image */}
              <div className="relative w-full h-72 sm:h-96 bg-black/30 shrink-0">
                <Image
                  src={allImages[imgIndex]}
                  alt={selected.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Thumbnail strip for U&V School */}
              {allImages.length > 1 && (
                <div className="flex gap-2 px-5 pt-4 overflow-x-auto scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImgIndex(idx)}
                      className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === imgIndex
                          ? "border-primary"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal content */}
              <div className="p-6 overflow-y-auto">
                <div className="flex items-start gap-3 mb-3">
                  <span className={`mt-0.5 shrink-0 ${iconColors[selected.badgeType]}`}>
                    {selected.icon}
                  </span>
                  <div>
                    <h2 className="text-base font-black uppercase tracking-tight text-foreground leading-snug">
                      {selected.title}
                    </h2>
                    <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest mt-0.5">
                      {selected.org}
                    </p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${badgeStyles[selected.badgeType]}`}
                  >
                    {selected.badge}
                  </span>
                </div>
                <div className="h-px bg-foreground/5 w-full mb-3" />
                <ul className="space-y-2">
                  {selected.points.map((pt, j) => (
                    <li
                      key={j}
                      className="text-sm text-foreground/60 font-medium leading-relaxed flex gap-2"
                    >
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
