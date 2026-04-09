"use client";

import Section from "./Section";
import { Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact({ data, id }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${data?.email || "Khubaibsalman2004@gmail.com"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Message from ${form.name}`,
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id={id || "contact"} title="Get in Touch">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-base sm:text-lg font-black tracking-tighter mb-6 uppercase">Contact Me</h3>
        <p className="text-sm text-foreground/60 font-medium mb-10 leading-relaxed">
          {data?.introText || "I am always looking for interesting projects and collaborations in robotics and automation."}
        </p>
        
        <div className="flex justify-center gap-6 md:gap-10 mb-16">
           <a href={data?.linkedIn || "https://www.linkedin.com/in/khubaib-salman-3a09ab251/"} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/5">
                <Linkedin className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-foreground/40 group-hover:text-primary transition-colors">LinkedIn</span>
           </a>

           <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data?.email || "Khubaibsalman2004@gmail.com"}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/5">
                <Mail className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-foreground/40 group-hover:text-primary transition-colors">Email</span>
           </a>
        </div>

        <div className="glass-card p-5 sm:p-8 md:p-10 rounded-4xl max-w-2xl mx-auto text-left shadow-2xl shadow-primary/5">
           <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="YOUR NAME" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Your Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="EMAIL ADDRESS" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Message</label>
                <textarea name="message" rows="4" value={form.message} onChange={handleChange} required placeholder="HOW CAN I HELP?" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all resize-none"></textarea>
              </div>

              {status === "sent" && (
                <p className="text-green-600 font-black text-xs uppercase tracking-widest text-center">✓ Message sent! I will get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-red-500 font-black text-xs uppercase tracking-widest text-center">✗ Something went wrong. Please try again.</p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 disabled:opacity-50">
                 {status === "sending" ? "SENDING..." : "SUBMIT"}
              </button>
           </form>
        </div>
      </div>
    </Section>
  );
}
