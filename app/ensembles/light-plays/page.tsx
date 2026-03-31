'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';

type Language = 'en' | 'de';

// Strict TypeScript interface for Vercel
interface ContentType {
  backButton: string;
  pageTitle: string;
  subtitle: string;
  premiere: string;
  venue: string;
  projectBy: string;
  paragraphs: ReactNode[];
  performersTitle: string;
  ensemble: string;
  performers: string[];
  support: string;
}

// --- TRANSLATION CONTENT ---
const CONTENT: Record<Language, ContentType> = {
  en: {
    backButton: "Back to Versus Vox",
    pageTitle: "LIGHT PLAYS",
    subtitle: "Music & Light",
    premiere: "World Premiere: Friday, November 4, 2016",
    venue: "Venue: Alfred Schnittke Akademie International",
    projectBy: "A project by the composer Dijana Bošković",
    paragraphs: [
      <span key="p1">With <em>Light Plays</em>, the phenomenon of light &mdash; a universal primordial symbol &mdash; is made sensorially perceptible through music and applied art. Many composers have approached this theme in their own musical language. Works such as <em>L&apos;Aurore</em> (Eugène Ysaÿe), <em>Reflets dans l&apos;eau</em> (Claude Debussy), <em>Sun Dance</em> (Dijana Bošković), and the <em>Nachtstücke</em> (Hans Werner Henze) testify to the strong associative power of this motif.</span>,
      <span key="p2">At the center of the project is an abstract sculpture that enters into dialogue with music, light, and color, creating a space for synesthetic perception.</span>
    ],
    performersTitle: "Performers",
    ensemble: "Versus Vox Ensemble & kontraer klang",
    performers: [
      "Dijana Bošković \u2013 composition, artistic direction",
      "Stefan Troschka \u2013 visual concept"
    ],
    support: "With the kind support of the Gerhard Trede Foundation and the University of Music and Theatre.",
  },
  de: {
    backButton: "Zurück zu Versus Vox",
    pageTitle: "LICHTSPIELE",
    subtitle: "Musik & Licht",
    premiere: "Uraufführung: Freitag, 4. November 2016",
    venue: "Ort: Alfred Schnittke Akademie International, Hamburg",
    projectBy: "Ein Projekt der Komponistin Dijana Bošković",
    paragraphs: [
      <span key="p1">Mit <em>Lichtspiele</em> wird das Phänomen Licht &ndash; ein universelles Ur-Symbol &ndash; durch Musik und angewandte Kunst sinnlich erfahrbar gemacht. Zahlreiche Komponistinnen und Komponisten haben sich diesem Thema auf unterschiedliche Weise musikalisch angenähert. Werke wie <em>L&apos;Aurore</em> (Eugène Ysaÿe), <em>Reflets dans l&apos;eau</em> (Claude Debussy), <em>Sonnentanz</em> (Dijana Bošković) oder die <em>Nachtstücke</em> (Hans Werner Henze) zeugen von der starken assoziativen Kraft dieses Motivs.</span>,
      <span key="p2">Im Zentrum des Projekts steht eine abstrakte Skulptur, die im Dialog mit Musik, Licht und Farbe bespielt wird und so einen Raum für synästhetische Wahrnehmung eröffnet.</span>
    ],
    performersTitle: "Mitwirkende",
    ensemble: "Versus Vox Ensemble & kontraer klang",
    performers: [
      "Dijana Bošković \u2013 Komposition, künstlerische Leitung",
      "Stefan Troschka \u2013 visuelles Konzept"
    ],
    support: "Mit freundlicher Unterstützung der Gerhard Trede Stiftung sowie der Hochschule für Musik und Theater.",
  }
};

// --- SCROLL REVEAL COMPONENT ---
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

export default function LightPlaysPage() {
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

  const currentContent = CONTENT[language];

  return (
    <main 
      className="w-full min-h-screen text-[#172F4F] selection:bg-[#172F4F] selection:text-white relative"
    >
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
            backgroundImage: "url('/images/light-plays-bg.webp')", 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
        }}
      />

      {/* --- MOBILE TOP NAV SPACER --- */}
      <div className="lg:hidden w-full flex flex-col pt-6 relative z-10">
        <div className="px-4 pb-2 w-full"></div>
      </div>

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
          {currentContent.backButton}
        </a>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-[850px] mx-auto px-4 md:px-8 pb-20 pt-12 md:pt-0">
        
        <div className="bg-[#E7CDA8]/95 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl border-t-4 border-[#172F4F]">
          
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
              {currentContent.backButton}
            </a>
          </div>

          <div className="space-y-10 md:space-y-12">

            {/* 1. MAIN TITLE */}
            <section className="text-center">
              <ScrollReveal delay={0}>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#172F4F] tracking-widest uppercase mb-4">
                  {currentContent.pageTitle}
                </h1>
                <div className="h-px w-24 bg-[#172F4F] mx-auto opacity-30"></div>
              </ScrollReveal>
            </section>

            {/* 2. SUBTITLE + FIRST PARAGRAPH */}
            <section>
              <ScrollReveal delay={0.1}>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-[#172F4F] tracking-widest uppercase mb-5 text-center">
                  {currentContent.subtitle}
                </h2>
                <p className="font-body text-sm md:text-base leading-relaxed text-[#172F4F] text-left md:text-justify">
                  {currentContent.paragraphs[0]}
                </p>
              </ScrollReveal>
            </section>

            {/* 3. VIDEO EMBED */}
            <ScrollReveal delay={0.1}>
              <div className="w-full aspect-video shadow-xl border border-[#172F4F]/20 bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/7_ST90Cz-CI" 
                  title="Play of Light YouTube Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollReveal>

            {/* 4. SECOND PARAGRAPH */}
            <section>
              <ScrollReveal delay={0.1}>
                <p className="font-body text-sm md:text-base leading-relaxed text-[#172F4F] text-left md:text-justify">
                  {currentContent.paragraphs[1]}
                </p>
              </ScrollReveal>
            </section>

            {/* 5. SINGLE IMAGE */}
            <ScrollReveal delay={0.15}>
              <div className="w-full">
                <img 
                  src="/images/light_plays_1.webp" 
                  alt="Light Plays Sculpture" 
                  className="w-full h-auto object-cover shadow-md border border-[#172F4F]/20"
                />
              </div>
            </ScrollReveal>

            {/* 6. DUAL IMAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <ScrollReveal delay={0.1}>
                <img 
                  src="/images/light_plays_2.webp" 
                  alt="Light Plays Piano" 
                  className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                />
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <img 
                  src="/images/light_plays_3.webp" 
                  alt="Light Plays Trio" 
                  className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                />
              </ScrollReveal>
            </div>

            {/* 7. PERFORMERS / CREDITS SECTION */}
            <section>
              <ScrollReveal delay={0.1}>
                <div className="bg-[#172F4F]/5 border border-[#172F4F]/10 p-6 md:p-10 text-center">
                  
                  <h3 className="font-heading text-lg md:text-xl font-bold text-[#172F4F] uppercase tracking-widest mb-6">
                    {currentContent.performersTitle}
                  </h3>

                  {/* Ensemble name — now font-heading to match */}
                  <h4 className="font-heading text-base md:text-lg font-bold text-[#172F4F] uppercase tracking-widest mb-4">
                    {currentContent.ensemble}
                  </h4>

                  <ul className="space-y-2 font-body text-sm md:text-base text-[#172F4F] mb-8">
                    {currentContent.performers.map((performer, index) => (
                      <li key={index}>{performer}</li>
                    ))}
                  </ul>

                  <div className="h-px w-16 bg-[#172F4F] mx-auto opacity-20 mb-6"></div>

                  {/* Premiere / Venue / Project info moved here */}
                  <div className="space-y-1.5 font-body text-sm md:text-base text-[#172F4F] mb-6">
                    <p className="font-semibold">{currentContent.premiere}</p>
                    <p className="font-semibold">{currentContent.venue}</p>
                    <p className="italic mt-2 text-[#172F4F]/80">{currentContent.projectBy}</p>
                  </div>

                  <div className="h-px w-16 bg-[#172F4F] mx-auto opacity-20 mb-6"></div>

                  <p className="font-body text-xs md:text-sm text-[#172F4F] italic max-w-lg mx-auto">
                    {currentContent.support}
                  </p>
                </div>
              </ScrollReveal>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}