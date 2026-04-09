import Section from "./Section";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function Testimonials({ data, id }) {
  const testimonialsData = data || [];

  if (testimonialsData.length === 0) return null;

  return (
    <Section id={id || "testimonials"} title="Testimonials">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonialsData.map((testimonial, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/10 flex flex-col h-full relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
            <div className="flex-grow">
              <p className="text-sm md:text-base text-foreground/70 italic font-medium leading-relaxed mb-8 relative z-10">
                "{testimonial.feedback}"
              </p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              {testimonial.image ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                   <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full flex-shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black uppercase text-xl">
                  {testimonial.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                  {testimonial.name}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold mt-0.5">
                   {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
