'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- COMPONENTS ---

// 1. BACKGROUND
function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; opacity: number; duration: string }[]>([]);

  useEffect(() => {
    const starCount = 40; 
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '2px' : '1px',
      opacity: Math.random() * 0.5 + 0.2,
      duration: `${Math.random() * 3 + 4}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#050B14] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#080f24] via-[#050B14] to-[#02050a]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-900/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-amber-900/10 blur-[180px] rounded-full mix-blend-screen pointer-events-none" 
      />
      <div className="absolute inset-0">
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
// FIXED: Using lowercase .webp extensions to match standard file naming on servers
const slides = [
  { src: '/about/1.jpg', position: 'object-top' },    
  { src: '/about/2.webp', position: 'object-center' }, 
  { src: '/about/3.webp', position: 'object-center' }, // Changed to lowercase
  { src: '/about/4.jpg', position: 'object-top' },    
  { src: '/about/5.webp', position: 'object-center' }, // Changed to lowercase
  { src: '/about/6.webp', position: 'object-center' }, // Changed to lowercase
  { src: '/about/7.webp', position: 'object-top' },    // Changed to lowercase
  { src: '/about/8.webp', position: 'object-top' },    // Changed to lowercase
  { src: '/about/9.webp', position: 'object-center' }, // Changed to lowercase
];

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gray-900" /> 
          <img
            src={slides[index].src}
            alt="Dijana Bošković"
            className={`w-full h-full object-cover relative z-10 ${slides[index].position}`}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <motion.div 
            className="absolute inset-0 z-20"
            animate={{ scale: [1, 1.03], x: [0, 15] }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-[#050B14] via-[#050B14]/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/60 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }} 
          className="max-w-4xl"
        >
          <h2 className="text-amber-200/80 text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4 md:mb-6 shadow-black drop-shadow-lg">
            From classical flutist, improviser, and ensemble leader to composer
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 md:mb-8 font-serif drop-shadow-2xl">
            Dijana Bošković
          </h1>
          <div className="h-px w-24 bg-amber-500/50 mb-6 md:mb-8" />
          <p className="text-lg md:text-2xl text-gray-100 font-light italic max-w-2xl leading-relaxed drop-shadow-lg">
            "A multifaceted musical voice blending classical discipline with jazz improvisation."
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </div>
  );
}

// 3. FLIP CARD COMPONENT
function FlipCard({ frontImage, backImage, alt }: { frontImage: string, backImage: string, alt: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative w-full aspect-4/5 md:aspect-[4/3] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-sm overflow-hidden shadow-2xl border border-white/10">
          <img 
            src={frontImage} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#050B14]/10 mix-blend-multiply transition-colors group-hover:bg-[#050B14]/0" />
          <div className="absolute bottom-4 right-4 text-white/70 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            Flip
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-sm overflow-hidden shadow-2xl border border-white/10"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img 
            src={backImage} 
            alt={`${alt} Alternate`} 
            className="w-full h-full object-cover"
          />
           <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
        </div>
      </motion.div>
    </div>
  );
}


// 4. BIO BLOCKS
function BioBlocks() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      } 
    }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 space-y-20 md:space-y-24">
      
      {/* BLOCK 1 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      >
        <div className="order-2 md:order-1 space-y-4 md:space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-2">
            The Foundation
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-base md:text-lg">
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
        <div className="order-1 md:order-2">
           {/* Fixed: Lowercase .webp */}
           <FlipCard 
             frontImage="/about/block1.jpg" 
             backImage="/about/block1-back.webp" 
             alt="Dijana Performing" 
           />
        </div>
      </motion.section>

      {/* BLOCK 2 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      >
        <div className="order-1">
           {/* Fixed: Lowercase .webp */}
           <FlipCard 
             frontImage="/about/block2.webp" 
             backImage="/about/block2-back.webp" 
             alt="Versus Vox Ensemble" 
           />
        </div>
        <div className="order-2 space-y-4 md:space-y-6">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-2">
            Versus Vox
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-base md:text-lg">
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
        viewport={{ once: true, margin: "-10%" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      >
        <div className="order-2 md:order-1 space-y-4 md:space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-2">
            Recognition & Awards
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-base md:text-lg">
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
        <div className="order-1 md:order-2">
           {/* Fixed: Lowercase .webp */}
           <FlipCard 
             frontImage="/about/block3.webp" 
             backImage="/about/block3-back.webp" 
             alt="Award Ceremony" 
           />
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
        {/* FIX: Reduced Spacer Height */}
        <div className="h-12 md:h-20 bg-linear-to-b from-transparent to-[#050B14]/80 pointer-events-none" />
        
        <BioBlocks />
        
        {/* 4. Link back to Work (Now at /work) */}
        <div className="flex justify-center mt-12 md:mt-16">
           <a href="/work">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/80 backdrop-blur-md rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              View Musical Works
            </motion.button>
           </a>
        </div>
      </div>

    </main>
  );
}