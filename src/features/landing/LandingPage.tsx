import LandingNav from './LandingNav';
import Hero from './Hero';
import MethodOverview from './sections/MethodOverview';
import HowItWorks from './sections/HowItWorks';
import MethodsGrid from './sections/MethodsGrid';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="pt-20">
      <LandingNav />
      <Hero />
      <MethodOverview />
      <HowItWorks />
      <MethodsGrid />
      <Footer />
    </div>
  );
}
