import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Section from "@/components/Section";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />

      <Experience />

      <Education />

      <Projects />

      <Skills />

      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
