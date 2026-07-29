import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Pipeline from "@/components/Pipeline";
import Pillars from "@/components/Pillars";
import Comparison from "@/components/Comparison";
import Ethics from "@/components/Ethics";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Pipeline />
        <Pillars />
        <Comparison />
        <Ethics />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
