import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="space-y-4 px-3 py-3 sm:px-5 sm:py-5">
        <div className="panel overflow-hidden">
          <Hero />
        </div>
        <div className="panel overflow-hidden">
          <Features />
        </div>
        <div className="panel overflow-hidden">
          <Integrations />
        </div>
        <div className="panel overflow-hidden">
          <Testimonials />
        </div>
        <div className="panel overflow-hidden">
          <Team />
        </div>
        <div className="panel overflow-hidden">
          <CTA />
        </div>
        <div className="panel overflow-hidden">
          <Footer />
        </div>
      </main>
    </>
  );
}
