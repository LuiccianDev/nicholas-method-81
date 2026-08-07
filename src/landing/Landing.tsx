import Header from './Header';
import Hero from './Hero';
import MethodOverview from './sections/MethodOverview';
import HowItWorks from './sections/HowItWorks';
import MethodsGrid from './sections/MethodsGrid';
import StatsSection from './sections/StatsSection';
import CTASection from './sections/CTASection';
import Footer from '../App/Footer';

export default function App() {
  return (
    <div className="pt-20 pb-12">
      <Header />
      <Hero />
      <MethodOverview />
      <HowItWorks />
      <MethodsGrid />
      <StatsSection />
      <Footer />
    </div>
  );
}
