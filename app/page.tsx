import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Services } from "@/components/Services";
import { How } from "@/components/How";
import { Colorways } from "@/components/Colorways";
import { Visualizer } from "@/components/Visualizer";
import { Gallery } from "@/components/Gallery";
import { More } from "@/components/More";
import { About } from "@/components/About";
import { Start } from "@/components/Start";
import { Footer } from "@/components/Footer";
import { BuildProvider } from "@/components/BuildProvider";

export default function Home() {
  return (
    <BuildProvider>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <How />
        <Colorways />
        <Visualizer />
        <Gallery />
        <More />
        <About />
        <Start />
      </main>
      <Footer />
    </BuildProvider>
  );
}
