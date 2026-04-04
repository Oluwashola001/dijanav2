'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// =======================================================================
// 🛑 WICHTIG: HOW TO FIX THE CUT-OFF TEXT & CONNECT TO SANITY 🛑
// =======================================================================
// You are currently seeing cut-off text because you copied the fake "mock" 
// version of this file earlier. 
// 
// TO FIX THIS: In your VS Code, delete lines 24 to 34 below, and 
// uncomment (remove the //) from these real Sanity tools:
// 
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
 
const client = createClient({
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lhj4296n',
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});


type Language = 'en' | 'de';

// --- STATIC UI TRANSLATIONS (Only headers/buttons) ---
const UI_CONTENT = {
  en: {
    pageTitle: "News & Reviews",
    nav: [
      { id: "news", label: "News" },
      { id: "broadcasts", label: "Selected Premieres" },
    ],
    table: {
      title: "Selected Premieres and Broadcasts",
      headers: ["Year", "Event / Venue", "Work"],
    }
  },
  de: {
    pageTitle: "Aktuell & Rezensionen",
    nav: [
      { id: "news", label: "Aktuell" },
      { id: "broadcasts", label: "Ausgewählte Aufführungen" },
    ],
    table: {
      title: "AUSGEWÄHLTE URAUFFÜHRUNGEN & AUSSTRAHLUNGEN",
      headers: ["Jahr", "Veranstaltung / Ort", "Werk"],
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
  const [language, setLanguage] = useState<Language>('en'); 
  
  // --- SANITY STATE ---
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [premieres, setPremieres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. FETCHING THE LIVE DATA
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    const fetchSanityData = async () => {
      try {
        const newsQuery = `*[_type == "news"][0]`;
        const premieresQuery = `*[_type == "premiere"][0]`;

        const [fetchedNews, fetchedPremieres] = await Promise.all([
          client.fetch(newsQuery),
          client.fetch(premieresQuery)
        ]);

        setNewsItems(fetchedNews?.articles || []);
        setPremieres(fetchedPremieres?.rows || []);
      } catch (error) {
        console.error("Failed to fetch from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityData();

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

  const ui = UI_CONTENT[language];

  return (
    <main className="w-full min-h-screen bg-transparent text-white selection:bg-[#ff6643] selection:text-white relative">
      
      {/* BACKGROUND IMAGE */}
      <div 
        className="fixed top-0 left-0 w-full min-h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
            backgroundImage: "url('/images/bg_dijana.webp')",
            minHeight: '100%',
            backgroundColor: '#2D2D2D' // Fallback
        }}
      />

      {/* --- MOBILE TOP NAV --- */}
      <div className="lg:hidden w-full flex flex-col pt-6 relative z-10">
        <div className="px-4 pb-2 w-full"></div>
        <div className="overflow-x-auto no-scrollbar w-full">
            <div className="flex whitespace-nowrap px-4 py-3 gap-3">
            {ui.nav.map((item) => (
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

      {/* --- DESKTOP SIDEBAR NAV --- */}
      <motion.div 
        className="hidden lg:block fixed top-24 right-8 z-40 w-64"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex flex-col gap-3">
          {ui.nav.map((item, index) => (
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

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-[950px] mx-auto pt-0 md:pt-0 px-4 md:px-8 pb-16 relative z-10">
        
        <div className="bg-[#575757]/90 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl">
          
          <ScrollReveal delay={0}>
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
                {ui.pageTitle}
              </h1>
            </div>
          </ScrollReveal>

          <div className="space-y-16">

            {/* 1. DYNAMIC NEWS FIELD */}
            <ScrollReveal delay={0.1}>
              <section id="news" className="scroll-mt-32">
                <div className="bg-[#2D2D2D] border border-[#CCCCCC] p-6 md:p-8 space-y-12 text-white">
                    
                  {loading ? (
                    <div className="text-center text-gray-400 font-body py-10 animate-pulse">
                      Loading news from Sanity...
                    </div>
                  ) : newsItems.length === 0 ? (
                    <div className="text-center text-gray-400 font-body py-10">
                      <PortableText value={[]} />
                    </div>
                  ) : (
                    newsItems.map((item, index) => {
                      const category = language === 'de' ? (item.category_de || item.category) : item.category;
                      const title = language === 'de' ? (item.title_de || item.title) : item.title;
                      const content = language === 'de' ? (item.content_de || item.content) : item.content;

                      return (
                        <motion.div 
                          key={item._key || index} 
                          className="space-y-4"
                          initial={{ opacity: 1 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <div className="border-l-4 border-[#E74C3C] pl-4">
                            <h3 className="text-sm font-serif uppercase tracking-widest text-[#FF6B5B] mb-1 font-bold">
                              {category}
                            </h3>
                            <h2 className="text-xl md:text-2xl font-serif italic leading-tight whitespace-pre-line">
                              {title}
                            </h2>
                            {item.source && (
                              <p className="text-sm text-gray-400 italic font-body mt-2">{item.source}</p>
                            )}
                          </div>
                          
                          <div className="space-y-4 text-blue-50 font-body text-sm md:text-base leading-relaxed sanity-rich-text">
                            {content ? (
                              <PortableText value={content} />
                            ) : null}
                          </div>
                        </motion.div>
                      );
                    })
                  )}

                </div>
              </section>
            </ScrollReveal>

            {/* 2. DYNAMIC PREMIERES TABLE */}
            <ScrollReveal delay={0.15}>
              <section id="broadcasts" className="scroll-mt-32">
                
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
                    {ui.table.title}
                  </h2>
                </div>

                <div className="bg-[#2D2D2D] border border-[#CCCCCC] overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-[#C0392B] text-white">
                        {ui.table.headers.map((header, i) => (
                          <th key={i} className={`text-left px-2 md:px-6 py-3 text-xs md:text-base font-body font-semibold ${i === 0 ? 'w-[15%] md:w-[12%]' : i === 1 ? 'w-[42%] md:w-[44%]' : 'w-[43%] md:w-[44%]'}`}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={3} className="text-center py-6 text-gray-400 font-body animate-pulse">Loading premieres...</td>
                        </tr>
                      ) : premieres.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center py-6 text-gray-400 font-body">No premieres found in database.</td>
                        </tr>
                      ) : (
                        premieres.map((item, index) => {
                          const event = language === 'de' ? (item.event_de || item.event) : item.event;
                          const work = language === 'de' ? (item.work_de || item.work) : item.work;

                          return (
                            <motion.tr 
                              key={item._key || index}
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
                                {event}
                              </td>
                              {/* GEÄNDERT FÜR DIE PORTABLE TEXT UNTERSTÜTZUNG IN DER TABELLE */}
                              <td className="px-2 md:px-6 py-3 text-blue-50 font-body text-xs md:text-base break-words sanity-rich-text-table">
                                {typeof work === 'string' ? work : (work ? <PortableText value={work} /> : null)}
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </section>
            </ScrollReveal>

          </div>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        /* Sanity Rich Text Custom Styling */
        .sanity-rich-text p { margin-bottom: 1rem; }
        .sanity-rich-text em { font-style: italic; color: white; }
        .sanity-rich-text strong { font-weight: 700; color: white; }
        
        /* Table Specific Styling to remove paragraph margins and apply italics properly */
        .sanity-rich-text-table p { margin-bottom: 0; display: inline; }
        .sanity-rich-text-table em { font-style: italic; color: white; }
        .sanity-rich-text-table strong { font-weight: 700; color: white; }
      `}</style>
    </main>
  );
}