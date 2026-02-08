'use client';

import { motion, useInView } from 'framer-motion';
// import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// --- CONTENT DATA (EDIT HERE) ---

const newsData = [
  {
    category: "Review of a Premiere",
    title: "\"Rejected Love\": Munich Philharmonic Performs Works by Dijana Bošković",
    source: "Today Magazine, European Edition 2024",
    content: [
      "As part of a matinée at the Munich Artists' House (Münchner Künstlerhaus), works by Richard Strauss were presented alongside compositions by German-Serbian composer Dijana Bošković. The program included Strauss's Variations on \"The Girl Is Angry with Me, She Quarrels with Me\" for String Trio No. 109 and the String Quartet in A major, Op. 2, complemented by Bošković's recent works from 2024: For My Mother and Bez Kontura for string quartet, as well as Con Fretta for string trio.",
      "Born in Belgrade in 1968, Dijana Bošković studied flute and composition in her hometown before continuing her education in Munich and Hamburg. Her music unfolds within an expanded tonal framework and engages deeply with both spiritual and socio-political themes. A defining characteristic of her work is the synthesis of diverse musical influences—traditional folk music, jazz, and contemporary avant-garde—into a highly personal and distinctive compositional voice.",
      "The point of departure for her string quartet is the centuries-old Kosovo lament Zaspo Janko, traditionally sung at funerals. While the source material carries an archaic intensity, the first movement is driven by powerful, rhythmically charged Balkan influences. In the second movement, these traditional references are deliberately loosened. \"Fixed stylistic conventions are dissolved,\" Bošković explains, \"and replaced by a freer, more open approach to rhythm and harmony.\" A continuous 3/4 ostinato pulse is constantly disrupted and transformed.",
      "With Con Fretta, Bošković turns toward existential questions of our time. She describes the piece as a musical reflection on the disintegration of social and artistic structures, on disorientation and unrest in the early 21st century. The response, she suggests, lies in turning inward—returning to one's own origins. This perspective also connects Con Fretta with her new string quartet.",
      "The audience at the Munich Artists' House responded with great enthusiasm. The Munich Philharmonic Quartet and the composer were greeted with standing ovations, and Dijana Bošković's works were met with sustained and passionate applause in the historic venue of the Allotria Art Association, founded in 1873."
    ]
  },
  {
    category: "New Work 2025",
    title: "Media Vita – Ātman Aeternus",
    source: "A contemplation inspired by \"Media Vita in Morte sumus\" and Vedic wisdom",
    content: [
      "For 8-part vocal ensemble (SSATTTBB) and 2 horns, or 2 natural horns in B basso & B alto (French instruments, c. 1820)"
    ]
  }
];

const broadcastsData = [
  {
    title: "Munich Philharmonic Orchestra, Künstlerhaus Munich (2024)",
    details: [
        "Dijana Bošković / Boshkovich: CON FRETTA (string trio)",
        "Dijana Bošković / Boshkovich: MEMORIES (string quartet)"
    ]
  },
  {
    title: "Theater Erfurt, Large House (2024)",
    details: [
        "Light and Shadow for Holy Saturday",
        "Dijana Bošković / Boshkovich: Black and White for piano duo"
    ]
  },
  {
    title: "Munich Philharmonic, German Embassy Beijing (2024)",
    details: [
        "Dijana Bošković / Boshkovich: CON FRETTA for string trio"
    ]
  },
  {
    title: "BR-Klassik – Musik der Welt (2019)",
    details: [
        "Music from Belgrade with composer Dijana Bošković"
    ]
  },
  {
    title: "Forum, University of Music and Theatre Hamburg (2018)",
    details: [
        "With the Hamburg Symphony Orchestra \"With all its power and genius, so crystal clear\"",
        "Dijana Bošković / Boshkovich: ONE for large orchestra"
    ]
  },
  {
    title: "Laeiszhalle, Small Hall, Hamburg (2017)",
    details: [
        "Dijana Bošković / Boshkovich: Concert piece from the multimedia composition TRANSIT for mezzo-soprano and piano"
    ]
  },
  {
    title: "Benefit Concert for Sternstunden – Allerheiligen-Hofkirche, Munich Residence (2017)",
    details: [
        "Dijana Bošković / Boshkovich: BETWEEN EAST AND WEST for flute and tape",
        "1st Prize and Special Prize of the Bavarian Insurance Chamber for Contemporary Music (Jugend musiziert)"
    ]
  },
  {
    title: "St. Reinoldi Church, Dortmund – live broadcast on Deutschlandfunk Kultur (2017)",
    details: [
        "Winning composition: Dijana Bošković / Boshkovich DONA NOBIS PACEM SHANTI",
        "Composition competition of the German Choral Association (500th Anniversary of the Reformation)"
    ]
  },
  {
    title: "International Chamber Music Course with Concert Tour, Austria (2016)",
    details: [
        "Dijana Bošković / Boshkovich: SUNDANCE for piano trio (violin, cello, piano)"
    ]
  },
  {
    title: "Resonanzraum Hamburg (2016)",
    details: [
        "Dijana Bošković / Boshkovich: LICHTSPIELE / LIGHT PLAYS for violin, cello, and piano"
    ]
  },
  {
    title: "ORF Funkhaus Vorarlberg – CD Release (2016)",
    details: [
        "Works by Dijana Bošković / Boshkovich",
        "CD box celebrating the 20th anniversary of Ensemble plus"
    ]
  },
  {
    title: "ORF Landesfunkhaus (2015)",
    details: [
        "New Music in Conversation with Ensemble plus",
        "Dijana Bošković / Boshkovich: SUITE based on folk melodies from Serbia, Macedonia, and Montenegro"
    ]
  },
  {
    title: "Altach Organ Soirée (2014)",
    details: [
        "Dijana Bošković / Boshkovich: Präludium – Quasi una Toccata – Postludium from CONVERSATIONS WITH DEATH for flute and organ"
    ]
  },
  {
    title: "CD Release – Begegnungen / Encounters (2013)",
    details: [
        "Chamber Music, Cavalli Records, Bamberg"
    ]
  },
  {
    title: "BBC Radio 3 (London), Radio Sweden, ORF 3, Magyar Radio",
    details: [
        "BEMUS International Music Festival, Belgrade (2009)",
        "Concerts and broadcasts with the St. Petersburg Soloists",
        "Dijana Bošković / Boshkovich: CONCERTO FOR STRINGS"
    ]
  },
  {
    title: "Carl Orff Hall, Gasteig, Munich (2008)",
    details: [
        "Dijana Bošković / Boshkovich: DIVERTIMENTO for strings",
        "with the Singidunum Chamber Orchestra"
    ]
  },
  {
    title: "BEMUS International Music Festival, Belgrade (2007)",
    details: [
        "EMIGRANTEN WALTZ – multimedia concert",
        "Dijana Bošković / Boshkovich: VERSUS VOX INTEGRA, sextet"
    ]
  },
  {
    title: "Max-Joseph Hall, Munich Residence (2004)",
    details: [
        "Dijana Bošković / Boshkovich: 2 SONGS for mezzo-soprano and piano"
    ]
  }
];

// --- NAVIGATION ITEMS ---
const navItems = [
  { id: "news", label: "News" },
  { id: "broadcasts", label: "Selected Broadcasts" },
];

// --- SCROLL REVEAL COMPONENT ---
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function NewsPage() {
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className=" w-full bg-[#050B14] text-white selection:bg-[#ff6643] selection:text-white  relative">
      
      {/* BACKGROUND IMAGE - Fixed as requested */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-absolute"
        style={{ 
            backgroundImage: "url('/images/bg_dijana.webp')",
        }}
      />

      {/* --- MOBILE TOP NAV --- */}
      <div className="lg:hidden w-full flex flex-col pt-6 relative z-10">
        <div className="px-4 pb-2 w-full">
                       
        </div>
        <div className="overflow-x-auto no-scrollbar w-full">
            <div className="flex whitespace-nowrap px-4 py-3 gap-3">
            {navItems.map((item) => (
                <a 
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-white bg-[#575757]/90 border border-gray-700 hover:border-white px-3 py-1.5 rounded transition-all"
                >
                    {item.label}
                </a>
            ))}
            </div>
        </div>
      </div>

      {/* --- DESKTOP SIDEBAR NAV (Glassmorphism Style) --- */}
      <motion.div 
        className="hidden lg:block fixed top-24 right-8 z-40 w-64"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-[13px] font-medium uppercase tracking-widest text-white hover:text-white 
                         bg-[#506070]/60 backdrop-blur-md border border-white/20 hover:bg-[#506070]/80 hover:border-white/40
                         px-4 py-3 rounded-md transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-[1.02]"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      {/* --- DESKTOP BACK BUTTON --- */}
      <motion.div 
        className="hidden lg:block fixed top-6 left-6 z-50"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[950px] mx-auto pt-4 md:pt-16 px-4 md:px-8 lg:pr-72 relative z-10">
        
        {/* PAGE TITLE */}
        <ScrollReveal delay={0}>
          <div className="mb-8 text-center">
              <div className="inline-block bg-[#575757]/90 backdrop-blur-sm px-12 py-4 shadow-xl">
                  <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide font-bold">
                      News
                  </h1>
              </div>
          </div>
        </ScrollReveal>

        <div className="space-y-12">

            {/* 1. NEWS FIELD */}
            <ScrollReveal delay={0.1}>
              <section id="news" className="scroll-mt-32">
                  <div className="bg-[#575757]/90 backdrop-blur-sm p-4 md:p-6 shadow-2xl">
                      <div className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 space-y-12 text-white">
                          
                          {newsData.map((item, index) => (
                              <motion.div 
                                key={index} 
                                className="space-y-4"
                                initial={{ opacity: 1 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                              >
                                  <div className="border-l-4 border-[rgba(255,102,67,1)] pl-4">
                                      <h3 className="text-sm font-bold uppercase tracking-widest text-[rgba(255,102,67,1)] mb-1">
                                          {item.category}
                                      </h3>
                                      <h2 className="text-xl md:text-2xl font-bold leading-tight">
                                          {item.title}
                                      </h2>
                                      {item.source && (
                                          <p className="text-sm text-gray-400 italic mt-1">{item.source}</p>
                                      )}
                                  </div>
                                  
                                  <div className="space-y-4 text-blue-50 font-body text-sm md:text-base leading-relaxed">
                                      {item.content.map((paragraph, pIndex) => (
                                          <p key={pIndex}>{paragraph}</p>
                                      ))}
                                  </div>
                              </motion.div>
                          ))}

                      </div>
                  </div>
              </section>
            </ScrollReveal>

            {/* 2. SELECTED BROADCASTS FIELD */}
            <ScrollReveal delay={0.15}>
              <section id="broadcasts" className="scroll-mt-32">
                  <div className="mb-8 text-center mt-16">
                      <div className="inline-block bg-[#575757]/90 backdrop-blur-sm px-8 py-4 shadow-xl">
                          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide font-bold">
                              Selected Broadcasts & Premieres
                          </h2>
                      </div>
                  </div>

                  <div className="bg-[#575757]/90 backdrop-blur-sm p-4 md:p-6 shadow-2xl">
                      <div className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 text-white">
                          <div className="space-y-8">
                              {broadcastsData.map((item, index) => (
                                  <motion.div 
                                    key={index} 
                                    className="border-b border-gray-600 pb-6 last:border-0 last:pb-0"
                                    initial={{ opacity: 1 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.4, delay: index * 0.03 }}
                                  >
                                      <h4 className="font-bold text-[rgba(255,102,67,1)] mb-2 text-sm md:text-base">
                                          {item.title}
                                      </h4>
                                      <div className="space-y-1 text-blue-50 font-body text-sm md:text-base">
                                          {item.details.map((detail, dIndex) => (
                                              <p key={dIndex}>{detail}</p>
                                          ))}
                                      </div>
                                  </motion.div>
                              ))}
                          </div>
                      </div>
                  </div>
              </section>
            </ScrollReveal>

        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}