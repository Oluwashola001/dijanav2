'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- ANIMATION TIMING ---
// SEQUENCE: Enter -> Head -> Notes -> Signature
const TIMING = {
  enter: 0.5,     // 1. Enter Button (Bottom Right) - Fades in first
  head: 2.5,      // 2. Profile Pic (Bottom Left) - After 2 sec wait
  notes: 4.5,     // 3. Notes (Background Layer) - 2 sec after profile pic
  signature: 6.5, // 4. Logo (Top Right) - 2 sec after notes
};

export default function WaterIntroPage() {
  const router = useRouter();
  
  // --- STATE ---
  // Starts TRUE so browser allows autoplay. User must click to unmute.
  const [isMuted, setIsMuted] = useState(true);

  // Audio state
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Start audio on mount (muted)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
    }
  }, []);

  // Toggle Mute & FORCE PLAY if browser blocked autoplay
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
        audioRef.current.muted = nextMuted;
        
        // If unmuting, ensure we force play in case browser paused it
        if (!nextMuted && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.error("Force play audio", e));
        }
    }
  };

  return (
    <main className="relative w-full h-[100dvh] bg-black overflow-hidden">
      
      {/* 0. AUDIO (Hidden) */}
      <audio 
        ref={audioRef} 
        src="/Music/composition-loop.mp3" 
        loop 
        autoPlay
        muted={isMuted}
      />

      {/* 1. BACKGROUND VIDEO (Water Surface) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* Mobile Video Sources */}
          <source src="/videos/loop-mobile.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/videos/loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          
          {/* Desktop Video Sources */}
          <source src="/videos/loop.webm" type="video/webm" />
          <source src="/videos/loop.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to make elements pop */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* MUTE BUTTON (Top Right) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-50 pointer-events-auto">
          <button 
            onClick={toggleMute}
            className="text-white/70 hover:text-amber-200 transition-colors p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
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

      {/* 2. ELEMENTS LAYER */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        
        {/* ELEMENT A: PROFILE PIC (Bottom Left) */}
        {/* Z-Index 30: Middle Priority */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: TIMING.head, ease: "easeOut" }}
          className="absolute bottom-0 left-0 z-30 w-[55vw] md:w-[45vw] max-w-[400px]"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
          }}
        >
            <img 
                src="/profile-pic.webp" 
                alt="Dijana Profile" 
                className="w-full h-auto object-contain drop-shadow-2xl"
            />
        </motion.div>

        {/* ELEMENT B: NOTES (Full Width Background) */}
        {/* Z-Index 10: Low Priority (Background element) */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, delay: TIMING.notes, ease: "easeOut" }}
            className="absolute inset-0 z-10 flex items-end justify-center"
        >
            <img 
                src="/note.webp" 
                alt="Musical Notes" 
                className="w-full h-full object-cover opacity-80 mix-blend-screen" 
            />
        </motion.div>

        {/* ELEMENT C: SIGNATURE/LOGO (Top Right) */}
        {/* Z-Index 30. Positioned to the left of the Mute button. */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: TIMING.signature, ease: "easeOut" }}
          className="absolute top-2 right-16 md:-top-4 md:right-20 z-30 w-[60vw] md:w-[35vw] max-w-[600px]"
        >
           <img 
               src="/logo.webp" 
               alt="Boshkovich Logo"
               className="w-full h-auto object-contain drop-shadow-lg"
           />
        </motion.div>

        {/* ELEMENT D: ENTER BUTTON (Bottom Right) */}
        {/* Z-Index 50: Highest Priority (Always on top) */}
        <div className="absolute bottom-2 right-4 md:bottom-12 md:right-12 z-50 pointer-events-auto">
          <Link href="/about">
            <motion.button
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: TIMING.enter, ease: "easeOut" }}
                className="font-heading text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1 md:gap-2 hover:scale-105 group"
                style={{ 
                    textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)",
                    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
                }}
                onMouseEnter={(e) => e.currentTarget.style.textShadow = "0px 0px 40px rgba(251, 191, 36, 1), 0px 0px 60px rgba(251, 191, 36, 0.6)"}
                onMouseLeave={(e) => e.currentTarget.style.textShadow = "0px 0px 20px rgba(251, 191, 36, 0.8)"}
            >
                ENTER 
                <motion.svg 
                    width="60" 
                    height="50" 
                    viewBox="0 0 80 60" 
                    fill="none" 
                    className="hidden md:block md:w-12 md:h-10 lg:w-14 lg:h-12"
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
          </Link>
        </div>

      </div>

    </main>
  );
}