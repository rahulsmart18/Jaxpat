import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InfiniteTestimonialBand } from "@/components/InfiniteTestimonialBand";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { PortoBackdrop } from "@/components/PortoBackdrop";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { ShipProcess } from "@/components/sections/ShipProcess";
import { Awards } from "@/components/sections/Awards";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { StackTools } from "@/components/sections/StackTools";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { VoiceOfGrey } from "@/components/sections/VoiceOfGrey";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-foreground">
      <PortoBackdrop />
      <div className="relative z-10">
        <Header />
        <main className="min-h-0">
          <Hero />
          <MarqueeStrip durationSec={48} />
          <Approach />
          <ShipProcess />
          <About />
          <MarqueeStrip durationSec={56} />
          <Portfolio />
          <Services />
          <VoiceOfGrey />
          <Stats />
          <Awards />
          <StackTools />
          <div className="border-y border-portoLine bg-black py-1">
            <InfiniteTestimonialBand durationSec={65} />
            <InfiniteTestimonialBand reverse durationSec={80} />
          </div>
          <Testimonials />
          <CTA />
        </main>
        <MarqueeStrip durationSec={44} />
        <Footer />
      </div>
    </div>
  );
}
