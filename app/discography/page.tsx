'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

type Language = 'en' | 'de';

interface Album {
  title: string;
  subtitle: string | null;
  description: string[];
  performersTitle: string;
  performers: string[];
  credits: string | null;
  duration: string | null;
  production: string | null;
  coverImage: string | null;
  tracks?: string | null;
}

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
          tracks: null,
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
          tracks: null,
          performersTitle: "Performers",
          performers: [
            "Doren Dinglinger — violin",
            "Jessica Kuhn — violoncello"
          ],
          credits: null,
          duration: "Duration: 3‑CD box",
          production: "Produced by ORF V, 2016",
          coverImage: "/images/discography/ensemble_plus.webp"
        }
      ] as Album[]
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
          tracks: "Intermezzo I–III, Faces, TGTT, Waltz Boogie, So Many Stars, A Nightingale Sang in Berkeley Square, Lush Life",
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
            "Author: Rudolf Herfurtner | Music: Helga Pogatschar | Musical direction: Dijana Bošković"
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
      ] as Album[]
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
          tracks: null,
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
          tracks: null,
          performersTitle: "Performer",
          performers: [
            "Doren Dinglinger: Violine",
            "Jessica Kuhn: Violoncello"
          ],
          credits: null,
          duration: "Dauer: 3‑CD box",
          production: "Produced by ORF V, 2016",
          coverImage: "/images/discography/ensemble_plus.webp"
        }
      ] as Album[]
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
          tracks: "Intermezzo I–III, Faces, TGTT, Waltz Boogie, So Many Stars, A Nightingale Sang in Berkeley Square, Lush Life",
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
            "Autor: Rudolf Herfurtner | Musik: Helga Pogatschar | Musikalische Leitung: Dijana Bošković"
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
      ] as Album[]
    }
  }
};

// --- SCROLL REVEAL ---
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// --- ALBUM CARD ---
function AlbumCard({ album }: { album: Album }) {
  const half = Math.ceil(album.performers.length / 2);
  const leftPerformers = album.performers.slice(0, half);
  const rightPerformers = album.performers.slice(half);

  return (
    <div className="bg-[#2D2D2D] border border-[#CCC] p-6 md:p-8 space-y-5">

      {/* Title + subtitle — centered */}
      <div className="text-center space-y-1">
        {/* CHANGED: album title → text-2xl mobile, text-3xl desktop */}
        <h3 className="text-2xl md:text-3xl font-semibold uppercase tracking-widest text-amber-200">
          {album.title}
        </h3>
        {album.subtitle && (
          /* CHANGED: subtitle → text-lg mobile, text-xl desktop */
          <p className="text-lg md:text-xl text-white/80 italic">{album.subtitle}</p>
        )}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/20" />

      {/* Description — full width */}
      <div className="space-y-3 text-blue-50 text-sm md:text-base leading-relaxed">
        {album.description.map((p: string, i: number) => (
          <p key={i} className={p.startsWith('"') ? 'italic' : ''}>{p}</p>
        ))}
      </div>

      {/* Tracks */}
      {album.tracks && (
        <p className="text-blue-50 text-sm md:text-base leading-relaxed">
          <span className="font-semibold">Tracks: </span>
          <span className="italic">{album.tracks}</span>
        </p>
      )}

      {/* Cover Image — LEFT aligned */}
      {album.coverImage && (
        <div className="flex justify-start">
          <img
            src={album.coverImage}
            alt={album.title}
            className="max-w-[260px] w-auto h-auto object-contain"
          />
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-white/20" />

      {/* Performers title — CHANGED: text-amber-200 instead of text-white */}
      <p className="text-amber-200 font-semibold text-sm md:text-base">
        {album.performersTitle}
      </p>

      {/* Two-column performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0.5">
        <div className="space-y-0.5 text-blue-50 text-xs md:text-sm">
          {leftPerformers.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {rightPerformers.length > 0 && (
          <div className="space-y-0.5 text-blue-50 text-xs md:text-sm">
            {rightPerformers.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>

      {/* Credits */}
      {album.credits && (
        <p className="text-blue-50 text-xs md:text-sm italic">{album.credits}</p>
      )}

      {/* Duration & Production */}
      <div className="text-blue-50 text-xs md:text-sm italic space-y-0.5">
        {album.duration && <p>{album.duration}</p>}
        {album.production && <p>{album.production}</p>}
      </div>

    </div>
  );
}

// --- MAIN PAGE ---
export default function DiscographyPage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') setLanguage(savedLang);
  }, []);

  const c = CONTENT[language];

  return (
    <main
      className="w-full min-h-screen text-white relative"
      style={{
        /* CHANGED: background image only on md+ screens via inline style removed;
           handled via Tailwind-compatible approach below using a wrapper */
        backgroundColor: '#575757',
      }}
    >
      {/* Background image — desktop only (md and above) */}
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/discography/bg_schwarz1.webp')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[950px] mx-auto px-4 md:px-8 pb-20">
        <div className="md:bg-[#575757]/90 md:backdrop-blur-sm px-4 md:px-12 py-10 md:py-14 md:shadow-2xl">

          {/* PAGE TITLE */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-wide">
                {c.pageTitle}
              </h1>
              <div className="h-px w-full bg-white/30 mt-5" />
            </div>
          </ScrollReveal>

          <div className="space-y-16">

            {/* SECTION 1 */}
            <section>
              <ScrollReveal>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white underline underline-offset-4 decoration-white/70 tracking-wide">
                    {c.section1.title}
                  </h2>
                </div>
              </ScrollReveal>
              <div className="space-y-10">
                {c.section1.albums.map((album: Album, i: number) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <AlbumCard album={album} />
                  </ScrollReveal>
                ))}
              </div>
            </section>

            {/* SECTION 2 */}
            <section>
              <ScrollReveal>
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white underline underline-offset-4 decoration-white/70 tracking-wide">
                    {c.section2.title}
                  </h2>
                  <p className="text-white/80 italic text-2xl md:text-3xl mt-2">
                    {c.section2.subtitle}
                  </p>
                  <div className="h-px w-full bg-white/20 mt-4" />
                </div>
              </ScrollReveal>
              <div className="space-y-10">
                {c.section2.albums.map((album: Album, i: number) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <AlbumCard album={album} />
                  </ScrollReveal>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

    </main>
  );
}