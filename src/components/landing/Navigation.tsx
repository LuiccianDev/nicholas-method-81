import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { label: 'Features', href: '#' },
  { label: 'How it works', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="flex items-center justify-between px-4 py-6  fixed top-5 left-0 right-0 z-50"
        data-purpose="main-navigation"
      >
        <div className="flex-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#1A1A1A] text-white text-[10px]  font-bold py-2 px-4 ml-10 uppercase tracking-widest rounded-sm"
            data-purpose="cta-book-demo"
          >
            Book a Demo
          </motion.button>
        </div>
        <div className="flex items-center space-x-3 flex-1 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-6 h-6 flex items-center justify-center"
            data-purpose="brand-logo"
          >
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 20H20L12 2Z" stroke="black" strokeLinejoin="round" strokeWidth="2"></path>
              <circle cx="12" cy="14" fill="black" r="2"></circle>
            </svg>
          </motion.div>
          <span className="font-black text-lg tracking-[0.2em] uppercase">Terra</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="p-2 bg-black text-white rounded-sm"
            data-purpose="mobile-menu-trigger"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="flex items-center mr-10 justify-end space-x-4 flex-1">
          <motion.div
            whileHover={{ opacity: 0.6 }}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-500 cursor-pointer"
          >
            Login / Sign Up
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <span className="font-black text-lg tracking-[0.2em] uppercase">Menu</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-black text-white rounded-sm"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className="text-lg font-semibold text-gray-800 hover:text-black transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 py-6 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1A1A1A] text-white text-xs font-bold py-3 px-4 uppercase tracking-widest rounded-sm"
                >
                  Book a Demo
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}