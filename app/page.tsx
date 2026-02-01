'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- ANIMATION TIMING ---
// Water video plays alone for 5 seconds, then elements fade in
const TIMING = {
  waterAlone: 2,      // Water video plays alone for 5 seconds
  noteAndProfile: 3,  // Note + Profile pic start rising from underwater (after 5s)
  logoAndEnter: 6,    // Logo + Enter fade in (2s after note started)
  blueBg: 10,          // Blue background fades in (same time as logo/enter)
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
        - Change delay: TIMING.blueBg to your desired seconds
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: TIMING.blueBg, ease: "easeOut" }}
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
        
        {/* NOTE IMAGE (With spacing - rises from underwater) */}
        {/* 
          🔧 TO ADJUST NOTE SPACING (Currently 6px top/bottom, 12px left/right):
          - Find: style={{ padding: '6px 12px' }}
          - Change to: style={{ padding: 'TOPpx LEFTRIGHTpx' }}
          - Example: style={{ padding: '10px 20px' }} = 10px top/bottom, 20px left/right
          
          🔧 TO ADJUST NOTE FADE-IN TIME:
          - Change delay: TIMING.noteAndProfile
          
          🔧 TO ADJUST "RISING FROM UNDERWATER" DISTANCE:
          - Change initial={{ opacity: 0, y: 100 }} - larger number = rises from further down
        */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, delay: TIMING.noteAndProfile, ease: "easeOut" }}
          className="absolute inset-0 z-20 flex items-center justify-center px-8 py-8 md:px-[142px] md:py-8"
        >
          <img 
            src="/note.webp" 
            alt="Musical Notes" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* PROFILE PIC (Positioned on the note) */}
        {/* 
          🔧 TO ADJUST PROFILE PIC SIZE:
          MOBILE:
          - w-[65vw] = width (65% of viewport width)
          - h-[70vh] = height (70% of viewport height)
          
          DESKTOP (md: prefix):
          - md:w-[55vw] = width on desktop
          - md:max-w-[450px] = maximum width limit
          
          Example: To make smaller, change to w-[50vw] h-[60vh] md:w-[40vw] md:max-w-[350px]
          
          🔧 TO ADJUST PROFILE PIC POSITION:
          - bottom-0 left-0 = positioned at bottom-left corner
          - Change to: bottom-[10px] left-[20px] for custom positioning
          - Or use: bottom-4 left-4 (Tailwind spacing: 4 = 16px)
        */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, delay: TIMING.noteAndProfile, ease: "easeOut" }}
          className="absolute bottom-8 left-8 md:left-35.5 md:bottom-8 z-30 w-[65vw] h-[70vh] md:w-[45vw] md:h-auto md:max-w-[400px]"
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

        {/* LOGO (Positioned on the note - Top Right area) */}
        {/* 
          🔧 TO ADJUST LOGO SIZE:
          MOBILE:
          - w-[100vw] = width (100% of viewport width)
          
          DESKTOP:
          - md:w-[60vw] = width on desktop (60% of viewport)
          - max-w-[900px] = maximum width limit
          
          Example: To make smaller, change to w-[80vw] md:w-[50vw] max-w-[700px]
          
          🔧 TO ADJUST LOGO POSITION:
          - top-2 right-6 = 8px from top, 24px from right (mobile)
          - md:-top-10 md:right-6 = -40px from top (negative = goes up!), 24px from right (desktop)
          
          To move logo down: Change top-2 to top-10 (40px from top)
          To move logo left: Change right-6 to right-12 (48px from right)
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: TIMING.logoAndEnter, ease: "easeOut" }}
          className="absolute top-2 right-0 md:-top-2 md:right-22 z-30 w-[100vw] md:w-[60vw] max-w-[700px]"
        >
          <img 
            src="/logo.webp" 
            alt="Boshkovich Logo"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* ENTER IMAGE (Positioned on the note - Bottom Right area) */}
        {/* 
          🔧 TO ADJUST ENTER IMAGE SIZE:
          - w-32 = width mobile (128px)
          - md:w-48 = width tablet (192px)
          - lg:w-64 = width desktop (256px)
          
          Example: To make smaller, change to w-24 md:w-32 lg:w-40
          To make larger, change to w-40 md:w-56 lg:w-80
          
          🔧 TO ADJUST ENTER IMAGE POSITION:
          - bottom-4 right-2 = 16px from bottom, 8px from right (mobile)
          - md:bottom-12 md:right-12 = 48px from bottom, 48px from right (desktop)
          
          To move closer to corner: Change to bottom-2 right-2 md:bottom-4 md:right-4
          To move further from corner: Change to bottom-8 right-8 md:bottom-20 md:right-20
        */}
        <div className="absolute bottom-6 -right-12 md:bottom-6 md:right-24 z-40 pointer-events-auto">
          <Link href="/about">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: TIMING.logoAndEnter, ease: "easeOut" }}
              className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <img 
                src="/enter.webp" 
                alt="Enter" 
                className="w-64 h-auto md:w-64 lg:w-86 drop-shadow-2xl"
              />
            </motion.div>
          </Link>
        </div>

      </div>

    </main>
    </>
  );
}