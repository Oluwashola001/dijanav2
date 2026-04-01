'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';

type Language = 'en' | 'de';

interface ContentType {
  backButton: string;
  pageTitle: string;
  subtitle: string;
  discipline: string;
  patron: string;
  support: string;
  introText: string[];
  credits: {
    composersTitle: string;
    composers: string;
    soundTitle: string;
    soundName: string;
    speakerTitle: string;
    speakerName: string;
  };
  review: {
    title: string;
    meta: string;
    paragraphs: string[];
  };
}

const CONTENT: Record<Language, ContentType> = {
  en: {
    backButton: "Back to Versus Vox",
    pageTitle: "BEGEGNUNGEN",
    subtitle: "Germany \u2013 Serbia",
    discipline: "Chamber Music / Literature / Sound Pieces",
    patron: "Patron: Dr. Gertraud Burkert, First Mayor of the City of Munich",
    support: "A project by musica femina m\u00fcnchen e.V., supported by the Department of Arts and Culture of the City of Munich.",
    introText: [
      "This project explores the encounter between the cultural spheres of Germany and Serbia. Through music and literature, different artistic perspectives are brought into dialogue and made accessible to the audience. Questions of integration, memory, and the experience of war form an important thematic background.",
      "At the heart of the program are chamber music works by German and Serbian women composers. These are complemented by sound pieces, literary texts reflecting encounters between German and Serbian writers, as well as interviews that offer insights into a politically dynamic and rapidly changing present.",
      "The result is a multifaceted artistic project in which music, language, and personal voices intertwine to create a shared space of reflection and artistic experience."
    ],
    credits: {
      composersTitle: "Composers",
      composers: "Vera Stanojevi\u0107 \u00b7 Dorothee Eberhardt \u00b7 Dijana Bo\u0161kovi\u0107 \u00b7 Ruth Schonthal \u00b7 Natasha Bogojevich",
      soundTitle: "Sound pieces",
      soundName: "Tanja Gronde",
      speakerTitle: "Speaker",
      speakerName: "Olivera Lukas"
    },
    review: {
      title: "Ivo Andri\u0107 among Germans",
      meta: "Nachrichten-Europa, 28 January 2006 | By Milan Mili\u010d\u0107",
      paragraphs: [
        "After a long period of preparation, the event Encounters: Germany\u2013Serbia recently took place in Munich. The project was initiated by the composer and flutist Dijana Bo\u0161kovi\u0107 and supported by the Department of Arts and Culture of the City of Munich as well as the association musica femina m\u00fcnchen e.V. The patron of the project was Dr. Gertraud Burkert, former mayor of Munich.",
        "The Black Box hall at the Gasteig Cultural Center was nearly full, with a predominantly German audience. The evening opened with greetings from Dr. Gertraud Burkert, who expressed her best wishes to the association musica femina m\u00fcnchen and to the Serbian community in Munich.",
        "A highlight of the concert was Dijana Bo\u0161kovic's Suite after Serbian Folk Melodies, performed by cellist Jessica Kuhn and violinist Ferenc Koelce. The chamber work combines elements of Serbian folk music with a contemporary musical language. The piece was among several works premiered that evening, alongside compositions by Vera Stanojevi\u0107, Dorothee Eberhardt, and Ruth Schonthal.",
        "The instrumental works were performed by the Versus Vox Ensemble (Munich): Christophe G\u00f6rdes (clarinet), Elina Goto (percussion), Dijana Bo\u0161kovi\u0107 (flute), and Helmut Schmitt (piano). The program was further enriched by sound pieces by Tanja Gronde, based on interviews with people from Serbia and Germany on themes such as integration, everyday life, and experiences of war.",
        "Actress Olivera Lukas contributed readings of texts by German and Serbian writers and engaged the audience in a lively discussion on the themes of home and everyday life in Germany and Serbia."
      ]
    }
  },
  de: {
    backButton: "Zur\u00fcck zu Versus Vox",
    pageTitle: "BEGEGNUNGEN",
    subtitle: "Deutschland \u2013 Serbien",
    discipline: "Kammermusik / Literatur / H\u00f6rbilder",
    patron: "Schirmherrin: Dr. Gertraud Burkert, 1. B\u00fcrgermeisterin der Stadt M\u00fcnchen",
    support: "Ein Projekt von musica femina m\u00fcnchen e.V. mit Unterst\u00fctzung des Kulturreferats der Stadt M\u00fcnchen.",
    introText: [
      "Dieses Projekt widmet sich der Begegnung der Kulturr\u00e4ume Deutschland und Serbien. Durch Musik und Literatur werden unterschiedliche k\u00fcnstlerische Perspektiven miteinander in Beziehung gesetzt und f\u00fcr das Publikum erfahrbar gemacht. Themen wie Integration, Erinnerung und Kriegserfahrungen bilden dabei einen wichtigen inhaltlichen Hintergrund.",
      "Im Mittelpunkt stehen kammermusikalische Werke deutscher und serbischer Komponistinnen. Erg\u00e4nzt wird das Programm durch H\u00f6rbilder, literarische Texte \u00fcber Begegnungen deutscher und serbischer Schriftstellerinnen und Schriftsteller sowie Interviews aus einer politisch bewegten und sich wandelnden Gegenwart.",
      "So entsteht ein vielschichtiges Projekt, in dem Musik, Sprache und pers\u00f6nliche Stimmen zu einem gemeinsamen k\u00fcnstlerischen Erfahrungsraum zusammenfinden."
    ],
    credits: {
      composersTitle: "Komponistinnen",
      composers: "Vera Stanojevi\u0107 \u00b7 Dorothee Eberhardt \u00b7 Dijana Bo\u0161kovi\u0107 \u00b7 Ruth Schonthal \u00b7 Natasha Bogojevi\u0107",
      soundTitle: "H\u00f6rbilder",
      soundName: "Tanja Gronde",
      speakerTitle: "Sprecherin",
      speakerName: "Olivera Lukas"
    },
    review: {
      title: "Ivo Andri\u0107 unter Deutschen",
      meta: "Nachrichten-Europa, 28. Januar 2006 | Von Milan Mili\u010d\u0107",
      paragraphs: [
        "Nach langer und intensiver Vorbereitung fand k\u00fcrzlich in M\u00fcnchen die Veranstaltung Begegnungen Deutschland\u2013Serbien statt. Das Projekt wurde von der Komponistin und Fl\u00f6tistin Dijana Bo\u0161kovi\u0107 initiiert und durch das Kulturreferat der Landeshauptstadt M\u00fcnchen sowie den Verein musica femina m\u00fcnchen e.V. gef\u00f6rdert. Schirmherrin des Projekts war Dr. Gertraud Burkert, ehemalige B\u00fcrgermeisterin der Stadt M\u00fcnchen.",
        "Der Saal der Black Box im Kulturzentrum Gasteig war nahezu vollst\u00e4ndig gef\u00fcllt, wobei der Gro\u00dfteil des Publikums aus deutschen Zuh\u00f6rerinnen und Zuh\u00f6rern bestand. Den Abend er\u00f6ffnete Dr. Gertraud Burkert mit Gru\u00dfworten und guten W\u00fcnschen f\u00fcr den Verein musica femina m\u00fcnchen sowie f\u00fcr die serbische Gemeinschaft in M\u00fcnchen.",
        "Ein H\u00f6hepunkt des Konzerts war die Auff\u00fchrung von Dijana Bo\u0161kovic's Werk Suite nach serbischen Volksmelodien, das von der Cellistin Jessica Kuhn und dem Violinisten Ferenc Koelce eindrucksvoll interpretiert wurde. Das kammermusikalische St\u00fcck verbindet auf \u00fcberzeugende Weise Elemente serbischer Volksmusik mit einer zeitgen\u00fcssischen musikalischen Sprache. Die Komposition geh\u00f6rte zu den Werken, die an diesem Abend uraufgef\u00fchrt wurden. Weitere Komponistinnen des Programms waren Vera Stanojevi\u0107, Dorothee Eberhardt und Ruth Schonthal.",
        "Die Instrumentalwerke wurden vom Versus Vox Ensemble (M\u00fcnchen) aufgef\u00fchrt: Christophe G\u00f6rdes (Klarinette), Elina Goto (Percussion), Dijana Bo\u0161kovi\u0107 (Fl\u00f6te) und Helmut Schmitt (Klavier).",
        "Der musikalische Teil des Programms wurde durch H\u00f6rbilder von Tanja Gronde erg\u00e4nzt, die auf Interviews mit Menschen aus Serbien und Deutschland basierten und Themen wie Integration, Alltag und Kriegserfahrungen aufgriffen.",
        "Besonders hervorzuheben ist die Schauspielerin Olivera Lukas, die Texte deutscher und serbischer Schriftstellerinnen und Schriftsteller rezitierte und das Publikum in ein lebendiges Gespr\u00e4ch \u00fcber die Themen Heimat sowie Alltag in Deutschland und Serbien einbezog."
      ]
    }
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

export default function EncountersPage() {
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

  const t = CONTENT[language];

  return (
    <main
      className="w-full min-h-screen text-[#3D593C] selection:bg-[#3D593C] selection:text-[#FDF8EC]"
      style={{ backgroundColor: '#FDF8EC' }}
    >
      {/* DESKTOP SIDEBAR NAV */}
      <motion.div
        className="hidden lg:block fixed top-24 right-8 z-40 w-auto"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="/ensembles"
          className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-[#FDF8EC] hover:text-[#FDF8EC] bg-[#3D593C]/80 backdrop-blur-md border border-white/20 hover:bg-[#3D593C]/95 px-4 py-3 rounded-md transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {t.backButton}
        </a>
      </motion.div>

      {/* THREE-COLUMN LAYOUT on desktop: image | content | image */}
      <div className="flex min-h-screen items-stretch pt-12 md:pt-0 pb-20">

        {/* LEFT IMAGE — desktop only */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 self-start sticky top-0 h-screen">
          <img
            src="/images/encounters-bg.webp"
            alt="Encounters – Germany Serbia"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CENTRE: Content column */}
        <div className="flex-1 min-w-0 self-start px-4 md:px-8 lg:px-0">
          <div className="max-w-[850px] mx-auto lg:mx-0 lg:max-w-none">
            <div className="bg-[#FDF8EC]/95 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl border border-[#3D593C]/20">

              {/* Mobile Back Button */}
              <div className="lg:hidden mb-8 text-center">
                <a
                  href="/ensembles"
                  className="inline-flex items-center gap-2 text-[#3D593C] font-body text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  {t.backButton}
                </a>
              </div>

              <div className="space-y-12">

                {/* HEADER */}
                <section className="text-center">
                  <ScrollReveal delay={0}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3D593C] tracking-widest uppercase mb-1">
                      {t.pageTitle}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-heading text-[#3D593C] font-bold tracking-[0.2em] mb-4">
                      {t.subtitle}
                    </h2>
                    <p className="text-sm md:text-base font-body uppercase tracking-[0.15em] text-[#3D593C]/70 mb-8">
                      {t.discipline}
                    </p>
                    <div className="space-y-2 font-body text-sm md:text-base text-[#3D593C]">
                      <p className="font-semibold">{t.patron}</p>
                      <p className="italic text-[#3D593C]/80 max-w-lg mx-auto leading-relaxed">{t.support}</p>
                    </div>
                    <div className="h-px w-24 bg-[#3D593C] mx-auto opacity-30 mt-10"></div>
                  </ScrollReveal>
                </section>

                {/* MOBILE ONLY IMAGE — after header */}
                <div className="lg:hidden">
                  <ScrollReveal delay={0.1}>
                    <img
                      src="/images/encounters.webp"
                      alt="Encounters – Germany Serbia"
                      className="w-full h-auto object-cover shadow-md border border-[#3D593C]/20"
                    />
                  </ScrollReveal>
                </div>

                {/* INTRO */}
                <section className="space-y-6">
                  {t.introText.map((paragraph, index) => (
                    <ScrollReveal key={index} delay={0.1}>
                      <p className="font-body text-sm md:text-base leading-relaxed text-left md:text-justify">
                        {paragraph}
                      </p>
                    </ScrollReveal>
                  ))}
                </section>

                {/* CREDITS */}
                <ScrollReveal delay={0.1}>
                  <div className="bg-[#3D593C]/5 border border-[#3D593C]/10 p-6 md:p-10 space-y-8">
                    <div className="text-center md:text-left">
                      <h3 className="font-heading text-xs uppercase tracking-widest text-[#3D593C]/60 mb-2">{t.credits.composersTitle}</h3>
                      <p className="font-heading text-lg md:text-xl font-bold text-[#3D593C] leading-snug">
                        {t.credits.composers}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-heading text-xs uppercase tracking-widest text-[#3D593C]/60 mb-1">{t.credits.soundTitle}</h3>
                        <p className="font-body font-bold">{t.credits.soundName}</p>
                      </div>
                      <div>
                        <h3 className="font-heading text-xs uppercase tracking-widest text-[#3D593C]/60 mb-1">{t.credits.speakerTitle}</h3>
                        <p className="font-body font-bold">{t.credits.speakerName}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* REVIEW */}
                <section className="pt-12 border-t border-[#3D593C]/10">
                  <ScrollReveal delay={0.1}>
                    <div className="text-center md:text-left space-y-6">
                      <div className="border-l-4 border-[#3D593C] pl-6">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-[#3D593C] tracking-wide">
                          {t.review.title}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-[#3D593C]/60 uppercase tracking-widest mt-1">
                          {t.review.meta}
                        </p>
                      </div>
                      <div className="space-y-6">
                        {t.review.paragraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            className="font-body text-sm md:text-base leading-relaxed text-[#3D593C]/90 text-left md:text-justify italic"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </section>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE — desktop only, mirrors the left */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 self-start sticky top-0 h-screen">
          <img
            src="/images/encounters-bg.webp"
            alt="Encounters – Germany Serbia"
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}