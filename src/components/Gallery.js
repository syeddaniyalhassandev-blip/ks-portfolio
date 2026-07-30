'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

export default function Gallery({ data, id }) {
  const galleryItems = data || [];
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = (index) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % galleryItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <Section id={id || "gallery"} title="Photo & Project Gallery">
      {galleryItems.length === 0 ? (
        <div className="text-center py-12 text-gray-400 font-medium text-sm">
          No gallery images have been added yet.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Box */}
                <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title || `Gallery image ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Images size={32} />
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn size={20} />
                    </div>
                  </div>
                </div>

                {/* Caption Bar */}
                {(item.title || item.caption) && (
                  <div className="p-4 bg-white border-t border-gray-100">
                    {item.title && (
                      <h4 className="font-black text-sm text-gray-900 truncate">
                        {item.title}
                      </h4>
                    )}
                    {item.caption && (
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 font-medium">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* LIGHTBOX MODAL */}
          <AnimatePresence>
            {selectedIdx !== null && galleryItems[selectedIdx] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              >
                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
                >
                  <X size={24} />
                </button>

                {/* Left arrow */}
                {galleryItems.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
                  >
                    <ChevronLeft size={28} />
                  </button>
                )}

                {/* Main preview */}
                <div 
                  onClick={e => e.stopPropagation()} 
                  className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black/50 shadow-2xl">
                    <Image
                      src={galleryItems[selectedIdx].image}
                      alt={galleryItems[selectedIdx].title || `Gallery preview`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  {(galleryItems[selectedIdx].title || galleryItems[selectedIdx].caption) && (
                    <div className="mt-4 text-center text-white max-w-xl">
                      {galleryItems[selectedIdx].title && (
                        <h3 className="font-bold text-base">
                          {galleryItems[selectedIdx].title}
                        </h3>
                      )}
                      {galleryItems[selectedIdx].caption && (
                        <p className="text-xs text-gray-300 mt-1">
                          {galleryItems[selectedIdx].caption}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mt-2 text-xs font-mono text-gray-400">
                    {selectedIdx + 1} of {galleryItems.length}
                  </div>
                </div>

                {/* Right arrow */}
                {galleryItems.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
                  >
                    <ChevronRight size={28} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Section>
  );
}
