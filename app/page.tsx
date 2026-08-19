import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { FitmentFinderSection } from '@/components/sections/FitmentFinderSection';
import { WhyThisProduct } from '@/components/sections/WhyThisProduct';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { MeasurementGuide } from '@/components/sections/MeasurementGuide';
import { Trust } from '@/components/sections/Trust';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/navigation/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <main className="pt-16 sm:pt-20">
        <Hero />
        <FitmentFinderSection />
        <WhyThisProduct />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <MeasurementGuide />
        <Trust />
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}
