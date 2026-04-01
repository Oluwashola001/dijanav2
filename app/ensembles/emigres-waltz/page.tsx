'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';

type Language = 'en' | 'de';

// Strict TypeScript interface for Vercel
interface ContentType {
  backButton: string;
  pageTitle: string;
  subtitle: string;
  concertType: string;
  musicBy: string;
  performersTitle: string;
  performers: string;
  reviewTitle: string;
  reviewSource: string;
  reviewEvent: string;
  paragraphs: string[];
}

// --- TRANSLATION CONTENT ---
// 100% UNICODE-ESCAPED for special characters to guarantee zero hidden-character compilation crashes.
const CONTENT: Record<Language, ContentType> = {
  en: {
    backButton: "Back to Versus Vox",
    pageTitle: "EMIGR\u00c9'S WALTZ",
    subtitle: "39th Belgrade Music Festival \u2013 BEMUS",
    concertType: "Emigr\u00e9's Waltz \u2013 Multimedia Concert",
    musicBy: "Music by Milica Parano\u0161i\u0107, Ana Mihajlovi\u0107, Natasha Bogojevi\u0107, Katarina Miljkovi\u0107, and Dijana Bo\u0161kovi\u0107",
    performersTitle: "Performers",
    performers: "Visionintoart Collective, Versus Vox Ensemble, Demitrius Spaneas (saxophone, flute, clarinet), Kent O'Doherty (saxophone), Nada Kolund\u017eija (piano), Ana Mihajlovi\u0107 Ensemble & Cloud Society",
    reviewTitle: "Multicontinental Wireless Transmission",
    reviewSource: "Serbian newspaper Danas, October 2007 (translation)",
    reviewEvent: "Emigr\u00e9's Waltz, multimedia concert on 16 October 2007 | Yugoslav Drama Theater, Belgrade",
    paragraphs: [
      "America, America, America \u2013 then Germany, and finally the Netherlands: at the center of the stage at the Yugoslav Drama Theater, the audience experienced the musical voices of our heritage. Visitors to this special evening at the international BEMUS Festival heard the 'musical journeys' of artists who have developed their creative work abroad. For many, the homeland of the 1990s had simply become too narrow.",
      "Dijana Bo\u0161kovi\u0107 and her Versus Vox Ensemble from Munich brought a musical dream to life on stage \u2013 a sound world that was at once relaxed, vibrant, and full of energy. Perhaps such an atmosphere can only otherwise be found in the tropics.",
      "We are grateful to our talented composers abroad for this extraordinary and captivating evening, where we felt, in a sense, 'wirelessly' connected to the whole world."
    ]
  },
  de: {
    backButton: "Zur\u00fcck zu Versus Vox",
    pageTitle: "EMIGR\u00c9'S WALTZ",
    subtitle: "39. Belgrade Music Festival \u2013 BEMUS",
    concertType: "Emigr\u00e9's Waltz \u2013 Multimediales Konzert",
    musicBy: "Musik von Milica Parano\u0161i\u0107, Ana Mihajlovi\u0107, Natasha Bogojevi\u0107, Katarina Miljkovi\u0107 und Dijana Bo\u0161kovi\u0107",
    performersTitle: "Mitwirkende",
    performers: "Visionintoart Collective, Versus Vox Ensemble, Demitrius Spaneas (Saxophon, Fl\u00f6te, Klarinette), Kent O'Doherty (Saxophon), Nada Kolund\u017eija (Klavier), Ana Mihajlovi\u0107 Ensemble & Cloud Society",
    reviewTitle: "Multikontinentale drahtlose \u00dcbertragung",
    reviewSource: "Serbische Zeitung Danas, Oktober 2007 (\u00dcbersetzung)",
    reviewEvent: "Emigranten-Walzer, multimediales Konzert am 16. Oktober 2007 | Jugoslawisches Drama Theater, Belgrad",
    paragraphs: [
      "Amerika, Amerika, Amerika \u2013 dann Deutschland und schlie\u00dflich auch Holland: In der Mitte der B\u00fchne des Jugoslawischen Drama Theaters versammelten sich musikalische Stimmen unserer Herkunft. Die Besucher dieses besonderen Konzertabends im Rahmen des internationalen BEMUS-Festivals konnten die 'musikalischen Lebenswege' jener K\u00fcnstlerinnen h\u00f6ren, die ihre kreative Arbeit heute irgendwo 'drau\u00dfen' in der Welt entfalten. F\u00fcr viele von ihnen war die Heimat der 1990er-Jahre schlicht zu eng geworden.",
      "Dijana Bo\u0161kovi\u0107 und ihr Ensemble Versus Vox aus M\u00fcnchen brachten einen musikalischen Traum auf die B\u00fchne \u2013 eine Klangwelt, die zugleich entspannt, lebendig und voller Energie ist. Vielleicht findet man eine solche Atmosph\u00e4re sonst nur in den Tropen.",
      "Wir danken unseren talentierten Komponistinnen im Ausland f\u00fcr diesen besonderen und faszinierenden Abend, an dem wir uns \u2013 gleichsam 'drahtlos' \u2013 mit der ganzen Welt verbunden f\u00fchlten."
    ]
  }
};

// --- SCROLL REVEAL COMPONENT ---
function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  // Strictly typed for Vercel
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

export default function EmigresWaltzPage() {
  const [language, setLanguage] = useState<Language>('en');

  // Read Language Setting safely
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
      className="w-full min-h-screen text-white selection:bg-white selection:text-black relative"
      style={{ backgroundColor: '#000' }}
    >
      {/* BACKGROUND IMAGE - Fixed to fill entire height and extend through the top */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none w-full h-full"
        style={{ 
            backgroundImage: "url('/images/emigres-waltz-bg.webp')", 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
        }}
      />

      {/* --- MOBILE TOP NAV SPACER (Optional background) --- */}
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
          className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-white hover:text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 hover:border-white/60 px-4 py-3 rounded-md transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {currentContent.backButton}
        </a>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-[850px] mx-auto px-4 md:px-8 pb-20 pt-8 md:pt-0">
        
        {/* BLACK BACKGROUND CONTAINER WITH NO TOP BORDER */}
        <div className="bg-black/85 backdrop-blur-md px-4 md:px-12 py-8 md:py-12 shadow-2xl border-x border-b border-white">
          
          {/* Mobile Back Button (Inside Container) */}
          <div className="lg:hidden mb-8 text-center">
            <a 
              href="/ensembles" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              {currentContent.backButton}
            </a>
          </div>

          <div className="space-y-10 md:space-y-12">

            {/* HEADER SECTION */}
            <section className="text-center">
              <ScrollReveal delay={0}>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-widest uppercase mb-2">
                  {currentContent.pageTitle}
                </h1>
                <h2 className="text-xl md:text-2xl font-heading text-white/90 font-bold tracking-widest mb-8">
                  {currentContent.subtitle}
                </h2>
                
                <div className="space-y-1.5 font-body text-sm md:text-base text-white/80">
                  <p className="font-semibold text-white">{currentContent.concertType}</p>
                  <p className="italic mt-2 leading-relaxed">{currentContent.musicBy}</p>
                </div>
                
                <div className="h-px w-24 bg-white mx-auto opacity-30 mt-8"></div>
              </ScrollReveal>
            </section>

            {/* PERFORMERS SECTION */}
            <section>
              <ScrollReveal delay={0.1}>
                <div className="bg-white/5 border border-white/20 p-6 md:p-8 text-center">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white uppercase tracking-widest mb-4">
                    {currentContent.performersTitle}
                  </h3>
                  <p className="font-body text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
                    {currentContent.performers}
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* VIDEO EMBED */}
            <ScrollReveal delay={0.15}>
              <div className="w-full aspect-video shadow-xl border border-white/20 bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/qK4EA-K2VO4" 
                  title="Emigres Waltz YouTube Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollReveal>

            {/* REVIEW SECTION & INJECTED IMAGE */}
            <section>
              <ScrollReveal delay={0.1}>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                    {currentContent.reviewTitle}
                  </h3>
                  <p className="font-body text-sm md:text-base text-gray-400 italic mb-6">
                    {currentContent.reviewSource}
                  </p>
                  
                  <div className="bg-white/10 px-4 py-3 border-l-2 border-white mb-8">
                    <p className="font-body text-sm md:text-base text-white/90 font-semibold whitespace-pre-line">
                      {currentContent.reviewEvent}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {currentContent.paragraphs.map((paragraph, index) => (
                      <div key={index} className="space-y-6">
                        <p className="font-body text-sm md:text-base leading-relaxed text-white/90 text-left md:text-justify">
                          {paragraph}
                        </p>
                        
                        {/* INJECT IMAGE AFTER THE FIRST PARAGRAPH */}
                        {index === 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full py-2"
                          >
                            <img 
                              src="/images/emigres_waltz_1.webp" 
                              alt="Emigres Waltz Performance" 
                              className="w-full h-auto object-cover shadow-lg border border-white/20"
                            />
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </section>

          </div>
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}