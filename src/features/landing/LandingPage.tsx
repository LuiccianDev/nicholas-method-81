import Hero from './sections/Hero/Hero';
import Overview from './sections/Overview';
import HowItWorks from './sections/HowItWorks';
import MethodsRail from './sections/MethodsRail';

export default function LandingPage() {
  return (
    <div className="pt-20">
      <Hero />
      <Overview />
      <HowItWorks />
      <MethodsRail />
    </div>
  );
}
