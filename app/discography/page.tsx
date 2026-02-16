'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    pageTitle: "Discography",
    section1: {
      title: "Productions with Music by Dijana Bošković",
      albums: [
        {
          title: "ENCOUNTERS / BEGEGNUNGEN",
          subtitle: "Chamber Music",
          description: [
            "As flautist and artistic director of the Versus Vox Ensemble, Dijana Bošković presents her own compositions on this recording. Classical and unconventional instrumentations — including voice and a large concert singing-bowl ensemble in dialogue with piano — open a wide spectrum of sonic colours and musical ideas.",
            "Her music unites tradition with impulses from the European avant-garde, shaping a distinctive musical language that is both contemporary and deeply rooted."
          ],
          performersTitle: "Performers – Versus Vox Ensemble",
          performers: [
            "Dijana Bošković — composition, flute, singing bowls",
            "Miku Nishimoto-Neubert — piano",
            "Ingmar Schwindt — piano",
            "Stephanie Hampl — voice",
            "Elina Goto — percussion",
            "Ana Lebedinski — violin",
            "Jessica Kuhn — violoncello",
            "Thomas Ruge — violoncello",
            "Christophe Gördes — clarinet",
            "Georg Müller — singing bowls"
          ],
          credits: "Cover photography: Sabine Klem",
          duration: "Duration: 50:22",
          production: "Produced by Cavalli-Records, 2013",
          coverImage: "/images/discography/encount_cover.webp"
        },
        {
          title: "20 YEARS ENSEMBLE PLUS 2016 - ORF V",
          subtitle: null,
          description: [
            "On the ensemble plus CD, recorded at ORF Vorarlberg, Dijana Bošković's Suite for Violin and Cello is featured. For twenty years, the ensemble has focused on contemporary compositions and rarely performed works, performing in flexible instrumental settings. This recording showcases the composition within the ensemble's long-standing creative work."
          ],
          performersTitle: "Performers",
          performers: [
            "Doren Dinglinger — violin",
            "Jessica Kuhn — violoncello"
          ],
          credits: null,
          duration: "Duration: 3‑CD box",
          production: "Produced by ORF V, 2016",
          coverImage: "/images/discography/ensemble-plus.webp"
        }
      ]
    },
    section2: {
      title: "Productions with Dijana Bošković as Flautist",
      subtitle: "Classical Music & Improvisation",
      albums: [
        {
          title: "SONGS OF JOY AND GRATITUDE",
          subtitle: null,
          description: [
            "Modern jazz with refined arrangements and rich sonic colours by bassist Paulo Cardoso and his band.",
            "\"I heard Dijana Bošković at a classical concert at the Gasteig in 1999. I approached her and asked whether she would be interested in improvising duo recordings with me. We did one rehearsal and entered the studio three weeks later. The duets serve as interludes between the pieces, helping to connect and shape the different musical moods.\""
          ],
          tracks: "Tracks include: Intermezzo I–III, Faces, TGTT, Waltz Boogie, So Many Stars, A Nightingale Sang in Berkeley Square, Lush Life",
          performersTitle: "Performers",
          performers: [
            "Paulo Cardoso — bass, vocals",
            "Dijana Bošković — flute",
            "Karsten Holzapfel — cello, guitar",
            "Oliver Kent — piano",
            "Mario Gonzi — drums"
          ],
          credits: null,
          duration: null,
          production: "Produced 2005 by Organic Music",
          coverImage: "/images/discography/cardoso_cd.webp"
        },
        {
          title: "INANNA",
          subtitle: null,
          description: [
            "Listening cinema based on the Sumerian myth Inanna's Descent to the Underworld.",
            "Text: Karoly Koller",
            "Music: Helga Pogatschar"
          ],
          tracks: null,
          performersTitle: "Performers",
          performers: [
            "Claudia Matussek — voice",
            "Bettina Koziol — voice",
            "Merit Ostermann — voice",
            "Jochen Brennich — organ",
            "Marika Falk — percussion",
            "Roland Merz — cello",
            "Dijana Bošković — flutes",
            "Veaceslav Cernavca — clarinets"
          ],
          credits: null,
          duration: "Duration: 65:00",
          production: "Produced 2003 by Chrom Records",
          coverImage: "/images/discography/inanna-cd.webp"
        },
        {
          title: "–1700–",
          subtitle: null,
          description: [
            "A literary-musical journey through the Baroque era.",
            "Author: Britta Loebell"
          ],
          tracks: null,
          performersTitle: "Performers",
          performers: [
            "Dijana Bošković — flute",
            "Clara Dent — oboe",
            "Bettina Koziol — vocals",
            "Jochen Striebeck — speaker",
            "",
            "Orchestra: Orchestra Di Medici"
          ],
          credits: null,
          duration: null,
          production: "Produced 2008 by Upsolute Music Records / Bernhard Seidel",
          coverImage: "/images/discography/1700_cd.webp"
        },
        {
          title: "MOUSE AND MONSTERS",
          subtitle: null,
          description: [
            "Mini-opera for children (ages 6+) and curious adults.",
            "What can Gil Gama's mouse do against mythological creatures such as the Sphinx, the Minotaur, the Aspis snake, or the Chimera? Much more than expected.",
            "",
            "Author: Rudolf Herfurtner",
            "Music: Helga Pogatschar",
            "Musical direction: Dijana Bošković"
          ],
          tracks: null,
          performersTitle: "Performers",
          performers: [
            "Vocals: Cornelia Melián",
            "Performed by: Versus Vox Ensemble",
            "Illustrations: Katrin Coetzer (Cape Town)"
          ],
          credits: null,
          duration: "Duration: 52:07",
          production: "Produced 2010 by Klangmueller Records",
          coverImage: "/images/discography/mm_cd.webp"
        },
        {
          title: "LANDSCAPES / LANDSCHAFTEN",
          subtitle: null,
          description: [
            "Contemporary chamber music for various instrumentations by Dorothee Eberhardt, including Sextet, a commissioned composition for the Versus Vox Ensemble."
          ],
          tracks: null,
          performersTitle: "Performers",
          performers: [
            "Versus Vox Ensemble",
            "Vuillaume Trio",
            "Munich Flute Trio",
            "Zoltan Kovács — clarinet",
            "Axel Gremmelspacher — piano"
          ],
          credits: null,
          duration: "Duration: 65:15",
          production: "Produced 2008 by Cavalli-Records",
          coverImage: "/images/discography/landscape.webp"
        }
      ]
    }
  },
  de: {
    pageTitle: "Diskografie",
    section1: {
      title: "Produktionen mit Musik von Dijana Bošković",
      albums: [
        {
          title: "ENCOUNTERS / BEGEGNUNGEN",
          subtitle: "Kammermusik",
          description: [
            "Als Flötistin und künstlerische Leiterin des Versus Vox Ensembles präsentiert Dijana Bošković auf dieser CD ihre Werke. Klassische und ungewöhnliche Besetzungen – z. B. Stimme oder das große Konzertklangschalen-Ensemble in Verbindung mit Klavier – zeigen ein breites Spektrum an musikalischen Ideen und Klangkombinationen.",
            "Dijana Boškovićs Musik verbindet Traditionelles mit den Ideen der europäischen Avantgarde zu einer neuen, naturhaft verwurzelten musikalischen Sprache."
          ],
          performersTitle: "Versus Vox Ensemble",
          performers: [
            "Dijana Bošković: Komposition, Querflöte, Klangschalen",
            "Miku Nishimoto-Neubert, Ingmar Schwindt: Klavier",
            "Stephanie Hampl: Gesang",
            "Elina Goto: Perkussion",
            "Ana Lebedinski: Violine",
            "Jessica Kuhn, Thomas Ruge: Violoncello",
            "Christophe Gördes: Klarinette",
            "Georg Müller: Klangschalen"
          ],
          credits: "Fotos für die Gestaltung des Covers: Sabine Klem",
          duration: "Spieldauer: 50:22 Min.",
          production: "Produced 2013 by Cavalli-Records",
          coverImage: "/images/discography/encount_cover.webp"
        },
        {
          title: "20 JAHRE ENSEMBLE PLUS - ORF V",
          subtitle: null,
          description: [
            "Auf der CD des ensemble plus, aufgenommen im ORF Vorarlberg, ist Suite für Violine und Cello von Dijana Bošković zu hören. Das Ensemble widmet sich seit zwanzig Jahren zeitgenössischen Kompositionen und selten gespielten Werken, flexibel in verschiedenen Besetzungen. Die Aufnahme präsentiert die Komposition im kreativen Kontext der langjährigen Arbeit des Ensembles."
          ],
          performersTitle: "Performer",
          performers: [
            "Doren Dinglinger: Violine",
            "Jessica Kuhn: Violoncello"
          ],
          credits: null,
          duration: "Dauer: 3‑CD box",
          production: "Produced by ORF V, 2016",
          coverImage: "/images/discography/ensemble-plus.webp"
        }
      ]
    },
    section2: {
      title: "Produktionen mit Dijana Bošković als Flötistin",
      subtitle: "Klassik & Improvisation",
      albums: [
        {
          title: "SONGS OF JOY AND GRATITUDE",
          subtitle: null,
          description: [
            "Modern Jazz mit feinen Arrangements und klanglicher Vielfalt durch Bassist Paulo Cardoso und seine Band.",
            "\"Ich hörte Dijana Bošković 1999 bei einem klassischen Konzert im Gasteig. Ich sprach sie an und fragte, ob sie Interesse hätte, Duo-Aufnahmen mit mir zu improvisieren. Wir machten eine Probe und gingen drei Wochen später ins Studio. Die Duette dienen als Zwischenspiele zwischen den Stücken; sie verbinden und formen die unterschiedlichen musikalischen Stimmungen.\""
          ],
          tracks: "Tracks: Intermezzo I–III, Faces, TGTT, Waltz Boogie, So Many Stars, A Nightingale Sang in Berkeley Square, Lush Life",
          performersTitle: "Performer",
          performers: [
            "Paulo Cardoso: Bass, Gesang",
            "Dijana Bošković: Flöte",
            "Karsten Holzapfel: Cello, Gitarre",
            "Oliver Kent: Klavier",
            "Mario Gonzi: Schlagzeug"
          ],
          credits: null,
          duration: null,
          production: "Produced 2005 by Organic Music",
          coverImage: "/images/discography/cardoso_cd.webp"
        },
        {
          title: "INANNA",
          subtitle: null,
          description: [
            "Hörkino basierend auf dem sumerischen Mythos Inannas Gang in die Unterwelt.",
            "Text: Karoly Koller",
            "Musik: Helga Pogatschar"
          ],
          tracks: null,
          performersTitle: "Performer",
          performers: [
            "Stimmen: Claudia Matussek, Bettina Koziol, Merit Ostermann",
            "Orgel: Jochen Brennich",
            "Percussion: Marika Falk",
            "Violoncello: Roland Merz",
            "Flöten: Dijana Bošković",
            "Klarinetten: Veaceslav Cernavca"
          ],
          credits: "Cover Design: Claudia Böhm",
          duration: "Dauer: 65 Min.",
          production: "Produced 2003 by Chrom Records",
          coverImage: "/images/discography/inanna-cd.webp"
        },
        {
          title: "–1700–",
          subtitle: null,
          description: [
            "Eine literarisch-musikalische Reise durch die Zeit des Barocks",
            "Autorin: Britta Loebell"
          ],
          tracks: null,
          performersTitle: "Performer",
          performers: [
            "Dijana Bošković: Querflöte",
            "Clara Dent: Oboe",
            "Bettina Koziol: Gesang",
            "Sprecher: Jochen Striebeck",
            "",
            "Orchester: Orchestra Di Medici"
          ],
          credits: null,
          duration: null,
          production: "Produced 2008 by Upsolute Music Records / Bernhard Seidel",
          coverImage: "/images/discography/1700_cd.webp"
        },
        {
          title: "MAUS UND MONSTER",
          subtitle: null,
          description: [
            "Mini-Oper für Kinder ab 6 Jahren und für Neugierige aller Altersgruppen.",
            "Was kann die Maus Gil Gamaus gegen mythologische Fabelwesen wie Sphinx, Minotauros, die Aspis-Schlange oder Chimäre ausrichten? Mehr als erwartet.",
            "",
            "Autor: Rudolf Herfurtner",
            "Musik: Helga Pogatschar",
            "Musikalische Leitung: Dijana Bošković"
          ],
          tracks: null,
          performersTitle: "Performer",
          performers: [
            "Gesang: Cornelia Melián",
            "Es spielen: Versus Vox Ensemble",
            "Illustrationen: Katrin Coetzer, Kapstadt"
          ],
          credits: null,
          duration: "Spieldauer: 52:07 Min. (1 CD)",
          production: "Produced 2010 by Klangmueller Records",
          coverImage: "/images/discography/mm_cd.webp"
        },
        {
          title: "LANDSCHAFTEN / LANDSCAPES",
          subtitle: null,
          description: [
            "Zeitgenössische Kammermusik für diverse Besetzungen von Dorothee Eberhardt, u. a. Sextett – Auftragskomposition für das Versus Vox Ensemble."
          ],
          tracks: null,
          performersTitle: "Es spielen",
          performers: [
            "Versus Vox Ensemble",
            "Vuillaume-Trio",
            "Münchner Flöten-Trio",
            "Zoltan Kovács: Klarinette",
            "Axel Gremmelspacher: Klavier"
          ],
          credits: null,
          duration: "Spieldauer: 65:15 Min.",
          production: "Produced 2008 by Cavalli-Records",
          coverImage: "/images/discography/landscape.webp"
        }
      ]
    }
  }
};

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

export default function DiscographyPage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const currentContent = CONTENT[language];

  return (
    <main className="w-full min-h-screen bg-transparent text-white selection:bg-[#ff6643] selection:text-white relative">
      
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute top-0 left-0 w-full min-h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
            backgroundImage: "url('/images/discography/bg_schwarz1.webp')",
            minHeight: '100%',
        }}
      />

      {/* --- MAIN CONTENT CONTAINER - CENTERED --- */}
      <div className="max-w-[950px] mx-auto pt-0 md:pt-0 px-4 md:px-8 pb-16 relative z-10">
        
        {/* EXPANDED #575757 BACKGROUND CONTAINER */}
        <div className="bg-[#575757]/90 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl">
          
          {/* PAGE TITLE */}
          <ScrollReveal delay={0}>
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-wide">
                {currentContent.pageTitle}
              </h1>
            </div>
          </ScrollReveal>

          <div className="space-y-16">

            {/* SECTION 1: Productions with Music by Dijana Bošković */}
            <ScrollReveal delay={0.1}>
              <section>
                {/* Section Title */}
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#ff6643] tracking-wide">
                    {currentContent.section1.title}
                  </h2>
                </div>

                {/* Albums */}
                <div className="space-y-12">
                  {currentContent.section1.albums.map((album: any, index: number) => (
                    <motion.div
                      key={index}
                      className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 space-y-6"
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {/* Album Title */}
                      <div className="border-l-4 border-[#ff6643] pl-4">
                        <h3 className="text-lg md:text-xl font-serif uppercase tracking-wide text-[#ff6643] mb-1">
                          {album.title}
                        </h3>
                        {album.subtitle && (
                          <p className="text-base md:text-lg text-white/80 italic">{album.subtitle}</p>
                        )}
                      </div>

                      {/* Cover Image (if exists) */}
                      {album.coverImage && album.coverImage !== null && (
                        <div className="flex justify-center my-6">
                          <img 
                            src={album.coverImage} 
                            alt={album.title}
                            className="max-w-[300px] w-full h-auto object-contain"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <div className="space-y-4 text-blue-50 font-body text-sm md:text-base leading-relaxed">
                        {album.description.map((paragraph: string, pIndex: number) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>

                      {/* Tracks (if exists) */}
                      {'tracks' in album && album.tracks && typeof album.tracks === 'string' && (
                        <p className="text-blue-50 font-body text-sm md:text-base leading-relaxed italic">
                          {album.tracks}
                        </p>
                      )}

                      {/* Performers */}
                      <div className="space-y-2">
                        <h4 className="text-amber-200/90 font-semibold text-sm md:text-base">
                          {album.performersTitle}
                        </h4>
                        <div className="pl-4 space-y-1 text-blue-50 font-body text-xs md:text-sm">
                          {album.performers.map((performer: string, pIdx: number) => (
                            <p key={pIdx}>{performer}</p>
                          ))}
                        </div>
                      </div>

                      {/* Credits */}
                      {album.credits && (
                        <p className="text-blue-50 font-body text-xs md:text-sm italic">
                          {album.credits}
                        </p>
                      )}

                      {/* Duration & Production */}
                      <div className="space-y-1 text-blue-50 font-body text-xs md:text-sm italic">
                        {album.duration && <p>{album.duration}</p>}
                        {album.production && <p>{album.production}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* SECTION 2: Productions with Dijana Bošković as Flautist */}
            <ScrollReveal delay={0.15}>
              <section>
                {/* Section Title */}
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#ff6643] tracking-wide">
                    {currentContent.section2.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 italic mt-2">
                    {currentContent.section2.subtitle}
                  </p>
                </div>

                {/* Albums */}
                <div className="space-y-12">
                  {currentContent.section2.albums.map((album: any, index: number) => (
                    <motion.div
                      key={index}
                      className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 space-y-6"
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {/* Album Title */}
                      <div className="border-l-4 border-[#ff6643] pl-4">
                        <h3 className="text-lg md:text-xl font-serif uppercase tracking-wide text-[#ff6643] mb-1">
                          {album.title}
                        </h3>
                        {album.subtitle && (
                          <p className="text-base md:text-lg text-white/80 italic">{album.subtitle}</p>
                        )}
                      </div>

                      {/* Cover Image (if exists) */}
                      {album.coverImage && album.coverImage !== null && (
                        <div className="flex justify-center my-6">
                          <img 
                            src={album.coverImage} 
                            alt={album.title}
                            className="max-w-[300px] w-full h-auto object-contain"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <div className="space-y-4 text-blue-50 font-body text-sm md:text-base leading-relaxed">
                        {album.description.map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className={paragraph.startsWith('"') || paragraph.startsWith('„') ? 'italic' : ''}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Tracks (if exists) */}
                      {'tracks' in album && album.tracks && typeof album.tracks === 'string' && (
                        <p className="text-blue-50 font-body text-sm md:text-base leading-relaxed italic">
                          {album.tracks}
                        </p>
                      )}

                      {/* Performers */}
                      <div className="space-y-2">
                        <h4 className="text-amber-200/90 font-semibold text-sm md:text-base">
                          {album.performersTitle}
                        </h4>
                        <div className="pl-4 space-y-1 text-blue-50 font-body text-xs md:text-sm">
                          {album.performers.map((performer: string, pIdx: number) => (
                            <p key={pIdx}>{performer}</p>
                          ))}
                        </div>
                      </div>

                      {/* Credits */}
                      {album.credits && (
                        <p className="text-blue-50 font-body text-xs md:text-sm italic">
                          {album.credits}
                        </p>
                      )}

                      {/* Duration & Production */}
                      <div className="space-y-1 text-blue-50 font-body text-xs md:text-sm italic">
                        {album.duration && <p>{album.duration}</p>}
                        {album.production && <p>{album.production}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

          </div>
        </div>
        {/* END OF EXPANDED #575757 BACKGROUND CONTAINER */}

      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}