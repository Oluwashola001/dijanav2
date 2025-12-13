'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
// import Link from 'next/link'; // Commented out for preview stability

// Add smooth scroll CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    html {
      scroll-behavior: smooth;
    }
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
  document.head.appendChild(style);
}

// --- COMPONENTS ---

// 1. SPLASH SCREEN (Video Version - Responsive)
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      style={{ willChange: 'opacity' }}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover object-center"
        style={{ willChange: 'transform' }}
      >
        {/* Mobile Source (Portrait) - Checks width first */}
        <source src="/videos/splashm.webm" type="video/webm" media="(max-width: 768px)" />
        
        {/* Desktop Source (Landscape) - Default fallback */}
        <source src="/videos/splash.webm" type="video/webm" />
      </video>
    </motion.div>
  );
}

// 2. BACKGROUND
function SignatureBackground() {
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
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#223C5E] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#223C5E] via-[#1a2f4b] to-[#111f33]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#4a6fa5]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
        style={{ willChange: 'opacity' }}
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#fbbf24]/10 blur-[180px] rounded-full mix-blend-screen pointer-events-none"
        style={{ willChange: 'opacity' }}
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
              willChange: 'opacity',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 3. HERO SLIDESHOW with Extended Parallax (stays visible longer on mobile)
const slides = [
  { src: '/about/1.jpg', position: 'object-top' },    
  { src: '/about/2.webp', position: 'object-center' }, 
  { src: '/about/3.webp', position: 'object-center' },
  { src: '/about/4.jpg',  position: 'object-top' }, 
  { src: '/about/5.webp', position: 'object-center' },
  { src: '/about/6.webp', position: 'object-center' },
  { src: '/about/7.webp', position: 'object-top' },    
  { src: '/about/8.webp', position: 'object-top' },    
  { src: '/about/9.webp', position: 'object-center' },
];

function HeroSlideshow({ startAnimation }: { startAnimation: boolean }) {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // EXTENDED fade range - hero stays visible much longer (especially on mobile)
  const opacity = useTransform(scrollY, [0, 800], [1, 0]); // Changed from 300 to 800
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]); // Changed from 300 to 800

  useEffect(() => {
    if (!startAnimation) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [startAnimation]);

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden"
      style={{ opacity, willChange: 'opacity' }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="absolute inset-0 bg-[#111f33]" /> 
          <motion.img
            src={slides[index].src}
            alt="Dijana Bošković"
            className={`w-full h-full object-cover relative z-10 ${slides[index].position}`}
            style={{ scale, willChange: 'transform' }}
            loading="eager"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <motion.div 
            className="absolute inset-0 z-20"
            animate={{ scale: [1, 1.03], x: [0, 15] }}
            transition={{ duration: 6, ease: "linear" }}
            style={{ willChange: 'transform' }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-[#223C5E] via-[#223C5E]/10 to-transparent z-10" />
      <div className="absolute inset-0 bg-[#223C5E]/10 z-10 mix-blend-multiply" />

      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 lg:pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        {startAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }} 
            className="max-w-4xl lg:max-w-3xl p-4 md:p-8 bg-[#223C5E]/30 backdrop-blur-[2px] rounded-lg border border-white/5"
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-amber-200/90 text-xs md:text-base font-bold tracking-[0.1em] uppercase mb-2 md:mb-3 font-heading">
              German-Serbian Composer & Flutist
            </h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-3 md:mb-4 font-heading drop-shadow-2xl">
              Dijana Bošković
            </h1>
            <div className="h-px w-16 md:w-24 bg-amber-400/60 mb-3 md:mb-4" />
            <p className="text-base md:text-xl lg:text-2xl text-gray-100 italic max-w-2xl leading-relaxed font-heading">
              "studied flute in Belgrade and at the University of Music in Munich"
            </p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 font-body text-xs uppercase tracking-widest"
        style={{ willChange: 'opacity, transform' }}
      >
        Scroll
      </motion.div>
    </motion.div>
  );
}

// 3. FLIP CARD COMPONENT with Scroll Reveal
function FlipCard({ frontImage, backImage, alt }: { frontImage: string, backImage: string, alt: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="group relative w-full aspect-4/5 md:aspect-[4/3] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: "-50px", amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
        style={{ transformStyle: "preserve-3d", willChange: 'transform' }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[25px] overflow-hidden shadow-2xl border border-white/10">
          <img 
            src={frontImage} 
            alt={alt} 
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-[#223C5E]/20 mix-blend-multiply transition-colors group-hover:bg-transparent" />
          <div className="absolute bottom-4 right-4 text-white/80 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 bg-[#223C5E]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity font-body">
            Flip
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[25px] overflow-hidden shadow-2xl border border-white/10"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img 
            src={backImage} 
            alt={`${alt} Alternate`} 
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: 'transform' }}
          />
           <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Cinematic Paragraph Component - Each paragraph animates separately
function CinematicParagraph({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px", amount: 0.3 }}
      transition={{ 
        duration: 1.2, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="text-blue-50 font-body text-base md:text-lg leading-relaxed"
    >
      {children}
    </motion.p>
  );
}

// Cinematic Heading Component
function CinematicHeading({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -30, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px", amount: 0.3 }}
      transition={{ 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={`font-heading text-3xl md:text-4xl text-amber-200 italic mb-2 ${className}`}
    >
      {children}
    </motion.h3>
  );
}

// Cinematic Title Component
function CinematicTitle({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="space-y-2">
      <motion.h2 
        initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-80px", amount: 0.3 }}
        transition={{ 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="font-heading text-4xl md:text-5xl text-white font-bold"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.h3 
          initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-80px", amount: 0.3 }}
          transition={{ 
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="font-heading text-xl md:text-2xl text-amber-200 italic"
        >
          {subtitle}
        </motion.h3>
      )}
    </div>
  );
}


// 4. BIO BLOCKS with Cinematic Paragraph Animations
function BioBlocks() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 space-y-20 md:space-y-32">
      
      {/* BLOCK 1 */}
      <section className="flex flex-col gap-8 md:gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
             <CinematicTitle subtitle="German-Serbian Composer & Flutist">
               Dijana Bošković
             </CinematicTitle>
             
             <div className="space-y-6">
              <CinematicParagraph delay={0}>
                Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the October Prize of the City of Belgrade and multiple first prizes at national competitions.
              </CinematicParagraph>
              
              <CinematicParagraph delay={0.2}>
                She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification. As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles, and at renowned festivals including the Schleswig-Holstein Music Festival, the BEMUS Festival in Belgrade, and the Hohenloher Kultursommer.
              </CinematicParagraph>
            </div>
          </div>

          <div className="order-1 md:order-2">
             <FlipCard 
               frontImage="/about/block1.jpg" 
               backImage="/about/block1-back.webp" 
               alt="Dijana Performing" 
             />
          </div>
        </div>

        {/* Bottom Text with Vertical Line Styling on Desktop */}
        <div className="max-w-4xl mx-auto md:border-l-[1px] md:border-amber-200/90 md:pl-6 text-center md:text-left">
          <CinematicParagraph>
            Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten (from the Bamberger Symphoniker), along with jazz performances in venues such as the Münchner Unterfahrt and on recordings with jazz composers, shaped her multifaceted musical voice.
          </CinematicParagraph>
        </div>
      </section>

      {/* BLOCK 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="order-1">
           <FlipCard 
             frontImage="/about/block2.webp" 
             backImage="/about/block2-back.webp" 
             alt="Versus Vox Ensemble" 
           />
        </div>
        <div className="order-2 space-y-6 md:space-y-8 text-center md:text-left">
           <CinematicHeading>
            Versus Vox & Composition Studies
          </CinematicHeading>
          
          <div className="space-y-6">
            <CinematicParagraph delay={0}>
              In 2005, she founded the Versus Vox Ensemble in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences.
            </CinematicParagraph>
            
            <CinematicParagraph delay={0.2}>
              Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project "ONE", premiered by the Symphonikern Hamburg.
            </CinematicParagraph>
          </div>
        </div>
      </section>

      {/* BLOCK 3 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="order-2 md:order-1 space-y-6 md:space-y-8 text-center md:text-left">
           <CinematicHeading>
            Works, Performances & Awards
          </CinematicHeading>
          
          <div className="space-y-6">
            <CinematicParagraph delay={0}>
              Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater, performed by the Chamber Orchestra Solisten from St. Petersburg, members of the Munich Philharmonic and Frankfurt Opera, at the BEMUS Music Festival in Belgrade, and the Tiroler Volksschauspiele.
            </CinematicParagraph>
            
            <CinematicParagraph delay={0.2}>
              The chamber orchestra work "Concerto for Strings" has been broadcast on leading European radio stations.
            </CinematicParagraph>
            
            <CinematicParagraph delay={0.4}>
              For "Lichtspiele", she received support from the Ernst von Siemens Art Foundation and the Gerhard Trede Foundation, and in 2017 won 1st Prize at the International Choral Music Competition organized by the German Choir Association.
            </CinematicParagraph>
          </div>
        </div>
        <div className="order-1 md:order-2">
           <FlipCard 
             frontImage="/about/block3.webp" 
             backImage="/about/block3-back.webp" 
             alt="Award Ceremony" 
           />
        </div>
      </section>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#223C5E] text-white overflow-x-hidden selection:bg-amber-500/30">
      
      {/* 0. Splash Screen */}
      <AnimatePresence>
        {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      </AnimatePresence>

      {/* 1. Global Atmospheric Background */}
      <SignatureBackground />

      {/* 2. "Little Movie" Hero Section (Waits for Splash) */}
      <HeroSlideshow startAnimation={splashFinished} />

      {/* 3. The Zig-Zag Bio Content */}
      <div className="relative z-10 pb-24">
        {/* Spacer */}
        <div className="h-16 bg-linear-to-b from-transparent to-[#223C5E]/90 pointer-events-none" />
        <BioBlocks />
        
        {/* 4. Link back to Work (Restored Button) */}
        <div className="flex justify-center mt-12 md:mt-16">
           <a href="/work">
            <motion.button 
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="px-12 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/80 backdrop-blur-md rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              style={{ willChange: 'transform' }}
            >
              View Musical Works
            </motion.button>
           </a>
        </div>
      </div>

    </main>
  );
}