import Hero from './sections/Hero';
import MethodOverview from './sections/MethodOverview';
import HowItWorks from './sections/HowItWorks';
import MethodsGrid from './sections/MethodsGrid';

export default function LandingPage() {
  return (
    <div className="pt-20">
      <Hero />
      <MethodOverview />
      <HowItWorks />
      <MethodsGrid />
    </div>
  );
}
