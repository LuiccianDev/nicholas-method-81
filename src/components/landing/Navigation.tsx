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
      <motion.nav
        className="fixed top-5 right-0 left-0 z-50 flex items-center justify-between px-10 py-6"
        data-purpose="main-navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className=" rounded-sm bg-[#1A1A1A] px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase"
            data-purpose="cta-book-demo"
          >
            Book a Demo
          </motion.button>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-6 w-6 items-center justify-center"
            data-purpose="brand-logo"
          >
            <svg
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 20H20L12 2Z"
                stroke="black"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle cx="12" cy="14" fill="black" r="2"></circle>
            </svg>
          </motion.div>
          <span className="text-lg font-black tracking-wide uppercase">
            Terra
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="rounded-sm bg-black p-2 text-white"
            data-purpose="mobile-menu-trigger"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
        <div className=" flex flex-1 items-center justify-end space-x-4">
          <motion.div
            whileHover={{ opacity: 0.6 }}
            className="cursor-pointer text-[10px] font-bold tracking-widest text-gray-500 uppercase"
          >
            Login / Sign Up
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
                <span className="text-lg font-black tracking-wide uppercase">
                  Menu
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-sm bg-black p-2 text-white"
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
                        className="text-lg font-semibold text-gray-800 transition-colors hover:text-black"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-gray-100 px-6 py-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-sm bg-[#1A1A1A] px-4 py-3 text-xs font-bold tracking-widest text-white uppercase"
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
