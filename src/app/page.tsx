import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import MoreProjects from "@/components/MoreProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />

        <section id="work" className="scroll-mt-24 pb-4">
          <div className="border-t border-border pt-4">
            <Eyebrow as="h2">Selected work</Eyebrow>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((p) => (
              <FeaturedProject key={p.slug} project={p} />
            ))}
          </div>
        </section>

        <div className="pt-10 sm:pt-14">
          <MoreProjects />
        </div>

        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
