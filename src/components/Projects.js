"use client";

import Section from "./Section";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Projects({ data, id }) {
  const projectsData = data || [];
  return (
    <Section id={id || "projects"} title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-black/20 group-hover:shadow-primary/20 transition-all duration-300 p-2">
                <Image
                  src={proj.icon}
                  alt={proj.name}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <h3 className="font-black uppercase tracking-tight text-sm leading-snug text-foreground group-hover:text-primary transition-colors">
                {proj.name}
              </h3>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/5 w-full" />

            {/* Description */}
            <p className="text-xs text-foreground/60 font-medium leading-relaxed flex-grow">
              {proj.desc}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
