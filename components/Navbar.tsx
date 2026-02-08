'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'BIOGRAPHY', href: '/about' },
  { label: 'NEWS', href: '/news' },
  { label: 'COMPOSITION', href: '/compositions' },
  { label: 'VERSUS VOX ENSEMBLE', href: '#' },
  { label: 'DISCOGRAPHY', href: '#' },
  { label: 'PRESS', href: '/press' },
  { label: 'MEDIA', href: '/media' },
  { label: 'CONTACT', href: '#' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Hide Navbar on Home ('/') and Composition Intro ('/compositions')
  if (pathname === '/' || pathname === '/compositions') {
    return null;
  }

  return (
    <>
      {/* Header Container - Fixed to top with high z-index */}
      <header className="fixed top-0 left-0 w-full z-[100] px-4 py-3 md:px-8 flex justify-end items-center bg-transparent pointer-events-none">
        
        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden xl:flex gap-5 pointer-events-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 font-sans text-shadow-sm 
                ${link.href === '#' ? 'text-white/50 cursor-default hover:text-white/50' : 'text-white/80 hover:text-white hover:text-shadow-glow'}`}
              style={{ textShadow: '0px 0px 10px rgba(0,0,0,0.3)' }}
              onClick={(e) => {
                if (link.href === '#') {
                  e.preventDefault();
                } else if (link.href === '/compositions') {
                  // Set flag for auto-unmute on compositions page
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('autoUnmute', 'true');
                  }
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* --- MOBILE/TABLET HAMBURGER BUTTON --- */}
        <button 
          className="xl:hidden text-white focus:outline-none pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[110] bg-[#223C5E] flex flex-col justify-center items-center overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6 text-center py-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className={`text-lg md:text-2xl font-serif tracking-widest uppercase transition-colors
                      ${link.href === '#' ? 'text-white/40 cursor-default' : 'text-white/90 hover:text-amber-200'}`}
                    onClick={(e) => {
                      if (link.href === '#') {
                        e.preventDefault();
                      } else {
                        // Set flag for auto-unmute on compositions page (mobile)
                        if (link.href === '/compositions' && typeof window !== 'undefined') {
                          sessionStorage.setItem('autoUnmute', 'true');
                        }
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}