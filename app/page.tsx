'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- ANIMATION TIMING ---
// 🔧 ADJUST THESE VALUES TO CONTROL WHEN EACH ELEMENT APPEARS
const TIMING = {
  waterAlone: 2,           // Water video plays alone for 2 seconds
  noteAndLogo: 2,          // Note + Logo start appearing (after water alone time)
  profileAndEnter: 5.5,    // Profile pic + Enter start appearing
  textLine1: 8.0,          // First text line "DIJANA BOSHKOVICH" appears (after profile + enter)
  textLine2: 9.0,          // Second text line "COMPOSER & FLUTIST" appears (1 second after first line)
  blueBg: 10,              // Blue background fades in last
};

// --- ANIMATION DURATIONS (How long fade-in takes) ---
// 🔧 INCREASE THESE VALUES TO MAKE ANIMATIONS MORE SUBTLE/SLOWER
// 🔧 DECREASE THESE VALUES TO MAKE ANIMATIONS FASTER
const DURATIONS = {
  noteAndLogo: 4.0,        // How long Note + Logo take to fully fade in (seconds) - SLOW & CINEMATIC
  profileAndEnter: 2.5,    // How long Profile + Enter take to fully fade in (seconds)
  textLines: 1.5,          // How long each text line takes to fade in (seconds)
  blueBg: 1.5,             // How long blue background takes to fade in (seconds)
};

// --- RISING DISTANCES (For "underwater" effect) ---
// 🔧 LARGER VALUES = ELEMENTS RISE FROM FURTHER DOWN
const RISE = {
  noteAndProfile: 100,     // Distance note and profile rise from (pixels)
};

export default function WaterIntroPage() {
  const router = useRouter();
  
  // --- STATE ---
  // Video starts MUTED to allow autoplay (browser requirement)
  const [isMuted, setIsMuted] = useState(true);

  // Video ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Must start muted for autoplay
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, []);
  
  // Toggle video mute
  const toggleMute = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  };

  return (
    <>
      <main className="relative w-full h-[100dvh] bg-black overflow-hidden">

      {/* 1. WATER VIDEO (Full Width Background - with baked-in audio) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted // Starts muted for autoplay compliance
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          {/* WebM first, then MP4 fallback */}
          <source src="/videos/water-new.webm" type="video/webm" />
          <source src="/videos/water-new.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. BLUE BACKGROUND (Full Width - Fades in LAST, covers water completely) */}
      {/* 
        🔧 TO ADJUST BLUE BACKGROUND FADE-IN TIME:
        - Change TIMING.blueBg in the constants at the top
        - Change DURATIONS.blueBg to adjust how slowly it fades in
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATIONS.blueBg, delay: TIMING.blueBg, ease: "easeOut" }}
        className="absolute inset-0 z-10"
      >
        <img 
          src="/background.webp" 
          alt="Blue Background" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* MUTE BUTTON (Top Right) */}
      <div className="absolute top-2 right-2 md:top-8 md:right-10 z-50 pointer-events-auto">
        <button 
          onClick={toggleMute}
          className="text-white/70 hover:text-amber-200 transition-colors p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? (
            // Muted Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            // Unmuted Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>

      {/* 3. CONTENT LAYER */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        
        {/* ==================== PHASE 1: NOTE + LOGO (Appear Together First) ==================== */}
        
        {/* NOTE IMAGE (With spacing - rises from underwater) */}
        {/* 
          🔧 TO ADJUST NOTE FADE-IN:
          - Change TIMING.noteAndLogo to control when it starts appearing
          - Change DURATIONS.noteAndLogo to control how slowly it fades in
          - Change RISE.noteAndProfile to control rising distance
        */}
        <motion.div
          initial={{ opacity: 0, y: RISE.noteAndProfile }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.noteAndLogo, delay: TIMING.noteAndLogo, ease: "easeOut" }}
          className="absolute inset-0 z-20 flex items-center justify-center px-0 py-8 md:px-[142px] md:py-0"
        >
          <img 
            src="/note.webp" 
            alt="Musical Notes" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* LOGO (Appears with Note - GLUED TOGETHER with same animation) */}
        {/* 
          🔧 TO ADJUST LOGO SIZE:
          - w-[100vw] = width mobile (100% of viewport)
          - md:w-[65vw] = width desktop (65% of viewport)
          - max-w-[750px] = maximum width limit
          
          🔧 TO ADJUST LOGO POSITION:
          - top-2 = 8px from top (mobile)
          - right-0 = 0px from right (mobile)
          - md:-top-2 = -8px from top (desktop, negative goes UP)
          - md:right-22 = custom right spacing (desktop)
        */}
        <motion.div
          initial={{ opacity: 0, y: RISE.noteAndProfile }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.noteAndLogo, delay: TIMING.noteAndLogo, ease: "easeOut" }}
          className="absolute top-2 right-0 md:-top-2 md:right-22 z-30 w-[100vw] md:w-[65vw] max-w-[750px]"
        >
          <img 
            src="/logo.webp" 
            alt="Boshkovich Logo"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* ==================== PHASE 2: PROFILE PIC + TEXT + ENTER (Appear Together After) ==================== */}

        {/* PROFILE PIC (Positioned on the note) */}
        {/* 
          🔧 TO ADJUST PROFILE PIC SIZE:
          MOBILE:
          - w-[65vw] = width (65% of viewport width)
          - h-[70vh] = height (70% of viewport height)
          
          DESKTOP (md: prefix):
          - md:w-[70vw] = width on desktop
          - md:max-w-[600px] = maximum width limit
          
          🔧 TO ADJUST PROFILE PIC POSITION:
          - bottom-8 left-0 = positioned at bottom (mobile)
          - md:left-35.5 md:bottom-0 = desktop positioning
        */}
        <motion.div
          initial={{ opacity: 0, y: RISE.noteAndProfile }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.profileAndEnter, delay: TIMING.profileAndEnter, ease: "easeOut" }}
          className="absolute bottom-8 left-0 md:left-35.5 md:bottom-0 z-30 w-[65vw] h-[70vh] md:w-[70vw] md:h-auto md:max-w-[600px]"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
          }}
        >
          {/* Mobile Image */}
          <img 
            src="/profile-pic-mobile.webp" 
            alt="Dijana Profile" 
            className="md:hidden w-full h-full object-cover object-top drop-shadow-2xl"
          />
          {/* Desktop Image */}
          <img 
            src="/profile-pic.webp" 
            alt="Dijana Profile" 
            className="hidden md:block w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* WHITE TEXT OVERLAY (In front of profile picture - APPEARS LAST, LINE BY LINE) */}
        {/* 
          🔧 TO ADJUST TEXT POSITION:
          
          MOBILE:
          - bottom-[25vh] = Distance from bottom (25% of viewport height)
          - left-[68vw] = Distance from left (68% of viewport width)
          
          DESKTOP:
          - md:bottom-[30vh] = Distance from bottom on desktop
          - md:left-[36vw] = Distance from left on desktop
          
          EXAMPLES:
          - To move text UP: Increase bottom value (e.g., bottom-[35vh])
          - To move text DOWN: Decrease bottom value (e.g., bottom-[15vh])
          - To move text LEFT: Decrease left value (e.g., left-[30vw])
          - To move text RIGHT: Increase left value (e.g., left-[40vw])
          
          🔧 TO ADJUST TEXT SIZE:
          - text-3xl = mobile size (1.875rem / 30px)
          - md:text-6xl = desktop size (3.75rem / 60px)
          
          Available sizes: text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl, text-7xl, text-8xl, text-9xl
          
          🔧 TO ADJUST TEXT TIMING:
          - TIMING.textLine1 = when first line appears (currently 8.0s)
          - TIMING.textLine2 = when second line appears (currently 9.0s)
          - DURATIONS.textLines = how long fade-in takes (currently 1.5s)
          
          🔧 TO ADJUST TEXT SPACING:
          - leading-tight = line height (space between two lines)
          
          Available: leading-none, leading-tight, leading-snug, leading-normal, leading-relaxed
        */}
        <div className="absolute bottom-[56vh] left-[42vw] md:bottom-[30vh] md:left-[36vw] z-40 pointer-events-none"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          <div className="text-white font-bold text-3xl md:text-6xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {/* First Line - Appears First */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATIONS.textLines, delay: TIMING.textLine1, ease: "easeOut" }}
            >
              DIJANA BOSHKOVICH
            </motion.div>
            
            {/* Second Line - Appears After First Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATIONS.textLines, delay: TIMING.textLine2, ease: "easeOut" }}
            >
              COMPOSER & FLUTIST
            </motion.div>
          </div>
        </div>

        {/* ENTER BUTTON (Appears with Profile + Text) */}
        {/* 
          🔧 TO ADJUST ENTER IMAGE SIZE:
          - w-64 = width mobile (256px)
          - md:w-72 = width tablet (288px)
          - lg:w-108 = width desktop (432px)
          
          🔧 TO ADJUST ENTER IMAGE POSITION:
          - bottom-6 = 24px from bottom (mobile)
          - -right-12 = -48px from right (mobile, negative goes OFF screen right)
          - md:bottom-6 md:right-24 = desktop positioning
        */}
        <div className="absolute bottom-6 -right-12 md:bottom-6 md:right-24 z-40 pointer-events-auto">
          <Link href="/about">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATIONS.profileAndEnter, delay: TIMING.profileAndEnter, ease: "easeOut" }}
              className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <img 
                src="/enter.webp" 
                alt="Enter" 
                className="w-64 h-auto md:w-72 lg:w-108 drop-shadow-2xl"
              />
            </motion.div>
          </Link>
        </div>

      </div>

    </main>
    </>
  );
}