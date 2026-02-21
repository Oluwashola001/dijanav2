'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- ANIMATION TIMING ---
const TIMING = {
  waterAlone: 4,
  noteAndLogo: 4,
  profileAndEnter: 7.0,
  textLine1: 10.0,
  textLine2: 13.0,
  blueBg: 13,
};

const DURATIONS = {
  noteAndLogo: 4.0,
  profileAndEnter: 2.5,
  textLines: 1.5,
  blueBg: 1.5,
};

const RISE = {
  noteAndProfile: 100,
};

// Define strict types for our content to satisfy TypeScript
type Language = 'en' | 'de';

const CONTENT: Record<Language, { name: string; titles: string }> = {
  en: {
    name: "DIJANA BOSHKOVICH",
    titles: "COMPOSER · FLUTIST"
  },
  de: {
    name: "DIJANA BOŠKOVIĆ",
    titles: "KOMPONISTIN · FLÖTISTIN"
  }
};

// --- MANUAL POSITIONING CONFIGURATION ---
// EDIT THE VALUES BELOW TO ADJUST GERMAN AND ENGLISH SEPARATELY
const TEXT_STYLES = {
  en: {
    name: { 
      bottom: '32vh', 
      left: '35vw', 
      fontSize: '4.5vw' 
    },
    titles: { 
      bottom: '26vh', 
      left: '54vw', 
      fontSize: '3.0vw' 
    }
  },
  de: {
    name: { 
      // CHANGE THESE VALUES TO MOVE THE GERMAN NAME
      bottom: '32vh',   // Increase to move UP, Decrease to move DOWN
      left: '35.5vw',     // Increase to move RIGHT, Decrease to move LEFT
      fontSize: '5.2vw' // Adjust size if needed
    },
    titles: { 
      // CHANGE THESE VALUES TO MOVE THE GERMAN TITLES
      bottom: '26vh',   
      left: '52vw',     
      fontSize: '2.5vw' // Slightly smaller default for long German words
    }
  }
};

export default function WaterIntroPage() {
  const router = useRouter();
  const [showPreIntro, setShowPreIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // TypeScript Fix: Explicitly tell React this state can only be 'en' or 'de'
  const [language, setLanguage] = useState<Language>('en'); 
  
  // Two separate video refs: one for overlay, one for main
  const overlayVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play overlay video during pre-intro
    if (overlayVideoRef.current) {
      overlayVideoRef.current.muted = true;
      overlayVideoRef.current.play().catch((e) => console.log("Overlay video autoplay prevented:", e));
    }
  }, []);

  // TypeScript Fix: Typed the argument
  const handleStartExperience = (selectedLang: Language) => {
    setLanguage(selectedLang);
    localStorage.setItem('siteLanguage', selectedLang);

    // Switch to main water video and unmute it
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = false;
      mainVideoRef.current.play().catch((e) => console.log("Main water video play prevented:", e));
    }
    setIsMuted(false);
    setShowPreIntro(false);
  };
  
  const toggleMute = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (mainVideoRef.current) {
        mainVideoRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  };

  // NEW: Handle ENTER button click - Set audio autoplay flag
  const handleEnterClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('autoPlayMusic', 'true');
    }
  };

  return (
    <>
      <main className="relative w-full h-[100dvh] bg-black overflow-hidden">

      {/* 1. WATER OVERLAY VIDEO - Fades out with overlay text */}
      <AnimatePresence>
        {showPreIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <video
              ref={overlayVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/water-overlay-poster.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/water-overlay.webm" type="video/webm" />
              <source src="/videos/water-overlay.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN WATER VIDEO - Fades in underneath, only plays AFTER language selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreIntro ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={mainVideoRef}
          loop
          playsInline
          preload="auto"
          poster="/images/water-overlay-poster.webp"
          className="w-full h-full object-cover"
        >
          <source src="/videos/water.webm" type="video/webm" />
          <source src="/videos/water.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* PRE-INTRO OVERLAY */}
      <AnimatePresence>
        {showPreIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <div className="relative flex flex-col items-center justify-center px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
                className="text-center space-y-20 md:space-y-32"
              >
                {/* German Section */}
                <div 
                  className="space-y-2 cursor-pointer group"
                  onClick={() => handleStartExperience('de')}
                >
                  {/* GERMAN NAME - Edit sizes here: text-[mobile] md:text-[tablet] lg:text-[desktop] */}
                  <h1 
                    className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:text-amber-200"
                    style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    DIJANA BOŠKOVIĆ
                  </h1>
                  {/* GERMAN TITLE - Edit sizes here: text-[mobile] md:text-[tablet] lg:text-[desktop] */}
                  <p 
                    className="text-white text-xl md:text-4xl lg:text-5xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:text-amber-200"
                    style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    KOMPONISTIN & FLÖTISTIN
                  </p>
                  <div className="pt-4">
                    <span 
                      className="text-amber-300 text-lg md:text-xl lg:text-2xl font-medium italic tracking-wider drop-shadow-lg transition-all duration-300 group-hover:text-amber-200 group-hover:scale-110 inline-block"
                      style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      deutsch
                    </span>
                  </div>
                </div>

                {/* English Section - REVERSED ORDER */}
                <div 
                  className="space-y-0.5 cursor-pointer group"
                  onClick={() => handleStartExperience('en')}
                >
                  <div className="pb-4">
                    <span 
                      className="text-amber-300 text-lg md:text-xl lg:text-2xl font-medium italic tracking-wider drop-shadow-lg transition-all duration-300 group-hover:text-amber-200 group-hover:scale-110 inline-block"
                      style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      english
                    </span>
                  </div>
                  {/* ENGLISH TITLE - Independent from German */}
                  <p 
                    className="text-white text-xl md:text-4xl lg:text-5xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:text-amber-200"
                    style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    COMPOSER & FLUTIST
                  </p>
                  {/* ENGLISH NAME - Independent from German */}
                  <h2 
                    className="text-white text-[2.125rem] md:text-6xl lg:text-7xl font-semibold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:text-amber-200"
                    style={{ fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    DIJANA BOSHKOVICH
                  </h2>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BLUE BACKGROUND */}
      {!showPreIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ duration: DURATIONS.blueBg, delay: TIMING.blueBg, ease: "easeOut" }}
          className="absolute inset-0 z-10"
        >
          <img 
            src="/background.webp" 
            alt="Blue Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* MUTE BUTTON */}
      {!showPreIntro && (
        <div className="absolute top-2 right-2 md:top-8 md:right-10 z-50 pointer-events-auto">
          <button 
            onClick={toggleMute}
            className="text-white/70 hover:text-amber-200 transition-colors p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>
      )}

      {/* 3. CONTENT LAYER */}
      {!showPreIntro && (
        <div className="relative z-20 w-full h-full pointer-events-none">
          
          {/* NOTE IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: RISE.noteAndProfile }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: DURATIONS.noteAndLogo, delay: TIMING.noteAndLogo, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center px-0 py-8 md:px-[142px] md:py-0 mix-blend-screen"
          >
            <img 
              src="/note.webp" 
              alt="Musical Notes" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: RISE.noteAndProfile }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATIONS.noteAndLogo, delay: TIMING.noteAndLogo, ease: "easeOut" }}
            className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-top-8 md:right-20 z-30 w-[120vw] md:w-[65vw] max-w-[750px]"
          >
            <img 
              src="/logo.webp" 
              alt="Boshkovich Logo"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* PROFILE PIC */}
          <motion.div
            initial={{ opacity: 0, y: RISE.noteAndProfile }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATIONS.profileAndEnter, delay: TIMING.profileAndEnter, ease: "easeOut" }}
            className="absolute bottom-8 left-0 md:left-35.5 md:bottom-0 z-30 w-[65vw] h-[70vh] md:w-[60vw] md:h-auto md:max-w-[500px]"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
            }}
          >
            <img 
              src="/profile-pic-mobile.webp" 
              alt="Dijana Profile" 
              className="md:hidden w-full h-full object-cover object-top drop-shadow-2xl"
            />
            <img 
              src="/profile-pic.webp" 
              alt="Dijana Profile" 
              className="hidden md:block w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* TEXT LINE 1 - DYNAMIC POSITIONING */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATIONS.textLines, delay: TIMING.textLine1, ease: "easeOut" }}
            style={{ 
              fontFamily: "Verdana, Geneva, sans-serif",
              // Use values from config
              fontSize: TEXT_STYLES[language].name.fontSize,
              bottom: TEXT_STYLES[language].name.bottom,
              left: TEXT_STYLES[language].name.left,
            }}
            // Removed md:bottom and md:left classes, relying on style prop now
            className="hidden md:block absolute z-40 pointer-events-none text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            {CONTENT[language].name}
          </motion.div>

          {/* TEXT LINE 2 - DYNAMIC POSITIONING */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATIONS.textLines, delay: TIMING.textLine2, ease: "easeOut" }}
            style={{ 
              fontFamily: "Verdana, Geneva, sans-serif",
              // Use values from config
              fontSize: TEXT_STYLES[language].titles.fontSize,
              bottom: TEXT_STYLES[language].titles.bottom,
              left: TEXT_STYLES[language].titles.left,
            }}
            // Removed md:bottom and md:left classes, relying on style prop now
            className="hidden md:block absolute z-40 pointer-events-none text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
           {CONTENT[language].titles}
          </motion.div>

          {/* ENTER BUTTON - UPDATED WITH AUDIO FLAG */}
          <div className="absolute bottom-6.5 -right-10 md:-bottom-4 md:right-46 z-40 pointer-events-auto">
            <Link href="/about" onClick={handleEnterClick}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATIONS.profileAndEnter, delay: TIMING.profileAndEnter, ease: "easeOut" }}
                className="relative cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div 
                  className="md:hidden absolute inset-0 -left-8 bg-white/70 -z-10"
                  style={{
                    filter: 'blur(25px)',
                    clipPath: 'inset(0 0 0 0)',
                    transform: 'translateY(-6px)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, white 40%, white 100%), linear-gradient(to right, transparent 0%, white 15%, white 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 30%, white 100%), linear-gradient(to right, transparent 0%, white 25%, white 100%)',
                    WebkitMaskComposite: 'source-in'
                  }}
                ></div>
                <img 
                  src="/enter.webp" 
                  alt="Enter" 
                  className="w-64 h-auto md:w-72 lg:w-108 drop-shadow-2xl relative z-10"
                />
              </motion.div>
            </Link>
          </div>

        </div>
      )}

      </main>
    </>
  );
}