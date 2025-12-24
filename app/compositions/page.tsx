'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
// import Link from 'next/link';

// --- DATA ---
const introText = [
  "In her native country, the former Yugoslavia—an area formed through centuries of cultural exchange—Dijana Bošković came into contact with music of Slavic, Western European, Turkish, and Hindustani origin.",
  "Her works are rooted in contemporary classical music and the European avant-garde, drawing on elements of traditional, jazz, and pop music. This musical language seeks to transcend stylistic dogmas and to develop distinctly individual compositional responses to spiritual and socio-political themes that traverse cultural, religious, and linguistic boundaries.",
  "A further characteristic of her work is its reference to tonal centers, as pulse, harmony, and musical line unfold in response to the variable and often fragile rhythms of human breathing."
];

// --- COMPONENTS ---

// 1. ANIMATED TITLE
function CompositionTitle() {
  const title = "COMPOSITIONS";
  const letters = title.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 1.5 }
    },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20, textShadow: "0px 0px 0px rgba(251, 191, 36, 0)" },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <div className="absolute top-34 md:top-6 left-0 w-full z-40 flex justify-center pointer-events-none px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-wrap justify-center space-x-1 md:space-x-4 overflow-hidden"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="font-heading text-[2rem] md:text-6xl lg:text-7xl font-bold text-white tracking-widest"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// 2. VIDEO PLAYER (Phase 1)
function IntroVideo({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 z-10 bg-[#223C5E] h-dvh w-full overflow-hidden"
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover object-center"
      >
        <source src="/videos/composition-intro-mobile.webm" type="video/webm" media="(max-width: 768px)" />
        <source src="/videos/composition-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />

        <source src="/videos/composition-intro.webm" type="video/webm" />
        <source src="/videos/composition-intro.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}

// 3. STATIC CONTENT LAYER (Phase 2)
function StaticContent() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen"
    >

      <Link href="/">
        <button className="absolute top-8 left-6 md:top-10 md:left-10 z-50 text-white/50 hover:text-amber-200/90 transition-colors uppercase tracking-widest text-xs md:text-sm font-bold cursor-pointer">
          ← BACK
        </button>
      </Link>

      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 bg-[#223C5E]">
         <img
           src="/compositions/composition-bg-desktop.webp"
           className="hidden md:block w-full h-full object-cover object-center"
           alt="Background"
         />
         <img
           src="/compositions/composition-bg-mobile.webp"
           className="block md:hidden w-full h-full object-cover object-center"
           alt="Background"
         />
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-start pt-38 md:pt-24 px-4 md:px-20 pb-20 w-full">

        {/* Text Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 w-full">
          {introText.map((paragraph, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ 
                 duration: 2, 
                 delay: 2.0 + (i * 6), 
                 ease: [0.22, 1, 0.36, 1]
               }}
               className="w-full"
             >
               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1.5, delay: 2.5 + (i * 6) }}
                 className="font-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed drop-shadow-lg text-center mx-auto"
               >
                 {paragraph}
               </motion.p>
             </motion.div>
          ))}
        </div>

        {/* ENTER BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 18 }} 
          whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 px-16 py-5 md:px-20 md:py-6 border border-amber-400/30 text-amber-400 transition-all duration-300 uppercase tracking-[0.2em] text-lg md:text-3xl font-bold bg-[#050B14]/40 backdrop-blur-md rounded-full hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
          onClick={() => console.log("Enter clicked")}
        >
          ENTER
        </motion.button>

      </div>

    </motion.div>
  );
}

// --- MAIN PAGE ---

export default function CompositionsPage() {
  const [videoFinished, setVideoFinished] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#223C5E]">

      <AnimatePresence>
        {!videoFinished ? (
          <motion.div key="intro" className="fixed inset-0 z-20 h-dvh w-full overflow-hidden">
             <CompositionTitle />
             <IntroVideo onComplete={() => setVideoFinished(true)} />
          </motion.div>
        ) : (
          <StaticContent key="static" />
        )}
      </AnimatePresence>

    </main>
  );
}