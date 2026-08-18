import WhySection from './sections/WhySection';
import FeaturesSection from './sections/FeaturesSection';
import TechStackSection from './sections/TechStackSection';


export default function AboutPage() {
  return (
    <div className="pt-20">
      <WhySection />
      <FeaturesSection />
      <TechStackSection />
    </div>
  );
}
