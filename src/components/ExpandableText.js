"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function ExpandableText({ text = "", limit = 180, className = "text-xs text-foreground/70 font-medium leading-relaxed" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  if (!text) return null;

  const isLong = text.length > limit;
  const shortText = isLong ? text.slice(0, limit) + "..." : text;
  const remainderText = isLong ? text.slice(limit) : "";

  const handleToggle = (e) => {
    e.stopPropagation();
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    setTimeout(() => {
      if (nextState) {
        // Expanding: smoothly scroll down to center the text block
        if (containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        // Collapsing: smoothly scroll up to the top of this text block if scrolled past
        if (containerRef.current) {
          const topOffset =
            containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }
    }, 120);
  };

  return (
    <div ref={containerRef} className="space-y-1.5">
      <div className={className}>
        <span>{isExpanded ? text.slice(0, limit) : shortText}</span>
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded
              ? "max-h-625 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <span>{remainderText}</span>
        </div>
      </div>

      {isLong && (
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary/80 transition-all uppercase tracking-wider cursor-pointer group"
        >
          <span>{isExpanded ? "Show Less" : "Read More"}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-500 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}
    </div>
  );
}
