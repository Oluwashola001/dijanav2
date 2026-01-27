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
    <>
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
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
        {/* TO ADJUST SIZE: Change w-[65vw] h-[70vh] for mobile, md:max-w-[500px] for desktop max size */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: TIMING.head, ease: "easeOut" }}
          className="absolute bottom-0 left-0 z-30 w-[65vw] h-[70vh] md:w-[55vw] md:h-auto md:max-w-[650px]"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
          }}
        >
            {/* Mobile Image - TO ADJUST: Change w-full, h-full, object-top */}
            <img 
                src="/profile-pic-mobile.webp" 
                alt="Dijana Profile" 
                className="md:hidden w-full h-full object-cover object-top drop-shadow-2xl"
            />
            {/* Desktop Image - TO ADJUST: Change w-full */}
            <img 
                src="/profile-pic.webp" 
                alt="Dijana Profile" 
                className="hidden md:block w-full h-auto object-contain drop-shadow-2xl"
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
        {/* TO ADJUST SIZE: Change w-[70vw] for mobile, md:w-[40vw] for desktop, max-w-[700px] for max size */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: TIMING.signature, ease: "easeOut" }}
          className="absolute top-2 right-6 md:-top-10 md:right-6 z-30 w-[100vw] md:w-[60vw] max-w-[900px]"
        >
           <img 
               src="/logo.webp" 
               alt="Boshkovich Logo"
               className="w-full h-auto object-contain drop-shadow-lg"
           />
        </motion.div>

        {/* ELEMENT D: ENTER BUTTON (Bottom Right) */}
        {/* Z-Index 50: Highest Priority (Always on top) */}
        {/* TO CHANGE COLOR BACK TO BLACK: Change text-[#223c5e] to text-black */}
        <div className="absolute bottom-4 right-2 md:bottom-12 md:right-12 z-50 pointer-events-auto">
          <Link href="/about">
            <motion.button
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)"
                }}
                transition={{ 
                  opacity: { duration: 1.5, delay: TIMING.enter, ease: "easeOut" },
                  filter: { duration: 1.5, delay: TIMING.enter, ease: "easeOut" }
                }}
                className="relative text-2xl md:text-4xl lg:text-5xl font-bold text-[#223c5e] px-8 py-4 md:px-12 md:py-5 bg-white rounded-full shadow-2xl cursor-pointer flex items-center gap-2 md:gap-3 transition-all duration-300 active:scale-95 md:active:scale-100 md:hover:bg-[#d4e3f0] overflow-hidden group"
            >
                {/* Glass slide effect on hover (desktop only) */}
                <span className="hidden md:block absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                ENTER 
                <motion.svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 80 60" 
                    fill="none" 
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
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
    </>
  );
}