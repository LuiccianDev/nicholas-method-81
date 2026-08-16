import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

const menuItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Methods', href: '#methods-mining' },
  { label: 'About', href: '/About' },
];

export default function LandingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-5 right-0 left-0 z-50 flex items-center text-[12px] not-first:justify-between px-10 py-6"
        data-purpose="main-navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-black px-4 py-2  font-bold tracking-widest text-white uppercase"
            data-purpose="cta-book-demo"
          >
            <a href="/calculator">Paper</a>
          </motion.button>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-background pl-4">
          <span className="pr-2 font-monserrate text-lg font-bold tracking-wide uppercase">
            Luiccian
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="rounded-sm bg-tertiary p-2 "
            data-purpose="mobile-menu-trigger"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <motion.div
            whileHover={{ opacity: 0.8 }}
            className="cursor-pointer rounded-sm bg-background px-4 py-2  font-bold tracking-widest uppercase"
          >
            <a href="/calculator">NIcholas Method</a>
          </motion.div>
        </div>
      </motion.nav>

      {isMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 flex h-full w-72 flex-col bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
                <span className="text-lg font-black tracking-wide uppercase">
                  Menu
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-sm bg-black p-2 text-background"
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
                        className="text-lg font-semibold transition-colors hover:text-quaternary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-tertiary px-6 py-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-sm bg-black px-4 py-3 text-[11px] font-bold tracking-widest text-background uppercase"
                >
                  Book
                </motion.button>
              </div>
            </motion.aside>
          </div>,
          document.body
        )}
    </>
  );
}
