"use client";

import Section from "./Section";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Trophy, Medal, Star, Award } from "lucide-react";

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

export default function Achievements({ data, id }) {
  const achievements = data || [];
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
    <Section id={id || "achievements"} title="Achievements">
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
                  {ach.badgeType === 'gold' && <Trophy size={18} />}
                  {ach.badgeType === 'silver' && <Medal size={18} />}
                  {ach.badgeType === 'special' && <Award size={18} />}
                  {ach.badgeType === 'academic' && <Star size={18} />}
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
                    {selected.badgeType === 'gold' && <Trophy size={18} />}
                    {selected.badgeType === 'silver' && <Medal size={18} />}
                    {selected.badgeType === 'special' && <Award size={18} />}
                    {selected.badgeType === 'academic' && <Star size={18} />}
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
