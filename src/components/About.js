'use client';

import Section from "./Section";

export default function About({ data, id }) {
  const paragraphs = data?.paragraphs || [];
  return (
    <Section id={id || "about"} title="About">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed font-medium">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
