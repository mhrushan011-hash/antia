import { HeroSection } from "@/components/home/HeroSection";
import { BannerSection } from "@/components/home/BannerSection";
import { PromoGrid } from "@/components/home/PromoGrid";
import { TargetedSolutions } from "@/components/home/TargetedSolutions";
import { Categories } from "@/components/home/Categories";
import { Features } from "@/components/home/Features";
import { Cities } from "@/components/home/Cities";
import { FAQ } from "@/components/home/FAQ";
import { BlogSection } from "@/components/home/BlogSection";
import { Testimonials } from "@/components/home/Testimonials";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <BannerSection />
      <PromoGrid />
      <Categories />
      <TargetedSolutions />
      <Features />
      <Cities />
      <Testimonials />
      <FAQ />
      <About />
      <BlogSection />
      <Contact />
    </div>
  );
}
