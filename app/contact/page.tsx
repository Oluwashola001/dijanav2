'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type Language = 'en' | 'de';

// --- SHARED DATA (Links & Names) ---
const PHOTOGRAPHERS = [
  { name: "Sabine Klem", url: "http://www.sabine-klem.de/" },
  { name: "Alois Schütz", url: "http://alois-schuetz.de/" },
  { name: "Andreas Henn", url: "http://www.andreashenn.com/" },
  { name: "Jan Roeder", url: null },
  { name: "Dragan Bosnic", url: null },
  { name: "Eric van den Brulle", url: "http://evbphoto.com/" },
  { name: "Siggi Mueller", url: null }
];

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    pageTitle: "Contact & Legal Notice",
    contactInfo: {
      name: "Dijana Bošković",
      address: ["Sibeliusstr. 25", "81245 Munich, Germany"],
      mobileLabel: "Mobile:",
      mobile: "+49 173 4724882",
      emailLabel: "Email:",
      email: "mail@dijana-boskovic.com"
    },
    credits: {
      photoTitle: "Photography Credits",
      photoLabel: "Photos by:", // Prefix for the list
      conceptTitle: "Concept & Web Design",
      conceptNames: "Dijana Bošković, Thomas Wollenweber",
      conceptEmailLabel: "Email:",
      conceptEmail: "dijanab@freenet.de",
      devTitle: "Development & Technical Implementation",
      devText: "Gabriel Oyagbinrin"
    },
    legal: {
      title: "Liability & Copyright",
      text: [
        "No responsibility or liability is assumed for the content of external websites or services accessed via links that do not originate from Dijana Bošković.",
        "All content and data — in particular databases — on this website are protected under applicable copyright law, including §§ 4 and 87a et seq. of the German Copyright Act (UrhG). Reproduction or processing is permitted only insofar as necessary for accessing or customary use of the databases. Any further reproduction, distribution, modification, or public communication — especially unauthorized inclusion in intranet services — constitutes a violation of copyright law."
      ]
    }
  },
  de: {
    pageTitle: "Kontakt & Impressum",
    contactInfo: {
      name: "Dijana Bošković",
      address: ["Sibeliusstr. 25", "81245 München · Deutschland"],
      mobileLabel: "Mobil:",
      mobile: "+49 173 4724882",
      emailLabel: "E-Mail:",
      email: "mail@dijana-boskovic.com"
    },
    credits: {
      photoTitle: "Bildnachweise",
      photoLabel: "Fotos:", // Prefix for the list
      conceptTitle: "Konzeption & Webdesign",
      conceptNames: "Dijana Bošković & Thomas Wollenweber",
      conceptEmailLabel: "E-Mail:",
      conceptEmail: "dijanab@freenet.de",
      devTitle: "Entwicklung & Technische Umsetzung",
      devText: "Gabriel Oyagbinrin"
    },
    legal: {
      title: "Haftung & Urheberrecht",
      text: [
        "Für Inhalte externer Webseiten, die über Links erreichbar sind und nicht von Dijana Bošković stammen, wird keine Haftung übernommen.",
        "Die Inhalte und Daten dieser Website, insbesondere Datenbanken, sind urheberrechtlich geschützt (u. a. gemäß §§ 4 sowie 87a ff. UrhG). Eine Nutzung, Vervielfältigung oder Bearbeitung ist nur im Rahmen der üblichen Verwendung zulässig. Jede darüber hinausgehende Nutzung, insbesondere die unbefugte Vervielfältigung, Verbreitung oder öffentliche Wiedergabe, stellt eine Urheberrechtsverletzung dar."
      ]
    }
  }
};

// --- ANIMATION WRAPPER ---
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>('en');

  // Read Language Setting
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, []);

  const t = CONTENT[language];

  return (
    <main 
      className="min-h-screen w-full text-white selection:bg-amber-900 selection:text-white pb-32"
      style={{ 
          backgroundColor: '#223C5E',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
      }}
    >
      {/* --- BACK BUTTON PLACEHOLDER (Managed by Navbar) --- */}
      <div className="fixed top-6 left-0 w-full px-2 md:px-10 z-50 pointer-events-none h-20"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[700px] mx-auto pt-24 md:pt-32 px-4 md:px-8 relative z-10">
        
        {/* PAGE TITLE */}
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide drop-shadow-md">
              {t.pageTitle}
            </h1>
            <div className="h-px w-24 bg-[#47719E] mx-auto opacity-50"></div>
          </div>
        </ScrollReveal>

        {/* CONTENT BOX */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[#172F4F]/95 backdrop-blur-sm border border-[#47719E] p-6 md:p-12 shadow-2xl space-y-12">
            
            {/* 1. CONTACT INFO */}
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <p className="text-blue-50 font-body text-base md:text-lg">
                  {t.contactInfo.name}
                </p>
                {t.contactInfo.address.map((line, i) => (
                  <p key={i} className="text-blue-50 font-body text-base md:text-lg">
                    {line}
                  </p>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-blue-50 font-body text-base md:text-lg">
                  <span className="text-blue-50 font-medium mr-2">{t.contactInfo.mobileLabel}</span>
                  <span className="text-amber-200 italic">{t.contactInfo.mobile}</span>
                </p>
                <p className="text-blue-50 font-body text-base md:text-lg">
                  <span className="text-blue-50 font-medium mr-2">{t.contactInfo.emailLabel}</span>
                  <a href={`mailto:${t.contactInfo.email}`} className="text-amber-200 hover:text-amber-300 italic transition-colors underline decoration-amber-200/30 underline-offset-4">
                    {t.contactInfo.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-[#47719E]/30"></div>

            {/* 2. CREDITS */}
            <div className="space-y-8">
              {/* Photography */}
              <div>
                <h3 className="text-lg font-serif text-amber-200/90 mb-2 uppercase tracking-wider">
                  {t.credits.photoTitle}
                </h3>
                <div className="text-blue-50 font-body text-base leading-relaxed">
                  <span className="mr-1">{t.credits.photoLabel}</span>
                  {PHOTOGRAPHERS.map((photographer, index) => (
                    <span key={index}>
                      {photographer.url ? (
                        <a 
                          href={photographer.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-50/80 hover:text-white italic transition-colors border-b border-blue-50/20 hover:border-white/50"
                        >
                          {photographer.name}
                        </a>
                      ) : (
                        <span className="text-blue-50 italic">{photographer.name}</span>
                      )}
                      {index < PHOTOGRAPHERS.length - 1 && " · "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concept & Web */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-serif text-amber-200/90 mb-2 uppercase tracking-wider">
                    {t.credits.conceptTitle}
                  </h3>
                  <p className="text-blue-50 font-body text-base leading-relaxed">
                    {t.credits.conceptNames}
                  </p>
                  <p className="text-blue-50 font-body text-sm mt-1">
                    {t.credits.conceptEmailLabel}{' '}
                    <a href={`mailto:${t.credits.conceptEmail}`} className="text-blue-50/80 hover:text-white transition-colors border-b border-blue-50/20 hover:border-white/50">
                      {t.credits.conceptEmail}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-amber-200/90 mb-2 uppercase tracking-wider">
                    {t.credits.devTitle}
                  </h3>
                  <p className="text-blue-50 font-body text-base leading-relaxed">
                    {t.credits.devText}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-[#47719E]/30"></div>

            {/* 3. LIABILITY & COPYRIGHT */}
            <div>
              <h3 className="text-lg font-serif text-amber-200/90 mb-4 uppercase tracking-wider text-center md:text-left">
                {t.legal.title}
              </h3>
              <div className="space-y-4 text-justify">
                {t.legal.text.map((paragraph, i) => (
                  <p key={i} className="text-blue-50 font-body text-xs md:text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}