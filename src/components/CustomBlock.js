import Section from "./Section";
import Image from "next/image";

export default function CustomBlock({ data, id }) {
  if (!data) return null;
  const { title, content, image, imagePos = "right" } = data;

  return (
    <Section id={id || "custom"} title={title || "Custom Section"}>
      <div className={`flex flex-col ${imagePos === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center justify-between max-w-5xl mx-auto`}>
        {/* Text Content */}
        <div className="flex-1 space-y-6 w-full">
          {content && content.map((paragraph, idx) => (
            <p key={idx} className="text-sm md:text-base text-foreground/70 leading-relaxed font-medium">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Optional Image */}
        {image && (
          <div className="flex-1 w-full max-w-md">
             <div className="glass-card p-2 rounded-3xl overflow-hidden shadow-2xl relative">
                <Image 
                  src={image} 
                  alt={title || "Custom Section Image"} 
                  width={600} 
                  height={400} 
                  className="w-full h-auto rounded-2xl object-cover" 
                  unoptimized 
                />
             </div>
          </div>
        )}
      </div>
    </Section>
  );
}
