'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundProps {
  isZoomed?: boolean;
}

export default function CinematicBackground({ isZoomed = false }: BackgroundProps) {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  return (
    <div className="fixed inset-0 w-full h-dvh overflow-hidden bg-black -z-10">
      
      {/* ZOOM CONTAINER */}
      <div 
        className={`
          relative w-full h-dvh 
          transition-all duration-1500 ease-in-out
          ${isZoomed ? 'scale-125 blur-sm brightness-50' : 'scale-100 blur-0 brightness-100'}
        `}
      >
        {/* 1. IDLE VIDEO (Always present in background) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-dvh object-cover"
        >
          <source src="/videos/hero-tree-idle.webm" type="video/webm" />
          <source src="/videos/hero-tree-idle.mp4" type="video/mp4" />
        </video>

        {/* 2. INTRO VIDEO (Overlays the idle video, then disappears) */}
        <AnimatePresence>
          {isIntroPlaying && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-10"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={() => setIsIntroPlaying(false)}
                className="w-full h-dvh object-cover"
              >
                <source src="/videos/hero-tree-intro.webm" type="video/webm" />
                <source src="/videos/hero-tree-intro.mp4" type="video/mp4" />
              </video>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-20" />
      </div>
    </div>
  );
}