"use client";

import { useState, useRef } from "react";
import Section from "./Section";
import ImageSlider from "./ImageSlider";
import { ChevronDown } from "lucide-react";

export default function CustomBlock({ data, id }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  if (!data) return null;
  const { title, content, image, images = [] } = data;

  // Combine single image and array images into one list
  const allImages = [image, ...(images || [])].filter(Boolean);
  const paragraphs = Array.isArray(content) ? content : (content ? [content] : []);

  // Show 2 full paragraphs by default so it looks substantial & complete (no mid-word cutting)
  const isLongText = paragraphs.length > 2 || paragraphs.join(" ").length > 800;

  const previewParagraphs = isLongText ? paragraphs.slice(0, 2) : paragraphs;
  const remainingParagraphs = isLongText ? paragraphs.slice(2) : [];

  const handleToggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    setTimeout(() => {
      if (nextState) {
        // Expanding: Gently scroll down so newly revealed text comes into focus
        window.scrollBy({ top: 280, behavior: "smooth" });
      } else {
        // Collapsing: Smoothly scroll to show HALF IMAGE and HALF TEXT
        if (sectionRef.current) {
          const halfImageOffset =
            sectionRef.current.getBoundingClientRect().top + window.scrollY + 180;
          window.scrollTo({ top: halfImageOffset, behavior: "smooth" });
        }
      }
    }, 120);
  };

  return (
    <Section id={id || "custom"} title={title || "Custom Section"}>
      <div ref={sectionRef} className="max-w-4xl mx-auto space-y-8 relative">
        
        {/* TOP: IMAGE / AUTO-PLAYING SLIDER SHOWCASE */}
        {allImages.length > 0 && (
          <div className="w-full">
            <ImageSlider
              images={allImages}
              title={title || "Custom Feature"}
              className="aspect-video w-full"
            />
          </div>
        )}

        {/* BOTTOM: SMOOTH ANIMATED TEXT CONTENT (ref=textRef so Show Less scrolls here!) */}
        <div ref={textRef} className="max-w-4xl mx-auto space-y-4 relative">
          <div className="space-y-4">
            {/* Substantial preview paragraphs (First 2 paragraphs full) */}
            {previewParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium"
              >
                {paragraph}
              </p>
            ))}

            {/* SILKY-SMOOTH MAX-HEIGHT ACCORDION */}
            {remainingParagraphs.length > 0 && (
              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  isExpanded
                    ? "max-h-[3000px] opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="space-y-4 pt-1">
                  {remainingParagraphs.map((paragraph, idx) => (
                    <p
                      key={idx + previewParagraphs.length}
                      className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CENTERED, STICKY, INVERTED SHOW MORE / SHOW LESS BUTTON */}
          {isLongText && (
            <div className="sticky bottom-6 z-20 flex justify-center pt-4">
              <button
                type="button"
                onClick={handleToggleExpand}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white border border-primary hover:bg-white hover:text-primary hover:border-primary/40 font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg group"
              >
                <span>
                  {isExpanded
                    ? "Show Less"
                    : `Show More (${remainingParagraphs.length} more paragraphs)`}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-500 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          )}
        </div>

      </div>
    </Section>
  );
}
