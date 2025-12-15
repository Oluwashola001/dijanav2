'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const overlayBlocks = [
  {
    id: 1,
    start: 0,
    end: 4,
    position: "top-left",
    lines: [
      { text: "Dijana Bošković", className: "font-heading text-4xl md:text-6xl text-white font-bold" },
      { text: "German-Serbian Composer & Flutist", className: "font-heading text-xl md:text-2xl text-amber-200/90 italic" }
    ]
  },
  {
    id: 2,
    start: 5,
    end: 30,
    position: "right",
    lines: [
      { text: "Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "receiving the October Prize of the City of Belgrade and multiple first prizes at national competitions.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "earning both the Artistic Diploma and Master Class certification.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" }
    ]
  },
  {
    id: 3,
    start: 31,
    end: 52,
    position: "left",
    lines: [
      { text: "Flute & Performances", className: "font-heading text-2xl md:text-3xl text-amber-200/90 italic mb-2" },
      { text: "As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "and at renowned festivals including the Schleswig-Holstein Music Festival, the BEMUS Festival in Belgrade,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "and the Hohenloher Kultursommer.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "along with jazz performances shaped her multifaceted musical voice.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" }
    ]
  },
  {
    id: 4,
    start: 57,
    end: 77,
    position: "top-center",
    lines: [
      { text: "Versus Vox & Composition Studies", className: "font-heading text-2xl md:text-3xl text-amber-200/90 italic mb-2" },
      { text: "In 2005, she founded the Versus Vox Ensemble in Munich, which she has led ever since,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "blending her own compositions with works by other contemporary and historical composers.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "culminated in the orchestral project 'ONE', premiered by the Symphonikern Hamburg.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" }
    ]
  },
  {
    id: 5,
    start: 83,
    end: 91,
    position: "top-center",
    lines: [
      { text: "\"The work bridges Western and Eastern classical music,", className: "text-white/90 font-body text-xl md:text-2xl leading-relaxed italic text-center" },
      { text: "exploring new forms of notation and performance practice.\"", className: "text-white/90 font-body text-xl md:text-2xl leading-relaxed italic text-center" }
    ]
  },
  {
    id: 6,
    start: 92,
    end: 108,
    position: "left",
    lines: [
      { text: "Works, Performances & Awards", className: "font-heading text-2xl md:text-3xl text-amber-200/90 italic mb-2" },
      { text: "Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater,", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "performed by the Chamber Orchestra Solisten from St. Petersburg, members of the Munich Philharmonic", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "and Frankfurt Opera, at the BEMUS Music Festival in Belgrade, and the Tiroler Volksschauspiele.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" },
      { text: "The chamber orchestra work 'Concerto for Strings' has been broadcast on leading European radio stations.", className: "text-white/90 font-body text-base md:text-lg leading-relaxed" }
    ]
  },
  {
    id: 7,
    start: 117,
    end: 132,
    position: "top-center",
    lines: [
      { text: "For 'Lichtspiele', she received support from the Ernst von Siemens Art Foundation", className: "text-white/90 font-body text-lg md:text-xl leading-relaxed text-center" },
      { text: "and the Gerhard Trede Foundation, and in 2017 won 1st Prize", className: "text-white/90 font-body text-lg md:text-xl leading-relaxed text-center" },
      { text: "at the International Choral Music Competition organized by the German Choir Association.", className: "text-white/90 font-body text-lg md:text-xl leading-relaxed text-center" }
    ]
  }
];

// --- COMPONENTS ---

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover object-center md:scale-100 scale-105"
      >
        <source src="/videos/splashm.webm" type="video/webm" media="(max-width: 768px)" />
        <source src="/videos/splash.webm" type="video/webm" />
      </video>
    </motion.div>
  );
}

function TextBlockWithLineAnimation({ 
  block, 
  currentTime, 
  positionClasses 
}: { 
  block: typeof overlayBlocks[0], 
  currentTime: number, 
  positionClasses: string 
}) {
  const duration = block.end - block.start;
  const progress = (currentTime - block.start) / duration;
  
  const totalLines = block.lines.length;
  const slideInDuration = 0.5; // 50% of time for slide-in
  const eraseStartProgress = 0.75; // Start erasing at 75%
  
  const getLineVisibility = (lineIndex: number) => {
    const timePerLine = slideInDuration / totalLines;
    const lineSlideInStart = lineIndex * timePerLine;
    const lineSlideInEnd = lineSlideInStart + timePerLine;
    
    const reverseIndex = totalLines - 1 - lineIndex;
    const eraseTimePerLine = (1 - eraseStartProgress) / totalLines;
    const lineEraseStart = eraseStartProgress + (reverseIndex * eraseTimePerLine);
    const lineEraseEnd = lineEraseStart + eraseTimePerLine;
    
    if (progress < lineSlideInStart) {
      return { opacity: 0, x: -50, visible: false };
    } else if (progress >= lineSlideInStart && progress < lineSlideInEnd) {
      const slideProgress = (progress - lineSlideInStart) / timePerLine;
      return { 
        opacity: slideProgress, 
        x: -50 * (1 - slideProgress),
        visible: true 
      };
    } else if (progress >= lineSlideInEnd && progress < lineEraseStart) {
      return { opacity: 1, x: 0, visible: true };
    } else if (progress >= lineEraseStart && progress < lineEraseEnd) {
      const eraseProgress = (progress - lineEraseStart) / eraseTimePerLine;
      return { 
        opacity: Math.max(0, 1 - eraseProgress), 
        x: 50 * eraseProgress,
        visible: true 
      };
    } else {
      return { opacity: 0, x: 50, visible: false };
    }
  };
  
  const overlayVisible = progress < 1;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: overlayVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`absolute z-20 p-6 rounded-xl backdrop-blur-md bg-[#223C5E]/30 border border-white/5 shadow-2xl overflow-hidden ${positionClasses}`}
    >
      {block.lines.map((line, lineIndex) => {
        const lineVis = getLineVisibility(lineIndex);
        
        if (!lineVis.visible && lineVis.opacity === 0) return null;
        
        return (
          <motion.div
            key={`line-${lineIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: lineVis.opacity, x: lineVis.x }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={line.className}
          >
            {line.text}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function HeroVideo({ startPlaying }: { startPlaying: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (startPlaying && videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video play error:", e));
    }
  }, [startPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const activeBlock = overlayBlocks.find(block => currentTime >= block.start && currentTime <= block.end);

  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'top-left': return 'top-8 left-8 md:top-20 md:left-8 max-w-md items-start text-left';
      case 'left': return 'top-1/2 -translate-y-1/2 left-8 md:left-20 max-w-lg items-start text-left';
      case 'top-center': return 'top-12 left-1/2 -translate-x-1/2 max-w-2xl items-center text-center';
      case 'right': return 'top-1/2 -translate-y-1/2 right-8 md:right-20 max-w-lg items-start text-left'; 
      default: return 'bottom-20 left-1/2 -translate-x-1/2 max-w-2xl items-center text-center';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        loop 
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover object-center"
      >
        <source src="/videos/about-film.webm" type="video/webm" />
        <source src="/videos/about-film.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#223C5E]/10 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {activeBlock && (
          <TextBlockWithLineAnimation 
            key={activeBlock.id}
            block={activeBlock}
            currentTime={currentTime}
            positionClasses={getPositionClasses(activeBlock.position)}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
        The Journey
      </div>
    </div>
  );
}

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
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[25px] overflow-hidden shadow-2xl border border-white/10">
          <img src={frontImage} alt={alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#223C5E]/20 mix-blend-multiply transition-colors group-hover:bg-transparent" />
          <div className="absolute bottom-4 right-4 text-white/80 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 bg-[#223C5E]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity font-body">Flip</div>
        </div>
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[25px] overflow-hidden shadow-2xl border border-white/10"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img src={backImage} alt={`${alt} Alternate`} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
        </div>
      </motion.div>
    </div>
  );
}

function BioBlocks() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 space-y-32">
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
          <div>
            <h2 className="font-heading text-3xl text-white font-bold">Dijana Bošković</h2>
            <h3 className="font-heading text-xl text-amber-200/90 italic">German-Serbian Composer & Flutist</h3>
          </div>
          <div className="space-y-4 text-blue-50 font-body leading-relaxed">
            <p>Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the October Prize of the City of Belgrade and multiple first prizes at national competitions.</p>
            <p>She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification. As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles.</p>
            <p>Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten (from the Bamberger Symphoniker), along with jazz performances in venues such as the Münchner Unterfahrt and on recordings with jazz composers, shaped her multifaceted musical voice.</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
           <FlipCard frontImage="/about/block1.jpg" backImage="/about/block1-back.webp" alt="Dijana Performing" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-1">
           <FlipCard frontImage="/about/block2.webp" backImage="/about/block2-back.webp" alt="Versus Vox Ensemble" />
        </div>
        <div className="order-2 space-y-6 text-center md:text-left">
          <h3 className="font-heading text-3xl text-amber-200/90 italic">Versus Vox & Composition Studies</h3>
          <div className="space-y-4 text-blue-50 font-body leading-relaxed">
            <p>In 2005, she founded the Versus Vox Ensemble in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences.</p>
            <p>Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project "ONE", premiered by the Symphonikern Hamburg.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
          <h3 className="font-heading text-3xl text-amber-200/90 italic">Works, Performances & Awards</h3>
          <div className="space-y-4 text-blue-50 font-body leading-relaxed">
            <p>Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater, performed by the Chamber Orchestra Solisten from St. Petersburg, members of the Munich Philharmonic and Frankfurt Opera, at the BEMUS Music Festival in Belgrade, and the Tiroler Volksschauspiele.</p>
            <p>The chamber orchestra work "Concerto for Strings" has been broadcast on leading European radio stations.</p>
            <p>For "Lichtspiele", she received support from the Ernst von Siemens Art Foundation and the Gerhard Trede Foundation, and in 2017 won 1st Prize at the International Choral Music Competition organized by the German Choir Association.</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
           <FlipCard frontImage="/about/block3.webp" backImage="/about/block3-back.webp" alt="Award Ceremony" />
        </div>
      </section>

    </div>
  );
}

export default function HomePage() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#223C5E] text-white overflow-x-hidden">
      
      <AnimatePresence>
        {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      </AnimatePresence>

      <HeroVideo startPlaying={splashFinished} />

      <div className="relative z-10 bg-gradient-to-b from-[#111f33] to-[#223C5E] pb-24">
        <BioBlocks />
        
        <div className="flex justify-center mt-16">
           <a href="/work">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/50 backdrop-blur-md rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              View Musical Works
            </motion.button>
           </a>
        </div>
      </div>

    </main>
  );
}