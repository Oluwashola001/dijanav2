'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';

type Language = 'en' | 'de';

interface ContentType {
  backButton: string;
  pageTitle: string;
  subtitle: string;
  paragraphs: string[];
  poetryTitle: string;
  poetry: string[];
  poetryAuthor: string;
  postPoetry: string;
  musicTitle: string;
  music: string;
  textTitle: string;
  text: string;
  soundImagesTitle: string;
  soundImages: string;
  imageCredit: string;
}

const CONTENT: Record<Language, ContentType> = {
  en: {
    backButton: "Back to Versus Vox",
    pageTitle: "BETWEEN EAST AND WEST",
    subtitle: "A Musical Journey Across Continents",
    paragraphs: [
      "A musical travel report across the continents of Asia, Eastern and Western Europe, and America with the Versus Vox Ensemble.",
      "The project explores the tensions between East and West. Diverse traditions and cultures are musically explored and interpreted.",
      "The idea for the project \u201cBetween East and West\u201d grew out of the composition of the same name by Dijana Bo\u0161kovi\u0107 for the Versus Vox Ensemble, inspired by a poem by Jalal ad-Din Rumi:",
    ],
    poetryTitle: "Jalal ad-Din Rumi",
    poetry: [
      "What should I do? I do not know myself:",
      "I am neither Christian nor Jew,",
      "Neither Zoroastrian nor Muslim;",
      "Not from the East, nor from the West,",
      "Not from land nor from sea,",
      "I am not of Nature\u2019s soil",
      "Nor of the celestial spheres\u2026",
      "",
      "My place is placeless,",
      "My trace is traceless,",
      "Neither body nor soul \u2014",
      "I am of the light of the Beloved.",
    ],
    poetryAuthor: "\u2014 Jalal ad-Din Rumi",
    postPoetry: "From this place \u201cwhere no place is\u201d, a listening journey unfolds across the continents. We experience Asia, Eastern and Western Europe, and America through classical and contemporary music, literature, and soundscapes.",
    musicTitle: "Music",
    music: "Maki Ishii, Fikret Amirov, Dijana Bo\u0161kovi\u0107, Johann Sebastian Bach, Leonard Bernstein, Paul Creston",
    textTitle: "Text",
    text: "Jalal ad-Din Rumi, Selvarajan Yesudian, Alexander Pushkin, Rainer Maria Rilke",
    soundImagesTitle: "Soundscapes",
    soundImages: "Dijana Bo\u0161kovi\u0107",
    imageCredit: "\u00a9Eric van den Brulle",
  },
  de: {
    backButton: "Zur\u00fcck zu Versus Vox",
    pageTitle: "ZWISCHEN OST UND WEST",
    subtitle: "Ein musikalischer Reisebericht durch die Kontinente",
    paragraphs: [
      "Ein musikalischer Reisebericht durch die Kontinente Asien, Ost- und Westeuropa und Amerika mit dem Versus Vox Ensemble.",
      "Das Projekt thematisiert das Spannungsfeld zwischen Ost und West. Unterschiedlichste Traditionen und Kulturen werden musikalisch erarbeitet und interpretiert.",
      "Die Idee f\u00fcr das Projekt \u201eZwischen Ost und West\u201c entstand mit der gleichnamigen Komposition von Dijana Bo\u0161kovi\u0107 f\u00fcr das Versus Vox Ensemble, inspiriert durch ein Gedicht von Dschelaladin Rumi:",
    ],
    poetryTitle: "Dschelaladin Rumi",
    poetry: [
      "Was soll ich tun?",
      "Ich kenne mich selber nicht:",
      "Ich bin weder Christ noch Jude,",
      "Auch Parse und Muslim nicht;",
      "Vom Osten nicht, noch vom Westen,",
      "Vom Festland nicht noch vom Meer,",
      "Nicht stamme ich vom Scho\u00dfe der Erde",
      "Und nicht aus des Himmels Licht\u2026",
      "",
      "Mein Ort ist da, wo kein Ort ist,",
      "Mein Zeichen ist ganz ohne Mal,",
      "Nicht K\u00f6rper bin ich noch Seele \u2014",
      "Ein Glanz nur von seinem Licht.",
    ],
    poetryAuthor: "\u2014 Dschelaladin Rumi",
    postPoetry: "Von diesem Ort, \u201ewo kein Ort ist\u201c, entwickelt sich eine H\u00f6r-Reise durch die Kontinente. Wir erleben Asien, Ost- und Westeuropa und Amerika durch klassische und neue Musik, Literatur und H\u00f6rbilder.",
    musicTitle: "Musik",
    music: "Maki Ishii, Fikret Amirov, Dijana Bo\u0161kovi\u0107, Johann Sebastian Bach, Leonard Bernstein, Paul Creston",
    textTitle: "Text",
    text: "Dschelaladin Rumi, Selvarajan Yesudian, Alexander Pushkin, Rainer Maria Rilke",
    soundImagesTitle: "H\u00f6rbilder",
    soundImages: "Dijana Bo\u0161kovi\u0107",
    imageCredit: "\u00a9Eric van den Brulle",
  }
};

function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

export default function BetweenEastAndWestPage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('siteLanguage') as Language;
      if (savedLang === 'en' || savedLang === 'de') {
        setLanguage(savedLang);
      }
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const c = CONTENT[language];

  return (
    <main
      className="w-full min-h-screen text-[#172F4F] selection:bg-[#172F4F] selection:text-white"
      style={{ backgroundColor: '#303A43' }}
    >

      {/* --- DESKTOP SIDEBAR NAV (Back Button) --- */}
      <motion.div
        className="hidden lg:block fixed top-24 right-8 z-40 w-auto"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="/ensembles"
          className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-white hover:text-white 
                     bg-[#506070]/60 backdrop-blur-md border border-white/20 hover:bg-[#506070]/80 hover:border-white/40
                     px-4 py-3 rounded-md transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {c.backButton}
        </a>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER ---
          The outer wrapper sets the full image width (max 850px).
          The inner wrapper constrains text to ~55% of that width, centred,
          matching the white column baked into the image (approx 50% of 2400px wide image).
      -->*/}
      <div className="relative z-10 max-w-[850px] mx-auto px-0 md:px-8 pb-0 md:pb-20 pt-0 md:pt-0">

        {/* Full-width image box — 100% width so cityscape sides show */}
        <div
          className="relative shadow-2xl md:border-t-4 border-[#172F4F] min-h-screen md:min-h-0"
          style={{
            backgroundImage: "url('/images/ouw_bg.webp')",
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'top center',
          }}
        >
          {/* Narrow inner column — matches white strip (~55% centred) */}
          <div className="mx-auto pt-8 pb-20 md:py-12" style={{ width: '55%', minWidth: '240px' }}>

            {/* Mobile Back Button */}
            <div className="lg:hidden mb-8 text-center">
              <a
                href="/ensembles"
                className="inline-flex items-center gap-2 text-[#172F4F] hover:text-[#47719E] font-body text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                {c.backButton}
              </a>
            </div>

            <div className="space-y-10 md:space-y-12">

              {/* 1. MAIN TITLE */}
              <section className="text-center">
                <ScrollReveal delay={0}>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#172F4F] tracking-widest uppercase mb-4">
                    {c.pageTitle}
                  </h1>
                  <h2 className="font-heading text-base md:text-lg font-bold text-[#172F4F] tracking-widest uppercase mb-4">
                    {c.subtitle}
                  </h2>
                  <div className="h-px w-16 bg-[#172F4F] mx-auto opacity-30"></div>
                </ScrollReveal>
              </section>

              {/* 2. INTRO PARAGRAPHS */}
              <section>
                <ScrollReveal delay={0.1}>
                  <div className="space-y-5">
                    {c.paragraphs.map((p, i) => (
                      <p key={i} className="font-body text-sm leading-relaxed text-[#172F4F] text-left">
                        {p}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
              </section>

              {/* 3. IMAGE */}
              <ScrollReveal delay={0.15}>
                <div className="w-full">
                  <img
                    src="/images/ouw.webp"
                    alt="Between East and West"
                    className="w-full h-auto object-cover shadow-md border border-[#172F4F]/20"
                  />
                  <p className="text-[10px] text-[#172F4F]/60 mt-1.5 text-right font-body">
                    {c.imageCredit}
                  </p>
                </div>
              </ScrollReveal>

              {/* 4. POETRY BLOCK */}
              <section>
                <ScrollReveal delay={0.1}>
                  <div className="border border-[#172F4F]/20 p-4 md:p-6 bg-white/20">
                    <h3 className="font-heading text-sm font-bold text-[#172F4F] uppercase tracking-widest mb-4 text-center">
                      {c.poetryTitle}
                    </h3>
                    <div className="font-body text-sm leading-loose text-[#172F4F] italic text-center">
                      {c.poetry.map((line, i) =>
                        line === '' ? <br key={i} /> : <p key={i}>{line}</p>
                      )}
                    </div>
                    <p className="font-body text-xs text-[#172F4F]/60 mt-4 text-center not-italic">
                      {c.poetryAuthor}
                    </p>
                  </div>
                </ScrollReveal>
              </section>

              {/* 5. POST-POETRY PARAGRAPH */}
              <section>
                <ScrollReveal delay={0.1}>
                  <p className="font-body text-sm leading-relaxed text-[#172F4F] text-left">
                    {c.postPoetry}
                  </p>
                </ScrollReveal>
              </section>

              {/* 6. CREDITS SECTION */}
              <section>
                <ScrollReveal delay={0.1}>
                  <div className="border border-[#172F4F]/20 p-4 md:p-6 bg-white/20 text-center space-y-4">
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#172F4F] uppercase tracking-widest mb-1">
                        {c.musicTitle}
                      </h4>
                      <p className="font-body text-sm text-[#172F4F]">{c.music}</p>
                    </div>
                    <div className="h-px w-10 bg-[#172F4F] mx-auto opacity-20"></div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#172F4F] uppercase tracking-widest mb-1">
                        {c.textTitle}
                      </h4>
                      <p className="font-body text-sm text-[#172F4F]">{c.text}</p>
                    </div>
                    <div className="h-px w-10 bg-[#172F4F] mx-auto opacity-20"></div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#172F4F] uppercase tracking-widest mb-1">
                        {c.soundImagesTitle}
                      </h4>
                      <p className="font-body text-sm text-[#172F4F]">{c.soundImages}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}