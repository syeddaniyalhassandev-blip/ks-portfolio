'use client';

import Section from "./Section";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <p className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed font-medium">
          I&apos;m a Mechatronics Engineer passionate about building intelligent robotic and automation systems that merge mechanical design, electronics, and smart control. My work focuses on creating efficient, reliable, and adaptive machines that bridge the gap between imagination and innovation.
        </p>
        <p className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed font-medium">
          I earned my Bachelor&apos;s degree in Mechatronics Engineering from the Karachi Institute of Economics and Technology (KIET). Throughout my journey, I&apos;ve gained hands-on experience through internships where I contributed to projects involving automation, design, and testing.
        </p>
      </div>
    </Section>
  );
}
