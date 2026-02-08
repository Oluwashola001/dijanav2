'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// --- CONTENT DATA (FROM SCREENSHOTS) ---

// SECTION 1: Selected Highlights (As Composer)
const highlightsData = [
  {
    title: "Munich Philharmonic performs works by Dijana Bošković",
    source: "Today Magazine, European Edition, 2024",
    content: "Bošković's music combines expanded tonality with Balkan rhythmic energy and spiritual depth. Her works For My Mother, Blurred Edges and Con Fretta were met with standing ovations at the Munich Artists' House."
  },
  {
    title: "First Prize – International Composition Competition",
    source: "Neue Musik Zeitung, 2017",
    content: "Dijana Bošković received First Prize at the chor.com composition competition for her contemporary choral work, praised for clarity, expressiveness, and stylistic relevance."
  },
  {
    title: "Concerto for Strings – World Premiere (BEMUS Festival)",
    source: "Dnevnik / Danas, Belgrade, 2009",
    content: "A work of powerful contrasts and vivid orchestral colors, inspired by folkloric techniques and the Russian string tradition, described as a \"musical firework\" with lasting artistic impact."
  },
  {
    title: "Contemporary Music Without Dogma",
    source: "Vorarlberger Nachrichten, 2014",
    content: "Bošković's music demonstrates that contemporary composition can remain expressive, modern and accessible without resorting to strict atonality."
  }
];

// SECTION 2: As Flutist
const flutistData = [
  {
    title: "\"Technically flawless and deeply expressive\"",
    source: "Allgäuer Zeitung",
    content: "Dijana Bošković impressed with a full, warm flute tone and absolute technical mastery, shaping even the most demanding passages with ease and musical intelligence."
  },
  {
    title: "Debussy's Syrinx – A Moment of Pure Poetry",
    source: "AZ – Amnesty International Benefit Concert",
    content: "With seemingly endless breath control, Bošković shaped Debussy's melodic arches in the finest pianissimo, captivating the audience with subtle nuance and intensity."
  },
  {
    title: "An Interpreter Who Thinks Like a Composer",
    source: "Süddeutsche Zeitung",
    content: "Already in classical repertoire, Bošković reveals a rare musical intelligence, shaping transitions and phrasing with compositional awareness and refined tonal control."
  },
  {
    title: "Powerful Duo Performances",
    source: "Allgäuer Zeitung",
    content: "Whether in chamber music or solo repertoire, Bošković combines virtuosity with expressive depth, navigating stylistic contrasts effortlessly from Bach to Jolivet and Casella."
  },
  {
    title: "\"She can do everything on the flute\"",
    source: "Allgäuer Zeitung",
    content: "Fearless octave runs, precision articulation, and a distinctive, slightly roughened tone mark Bošković as a flutist of exceptional technical and musical authority."
  }
];

// SECTION 3: Performance & Artistic Presence
const performanceData = [
  {
    title: "Ensemble Versus Vox – Contemporary Chamber Music at the Highest Level",
    source: "Neue Musikzeitung",
    content: "As founder and artistic force behind Ensemble Versus Vox, Bošković is praised equally as composer, flutist, and advocate for contemporary music."
  },
  {
    title: "Music That Bridges Cultures",
    source: "Danas, Belgrade",
    content: "Bošković's performances connect musical traditions across borders, combining intensity, vitality, and lyrical openness into a uniquely communicative artistic language."
  }
];

// --- ANIMATED COMPONENTS ---

// Animated Section Header - Cinematic reveal
function AnimatedSectionHeader({ 
  children, 
  subtitle 
}: { 
  children: React.ReactNode;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className="mb-10 text-center"
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
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#172F4F] uppercase tracking-widest border-b border-[#172F4F]/20 pb-2 inline-block">
        {children}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl font-bold text-[#47719E] uppercase tracking-wider mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// Animated Article - Cinematic reveal with stagger
function AnimatedArticle({ 
  item, 
  isLast 
}: { 
  item: {
    title: string;
    source: string;
    content: string;
  };
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.article 
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
        delay: 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="space-y-4"
    >
      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#172F4F] leading-tight">
        {item.title}
      </h3>
      <p className="text-sm md:text-base font-bold uppercase tracking-wider text-[#47719E]">
        {item.source}
      </p>
      <div className="text-[#172F4F] font-body text-base md:text-lg leading-relaxed">
        {item.content}
      </div>
      {!isLast && <div className="pt-6 h-px w-16 bg-[#172F4F]/20" />}
    </motion.article>
  );
}

// Animated Page Title
function AnimatedPageTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className="mb-16 text-center"
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
      <h1 className="text-5xl md:text-6xl font-serif text-[#172F4F] mb-4 tracking-wide font-bold drop-shadow-sm">
        {children}
      </h1>
      <div className="h-px w-24 bg-[#172F4F]/40 mx-auto"></div>
    </motion.div>
  );
}

export default function PressPage() {
  return (
    <main 
      className="min-h-screen w-full text-[#172F4F] selection:bg-amber-200 selection:text-[#172F4F] pb-32"
      style={{ 
          backgroundColor: '#223C5E',
          backgroundImage: "url('/images/press-bg.webp')",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center",
          backgroundAttachment: "scroll"
      }}
    >
      <style jsx>{`
        @media (min-width: 1024px) {
          main {
            background-size: 900px auto !important; 
          }
        }
      `}</style>

      {/* --- BACK BUTTON --- */}
      <div className="fixed top-6 left-0 w-full px-2 md:px-10 z-50 flex justify-between items-start pointer-events-none">
        
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[800px] mx-auto pt-24 md:pt-32 pl-18 pr-16 md:px-24 relative z-10">
        
        {/* PAGE TITLE */}
        <AnimatedPageTitle>
          Press
        </AnimatedPageTitle>

        <div className="space-y-20">
            
            {/* SECTION 1: Selected Highlights */}
            <section>
                <AnimatedSectionHeader subtitle="As Composer">
                  Selected Highlights
                </AnimatedSectionHeader>
                
                <div className="space-y-12">
                    {highlightsData.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === highlightsData.length - 1}
                        />
                    ))}
                </div>
            </section>

            {/* SECTION 2: As Flutist */}
            <section>
                <div className="pt-10 border-t border-[#172F4F]/10">
                  <AnimatedSectionHeader>
                    As Flutist
                  </AnimatedSectionHeader>
                </div>
                
                <div className="space-y-12">
                    {flutistData.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === flutistData.length - 1}
                        />
                    ))}
                </div>
            </section>

            {/* SECTION 3: Performance & Artistic Presence */}
            <section>
                <div className="pt-10 border-t border-[#172F4F]/10">
                  <AnimatedSectionHeader>
                    Performance & Artistic Presence
                  </AnimatedSectionHeader>
                </div>
                
                <div className="space-y-12">
                    {performanceData.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === performanceData.length - 1}
                        />
                    ))}
                </div>
            </section>

        </div>

      </div>
    </main>
  );
}