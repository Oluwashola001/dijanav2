'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

type Language = 'en' | 'de';

// --- CONTENT DATA ---

const CONTENT = {
  en: {
    pageTitle: "Press",
    sections: {
      highlights: {
        title: "Selected Highlights",
        subtitle: "As Composer",
        items: [
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
        ]
      },
      flutist: {
        title: "As Flutist",
        items: [
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
        ]
      },
      presence: {
        title: "Performance & Artistic Presence",
        items: [
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
        ]
      }
    }
  },
  de: {
    pageTitle: "Presse",
    sections: {
      highlights: {
        title: "Ausgewählte Pressestimmen",
        subtitle: "Als Komponistin",
        items: [
          {
            title: "Münchner Philharmoniker spielen Werke von Dijana Bošković",
            source: "Today Magazine – Europäische Ausgabe, 2024",
            content: "Boškovićs Musik verbindet erweiterte Tonalität mit rhythmischer Energie des Balkans und spiritueller Tiefe. Ihre Werke For My Mother, Blurred Edges und Con Fretta wurden im Münchner Künstlerhaus mit Standing Ovations gefeiert."
          },
          {
            title: "Erster Preis – Internationaler Kompositionswettbewerb",
            source: "Neue Musik Zeitung, 2017",
            content: "Dijana Bošković erhielt den Ersten Preis beim chor.com-Kompositionswettbewerb. Die Jury würdigte insbesondere die Klarheit, Ausdruckskraft und stilistische Relevanz ihres zeitgenössischen Chorwerks."
          },
          {
            title: "Concerto for Strings – Uraufführung (BEMUS Festival)",
            source: "Dnevnik / Danas, Belgrad, 2009",
            content: `Ein Werk voller kraftvoller Kontraste und leuchtender orchestraler Farben, inspiriert von folkloristischen Spieltechniken und der russischen Streichtradition – beschrieben als \u201emusikalisches Feuerwerk\u201c mit nachhaltiger künstlerischer Wirkung.`
          },
          {
            title: "Zeitgenössische Musik ohne Dogma",
            source: "Vorarlberger Nachrichten, 2014",
            content: "Boškovićs Musik zeigt, dass zeitgenössisches Komponieren expressiv, modern und zugleich zugänglich sein kann – ohne den Rückgriff auf strenge Atonalität."
          }
        ]
      },
      flutist: {
        title: "Als Flötistin",
        items: [
          {
            title: `\u201eTechnisch makellos und von tiefer Ausdruckskraft\u201c`,
            source: "Allgäuer Zeitung",
            content: "Dijana Bošković überzeugt mit einem vollen, warmen Flötenton und absoluter technischer Souveränität. Selbst anspruchsvollste Passagen gestaltet sie mit Leichtigkeit und hoher musikalischer Intelligenz."
          },
          {
            title: "Debussys Syrinx – ein Moment reiner Poesie",
            source: "AZ – Benefizkonzert Amnesty International",
            content: "Mit scheinbar grenzenloser Atemführung formt Bošković Debussys melodische Bögen bis ins feinste Pianissimo und fesselt das Publikum durch subtile Nuancierung und innere Spannung."
          },
          {
            title: "Eine Interpretin, die wie eine Komponistin denkt",
            source: "Süddeutsche Zeitung",
            content: "Bereits im klassischen Repertoire offenbart Bošković eine seltene musikalische Intelligenz. Übergänge und Phrasierungen gestaltet sie mit kompositorischem Bewusstsein und feiner klanglicher Kontrolle."
          },
          {
            title: "Kraftvolle Duo-Auftritte",
            source: "Allgäuer Zeitung",
            content: "Ob in der Kammermusik oder im Solorepertoire – Bošković verbindet Virtuosität mit expressiver Tiefe und bewegt sich mühelos zwischen stilistischen Kontrasten von Bach bis Jolivet und Casella."
          },
          {
            title: `\u201eSie kann auf der Flöte einfach alles\u201c`,
            source: "Allgäuer Zeitung",
            content: "Furchtlose Oktavläufe, präzise Artikulation und ein unverwechselbarer, leicht angerauter Ton zeichnen Bošković als Flötistin von außergewöhnlicher technischer und musikalischer Autorität aus."
          }
        ]
      },
      presence: {
        title: "Künstlerische Präsenz & Engagement",
        items: [
          {
            title: "Ensemble Versus Vox – Zeitgenössische Kammermusik auf höchstem Niveau",
            source: "Neue Musikzeitung",
            content: "Als Gründerin und künstlerische Impulsgeberin des Ensemble Versus Vox wird Bošković gleichermaßen als Komponistin, Flötistin und engagierte Vermittlerin zeitgenössischer Musik geschätzt."
          },
          {
            title: "Musik, die Kulturen verbindet",
            source: "Danas, Belgrad",
            content: "Boškovićs Auftritte schlagen Brücken zwischen musikalischen Traditionen. Intensität, Vitalität und lyrische Offenheit verschmelzen zu einer einzigartig kommunikativen künstlerischen Sprache."
          }
        ]
      }
    }
  }
};


// --- ANIMATED COMPONENTS ---

// Shared subtle transition config
const EASE = [0.22, 0.1, 0.36, 1] as const;

const subtleTransition = {
  duration: 1.2,
  ease: EASE,
};

// Animated Section Header
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
    margin: "0px 0px -50px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className="mb-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={subtleTransition}
    >
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#172F4F] uppercase tracking-widest border-b border-[#172F4F]/20 pb-2 inline-block">
        {children}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl font-serif font-bold text-[#47719E] uppercase tracking-wider mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// Animated Article
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
    amount: 0.15,
    margin: "0px 0px -40px 0px"
  });

  return (
    <motion.article 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={subtleTransition}
      className="space-y-4"
    >
      {/* Italic title */}
      <h3 className="text-xl md:text-2xl font-serif font-bold italic text-[#172F4F] leading-tight">
        {item.title}
      </h3>
      <p className="text-sm md:text-base font-body font-bold uppercase tracking-wider text-[#47719E]">
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
    margin: "0px 0px -50px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={subtleTransition}
    >
      <h1 className="text-5xl md:text-6xl font-serif text-[#172F4F] mb-4 tracking-wide font-bold drop-shadow-sm">
        {children}
      </h1>
      <div className="h-px w-24 bg-[#172F4F]/40 mx-auto"></div>
    </motion.div>
  );
}

export default function PressPage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Read the saved language
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, []);

  const t = CONTENT[language];

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
        {/* Placeholder for header/back button if needed */}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[800px] mx-auto pt-24 md:pt-32 pl-18 pr-16 md:px-24 relative z-10">
        
        {/* PAGE TITLE */}
        <AnimatedPageTitle>
          {t.pageTitle}
        </AnimatedPageTitle>

        <div className="space-y-20">
            
            {/* SECTION 1: Selected Highlights */}
            <section>
                <AnimatedSectionHeader subtitle={t.sections.highlights.subtitle}>
                  {t.sections.highlights.title}
                </AnimatedSectionHeader>
                
                <div className="space-y-12">
                    {t.sections.highlights.items.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === t.sections.highlights.items.length - 1}
                        />
                    ))}
                </div>
            </section>

            {/* SECTION 2: As Flutist */}
            <section>
                <div className="pt-10 border-t border-[#172F4F]/10">
                  <AnimatedSectionHeader>
                    {t.sections.flutist.title}
                  </AnimatedSectionHeader>
                </div>
                
                <div className="space-y-12">
                    {t.sections.flutist.items.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === t.sections.flutist.items.length - 1}
                        />
                    ))}
                </div>
            </section>

            {/* SECTION 3: Performance & Artistic Presence */}
            <section>
                <div className="pt-10 border-t border-[#172F4F]/10">
                  <AnimatedSectionHeader>
                    {t.sections.presence.title}
                  </AnimatedSectionHeader>
                </div>
                
                <div className="space-y-12">
                    {t.sections.presence.items.map((item, index) => (
                        <AnimatedArticle 
                          key={index}
                          item={item}
                          isLast={index === t.sections.presence.items.length - 1}
                        />
                    ))}
                </div>
            </section>

        </div>

      </div>
    </main>
  );
}