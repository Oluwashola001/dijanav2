'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The "Little Movie" component.
// Uses the Ken Burns effect (slow pan/zoom) to make static photos feel cinematic.

const images = [
  '/about/1.jpg',
  '/about/2.jpg',
  '/about/3.jpg',
  '/about/4.jpg',
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change image every 6 seconds for a slow, classical pace
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 1. The Image Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }} // Slow crossfade
        >
          {/* We use a standard img tag here controlled by motion.div wrapper for performance */}
          <img
            src={images[index]}
            alt="Dijana Boskovic"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Ken Burns gentle movement effect separate from fade */}
          <motion.div 
            className="absolute inset-0"
            animate={{ scale: [1, 1.05], x: [0, 10] }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Cinematic Overlays */}
      {/* Dark gradient from bottom to make text readable */}
      <div className="absolute inset-0 bg-linear-to-t from-[#050B14] via-[#050B14]/40 to-transparent z-10" />
      {/* Blue tint overlay to blend photos with the theme */}
      <div className="absolute inset-0 bg-[#0e1c3d]/20 z-10 mix-blend-overlay" />

      {/* 3. The Hero Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl"
        >
          {/* The "Hero Sentence" she requested */}
          <h2 className="text-amber-200/80 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6">
            From classical flutist, improviser, and ensemble leader to composer
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8 font-serif">
            Dijana Bošković
          </h1>

          <div className="h-px w-24 bg-amber-500/50 mb-8" />
          
          <p className="text-lg md:text-xl text-gray-200 font-light italic max-w-xl leading-relaxed">
            "A multifaceted musical voice blending classical discipline with jazz improvisation."
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </div>
  );
}