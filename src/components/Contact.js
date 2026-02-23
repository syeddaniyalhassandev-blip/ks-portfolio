"use client";

import Section from "./Section";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <Section id="contact" title="Get in Touch">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-base sm:text-lg font-black tracking-tighter mb-6 uppercase">Contact Me</h3>
        <p className="text-sm text-foreground/60 font-medium mb-10 leading-relaxed">
          I am always looking for interesting projects and collaborations in robotics and automation.
        </p>
        
        <div className="flex justify-center gap-6 md:gap-10 mb-16">
           <a href="https://www.linkedin.com/in/khubaib-salman-3a09ab251/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/5">
                <Linkedin className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-foreground/40 group-hover:text-primary transition-colors">LinkedIn</span>
           </a>
           <a href="#" className="group flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/5">
                <Github className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-foreground/40 group-hover:text-primary transition-colors">GitHub</span>
           </a>
           <a href="mailto:contact@example.com" className="group flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/5">
                <Mail className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-foreground/40 group-hover:text-primary transition-colors">Email</span>
           </a>
        </div>

        <div className="glass-card p-10 rounded-4xl max-w-2xl mx-auto text-left shadow-2xl shadow-primary/5">
           <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Name</label>
                <input type="text" placeholder="YOUR NAME" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Your Email</label>
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Message</label>
                <textarea rows="4" placeholder="HOW CAN I HELP?" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all resize-none"></textarea>
              </div>
              <button type="button" className="btn-primary w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                 SUBMIT
              </button>
           </form>
        </div>
      </div>
    </Section>
  );
}
