'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    pageTitle: "News & Reviews",
    nav: [
      { id: "news", label: "News" },
      { id: "broadcasts", label: "Selected Premieres" },
    ],
    news: [
      {
        category: "Review of a Premiere",
        title: "Rejected Love — Munich Philharmonic Performs Works by Dijana Bošković",
        source: "Today Magazine, European Edition 2024",
        content: [
          "As part of a matinée at the Munich Artists' House (Münchner Künstlerhaus), works by Richard Strauss were presented alongside compositions by German-Serbian composer Dijana Bošković. The program included Strauss's Variations on The Girl Is Angry with Me, She Quarrels with Me for String Trio No. 109 and the String Quartet in A major, Op. 2, complemented by Bošković's recent works from 2024: <em>For My Mother</em> and <em>Blurred Edges</em> for string quartet, as well as <em>Con Fretta</em> for string trio.",
          "Born in Belgrade in 1968, Dijana Bošković studied flute and composition in her hometown before continuing her education in Munich and Hamburg. Her music unfolds within an expanded tonal framework and engages deeply with both spiritual and socio-political themes. A defining characteristic of her work is the synthesis of diverse musical influences—traditional folk music, jazz, and contemporary avant-garde—into a highly personal and distinctive compositional voice.",
          "The point of departure for her string quartet is the centuries-old Kosovo lament <em>Zaspo Janko</em>, traditionally sung at funerals. While the source material carries an archaic intensity, the first movement is driven by powerful, rhythmically charged Balkan influences. In the second movement, these traditional references are deliberately loosened. Fixed stylistic conventions are dissolved, Bošković explains, and replaced by a freer, more open approach to rhythm and harmony. A continuous 3/4 ostinato pulse is constantly disrupted and transformed.",
          "With <em>Con Fretta</em>, Bošković turns toward existential questions of our time. She describes the piece as a musical reflection on the disintegration of social and artistic structures, on disorientation and unrest in the early 21st century. The response, she suggests, lies in turning inward—returning to one's own origins. This perspective also connects <em>Con Fretta</em> with her new string quartet.",
          "The audience at the Munich Artists' House responded with great enthusiasm. The Munich Philharmonic Quartet and the composer were greeted with standing ovations, and Dijana Bošković's works were met with sustained and passionate applause in the historic venue of the Allotria Art Association, founded in 1873."
        ]
      },
      {
        category: "New Work 2025",
        title: "Media Vita — Ātman Aeternus",
        subtitle: "A contemplation inspired by Media Vita in Morte sumus and Vedic wisdom",
        content: [
          "For 8-part vocal ensemble (SSATTTBB) and 2 horns, or 2 natural horns in B basso & B alto (French instruments, c. 1820)"
        ]
      }
    ],
    table: {
      title: "Selected Premieres and Broadcasts",
      headers: ["Year", "Event / Venue", "Work"],
      rows: [
        { year: "2024", event: "Munich Philharmonic, Künstlerhaus Munich", work: "<em>Con Fretta</em> (string trio), <em>Memories</em> (string quartet)" },
        { year: "2024", event: "Theater Erfurt, Large House", work: "Light and Shadow for Holy Saturday, Black & White for Two Pianos" },
        { year: "2024", event: "Munich Philharmonic, German Embassy Beijing", work: "<em>Con Fretta</em> (string trio)" },
        { year: "2019", event: "BR-Klassik – Musik der Welt", work: "Music from Belgrade with composer Dijana Bošković" },
        { year: "2018", event: "Forum, University of Music and Theatre Hamburg", work: "<em>ONE</em> (large orchestra)" },
        { year: "2017", event: "Laeiszhalle, Small Hall, Hamburg", work: "Concert piece from <em>TRANSIT</em> (mezzo-soprano and piano)" },
        { year: "2017", event: "Benefit Concert Sternstunden, Munich Residence", work: "<em>Between East and West</em> (flute and tape)" },
        { year: "2017", event: "St. Reinoldi Church, Dortmund · Live broadcast on Deutschlandfunk Kultur", work: "<em>Dona Nobis Pacem Shanti</em> – The award-winning composition for mixed choir" },
        { year: "2016", event: "International Chamber Music Course, Austria", work: "<em>Sundance</em> (piano trio)" },
        { year: "2016", event: "Resonanzraum Hamburg", work: "<em>Lichtspiele</em> / <em>Light Plays</em> (violin, cello, piano)" },
        { year: "2016", event: "ORF Funkhaus Vorarlberg – CD Release", work: "Works by Dijana Bošković" },
        { year: "2015", event: "ORF Landesfunkhaus", work: "Suite based on folk melodies" },
        { year: "2014", event: "Altach Organ Soirée", work: "<em>Conversations with Death</em> (flute and organ)" },
        { year: "2013", event: "CD Release – Begegnungen / Encounters", work: "Chamber Music, Cavalli Records" },
        { year: "2010", event: "BBC Radio 3, Radio Sweden, ORF Radio 3, Magiar Radio", work: "<em>Concerto for Strings</em>" },
        { year: "2009", event: "BEMUS International Music Festival, Belgrade", work: "<em>Concerto for Strings</em>" },
        { year: "2008", event: "Carl Orff Hall, Gasteig, Munich", work: "<em>Divertimento</em> for strings" },
        { year: "2007", event: "BEMUS International Music Festival, Belgrade", work: "<em>Versus Vox Integra</em> (sextet)" },
        { year: "2004", event: "Max-Joseph Hall, Munich Residence", work: "2 Songs (mezzo-soprano and piano)" }
      ]
    }
  },
  de: {
    pageTitle: "Aktuell & Rezensionen",
    nav: [
      { id: "news", label: "Aktuell" },
      { id: "broadcasts", label: "Ausgewählte Aufführungen" },
    ],
    news: [
      {
        category: "Rezension",
        title: "Uraufführung Verschmähte Liebe — Münchner Philharmoniker spielen Werke von Dijana Bošković",
        source: "Heute Magazine – Europäische Ausgabe, 2024",
        content: [
          "Im Rahmen einer Matinée im Münchner Künstlerhaus präsentierten die Münchner Philharmoniker Werke von Richard Strauss neben aktuellen Kompositionen der deutsch-serbischen Komponistin Dijana Bošković. Die programmatische Gegenüberstellung spannte einen weiten Bogen zwischen spätromantischer Ausdruckskunst und zeitgenössischer Klangsprache.",
          "Neben Strauss' Variationen über Das Dirndl is harb auf mi für Streichtrio Nr. 109 sowie dem Streichquartett A-Dur op. 2 erklangen Boškovićs neueste Werke aus dem Jahr 2024: <em>Für meine Mutter</em> und <em>Konturlos</em> für Streichquartett sowie das Streichtrio <em>Con Fretta</em>.",
          "Bošković, 1968 in Belgrad geboren, studierte zunächst Flöte und Komposition in ihrer Heimatstadt, bevor sie ihre Ausbildung in München und Hamburg fortsetzte. Ihr kompositorisches Denken bewegt sich innerhalb eines erweiterten Tonsystems und ist geprägt von intensiver Auseinandersetzung mit spirituellen sowie sozial-politischen Fragestellungen. Charakteristisch für ihr Werk ist die organische Verschmelzung unterschiedlicher musikalischer Einflüsse – von zeitgenössischer Avantgarde über Jazz bis hin zur ursprünglichen Volksmusik – zu einer eigenständigen, unverkennbaren Klangsprache.",
          "Ausgangspunkt ihres Streichquartetts bildet die jahrhundertealte kosovarische Totenklage <em>Zaspo Janko</em>, die traditionell bei Begräbnissen gesungen wird. Während das thematische Material eine archaische Wucht entfaltet, ist der erste Satz von energiegeladenen, rhythmisch markanten Balkan-Einflüssen durchzogen. Im zweiten Satz werden diese Referenzen bewusst geöffnet und transformiert. Feste stilistische Konventionen lösen sich auf und werden durch einen freieren, offeneren Umgang mit Rhythmus und Harmonie ersetzt. — Dijana Bošković",
          "Ein durchgehender 3/4-Ostinato-Puls wird kontinuierlich gebrochen, verschoben und neu kontextualisiert. Mit <em>Con Fretta</em> richtet Bošković den Blick auf existenzielle Fragen der Gegenwart. Das Werk versteht sich als musikalische Reflexion über den Zerfall sozialer und künstlerischer Strukturen, über Unruhe, Beschleunigung und Orientierungslosigkeit im frühen 21. Jahrhundert. Die Antwort, so Bošković, liege im Innehalten – in der Rückbesinnung auf die eigene Lebenskraft, auf die Quelle des Lebens.",
          "Das Publikum im Münchner Künstlerhaus reagierte mit großer Begeisterung. Das Streichquartett der Münchner Philharmoniker sowie die anwesende Komponistin wurden mit Standing Ovations gefeiert. Anhaltender Applaus erfüllte die historische Spielstätte des 1873 gegründeten Kunstvereins Allotria."
        ]
      },
      {
        category: "Neues Werk 2025",
        title: "Media Vita — Ātman Aeternus",
        subtitle: "Eine Kontemplation zwischen abendländischer Tradition und vedischer Weisheit",
        content: [
          "Für 8-stimmiges Vokalensemble (SSATTTBB) und 2 Hörner oder 2 Naturhörner in B basso & B alto (französische Instrumente, ca. 1820)"
        ]
      }
    ],
    table: {
      title: "Ausgewählte Aufführungen & Uraufführungen",
      headers: ["Jahr", "Veranstaltung / Ort", "Werk"],
      rows: [
        { year: "2024", event: "Münchner Philharmoniker · Künstlerhaus München", work: "<em>Memories</em> – Streichquartett" },
        { year: "2024", event: "Licht und Schatten am Karsamstag · Theater Erfurt, Großes Haus", work: "<em>Black and White</em> – Klavierduo" },
        { year: "2024", event: "Münchner Philharmoniker · Deutsche Botschaft Peking", work: "<em>Con Fretta</em> – Streichtrio" },
        { year: "2019", event: "Musik der Welt · BR Klassik", work: "Musik aus Belgrad mit Dijana Bošković" },
        { year: "2018", event: "Hamburger Symphoniker · Forum Hochschule für Musik und Theater Hamburg", work: "<em>ONE</em> – für großes Orchester" },
        { year: "2017", event: "Laeiszhalle Hamburg · Kleiner Saal", work: "Konzertstück aus <em>TRANSIT</em> – Mezzosopran & Klavier" },
        { year: "2017", event: "Benefizkonzert Sternstunden · Allerheiligen-Hofkirche, München", work: "<em>Between East and West</em> – Flöte & Tonband" },
        { year: "2017", event: "St. Reinoldi-Kirche Dortmund · Liveübertragung Deutschlandfunk Kultur", work: "<em>Dona Nobis Pacem Shanti</em> – Gewinnerkomposition für gemischten Chor" },
        { year: "2016", event: "Internationaler Kammermusikkurs · Österreich", work: "<em>Sonnentanz</em> – Klaviertrio" },
        { year: "2016", event: "Resonanzraum Hamburg", work: "<em>Lichtspiele</em> – Violine, Violoncello, Klavier" },
        { year: "2015", event: "Neue Musik im Gespräch · Ensemble plus · ORF Landesfunkhaus", work: "Suite für Violine und Cello" },
        { year: "2014", event: "Altacher Orgelsoirée", work: "<em>Gespräche mit dem Tod</em> – Flöte und Orgel" },
        { year: "2013", event: "CD-Veröffentlichung Cavalli Records · Bamberg", work: "<em>Begegnungen</em> / <em>Encounters</em>" },
        { year: "2010", event: "BBC Radio 3 · Radio Sweden · ORF Radio 3 · Magiar Radio", work: "<em>Konzert für Streicher</em>" },
        { year: "2009", event: "BEMUS International Music Festival · Belgrad", work: "<em>Concerto for Strings</em>, Konzert mit den St. Petersburger Solisten" },
        { year: "2008", event: "Carl-Orff-Saal · Gasteig München", work: "<em>Divertimento</em> für Streicher" },
        { year: "2007", event: "BEMUS International Music Festival · Belgrad", work: "<em>Versus Vox Integra</em> - Sextett" },
        { year: "2004", event: "Max-Joseph-Saal · Münchner Residenz", work: "2 Songs – Mezzosopran & Klavier" }
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

export default function NewsPage() {
  // Default to English, but will update in useEffect
  const [language, setLanguage] = useState<Language>('en'); 

  useEffect(() => {
    // 1. Read the saved language
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentContent = CONTENT[language];

  return (
    <main className="w-full min-h-screen bg-transparent text-white selection:bg-[#ff6643] selection:text-white relative">
      
      {/* BACKGROUND IMAGE - Visible on all screen sizes */}
      <div 
        className="fixed top-0 left-0 w-full min-h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
            backgroundImage: "url('/images/bg_dijana.webp')",
            minHeight: '100%',
        }}
      />

      {/* --- MOBILE TOP NAV --- */}
      <div className="lg:hidden w-full flex flex-col pt-6 relative z-10">
        <div className="px-4 pb-2 w-full">
                           
        </div>
        <div className="overflow-x-auto no-scrollbar w-full">
            <div className="flex whitespace-nowrap px-4 py-3 gap-3">
            {currentContent.nav.map((item) => (
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
          {currentContent.nav.map((item, index) => (
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

      {/* --- MAIN CONTENT CONTAINER - CENTERED --- */}
      <div className="max-w-[950px] mx-auto pt-0 md:pt-0 px-4 md:px-8 pb-16 relative z-10">
        
        {/* EXPANDED #575757 BACKGROUND CONTAINER - Only slightly wider padding */}
        <div className="bg-[#575757]/90 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl">
          
          {/* PAGE TITLE - Now sits directly on #575757 background */}
          <ScrollReveal delay={0}>
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
                {currentContent.pageTitle}
              </h1>
            </div>
          </ScrollReveal>

          <div className="space-y-16">

            {/* 1. NEWS FIELD */}
            <ScrollReveal delay={0.1}>
              <section id="news" className="scroll-mt-32">
                <div className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 space-y-12 text-white">
                    
                  {currentContent.news.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="border-l-4 border-[#E74C3C] pl-4">
                        <h3 className="text-sm font-serif uppercase tracking-widest text-[#FF6B5B] mb-1 font-bold">
                          {item.category}
                        </h3>
                        <h2 className="text-xl md:text-2xl font-serif italic leading-tight whitespace-pre-line">
                          {item.title}
                        </h2>
                        {item.source && (
                          <p className="text-sm text-gray-400 italic font-body mt-1">{item.source}</p>
                        )}
                        {'subtitle' in item && item.subtitle && (
                          <p className="text-base md:text-lg text-gray-300 italic font-body mt-2">{item.subtitle}</p>
                        )}
                      </div>
                      
                      <div className="space-y-4 text-blue-50 font-body text-sm md:text-base leading-relaxed">
                        {item.content.map((paragraph, pIndex) => (
                          <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </div>
                    </motion.div>
                  ))}

                </div>
              </section>
            </ScrollReveal>

            {/* 2. SELECTED PREMIERES SECTION WITH TABLE */}
            <ScrollReveal delay={0.15}>
              <section id="broadcasts" className="scroll-mt-32">
                
                {/* Section Title - Now sits directly on #575757 background */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
                    {currentContent.table.title}
                  </h2>
                </div>

                {/* TABLE - Responsive with proper text wrapping */}
                <div className="bg-[#2D2D2D] border border-[#CCCCCC] overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-[#C0392B] text-white">
                        {currentContent.table.headers.map((header, i) => (
                          <th key={i} className={`text-left px-2 md:px-6 py-3 text-xs md:text-base font-body font-semibold ${i === 0 ? 'w-[15%] md:w-[12%]' : i === 1 ? 'w-[42%] md:w-[44%]' : 'w-[43%] md:w-[44%]'}`}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentContent.table.rows.map((item, index) => (
                        <motion.tr 
                          key={index}
                          className="border-b border-gray-600 last:border-0 hover:bg-[#3a3a3a] transition-colors"
                          initial={{ opacity: 1 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.4, delay: index * 0.02 }}
                        >
                          <td className="px-2 md:px-6 py-3 text-[#E74C3C] font-body font-semibold text-xs md:text-base break-words">
                            {item.year}
                          </td>
                          <td className="px-2 md:px-6 py-3 text-blue-50 font-body text-xs md:text-base break-words">
                            {item.event}
                          </td>
                          <td className="px-2 md:px-6 py-3 text-blue-50 font-body text-xs md:text-base break-words" dangerouslySetInnerHTML={{ __html: item.work }} />
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </section>
            </ScrollReveal>

          </div>
        </div>
        {/* END OF EXPANDED #575757 BACKGROUND CONTAINER */}

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
        
        em {
          font-style: italic;
        }
      `}</style>
    </main>
  );
}