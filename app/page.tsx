import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Zones from "@/components/Zones";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar overHero />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Grid />
        <Zones />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
