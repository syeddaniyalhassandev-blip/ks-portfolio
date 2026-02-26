'use client';

import Section from "./Section";
import Image from "next/image";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-6 flex flex-col justify-center">
          <p className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed font-medium text-justify">
            I’m a Mechatronics Engineer passionate about building intelligent robotic and automation systems that merge mechanical design, electronics, and smart control. My work focuses on creating efficient, reliable, and adaptive machines that bridge the gap between imagination and innovation.
          </p>
          <p className="text-xs md:text-sm lg:text-base text-foreground/70 leading-relaxed font-medium text-justify">
            I earned my Bachelor&apos;s degree in Mechatronics Engineering from the Karachi Institute of Economics and Technology (KIET). Throughout my journey, I’ve gained hands-on experience through internships where I contributed to projects involving automation, design, and testing.
          </p>

        </div>
        <div className="order-1 lg:order-2 flex justify-center w-full">
          <div className="relative aspect-3/4 lg:aspect-auto w-full max-w-sm lg:max-w-none lg:h-full rounded-2xl overflow-hidden shadow-lg lg:min-h-[420px]">
            <Image 
              src="/KS.png" 
              alt="Profile" 
              fill 
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
