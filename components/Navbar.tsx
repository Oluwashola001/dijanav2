'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    links: [
      { label: 'HOME', href: '/' },
      { label: 'BIOGRAPHY', href: '/about' },
      { label: 'NEWS', href: '/news' },
      { label: 'COMPOSITION', href: '/compositions' },
      { label: 'MEDIA', href: '/media' },
      { label: 'DISCOGRAPHY', href: '#' },
      { label: 'PRESS', href: '/press' },
      { label: 'VERSUS VOX ENSEMBLE', href: '#' },
      { label: 'TEACHING', href: '#' },
      { label: 'CONTACT', href: '/contact' },
    ]
  },
  de: {
    links: [
      { label: 'Startseite', href: '/' },
      { label: 'Über mich', href: '/about' },
      { label: 'Aktuell', href: '/news' },
      { label: 'Komposition', href: '/compositions' },
      { label: 'Medien', href: '/media' },
      { label: 'Diskografie', href: '#' },
      { label: 'Presse', href: '/press' },
      { label: 'Versus Vox Ensemble', href: '#' },
      { label: 'Unterricht', href: '#' },
      { label: 'Kontakt', href: '/contact' },
    ]
  }
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const pathname = usePathname();

  // 1. Read Language Setting
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, [pathname]); // Re-check on route change just in case

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Hide Navbar on Home ('/') and Composition Intro ('/compositions')
  if (pathname === '/' || pathname === '/compositions') {
    return null;
  }

  // Determine if we're on the news page for glassmorphism styling
  const isNewsPage = pathname === '/news';
  const headerBg = isNewsPage 
    ? 'md:bg-[#506070]/60 md:backdrop-blur-md md:border-b md:border-white/20' 
    : 'md:bg-[#172F4F]';

  // Get current links based on language
  const currentLinks = CONTENT[language].links;

  return (
    <>
      {/* Header Container - Conditional styling based on page */}
      <header className={`fixed top-0 left-0 w-full z-[100] ${headerBg} bg-transparent`}>
        
        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden xl:flex justify-center items-center gap-4 px-4 h-[46px]">
          {currentLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`font-semibold uppercase transition-all duration-300 whitespace-nowrap relative group
                ${link.href === '#' ? 'text-white/90 cursor-not-allowed' : 'text-white/90 hover:text-white'}`}
              style={{ 
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                lineHeight: 1
              }}
              onClick={(e) => {
                if (link.href === '#') {
                  e.preventDefault();
                } else if (link.href === '/compositions') {
                  // Set flag for auto-unmute on compositions page
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('autoUnmute', 'true');
                  }
                } else if (link.href === '/about') {
                  // Set flag for auto-play music on about page
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('autoPlayMusic', 'true');
                  }
                }
              }}
            >
              {link.label}
              {/* Yellow underline on hover - only for clickable links */}
              {link.href !== '#' && (
                <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* --- TABLET NAVIGATION (md to xl) --- */}
        <nav className="hidden md:flex xl:hidden justify-center items-center gap-3 px-3 h-[46px] overflow-x-auto scrollbar-hide">
          {currentLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`font-semibold uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 relative group
                ${link.href === '#' ? 'text-white/90 cursor-not-allowed' : 'text-white/90 hover:text-white'}`}
              style={{ 
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                lineHeight: 1
              }}
              onClick={(e) => {
                if (link.href === '#') {
                  e.preventDefault();
                } else if (link.href === '/compositions') {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('autoUnmute', 'true');
                  }
                } else if (link.href === '/about') {
                  // Set flag for auto-play music on about page
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('autoPlayMusic', 'true');
                  }
                }
              }}
            >
              {link.label}
              {/* Yellow underline on hover - only for clickable links */}
              {link.href !== '#' && (
                <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* --- MOBILE HAMBURGER BUTTON (below md) --- */}
        <div className="md:hidden flex justify-end items-center px-4 py-3 bg-transparent pointer-events-none">
          <button 
            className="text-white focus:outline-none pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer to push content down - only visible on tablet/desktop where navbar has solid background */}
      <div className="hidden md:block h-[46px]" aria-hidden="true"></div>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[110] bg-[#1f3a5f] flex flex-col justify-center items-center overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-3 right-4 text-[#f2f4f6]/60 hover:text-[#f2f4f6]"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6 text-center py-10">
              {currentLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className={`text-lg md:text-2xl font-semibold uppercase transition-colors
                      ${link.href === '#' ? 'text-white/90 cursor-not-allowed' : 'text-white/90 hover:text-amber-200'}`}
                    style={{ 
                      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                      letterSpacing: '0.15em',
                      fontWeight: 600
                    }}
                    onClick={(e) => {
                      if (link.href === '#') {
                        e.preventDefault();
                      } else {
                        if (link.href === '/compositions' && typeof window !== 'undefined') {
                          sessionStorage.setItem('autoUnmute', 'true');
                        } else if (link.href === '/about' && typeof window !== 'undefined') {
                          // Set flag for auto-play music on about page
                          sessionStorage.setItem('autoPlayMusic', 'true');
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