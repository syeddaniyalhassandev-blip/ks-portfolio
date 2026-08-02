"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X, Play, Pause } from "lucide-react";

export default function ImageSlider({ images = [], title = "Gallery Image", className = "aspect-video w-full" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const validImages = (images || []).filter(Boolean);
  const isCurrentLoaded = !!loadedImages[currentIndex];

  // Auto-play interval (ONLY ticks when the current image has finished loading)
  useEffect(() => {
    if (validImages.length <= 1 || isHovered || lightboxOpen || !isCurrentLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [validImages.length, isHovered, lightboxOpen, isCurrentLoaded]);

  // Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  if (validImages.length === 0) return null;

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToSlide = (idx, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${className} rounded-3xl overflow-hidden bg-gray-950 border border-black/10 shadow-xl group select-none`}
      >
        {/* Main Animated Slide Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden"
          >
            {/* Loading placeholder spinner while image is downloading */}
            {!isCurrentLoaded && (
              <div className="absolute inset-0 bg-gray-900/60 animate-pulse flex items-center justify-center z-10">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            )}

            {/* Ambient Blurred Glow (Fills any empty space with matching colors) */}
            {isCurrentLoaded && (
              <Image
                src={validImages[currentIndex]}
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                unoptimized
              />
            )}

            {/* FULL UNCROPPED IMAGE (object-contain so 100% of the image is shown without cutting) */}
            <Image
              src={validImages[currentIndex]}
              alt={`${title} - slide ${currentIndex + 1}`}
              fill
              className={`object-contain transition-opacity duration-700 ${
                isCurrentLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [currentIndex]: true }))
              }
              unoptimized
            />

            {/* Dark Gradient Overlay for readable controls */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Click to Enlarge Hover Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                <ZoomIn size={22} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Multi-image Slider Controls (Only shown if > 1 image) */}
        {validImages.length > 1 && (
          <>
            {/* Left / Right Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer z-10"
              title="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer z-10"
              title="Next Slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Top-Right Status Badge (Auto-play Indicator + Slide Counter) */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider font-bold">
              <span className="flex items-center gap-1">
                {!isCurrentLoaded ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                ) : isHovered ? (
                  <Pause size={10} className="text-amber-400" />
                ) : (
                  <Play size={10} className="text-emerald-400 fill-emerald-400" />
                )}
                <span>{currentIndex + 1}/{validImages.length}</span>
              </span>
            </div>

            {/* Bottom Indicator Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => goToSlide(idx, e)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-primary shadow-sm"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* FULL-SCREEN ENLARGE LIGHTBOX MODAL (z-[100] so it sits ON TOP of Navbar z-60) */}
      <AnimatePresence>
        {lightboxOpen && validImages[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close button (z-[110] with large click target) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-6 right-6 p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-[110] cursor-pointer shadow-lg"
              title="Close (Escape)"
            >
              <X size={26} />
            </button>

            {/* Left Arrow in Lightbox */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-[110] cursor-pointer"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Enlarged Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-[78vh] rounded-2xl overflow-hidden bg-black/50 shadow-2xl">
                <Image
                  src={validImages[currentIndex]}
                  alt={`${title} enlarged view`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h3 className="font-bold text-base uppercase tracking-wider">
                  {title}
                </h3>
                {validImages.length > 1 && (
                  <p className="mt-1 text-xs font-mono text-gray-400">
                    Slide {currentIndex + 1} of {validImages.length}
                  </p>
                )}
              </div>
            </div>

            {/* Right Arrow in Lightbox */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-[110] cursor-pointer"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
