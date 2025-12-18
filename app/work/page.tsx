'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';

// --- DATA ---
const instrumentalCategories = [
  "Large Orchestra",
  "String Orchestra",
  "Chamber Music for Larger Ensemble",
  "Piano & Ensemble",
  "Flute & Ensemble",
  "Strings & Ensemble"
];

const vocalCategories = [
  "Voice & Ensemble",
  "Chorus"
];

// --- COMPONENTS ---

// 1. TREE BACKGROUND
function TreeBackground({ onGolden }: { onGolden: () => void }) {
  const [showIntro, setShowIntro] = useState(true);

  // FIX: Trigger the "Golden" state (text animation) exactly at 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onGolden();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onGolden]);

  return (
    // FIX 1: Changed from 'fixed -z-10' to 'absolute inset-0 z-0'
    // This ensures the video sits ON TOP of the global body background, but BEHIND the text.
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#223C5E] z-0">
      
      {/* IDLE VIDEO (Looping) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      >
        {/* Mobile Source */}
        <source src="/videos/work-idle-mobile.webm" type="video/webm" media="(max-width: 768px)" />
        {/* Desktop Source */}
        <source src="/videos/work-idle.webm" type="video/webm" />
      </video>

      {/* INTRO VIDEO (Plays once) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-10 bg-[#223C5E]"
          >
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => {
                setShowIntro(false);
              }}
              className="w-full h-full object-cover object-center"
            >
              {/* Mobile Source */}
              <source src="/videos/work-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
              {/* Desktop Source */}
              <source src="/videos/work-intro.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// 2. CATEGORY LIST (DESKTOP VERSION)
// Items rise from ground first (bottom to top), then title appears at the end
function DesktopCategoryList({ title, items, align = 'left', startAnim }: { title: string, items: string[], align?: 'left' | 'right', startAnim: boolean }) {
  const totalItems = items.length;
  
  return (
    <div className={`flex flex-col gap-6 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      
      {/* Title (Appears LAST after all items) */}
      <motion.h3
        initial={{ opacity: 0, y: 80 }}
        animate={startAnim ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 1.2, 
          delay: 0.5 + (totalItems * 0.15) + 0.3, // Appears after all items
          ease: [0.22, 1, 0.36, 1] // Custom easing for smooth entrance
        }}
        className="font-heading text-amber-200/90 text-sm md:text-base tracking-[0.2em] uppercase border-b border-amber-500/30 pb-2 mb-4"
      >
        {title}
      </motion.h3>

      {/* List Items (Rise from ground, bottom to top) */}
      <div className={`flex flex-col gap-4 ${align === 'right' ? 'items-end' : 'items-start'}`}>
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 100, scale: 0.95 }} 
            animate={startAnim ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ 
              duration: 1, 
              delay: 0.5 + (index * 0.15), // Staggered appearance
              ease: [0.22, 1, 0.36, 1] // Smooth cinematic easing
            }}
            className="group cursor-default"
          >
            <motion.span 
              className="font-heading text-lg md:text-2xl text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-md inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 3. CATEGORY LIST (MOBILE VERSION)
// Items pull down from top in CORRECT order (last item first), then title appears above
function MobileCategoryList({ title, items, startAnim, delayOffset = 0 }: { title: string, items: string[], startAnim: boolean, delayOffset?: number }) {
  // Reverse items so "Strings & Ensemble" (last in array) appears first
  const reversedItems = [...items].reverse();
  const totalItems = items.length;

  return (
    <div className="flex flex-col gap-2 items-start text-left w-full">
      
      {/* Title (Appears LAST, at the top) */}
      <motion.h3
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={startAnim ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
            duration: 1, 
            delay: delayOffset + (totalItems * 0.18) + 0.3, // Appears after all items
            ease: [0.22, 1, 0.36, 1]
        }}
        className="font-heading text-amber-200/90 text-xs tracking-[0.2em] uppercase border-b border-amber-500/30 pb-1 mb-1 w-full"
      >
        {title}
      </motion.h3>

      {/* List Items (Pull down from top, last item shows first) */}
      <div className="flex flex-col gap-2 items-start pl-2 w-full">
        {reversedItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -50, scale: 0.9 }} 
            animate={startAnim ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: delayOffset + (index * 0.18),
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group cursor-default w-full"
          >
            <motion.span 
              className="font-heading text-sm text-white/90 drop-shadow-md inline-block"
              whileHover={{ 
                scale: 1.03,
                textShadow: "0 0 15px rgba(251, 191, 36, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

// --- MAIN PAGE ---

export default function WorkPage() {
  const [isTreeGolden, setIsTreeGolden] = useState(false);

  // Calculate Mobile Delays
  // Instrumental: 6 items + 1 Title. Each item takes 0.18s delay
  const instrumentalDuration = (instrumentalCategories.length * 0.18) + 0.3 + 0.2; // items + title delay + buffer

  return (
    // FIX 2: Ensure main has relative positioning so the absolute video fits inside
    <main className="relative min-h-screen w-full overflow-hidden text-white bg-transparent">
      
      {/* 1. Background Video Logic */}
      <TreeBackground onGolden={() => setIsTreeGolden(true)} />

      {/* 2. DESKTOP Content Layout (Visible md:flex) */}
      <div className="hidden md:flex absolute inset-0 z-30 flex-row items-end justify-between px-6 md:px-20 pb-16 md:pb-24 max-w-7xl mx-auto w-full h-full pointer-events-none">
        <div className="w-1/3 mb-0 pointer-events-auto">
          <DesktopCategoryList 
            title="Instrumental Music" 
            items={instrumentalCategories} 
            align="left"
            startAnim={isTreeGolden} 
          />
        </div>
        <div className="w-1/3" /> {/* Spacer for Tree */}
        <div className="w-1/3 pointer-events-auto">
          <DesktopCategoryList 
            title="Vocal Music" 
            items={vocalCategories} 
            align="right"
            startAnim={isTreeGolden}
          />
        </div>
      </div>

      {/* 3. MOBILE Content Layout (Visible md:hidden) */}
      {/* Placed at the TOP, leaving space for home button */}
      <div className="flex md:hidden absolute inset-0 z-30 flex-row items-start justify-between px-4 pt-20 max-w-full w-full h-full pointer-events-none">
        
        {/* Left Column: Instrumental */}
        <div className="w-[48%] pointer-events-auto">
          <MobileCategoryList 
            title="Instrumental Music" 
            items={instrumentalCategories} 
            startAnim={isTreeGolden}
            delayOffset={0.5} // Start shortly after tree becomes golden
          />
        </div>

        {/* Right Column: Vocal */}
        <div className="w-[48%] pointer-events-auto mt-8"> 
          {/* Added top margin to stagger visually or just let delay handle it */}
          <MobileCategoryList 
            title="Vocal Music" 
            items={vocalCategories} 
            startAnim={isTreeGolden}
            delayOffset={0.5 + instrumentalDuration + 0.5} // Starts after Instrumental finishes
          />
        </div>

      </div>

      {/* 4. Navigation Back */}
      <a href="/" className="absolute top-8 left-8 z-40 text-white/50 hover:text-amber-200 transition-colors uppercase text-xs tracking-widest font-body">
        ← Home
      </a>

    </main>
  );
}