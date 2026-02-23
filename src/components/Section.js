'use client';

import { motion } from 'framer-motion';

export default function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-20 px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tighter mb-3 uppercase">{title}</h2>
        {subtitle && <p className="text-sm text-foreground/60 max-w-2xl mx-auto font-medium">{subtitle}</p>}
        <div className="w-16 h-1.5 bg-primary mx-auto mt-5 rounded-full" />
      </motion.div>
      {children}
    </section>
  );
}
