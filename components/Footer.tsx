'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Language = 'en' | 'de';

const CONTENT = {
  en: {
    contact: "Contact",
    quickLinks: "Quick Links",
    credits: "Credits",
    photography: "Photography",
    links: {
      bio: "Biography",
      news: "News",
      compositions: "Compositions",
      press: "Press",
      media: "Media"
    },
    legal: {
      title: "Liability & Copyright",
      text: "No responsibility or liability is assumed for the content of offers to which a link is possible and which do not originate from Dijana Bošković. All data - in particular the databases - of this website enjoy copyright protection in accordance with § 4 and § 87 a ff UrhG. Editing or copying is only permitted to the extent that this is necessary for access to the databases or for their normal use. Any further processing, duplication, distribution and/or public reproduction, in particular unauthorised transfer to an intranet offer, exceeds the normal exploitation of the databases and constitutes a copyright infringement.",
      copyright: "ALL RIGHTS RESERVED."
    }
  },
  de: {
    contact: "Kontakt",
    quickLinks: "Schnellzugriff",
    credits: "Credits",
    photography: "Fotografie",
    links: {
      bio: "Biografie",
      news: "Aktuell",
      compositions: "Kompositionen",
      press: "Presse",
      media: "Medien"
    },
    legal: {
      title: "Haftung & Urheberrecht",
      text: "Für Inhalte externer Links und fremde Angebote, auf die verwiesen wird und die nicht von Dijana Bošković stammen, wird keine Haftung übernommen. Sämtliche Daten dieser Website – insbesondere die Datenbanken – genießen urheberrechtlichen Schutz gemäß § 4 und § 87 a ff UrhG. Eine Bearbeitung oder Vervielfältigung ist nur insoweit zulässig, als dies für den Zugang zu den Datenbanken oder deren übliche Nutzung erforderlich ist. Jede darüber hinausgehende Bearbeitung, Vervielfältigung, Verbreitung und/oder öffentliche Wiedergabe, insbesondere die unbefugte Übernahme in ein Intranet-Angebot, überschreitet die normale Auswertung der Datenbanken und stellt eine Urheberrechtsverletzung dar.",
      copyright: "ALLE RECHTE VORBEHALTEN."
    }
  }
};

export default function Footer() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('en');

  // Read Language Setting
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, [pathname]);

  // Smart Hiding Logic
  if (pathname === '/' || pathname === '/compositions') {
    return null;
  }

  // Determine if we're on the news page for glassmorphism styling
  const isNewsPage = pathname === '/news';
  const footerBg = isNewsPage 
    ? 'bg-[rgba(80,96,112,0.6)] backdrop-blur-md border-t border-white/20' 
    : 'bg-[#172F4F] border-t border-white/20';

  const t = CONTENT[language];

  return (
    <footer className={`w-full ${footerBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 
              className="text-white/90 uppercase mb-4"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                lineHeight: 1.2
              }}
            >
              {t.contact}
            </h3>
            <div 
              className="text-white/75 leading-relaxed space-y-2"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.7
              }}
            >
              <p>Dijana Bošković</p>
              <p>Sibeliusstr. 25<br />81245 München</p>
              <p className="pt-2 italic">
                Mobile: <a href="tel:+491734724882" className="hover:text-amber-200 transition-colors">+49 173 4724882</a>
              </p>
              <p className="italic">
                Email: <a href="mailto:mail@dijana-boskovic.com" className="text-amber-300 hover:text-amber-200 transition-colors">mail@dijana-boskovic.com</a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 
              className="text-white/90 uppercase mb-4"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                lineHeight: 1.2
              }}
            >
              {t.quickLinks}
            </h3>
            {/* Desktop: 2 columns layout */}
            <nav 
              className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.7
              }}
            >
              {/* Left Column - First 6 items */}
              <div className="flex flex-col space-y-2">
                <Link href="/" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{language === 'en' ? 'Home' : 'Startseite'}</Link>
                <Link href="/about" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.bio}</Link>
                <Link href="/news" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.news}</Link>
                <Link href="/compositions/works" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.compositions}</Link>
                <Link href="/media" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.media}</Link>
                <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Discography' : 'Diskografie'}</span>
              </div>
              {/* Right Column - Last 4 items */}
              <div className="flex flex-col space-y-2">
                <Link href="/press" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.press}</Link>
                <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Versus Vox Ensemble' : 'Versus Vox Ensemble'}</span>
                <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Teaching' : 'Unterricht'}</span>
                <Link href="/contact" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{language === 'en' ? 'Contact' : 'Kontakt'}</Link>
              </div>
            </nav>
            {/* Mobile: Single column layout */}
            <nav 
              className="flex md:hidden flex-col space-y-2"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.7
              }}
            >
              <Link href="/" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{language === 'en' ? 'Home' : 'Startseite'}</Link>
              <Link href="/about" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.bio}</Link>
              <Link href="/news" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.news}</Link>
              <Link href="/compositions/works" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.compositions}</Link>
              <Link href="/media" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.media}</Link>
              <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Discography' : 'Diskografie'}</span>
              <Link href="/press" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{t.links.press}</Link>
              <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Versus Vox Ensemble' : 'Versus Vox Ensemble'}</span>
              <span className="text-amber-300 cursor-not-allowed uppercase opacity-60">{language === 'en' ? 'Teaching' : 'Unterricht'}</span>
              <Link href="/contact" className="text-amber-300 hover:text-amber-200 transition-colors uppercase">{language === 'en' ? 'Contact' : 'Kontakt'}</Link>
            </nav>
          </div>

          {/* Credits */}
          <div className="text-center md:text-left">
            <h3 
              className="text-white/90 uppercase mb-4"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                lineHeight: 1.2
              }}
            >
              {t.credits}
            </h3>
            <div 
              className="text-white/75 leading-relaxed"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.7
              }}
            >
              <p className="text-white/90 mb-2" style={{ fontWeight: 500 }}>{t.photography}</p>
              <p className="leading-relaxed italic">
                <a href="http://www.sabine-klem.de/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition-colors">Sabine Klem</a>, {' '}
                <a href="http://alois-schuetz.de/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition-colors">Alois Schütz</a>, {' '}
                <a href="http://www.andreashenn.com/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition-colors">Andreas Henn</a>, {' '}
                <span className="text-amber-300">Jan Roeder</span>, <span className="text-amber-300">Dragan Bosnic</span>, {' '}
                <a href="http://evbphoto.com/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition-colors">Eric van den Brulle</a>, {' '}
                <span className="text-amber-300">Siggi Mueller</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal Notice */}
        <div className="border-t border-white/20 pt-8">
          <details 
            className="text-white/75 max-w-4xl mx-auto"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.7
            }}
          >
            <summary 
              className="cursor-pointer hover:text-white/90 transition-colors text-center mb-4 uppercase"
              style={{
                letterSpacing: '0.12em'
              }}
            >
              {t.legal.title}
            </summary>
            <p className="text-justify px-4 md:px-0">
              {t.legal.text}
            </p>
          </details>
        </div>

        {/* Copyright Bar */}
        <div 
          className="text-center text-white/40 mt-8 pt-6 border-t border-white/20"
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            lineHeight: 1.5
          }}
        >
          &copy; {new Date().getFullYear()} DIJANA BOŠKOVIĆ. {t.legal.copyright}
        </div>

      </div>
    </footer>
  );
}