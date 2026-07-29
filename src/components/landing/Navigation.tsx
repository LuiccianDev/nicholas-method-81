import { Menu } from 'lucide-react';


export default function Navigation() {
  return (
    <nav className="flex items-center justify-between px-4 py-6 bg-white" data-purpose="main-navigation">
      <div className="flex-1">
        <button className="bg-[#1A1A1A] text-white text-[10px] font-bold py-2 px-4 uppercase tracking-widest rounded-sm" data-purpose="cta-book-demo">
          Book a Demo
        </button>
      </div>
      <div className="flex items-center space-x-3 flex-1 justify-center">
        <div className="w-6 h-6 flex items-center justify-center" data-purpose="brand-logo">
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 20H20L12 2Z" stroke="black" strokeLinejoin="round" strokeWidth="2"></path>
            <circle cx="12" cy="14" fill="black" r="2"></circle>
          </svg>
        </div>
        <span className="font-black text-lg tracking-[0.2em] uppercase">Terra</span>
        <button className="p-2 bg-black text-white rounded-sm" data-purpose="mobile-menu-trigger">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center justify-end space-x-4 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Login / Sign Up
        </div>
      </div>
    </nav>
  );
}