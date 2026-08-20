import { MotionConfig } from 'motion/react';
import WhySection from './sections/WhySection';
import FeaturesSection from './sections/FeaturesSection';
import TechStackSection from './sections/TechStackSection';
import CreatorSection from './sections/CreatorSection';

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="pt-20">
        <WhySection />
        <FeaturesSection />
        <TechStackSection />
        <CreatorSection />
      </div>
    </MotionConfig>
  );
}
