import LandingNav from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhySection from './sections/WhySection';
import FeaturesSection from './sections/FeaturesSection';
import TechStackSection from './sections/TechStackSection';
import CreatorSection from './sections/CreatorSection';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <LandingNav />
      <WhySection />
      <FeaturesSection />
      <TechStackSection />
      <Footer />
    </div>
  );
}
