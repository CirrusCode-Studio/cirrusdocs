import Navbar from "@/components/layout/Navbar";
import Hero from "./sections/hero.section";
import LogoCloud from "@/components/ui/LogoCloud";
import ProblemSection from "./sections/problem.section";
import RAGVisualization from "./sections/rag-visualization.section";
import BentoFeatures from "./sections/bento-featured.section";
import TrustSection from "./sections/trust.section";
import Footer from "@/components/layout/Footer";

const LandingPage = () =>
    <div className="relative min-h-screen">
      <div className="mesh-gradient" />
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <ProblemSection />
        <RAGVisualization />
        <BentoFeatures />
        <TrustSection />
      </main>
      <Footer />
    </div>

export {LandingPage}