'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Language = 'en' | 'de';

// --- TIMING CONFIGURATION ---
const TIMING = {
  // This ONLY controls when "COMPOSITIONS" fades out and "ENTER" appears.
  // It does NOT stop the video.
  uiTransitionDelay: 15700, // 15700ms after load, the text changes.

  titleFadeOut: 0.4,       // Duration: "COMPOSITIONS" fade out speed
  enterButtonDelay: 5.0,   // Delay: Wait time before "ENTER" starts fading in
  enterButtonFadeIn: 2.0,  // Duration: "ENTER" fade in speed
  textRevealDelay: 8.0,    // Delay: Wait time AFTER "ENTER" appears to show the long text
  textRevealDuration: 3.0  // Duration: Long text fade in speed
};

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    title: "COMPOSITIONS",
    enter: "ENTER",
    // Words wrapped in ** will be rendered in gray/blue-gray tones
    text: [
      "In her **native country**, the former Yugoslavia—an area formed through **centuries of cultural exchange**—Dijana Bošković came into contact with music of **Slavic**, Western European, **Turkish**, and Hindustani origin.",
      "Her works are rooted in contemporary classical music and the **European avant-garde**, drawing on elements of **traditional**, jazz, and pop music. This musical language seeks to **transcend stylistic dogmas** and to develop distinctly individual compositional responses to **spiritual and socio-political themes** that traverse cultural, religious, and linguistic boundaries.",
      "A further characteristic of her work is its reference to **tonal centers**, as pulse, harmony, and musical line unfold in response to the **variable and often fragile rhythms** of human breathing."
    ]
  },
  de: {
    title: "KOMPOSITION",
    enter: "EINTRETEN",
    // German translation preserving the ** highlighting style
    text: [
      "In ihrer **Heimat**, dem ehemaligen Jugoslawien – einer Region, die durch **jahrhundertelangen kulturellen Austausch** geprägt wurde – kam Dijana Bošković mit Musik **slawischen**, westeuropäischen, **türkischen** und hindustanischen Ursprungs in Berührung.",
      "Ihre Werke wurzeln in der zeitgenössischen klassischen Musik und der **europäischen Avantgarde**, wobei sie Elemente aus **traditioneller Musik**, Jazz und Pop einbezieht. Diese Musiksprache sucht **stilistische Dogmen zu überwinden** und eine unverkennbar eigene kompositorische Antwort auf **spirituelle und gesellschaftspolitische Themen** zu entwickeln, die kulturelle, religiöse und sprachliche Grenzen überschreiten.",
      "Ein weiteres Charakteristikum ihres Schaffens ist der Bezug zu **tonalen Zentren**: Puls, Harmonie und musikalische Linie entfalten sich in Resonanz auf die **variablen und oft fragilen Rhythmen** des menschlichen Atems."
    ]
  }
};

// Function to parse and style text
const parseStyledText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const cleanText = part.slice(2, -2);
      return (
        <span key={index} className="text-slate-400">
          {cleanText}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function CompositionsPage() {
  // --- STATE ---
  const [videoFinished, setVideoFinished] = useState(false); // Controls Video Layer (Intro -> Loop)
  const [showEnterUI, setShowEnterUI] = useState(false);     // Controls Text Layer (Compositions -> Enter)
  const [language, setLanguage] = useState<Language>('en');  // Language State
  
  // UPDATED: Starts TRUE so browser allows autoplay. User must click to unmute.
  const [isMuted, setIsMuted] = useState(true);

  // Refs for video control
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  // Load Language & Check Auto-Unmute
  useEffect(() => {
    // 1. Read Language
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    // 2. Check Unmute Flag
    if (typeof window !== 'undefined') {
      const shouldAutoUnmute = sessionStorage.getItem('autoUnmute');
      
      if (shouldAutoUnmute === 'true') {
        // User clicked the button on About page - we can unmute!
        setIsMuted(false);
        
        // Apply to video refs immediately
        if (introVideoRef.current) {
          introVideoRef.current.muted = false;
        }
        if (loopVideoRef.current) {
          loopVideoRef.current.muted = false;
        }
        
        // Clear the flag so it doesn't affect page refreshes
        sessionStorage.removeItem('autoUnmute');
      }
    }
  }, []);

  // --- VIDEO SEQUENCE ---
  // Only triggers when the actual video file finishes playing.
  const handleIntroVideoEnded = () => {
    setVideoFinished(true);
    if (loopVideoRef.current) {
      loopVideoRef.current.play().catch(e => console.log("Loop video autoplay prevented", e));
    }
  };

  // Toggle Mute for Videos
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    // Apply mute state to video refs
    if (introVideoRef.current) introVideoRef.current.muted = nextMuted;
    if (loopVideoRef.current) loopVideoRef.current.muted = nextMuted;

    // Force play if unmuting (in case browser blocked autoplay)
    if (!nextMuted) {
      if (videoFinished) {
        // Visuals are looping -> Force Loop Video
        if (loopVideoRef.current && loopVideoRef.current.paused) {
          loopVideoRef.current.play().catch(e => console.error("Force play loop video", e));
        }
      } else {
        // Visuals are in intro -> Force Intro Video
        if (introVideoRef.current && introVideoRef.current.paused) {
          introVideoRef.current.play().catch(e => console.error("Force play intro video", e));
        }
      }
    }
  };

  // --- INITIALIZATION ---
  useEffect(() => {
    // Start intro video
    if (introVideoRef.current) {
      introVideoRef.current.play().catch(e => console.log("Intro video autoplay prevented", e));
    }

    // Preload loop video to ensure seamless transition
    if (loopVideoRef.current) {
      loopVideoRef.current.load();
    }

    // Set Timer for TEXT/UI CHANGE only
    const timer = setTimeout(() => {
      setShowEnterUI(true);
    }, TIMING.uiTransitionDelay);

    return () => clearTimeout(timer);
  }, []);

  // Sync mute state updates
  useEffect(() => {
    if (introVideoRef.current) introVideoRef.current.muted = isMuted;
    if (loopVideoRef.current) loopVideoRef.current.muted = isMuted;
  }, [isMuted]);

  // Shortcut for current content
  const t = CONTENT[language];

  return (
    <main className="relative w-full min-h-screen bg-[#050B14] overflow-x-hidden">

      {/* --- LAYER 1: BACKGROUND LOOP --- */}
      <div className={`fixed inset-0 z-0 w-full dvh transition-opacity duration-1000 ${videoFinished ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={loopVideoRef}
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/loop-mobile.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/videos/loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/loop.webm" type="video/webm" />
          <source src="/videos/loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- LAYER 2: INTRO VIDEO --- */}
      <AnimatePresence>
        {!videoFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-10 w-full dvh"
          >
            <video
              ref={introVideoRef}
              muted={isMuted}
              playsInline
              preload="auto"
              poster="/images/composition-intro-poster.webp"
              onEnded={handleIntroVideoEnded}
              className="w-full h-full object-cover"
            >
              <source src="/videos/composition-intro-mobile.webm" type="video/webm" media="(max-width: 768px)" />
              <source src="/videos/composition-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/videos/composition-intro.webm" type="video/webm" />
              <source src="/videos/composition-intro.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LAYER 3: UI & CONTENT --- */}
      <div className="relative z-20 w-full min-h-screen flex flex-col items-center pt-[9.5rem] md:pt-24 px-4 md:px-20 pb-20">
        
        {/* Navigation & Controls Container */}
        <div className="absolute top-6 left-0 w-full px-6 md:px-10 z-50 flex justify-between items-start pointer-events-none">
          {/* Back Button */}
          <Link href="/about" className="pointer-events-auto">
            {/* SVG or Icon can go here if needed, formerly empty in provided code */}
          </Link>

          {/* Mute Button */}
          <button 
            onClick={toggleMute}
            className="pointer-events-auto text-white/70 hover:text-amber-200 transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
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

        {/* Dynamic Header Area */}
        <div className="absolute top-[4rem] md:top-6 left-0 w-full z-40 flex justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {!showEnterUI ? (
              // 1. Initial Title
              <motion.h1
                key={`title-static-${language}`} // Key change forces re-render on language switch
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: TIMING.titleFadeOut }}
                className="font-heading text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-widest"
                style={{ textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)" }}
              >
                {t.title}
              </motion.h1>
            ) : (
              // 2. Single "ENTER" Button with Arrow
              <Link href="/compositions/works">
                <motion.button
                  key={`title-interactive-${language}`}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: TIMING.enterButtonFadeIn, delay: TIMING.enterButtonDelay }}
                  className="enter-button pointer-events-auto text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 flex items-center gap-2 md:gap-3"
                  style={{ 
                    textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textShadow = "0px 0px 40px rgba(251, 191, 36, 1), 0px 0px 60px rgba(251, 191, 36, 0.6)"}
                  onMouseLeave={(e) => e.currentTarget.style.textShadow = "0px 0px 20px rgba(251, 191, 36, 0.8)"}
                  onClick={() => console.log("Enter clicked")}
                >
                  {t.enter}
                  <motion.svg 
                    width="50" 
                    height="40" 
                    viewBox="0 0 50 40" 
                    fill="none" 
                    className="w-8 h-6 md:w-12 md:h-8 lg:w-14 lg:h-10"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path 
                      d="M5 20 L40 20 M30 12 L40 20 L30 28" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.button>
              </Link>
            )}
          </AnimatePresence>
        </div>

        {/* Content Reveal - Individual Paragraph Backgrounds */}
        <AnimatePresence>
          {showEnterUI && (
            <motion.div
              key={`text-reveal-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: TIMING.textRevealDuration, delay: TIMING.textRevealDelay, ease: "easeOut" }}
              className="w-full max-w-4xl -mt-8 md:mt-12 space-y-4 md:space-y-6"
            >
              {t.text.map((paragraph, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: TIMING.textRevealDuration, 
                    delay: TIMING.textRevealDelay + (i * 0.3),
                    ease: "easeOut" 
                  }}
                  className="bg-[#223c5e]/80 backdrop-blur-sm px-6 py-5 md:px-8 md:py-6 rounded-lg"
                >
                  <p className="font-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed drop-shadow-lg text-left">
                    {parseStyledText(paragraph)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}