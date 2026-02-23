"use client";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        <div className="mb-8 p-1 px-3 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary/60">
          Available for Opportunities
        </div>
        
        <h2 className="text-2xl font-black tracking-tighter uppercase mb-6">
          Khubaib <span className="text-primary italic">Salman</span>
        </h2>
        
        <p className="text-foreground/30 font-bold uppercase tracking-[0.2em] text-[10px] text-center mb-10 max-w-md leading-loose">
          Crafting the future of robotics and automation with precision and passion.
        </p>

        <div className="w-full h-px bg-black/3 mb-10" />

        <div className="flex justify-center w-full">
          <p className="text-foreground/20 font-bold uppercase tracking-widest text-[9px] text-center">
            © 2026 KHUBAIB SALMAN. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
