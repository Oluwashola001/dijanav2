'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- TIMING CONFIGURATION ---
const TIMING = {
  // This ONLY controls when "COMPOSITIONS" fades out and "ENTER" appears.
  // It does NOT stop the video.
  uiTransitionDelay: 15700, // 10000ms = 10 seconds after load, the text changes.

  titleFadeOut: 0.4,       // Duration: "COMPOSITIONS" fade out speed
  enterButtonDelay: 5.0,   // Delay: Wait time before "ENTER" starts fading in
  enterButtonFadeIn: 2.0,  // Duration: "ENTER" fade in speed
  textRevealDelay: 7.0,    // Delay: Wait time AFTER "ENTER" appears to show the long text
  textRevealDuration: 2.5  // Duration: Long text fade in speed
};

// --- DATA ---
const introText = [
  "In her native country, the former Yugoslavia—an area formed through centuries of cultural exchange—Dijana Bošković came into contact with music of Slavic, Western European, Turkish, and Hindustani origin.",
  "Her works are rooted in contemporary classical music and the European avant-garde, drawing on elements of traditional, jazz, and pop music. This musical language seeks to transcend stylistic dogmas and to develop distinctly individual compositional responses to spiritual and socio-political themes that traverse cultural, religious, and linguistic boundaries.",
  "A further characteristic of her work is its reference to tonal centers, as pulse, harmony, and musical line unfold in response to the variable and often fragile rhythms of human breathing."
];

export default function CompositionsPage() {
  // --- STATE ---
  const [videoFinished, setVideoFinished] = useState(false); // Controls Video Layer (Intro -> Loop)
  const [showEnterUI, setShowEnterUI] = useState(false);     // Controls Text Layer (Compositions -> Enter)
  const [isMuted, setIsMuted] = useState(false);

  // Refs for media control
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const introAudioRef = useRef<HTMLAudioElement>(null);
  const loopAudioRef = useRef<HTMLAudioElement>(null);

  // --- LOGIC 1: AUDIO SEQUENCE (Independent) ---
  const handleIntroAudioEnded = () => {
    if (loopAudioRef.current) {
      loopAudioRef.current.play().catch(e => console.log("Loop audio play error", e));
    }
  };

  // --- LOGIC 2: VIDEO SEQUENCE (Independent) ---
  // Only triggers when the actual video file finishes playing.
  const handleIntroVideoEnded = () => {
    setVideoFinished(true);
    if (loopVideoRef.current) {
      loopVideoRef.current.play().catch(e => console.log("Loop video autoplay prevent", e));
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (introAudioRef.current) introAudioRef.current.muted = !isMuted;
    if (loopAudioRef.current) loopAudioRef.current.muted = !isMuted;
  };

  // --- INITIALIZATION ---
  useEffect(() => {
    // 1. Start Media
    if (introVideoRef.current) introVideoRef.current.play().catch(e => console.log("Intro video autoplay prevented", e));
    if (introAudioRef.current) introAudioRef.current.play().catch(e => console.log("Intro audio autoplay prevented", e));

    // 2. Set Timer for TEXT/UI CHANGE only
    const timer = setTimeout(() => {
        setShowEnterUI(true);
    }, TIMING.uiTransitionDelay);

    return () => clearTimeout(timer);
  }, []);

  // Sync mute state updates
  useEffect(() => {
    if (introAudioRef.current) introAudioRef.current.muted = isMuted;
    if (loopAudioRef.current) loopAudioRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <main className="relative w-full min-h-screen bg-[#050B14] overflow-x-hidden">
      
      {/* --- HIDDEN AUDIO LAYER --- */}
      <div className="hidden">
        <audio 
            ref={introAudioRef} 
            src="/music/composition.mp3" 
            onEnded={handleIntroAudioEnded}
            muted={isMuted}
        />
        <audio 
            ref={loopAudioRef} 
            src="/music/composition-loop.mp3" 
            loop 
            muted={isMuted}
        />
      </div>

      {/* --- LAYER 1: BACKGROUND LOOP --- */}
      <div className={`fixed inset-0 z-0 w-full dvh transition-opacity duration-1000 ${videoFinished ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={loopVideoRef}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/loop-mobile.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/videos/loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/loop.webm" type="video/webm" />
          <source src="/videos/loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- LAYER 2: INTRO VIDEO --- */}
      {/* Visuals depend on 'videoFinished' (actual video end), NOT the UI timer */}
      <AnimatePresence>
        {!videoFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-10 w-full dvh bg-[#223c5e]"
          >
            <video
              ref={introVideoRef}
              muted
              playsInline
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
        <div className="absolute top-8 left-0 w-full px-6 md:px-10 z-50 flex justify-between items-start pointer-events-none">
          {/* Back Button */}
          <Link href="/" className="pointer-events-auto">
            <button className="text-white/50 hover:text-amber-200/90 transition-colors uppercase tracking-widest text-xs md:text-sm font-bold cursor-pointer">
              ← BACK
            </button>
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
        {/* Depends on 'showEnterUI' (timer), NOT video playback */}
        <div className="absolute top-[6rem] md:top-6 left-0 w-full z-40 flex justify-center pointer-events-none">
            <AnimatePresence mode="wait">
                {!showEnterUI ? (
                    // 1. Initial Title
                    <motion.h1
                        key="title-static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: TIMING.titleFadeOut }}
                        className="font-heading text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-widest"
                        style={{ textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)" }}
                    >
                        COMPOSITIONS
                    </motion.h1>
                ) : (
                    // 2. "ENTER" Button with Arrow
                    <motion.button
                        key="title-interactive"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: TIMING.enterButtonFadeIn, delay: TIMING.enterButtonDelay }}
                        className="pointer-events-auto font-heading text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 md:gap-3 hover:scale-105 group"
                        style={{ textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)" }}
                        onMouseEnter={(e) => e.currentTarget.style.textShadow = "0px 0px 40px rgba(251, 191, 36, 1), 0px 0px 60px rgba(251, 191, 36, 0.6)"}
                        onMouseLeave={(e) => e.currentTarget.style.textShadow = "0px 0px 20px rgba(251, 191, 36, 0.8)"}
                        onClick={() => console.log("Enter clicked")}
                    >
                        ENTER 
                        <motion.svg 
                            width="80" 
                            height="60" 
                            viewBox="0 0 80 60" 
                            fill="none" 
                            className="w-12 h-8 md:w-16 md:h-12 lg:w-20 lg:h-14"
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path 
                                d="M10 30 L65 30 M50 18 L65 30 L50 42" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>

        {/* Content Reveal */}
        <AnimatePresence>
            {showEnterUI && (
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: TIMING.textRevealDuration, delay: TIMING.textRevealDelay, ease: "easeOut" }}
                    className="w-full max-w-4xl mt-6 md:mt-12"
                >
                    <div className="space-y-6 md:space-y-8 text-center">
                        {introText.map((paragraph, i) => (
                            <p 
                                key={i} 
                                className="font-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed drop-shadow-lg"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </main>
  );
}