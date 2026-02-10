'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- CONFIGURATION ---
const overlayBlocks = [
  {
    id: 1,
    desktop: { start: 1, end: 7 },
    mobile: { start: 1, end: 7 },
    position: "top-left",
    mobilePosition: "top-left",
    lines: [
      { text: "Dijana Bošković", className: "font-heading text-4xl md:text-6xl text-white font-bold" },
      { text: "German-Serbian Composer & Flutist", className: "font-heading text-2xl md:text-3xl text-amber-200/90 italic" }
    ]
  },
  {
    id: 2,
    desktop: { start: 7.5, end: 29 },
    mobile: { start: 6.5, end: 29 },
    position: "right",
    mobilePosition: "upper-right",
    content: (
      <>
        Born in Belgrade, <span className="text-amber-200/90">Dijana Bošković</span> was recognized early for her extraordinary musical talent, receiving the <span className="text-amber-200/90">October Prize of the City of Belgrade</span> and multiple first prizes at national competitions. She studied <span className="text-amber-200/90">flute in Belgrade</span> and at the <span className="text-amber-200/90">University of Music in Munich</span> with <span className="text-amber-200/90">Prof. Paul Meisen</span>, earning both the Artistic Diploma and Master Class certification.
      </>
    )
  },
  {
    id: 3,
    desktop: { start: 29, end: 50 },
    mobile: { start: 29, end: 50 },
    position: "left",
    mobilePosition: "full-width",
    title: "Flute & Performances",
    content: (
      <>
        As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles, and at renowned festivals including the <span className="text-amber-200/90">Schleswig-Holstein Music Festival</span>, the <span className="text-amber-200/90">BEMUS Festival</span> in Belgrade, and the <span className="text-amber-200/90">Hohenloher Kultursommer</span>. Collaborations with the <span className="text-amber-200/90">Kammerphilharmonie Bremen</span> and the <span className="text-amber-200/90">Bamberger Solisten</span>, along with jazz performances in venues such as the <span className="text-amber-200/90">Münchner Unterfahrt</span> and on recordings with jazz composers, shaped her multifaceted musical voice.
      </>
    )
  },
  {
    id: 4,
    desktop: { start: 54, end: 79 },
    mobile: { start: 54, end: 79 },
    position: "top-center-higher",
    mobilePosition: "full-width",
    title: "Versus Vox & Composition Studies",
    content: (
      <>
        In 2005, she founded the <span className="text-amber-200/90">Versus Vox Ensemble</span> in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences. Her <span className="text-amber-200/90">studies in composition</span> with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project ONE, premiered by the Hamburg Symphony Orchestra.
      </>
    )
  },
  {
    id: 5,
    desktop: { start: 80, end: 92 },
    mobile: { start: 80, end: 94 },
    position: "top-center",
    mobilePosition: "mid-screen",
    content: (
      <>
        The work bridges Western and Eastern classical music, exploring new forms of notation and performance practice.
      </>
    ),
    isQuote: true
  },
  {
    id: 6,
    desktop: { start: 92, end: 114 },
    mobile: { start: 94, end: 117 },
    position: "left",
    mobilePosition: "high-up",
    title: "Works, Performances & Awards",
    content: (
      <>
        Her compositions span <span className="text-amber-200/90">solo instruments, chamber music, orchestra, choir, voice, and theater</span>, performed by the <span className="text-amber-200/90">Chamber Orchestra Solisten from St. Petersburg</span>, members of the <span className="text-amber-200/90">Munich Philharmonic</span> and <span className="text-amber-200/90">Frankfurt Opera</span>, at the <span className="text-amber-200/90">BEMUS Music Festival</span> in Belgrade, and the <span className="text-amber-200/90">Tiroler Volksschauspiele</span>. The chamber orchestra work <span className="text-amber-200/90">"Concerto for Strings"</span> has been broadcast on leading European radio stations.
      </>
    )
  },
  {
    id: 7,
    desktop: { start: 125, end: 147 },
    mobile: { start: 127, end: 149 },
    position: "top-center",
    mobilePosition: "mid-screen",
    content: (
      <>
        For <span className="text-amber-200/90">"Lichtspiele"</span>, she received support from the <span className="text-amber-200/90">Ernst von Siemens Art Foundation</span> and the <span className="text-amber-200/90">Gerhard Trede Foundation</span>, and in 2017 won <span className="text-amber-200/90">1st Prize</span> at the International Choral Music Competition organized by the <span className="text-amber-200/90">German Choir Association</span>.
      </>
    )
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
        <source src="/videos/splashm.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/videos/splash.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}

function TextBlockWithLineAnimation({ 
  block, 
  currentTime, 
  positionClasses,
  isMobile
}: { 
  block: typeof overlayBlocks[0], 
  currentTime: number, 
  positionClasses: string,
  isMobile: boolean
}) {
  const timing = isMobile ? block.mobile : block.desktop;
  const duration = timing.end - timing.start;
  const progress = (currentTime - timing.start) / duration;
  
  // Get background opacity class based on block ID
  const getBackgroundClass = () => {
    if (block.id === 2 || block.id === 7) {
      return 'bg-[#223C5E]/50'; // Less transparent (50% opacity)
    }
    return 'bg-[#223C5E]/15'; // Default (15% opacity)
  };
  
  // Block 1 uses simple fade-in then fade-out animation (ALL LINES TOGETHER)
  if (block.id === 1 && 'lines' in block && block.lines) {
    // Same fade animation for both mobile and desktop
    const waitDuration = 0.167; // ~1 second wait (1/6 of duration)
    const fadeInDuration = 0.1;
    const fadeOutStart = 0.75;
    const fadeOutDuration = 0.25;
    
    // Calculate opacity for the entire block
    let blockOpacity = 0;
    
    if (progress < waitDuration) {
      blockOpacity = 0;
    } else if (progress >= waitDuration && progress < (waitDuration + fadeInDuration)) {
      const fadeProgress = (progress - waitDuration) / fadeInDuration;
      blockOpacity = fadeProgress;
    } else if (progress >= (waitDuration + fadeInDuration) && progress < fadeOutStart) {
      blockOpacity = 1;
    } else if (progress >= fadeOutStart && progress < (fadeOutStart + fadeOutDuration)) {
      const fadeProgress = (progress - fadeOutStart) / fadeOutDuration;
      blockOpacity = Math.max(0, 1 - fadeProgress);
    } else {
      blockOpacity = 0;
    }
    
    const overlayVisible = progress < 1;
    
    // Show all lines for block 1
    const linesToShow = block.lines;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayVisible ? blockOpacity : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute z-20 p-4 md:p-6 rounded-xl ${getBackgroundClass()} border border-white/5 shadow-2xl overflow-hidden ${positionClasses}`}
      >
        {linesToShow.map((line, lineIndex) => (
          <div
            key={`line-${lineIndex}`}
            className={line.className}
          >
            {line.text}
          </div>
        ))}
      </motion.div>
    );
  }
  
  // Blocks 2-7: Smooth fade-in/fade-out animation
  const waitDuration = 0.08;
  const fadeInDuration = 0.08;
  const fadeOutStart = 0.85;
  const fadeOutDuration = 0.15;
  
  let opacity = 0;
  
  if (progress < waitDuration) {
    opacity = 0;
  } else if (progress >= waitDuration && progress < (waitDuration + fadeInDuration)) {
    const fadeProgress = (progress - waitDuration) / fadeInDuration;
    opacity = fadeProgress;
  } else if (progress >= (waitDuration + fadeInDuration) && progress < fadeOutStart) {
    opacity = 1;
  } else if (progress >= fadeOutStart && progress < (fadeOutStart + fadeOutDuration)) {
    const fadeProgress = (progress - fadeOutStart) / fadeOutDuration;
    opacity = 1 - fadeProgress;
  } else {
    opacity = 0;
  }
  
  if (opacity === 0) return null;
  
  // Get dynamic padding based on block ID
  const getPadding = () => {
    if (isMobile) {
      if (block.id === 2) return 'py-12 px-6';
      if (block.id === 3) return 'py-12 px-4';
      if (block.id === 4) return 'py-12 px-4';
      if (block.id === 5) return 'py-8 px-4';
      if (block.id === 6) return 'py-8 px-4';
      if (block.id === 7) return 'py-10 px-6';
      return 'py-8 px-4';
    }
    if (block.id === 2) return 'md:py-12 md:px-8';
    if (block.id === 4) return 'md:py-8 md:px-10';
    if (block.id === 6) return 'md:py-8 md:px-8';
    if (block.id === 7) return 'md:py-14 md:px-12';
    return 'md:py-12 md:px-8';
  };
  
  const titleClass = "font-heading text-2xl md:text-4xl text-amber-200/90 italic mb-2 md:mb-4";
  
  // Get dynamic body text size based on block ID
  const getBodyClass = () => {
    if (isMobile) {
      if (block.id === 2) return "text-white/95 font-body text-[1.4rem] md:text-xl leading-relaxed";
      if (block.id === 3) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 4) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 5) return "text-white/95 font-body text-lg md:text-2xl leading-relaxed italic";
      if (block.id === 6) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 7) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
    }
    if (block.id === 2) return "text-white/95 font-body text-xs md:text-[1.75rem] leading-relaxed";
    if (block.id === 3) return "text-white/95 font-body text-xs md:text-2xl leading-relaxed";
    if (block.id === 4) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.id === 6) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.id === 7) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.isQuote) return "text-white/95 font-body text-sm md:text-4xl leading-relaxed italic";
    return "text-white/95 font-body text-xs md:text-lg leading-relaxed";
  };
  
  const bodyClass = getBodyClass();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`absolute z-20 p-4 ${getPadding()} rounded-xl ${getBackgroundClass()} border border-white/5 shadow-2xl ${positionClasses}`}
    >
      {'title' in block && block.title && (
        <div className={titleClass}>{block.title}</div>
      )}
      <div className={bodyClass}>
        {block.content}
      </div>
    </motion.div>
  );
}

function HeroVideo({ startPlaying }: { startPlaying: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const activeBlock = overlayBlocks.find(block => {
    const timing = isMobile ? block.mobile : block.desktop;
    return currentTime >= timing.start && currentTime <= timing.end;
  });

  const getPositionClasses = (pos: string, mobilePos: string) => {
    const position = isMobile ? mobilePos : pos;
    
    if (isMobile) {
      switch (position) {
        case 'top-center': 
          return 'top-14 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] max-w-md items-center text-center';
        case 'top-left':
          return 'top-[6%] left-4 w-[60%] max-w-xs items-start text-left';
        case 'upper-right':
          return 'top-12 right-4 w-[80%] max-w-sm items-center text-center';
        case 'full-width':
          return 'top-[4%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center'; 
        case 'high-up':
          return 'top-[4%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center';
        case 'mid-screen':
          return 'top-[20%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center';
        default: 
          return 'top-12 left-1/2 -translate-x-1/2 w-[85%] max-w-md items-center text-center';
      }
    }
    
    // Desktop positioning
    switch (position) {
      case 'top-left': 
        return 'top-8 left-8 md:top-20 md:left-8 max-w-xs md:max-w-md items-start text-left';
      case 'left': 
        return 'top-1/2 -translate-y-1/2 left-4 md:left-16 max-w-xs md:max-w-2xl items-center text-center';
      case 'upper-right':
        return 'top-8 right-4 md:right-8 max-w-xs md:max-w-lg items-start text-left';
      case 'top-center': 
        return 'top-12 md:top-16 left-1/2 -translate-x-1/2 max-w-xs w-full md:max-w-6xl items-center text-center';
      case 'top-center-higher':
        return 'top-8 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-6xl items-center text-center';
      case 'right': 
        return 'top-1/2 -translate-y-1/2 right-4 md:right-6 max-w-xs md:max-w-xl items-center text-center';
      default: 
        return 'bottom-20 left-1/2 -translate-x-1/2 max-w-xs md:max-w-2xl items-center text-center';
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
        className="w-full h-full object-cover md:object-center"
        style={{ 
          objectPosition: isMobile ? '15% 15%' : 'center center'
        }}
      >
        <source src="/videos/about-film-mobile-new.webm" type="video/webm" media="(max-width: 768px)" />
        <source src="/videos/about-film.webm" type="video/webm" />
        <source src="/videos/about-film.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#223C5E]/15 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {activeBlock && (
          <TextBlockWithLineAnimation 
            key={activeBlock.id}
            block={activeBlock}
            currentTime={currentTime}
            positionClasses={getPositionClasses(activeBlock.position, activeBlock.mobilePosition)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
        The Journey
      </div>
    </div>
  );
}

// Animated Paragraph Component - Cinematic subtle reveal
function AnimatedParagraph({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode, 
  delay?: number 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0 
      } : { 
        opacity: 0, 
        y: 30 
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated Heading Component - Cinematic subtle reveal
function AnimatedHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0 
      } : { 
        opacity: 0, 
        y: 25 
      }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function BioBlocks() {
  return (
    <>
      <div className="relative z-10 w-full max-w-5xl mx-auto md:ml-[2%] md:mr-auto px-6 py-12 md:py-24 space-y-12 md:space-y-16">
        
        {/* Block 1 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <div>
              <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-2">Dijana Bošković</h2>
              <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">German-Serbian Composer & Flutist</h3>
            </div>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}>
              <p>Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the October Prize of the City of Belgrade and multiple first prizes at national competitions.</p>
            </AnimatedParagraph>
            
            <AnimatedParagraph delay={0.15}>
              <p>She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification. As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles.</p>
            </AnimatedParagraph>
            
            <AnimatedParagraph delay={0.2}>
              <p>Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten (from the Bamberger Symphoniker), along with jazz performances in venues such as the Münchner Unterfahrt and on recordings with jazz composers, shaped her multifaceted musical voice.</p>
            </AnimatedParagraph>
          </div>
        </section>

        {/* Block 2 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">Versus Vox & Composition Studies</h3>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}>
              <p>In 2005, she founded the Versus Vox Ensemble in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences.</p>
            </AnimatedParagraph>
            
            <AnimatedParagraph delay={0.15}>
              <p>Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project "ONE", premiered by the Symphonikern Hamburg.</p>
            </AnimatedParagraph>
          </div>
        </section>

        {/* Block 3 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">Works, Performances & Awards</h3>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}>
              <p>Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater, performed by the Chamber Orchestra Solisten from St. Petersburg, members of the Munich Philharmonic and Frankfurt Opera, at the BEMUS Music Festival in Belgrade, and the Tiroler Volksschauspiele.</p>
            </AnimatedParagraph>
            
            <AnimatedParagraph delay={0.15}>
              <p>The chamber orchestra work "Concerto for Strings" has been broadcast on leading European radio stations.</p>
            </AnimatedParagraph>
            
            <AnimatedParagraph delay={0.2}>
              <p>For "Lichtspiele", she received support from the Ernst von Siemens Art Foundation and the Gerhard Trede Foundation, and in 2017 won 1st Prize at the International Choral Music Competition organized by the German Choir Association.</p>
            </AnimatedParagraph>
          </div>
        </section>
      </div>

      {/* Final Image - OUTSIDE the constrained container */}
      <motion.section 
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full overflow-hidden">
          <img 
            src="/about/bio-final.webp" 
            alt="Dijana Bošković Portrait" 
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </motion.section>
    </>
  );
}

export default function HomePage() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#223C5E] text-white overflow-x-hidden">
      
      <AnimatePresence>
        {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      </AnimatePresence>

      <HeroVideo startPlaying={splashFinished} />

      <div className="relative z-10 bg-linear-to-b from-[#111f33] to-[#223C5E] pb-24">
        <BioBlocks />
        
        <div className="flex justify-center mt-12">
           <a href="/compositions" onClick={() => {
             // Set flag to allow unmuted audio on composition page
             if (typeof window !== 'undefined') {
               sessionStorage.setItem('autoUnmute', 'true');
             }
           }}>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/50 backdrop-blur-md rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              View Compositions
            </motion.button>
           </a>
        </div>
      </div>

    </main>
  );
}