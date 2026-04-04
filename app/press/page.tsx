'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';

type Language = 'en' | 'de';

// --- SANITY CLIENT SETUP ---
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lhj4296n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, 
});

// --- CONTENT DATA (Only UI Headers remain hardcoded) ---
const UI_CONTENT = {
  en: {
    pageTitle: "Press",
    sections: {
      highlights: { title: "Selected Highlights", subtitle: "As Composer" },
      flutist: { title: "As Flutist" },
      presence: { title: "Performance & Artistic Presence" }
    }
  },
  de: {
    pageTitle: "Presse",
    sections: {
      highlights: { title: "Ausgewählte Pressestimmen", subtitle: "Als Komponistin" },
      flutist: { title: "Als Flötistin" },
      presence: { title: "Künstlerische Präsenz & Engagement" }
    }
  }
};

// --- ANIMATED COMPONENTS ---
const EASE = [0.22, 0.1, 0.36, 1] as const;

const subtleTransition = {
  duration: 1.2,
  ease: EASE,
};

function AnimatedSectionHeader({ children, subtitle }: { children: React.ReactNode; subtitle?: string; }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: "0px 0px -50px 0px" });

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

// Dynamic Article Component handling Sanity Data
function AnimatedArticle({ item, isLast, language }: { item: any; isLast: boolean; language: Language }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15, margin: "0px 0px -40px 0px" });

  // Resolve language fallback
  const title = language === 'de' ? (item.title_de || item.title) : item.title;
  const source = language === 'de' ? (item.source_de || item.source) : item.source;
  const content = language === 'de' ? (item.content_de || item.content) : item.content;

  return (
    <motion.article 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={subtleTransition}
      className="space-y-4"
    >
      <h3 className="text-xl md:text-2xl font-serif font-bold italic text-[#172F4F] leading-tight">
        {title}
      </h3>
      {source && (
        <p className="text-sm md:text-base font-body font-bold uppercase tracking-wider text-[#47719E]">
          {source}
        </p>
      )}
      <div className="text-[#172F4F] font-body text-base md:text-lg leading-relaxed sanity-rich-text-press">
        {content ? <PortableText value={content} /> : null}
      </div>
      {!isLast && <div className="pt-6 h-px w-16 bg-[#172F4F]/20" />}
    </motion.article>
  );
}

function AnimatedPageTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: "0px 0px -50px 0px" });

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
  const [composerItems, setComposerItems] = useState<any[]>([]);
  const [flutistItems, setFlutistItems] = useState<any[]>([]);
  const [presenceItems, setPresenceItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    const fetchSanityData = async () => {
      try {
        const pressQuery = `*[_type == "press"][0]`;
        const fetchedPress = await client.fetch(pressQuery);

        setComposerItems(fetchedPress?.composerArticles || []);
        setFlutistItems(fetchedPress?.flutistArticles || []);
        setPresenceItems(fetchedPress?.presenceArticles || []);
      } catch (error) {
        console.error("Failed to fetch from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityData();
  }, []);

  const t = UI_CONTENT[language];

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
          main { background-size: 900px auto !important; }
        }
        
        /* Sanity Rich Text Formatting for Press Page */
        .sanity-rich-text-press p { margin-bottom: 0.75rem; }
        .sanity-rich-text-press p:last-child { margin-bottom: 0; }
        .sanity-rich-text-press em { font-style: italic; }
        .sanity-rich-text-press strong { font-weight: 700; }
      `}</style>

      <div className="fixed top-6 left-0 w-full px-2 md:px-10 z-50 flex justify-between items-start pointer-events-none"></div>

      <div className="max-w-[800px] mx-auto pt-24 md:pt-32 pl-18 pr-16 md:px-24 relative z-10">
        
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
                    {loading ? (
                       <div className="text-center font-body py-10 animate-pulse">Loading press clippings...</div>
                    ) : composerItems.map((item, index) => (
                        <AnimatedArticle 
                          key={item._key || index}
                          item={item}
                          language={language}
                          isLast={index === composerItems.length - 1}
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
                    {loading ? (
                       <div className="text-center font-body py-10 animate-pulse">Loading press clippings...</div>
                    ) : flutistItems.map((item, index) => (
                        <AnimatedArticle 
                          key={item._key || index}
                          item={item}
                          language={language}
                          isLast={index === flutistItems.length - 1}
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
                    {loading ? (
                       <div className="text-center font-body py-10 animate-pulse">Loading press clippings...</div>
                    ) : presenceItems.map((item, index) => (
                        <AnimatedArticle 
                          key={item._key || index}
                          item={item}
                          language={language}
                          isLast={index === presenceItems.length - 1}
                        />
                    ))}
                </div>
            </section>

        </div>
      </div>
    </main>
  );
}