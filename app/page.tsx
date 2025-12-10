'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- COMPONENTS INLINED TO PREVENT IMPORT ERRORS ---

// 1. STARRY BACKGROUND
function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; opacity: number; duration: string }[]>([]);

  useEffect(() => {
    const starCount = 70; 
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '3px' : '2px',
      opacity: Math.random() * 0.5 + 0.1,
      duration: `${Math.random() * 3 + 3}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#050B14]">
      {/* Tailwind v4 syntax */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0e1c3d] via-[#050B14] to-[#000000]" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 2. HERO SLIDESHOW
const images = [
  '/about/1.jpg',
  '/about/2.jpg',
  '/about/3.jpg',
  '/about/4.jpg',
];

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gray-800" /> 
          <img
            src={images[index]}
            alt="Dijana Bošković"
            className="w-full h-full object-cover object-center relative z-10"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
            }}
          />
          <motion.div 
            className="absolute inset-0 z-20"
            animate={{ scale: [1, 1.05], x: [0, 10] }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-[#050B14] via-[#050B14]/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-[#0e1c3d]/20 z-10 mix-blend-overlay" />

      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl"
        >
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

// 3. BIO BLOCKS
function BioBlocks() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const
      } 
    }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
      
      {/* BLOCK 1 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 md:order-1 space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            The Foundation
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              <strong className="text-white font-normal">German-Serbian Composer & Flutist.</strong> Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the <span className="text-amber-200">October Prize of the City of Belgrade</span> and multiple first prizes at national competitions.
            </p>
            <p>
              She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification.
            </p>
            <p className="italic text-white/60 text-base border-l border-amber-500/30 pl-4 mt-4">
              "Renowned festivals including the Schleswig-Holstein Music Festival, the BEMUS Festival in Belgrade, and the Hohenloher Kultursommer."
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2 relative group">
           <div className="absolute inset-0 bg-amber-500/10 blur-2xl -z-10 group-hover:bg-amber-500/20 transition-all duration-700" />
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img src="/about/block1.jpg" alt="Dijana Performing" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>
      </motion.section>

      {/* BLOCK 2 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-1 relative group">
           <div className="absolute inset-0 bg-blue-500/10 blur-2xl -z-10 group-hover:bg-blue-500/20 transition-all duration-700" />
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img src="/about/block2.jpg" alt="Versus Vox Ensemble" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>
        <div className="order-2 space-y-6">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            Versus Vox
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten, along with jazz performances in venues such as the Münchner Unterfahrt, shaped her multifaceted musical voice.
            </p>
            <p>
              In 2005, she founded the <strong className="text-white font-normal">Versus Vox Ensemble</strong> in Munich, blending her own compositions with works by other contemporary and historical composers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 3 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 md:order-1 space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            Recognition & Awards
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater. The chamber orchestra work <span className="text-white font-serif italic">“Concerto for Strings”</span> has been broadcast on leading European radio stations.
            </p>
            <div className="mt-6 p-6 border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm rounded-sm">
              <p className="text-amber-200 font-serif text-xl italic text-center">
                "1st Prize at the International Choral Music Competition 2017"
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 relative group">
           <div className="absolute inset-0 bg-amber-500/10 blur-2xl -z-10 group-hover:bg-amber-500/20 transition-all duration-700" />
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img src="/about/block3.jpg" alt="Award Ceremony" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>
      </motion.section>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050B14] text-white overflow-x-hidden selection:bg-amber-500/30">
      
      {/* 1. Global Atmospheric Background */}
      <StarryBackground />

      {/* 2. "Little Movie" Hero Section */}
      <HeroSlideshow />

      {/* 3. The Zig-Zag Bio Content */}
      <div className="relative z-10 pb-24">
        {/* Tailwind v4 gradient syntax */}
        <div className="h-32 bg-linear-to-b from-transparent to-[#050B14]/50 pointer-events-none" />
        
        <BioBlocks />
        
        {/* 4. Link back to Work (Now at /work) */}
        <div className="flex justify-center mt-12">
           <a href="/work">
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/80 backdrop-blur-md"
            >
              View Musical Works
            </motion.button>
           </a>
        </div>
      </div>

    </main>
  );
}