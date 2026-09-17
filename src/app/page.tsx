import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ProjectCards from "@/components/ProjectCards";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <ProjectCards />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
