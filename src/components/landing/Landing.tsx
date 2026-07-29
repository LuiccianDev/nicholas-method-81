import Navigation from './Navigation';
import Hero from './Hero';
import VisualDashboard from './Visual';

export default function App() {
  return (
    <div className="bg-[#F8F9F8] min-h-screen text-black">
      <Navigation />
      <Hero />
      <VisualDashboard />
    </div>
  );
}
