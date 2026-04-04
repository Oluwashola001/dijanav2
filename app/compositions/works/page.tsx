'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { createClient } from 'next-sanity';

type Language = 'en' | 'de';

// --- SANITY CLIENT SETUP ---
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lhj4296n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, 
});

// --- STATIC UI CONTENT (Nav & Order Box) ---
const UI_CONTENT = {
  en: {
    nav: [
      { id: "strings", label: "Strings & Ensemble" },
      { id: "piano", label: "Piano & Ensemble" },
      { id: "flute", label: "Flute & Ensemble" },
      { id: "young", label: "Youth Music" },
      { id: "chamber", label: "Chamber Music (Large)" },
      { id: "string_orch", label: "String Orchestra" },
      { id: "orch", label: "Orchestra" },
      { id: "voice", label: "Voice & Ensemble" },
      { id: "choir", label: "Choir" },
      { id: "order", label: "Order Request" },
    ],
    order: {
      title: "ORDER REQUEST",
      text: "Dear visitors*, for many of the listed works you can order the sheet music if you are interested. Please enter your contact details and exact order description below.",
      placeholder: "Example: I would like to order the score for 'Light Plays'. My contact info is...",
      button: "Send Order Request"
    }
  },
  de: {
    nav: [
      { id: "strings", label: "Streicher & Ensemble" },
      { id: "piano", label: "Klavier & Ensemble" },
      { id: "flute", label: "Flöte & Ensemble" },
      { id: "young", label: "Musik für Jugend" },
      { id: "chamber", label: "Kammermusik (Groß)" },
      { id: "string_orch", label: "Streichorchester" },
      { id: "orch", label: "Orchester" },
      { id: "voice", label: "Stimme & Ensemble" },
      { id: "choir", label: "Chor" },
      { id: "order", label: "Bestellanfrage" },
    ],
    order: {
      title: "BESTELLANFRAGE",
      text: "Liebe Besucher*innen, für viele der aufgeführten Werke können Sie bei Interesse das Notenmaterial bestellen. Bitte geben Sie unten Ihre Kontaktdaten und die genaue Bestellbeschreibung ein.",
      placeholder: "Beispiel: Ich möchte die Partitur für 'Lichtspiele' bestellen. Meine Kontaktdaten sind...",
      button: "Bestellanfrage senden"
    }
  }
};

// --- WAVESURFER AUDIO PLAYER COMPONENT WITH SKELETON LOADER ---
function WaveSurferPlayer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: 'rgba(255, 255, 255, 0.3)',
    progressColor: '#fcd34d', 
    cursorColor: '#fcd34d',
    barWidth: 2,
    barGap: 2,
    barRadius: 3,
    url: src,
    normalize: true,
  });

  useEffect(() => {
    if (wavesurfer) {
      const handleCanPlay = () => setIsLoading(false);
      const handleReady = () => {
        if (wavesurfer.getDuration() > 0) setIsLoading(false);
      };
      
      wavesurfer.on('ready', handleReady);
      wavesurfer.on('decode', handleCanPlay);
      
      const timeout = setTimeout(() => setIsLoading(false), 10000);
      
      return () => {
        wavesurfer.un('ready', handleReady);
        wavesurfer.un('decode', handleCanPlay);
        clearTimeout(timeout);
      };
    }
  }, [wavesurfer]);

  const duration = wavesurfer?.getDuration() || 0;

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const toggleMute = useCallback(() => {
    if (wavesurfer) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      wavesurfer.setVolume(newMutedState ? 0 : volume);
    }
  }, [wavesurfer, isMuted, volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer && !isMuted) {
      wavesurfer.setVolume(newVolume);
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [wavesurfer, isMuted]);

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = duration > 0 ? duration - currentTime : 0;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPlayPause}
        className="shrink-0 w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-all duration-200 shadow-lg"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-[#0a1625]" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[#0a1625] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center gap-0.5 px-1 animate-pulse">
            {Array.from({ length: 70 }).map((_, i) => {
              const heights = [20, 30, 45, 60, 50, 35, 25, 40, 55, 48];
              const height = heights[i % heights.length];
              return (
                <div
                  key={i}
                  className="flex-1 bg-white/20 rounded-full transition-all"
                  style={{ height: `${height}%`, minWidth: '2px' }}
                />
              );
            })}
          </div>
        )}
        <div ref={containerRef} className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <div className="relative shrink-0">
        <button
          onClick={toggleMute}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="w-8 h-8 rounded-full bg-amber-200/10 hover:bg-amber-200/20 border border-amber-200/30 hover:border-amber-200/50 flex items-center justify-center transition-all duration-200"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : volume > 0.5 ? (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
            </svg>
          )}
        </button>

        {showVolumeSlider && (
          <div 
            className="absolute bottom-full right-0 mb-2 bg-[#0a1625] border border-amber-200/30 rounded-lg p-2 shadow-lg"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 accent-amber-200 cursor-pointer"
              style={{
                writingMode: 'vertical-lr' as const,
                WebkitAppearance: 'slider-vertical' as any,
                height: '80px',
                width: '6px',
                transform: 'rotate(180deg)'
              }}
            />
          </div>
        )}
      </div>

      <div className="text-sm font-body text-amber-200 tabular-nums min-w-[42px] text-right">
        {formatTime(remainingTime)}
      </div>
    </div>
  );
}

// Scroll Reveal Wrapper Component
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

export default function MusicalWorksPage() {
  const [orderMessage, setOrderMessage] = useState("");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const lastManualScrollTime = useRef<number>(0);
  
  // 1. Language & Sanity State
  const [language, setLanguage] = useState<Language>('en');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data & Set Language
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    const fetchSanityData = async () => {
      try {
        const query = `*[_type == "work"][0]`;
        const fetchedData = await client.fetch(query);
        setCategories(fetchedData?.categories || []);
      } catch (error) {
        console.error("Failed to fetch from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityData();
  }, []);

  const t = UI_CONTENT[language];
  const tripledNavigationItems = [...t.nav];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationId: number;

    const animate = () => {
      const timeSinceManualScroll = Date.now() - lastManualScrollTime.current;
      const shouldAutoScroll = !isTouching && timeSinceManualScroll > 2000 && isAutoScrolling;

      if (shouldAutoScroll) {
        container.scrollLeft += scrollSpeed;
        const singleSetWidth = container.scrollWidth / 3;
        
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling, isTouching, language]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => { lastManualScrollTime.current = Date.now(); };
    const handleTouchStart = () => { setIsTouching(true); };
    const handleTouchEnd = () => { setIsTouching(false); lastManualScrollTime.current = Date.now(); };
    const handleMouseDown = () => { setIsTouching(true); };
    const handleMouseUp = () => { setIsTouching(false); lastManualScrollTime.current = Date.now(); };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsAutoScrolling(false);
    lastManualScrollTime.current = Date.now();
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  return (
    <main className="min-h-screen w-full text-white selection:bg-amber-900 selection:text-white pb-32 bg-[#223C5E] lg:bg-transparent lg:bg-cover lg:bg-center lg:bg-fixed" style={{ backgroundImage: 'var(--bg-image)' }}>
      <style jsx>{`
        main { --bg-image: none; }
        @media (min-width: 1024px) {
          main { --bg-image: url(/images/works-bg-new.webp); }
        }
      `}</style>
      
      {/* --- MOBILE TOP NAV (Sticky) --- */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#172F4F] border-b border-[#47719E] flex flex-col shadow-lg">
        <div className="px-4 pt-6 pb-2 w-full"></div>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar w-full cursor-grab active:cursor-grabbing"
        >
          <div className="flex whitespace-nowrap px-4 py-4 gap-2">
            {tripledNavigationItems.map((item, index) => (
              <a 
                key={`${item.id}-${index}`}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="font-body text-[9px] font-bold uppercase tracking-wider text-white/80 hover:text-white bg-[#223C5E] hover:bg-[#2a4a73] border border-[#47719E] px-3 py-2 rounded transition-all select-none whitespace-nowrap"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- DESKTOP FIXED SIDEBAR NAV (Right) --- */}
      <motion.div 
        className="hidden lg:block fixed top-24 right-8 z-40 w-40"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex flex-col gap-1 p-0">
          {t.nav.map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="font-body text-[11px] font-normal text-center text-[#666] hover:text-white bg-[#EAEAEA] hover:bg-[#172F4F] border border-[#47719E] px-2 py-2 rounded-[5px] transition-all duration-300 uppercase tracking-wide"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.label.toUpperCase()}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="w-full lg:w-[700px] mx-auto pt-0 md:pt-2 relative bg-[#223C5E]">
        <div className="w-full px-4 lg:w-[600px] lg:px-0 mx-auto">
        
        {/* WORKS CATEGORIES DYNAMICALLY FETCHED FROM SANITY */}
        <div className="space-y-16 mb-20 pt-8">
          {loading ? (
             <div className="text-center font-body py-10 animate-pulse text-amber-200">Loading Musical Works Database...</div>
          ) : categories.map((category, categoryIndex) => {
            const categoryTitle = language === 'de' ? (category.title_de || category.title_en) : category.title_en;
            
            return (
              <ScrollReveal key={category.id || categoryIndex} delay={categoryIndex * 0.05}>
                <section id={category.id} className="scroll-mt-32">
                  
                  {/* Category Title */}
                  <div className="text-center mb-6 mt-12">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                      {categoryTitle}
                    </h2>
                  </div>

                  {/* Content Box */}
                  <div className="bg-[#172F4F] border border-[#47719E] p-4 lg:p-6 space-y-8 shadow-2xl w-full overflow-hidden">
                    {category.works?.map((work: any, idx: number) => {
                      const hasMedia = work.audioPath || work.youtubeUrl;
                      
                      const workTitle = language === 'de' ? (work.title_de || work.title_en) : work.title_en;
                      const workDetails = language === 'de' ? (work.details_de || work.details_en) : work.details_en;
                      
                      return (
                        <motion.div 
                          key={work._key || idx} 
                          className={`border-b border-[#47719E]/30 ${hasMedia ? 'pb-8' : 'pb-6'} last:border-0 last:pb-0`}
                          initial={{ opacity: 1 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                          {/* Work Title */}
                          <h3 className={`font-serif text-lg md:text-xl text-amber-100 mb-3 tracking-wide ${work.titleItalic ? 'italic' : ''}`}>
                            {workTitle}
                          </h3>
                          
                          {/* Work Details Array */}
                          <div className={`space-y-1 text-blue-50 text-xs lg:text-sm ${hasMedia ? 'mb-5' : 'mb-1'} wrap-break-word`}>
                            {workDetails?.map((line: string, i: number) => (
                              <p 
                                key={i} 
                                className={i === 0 ? 'font-serif italic' : 'font-body'}
                                style={i === 0 && work.firstDetailLarger ? { fontSize: '0.9375rem' } : {}}
                              >
                                {line}
                              </p>
                            ))}
                          </div>

                          {/* Media Controls */}
                          {hasMedia && (
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                              
                              {work.audioPath && (
                                <div className="flex-1 w-full">
                                  <WaveSurferPlayer src={work.audioPath} />
                                </div>
                              )}

                              {work.youtubeUrl && (
                                <a 
                                  href={work.youtubeUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-body font-bold uppercase tracking-wider rounded transition-colors md:ml-auto whitespace-nowrap"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                  YouTube
                                </a>
                              )}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ORDER BOX (Static UI) */}
        <ScrollReveal delay={0.1}>
          <div id="order" className="scroll-mt-32 pb-8">
            <div className="text-center mb-6 mt-12">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                {t.order.title}
              </h2>
            </div>
            
            <div className="bg-[#172F4F] border border-[#47719E] p-4 lg:p-6 shadow-2xl w-full overflow-hidden">
              <div className="flex flex-col gap-4">
                <p className="font-body text-xs lg:text-sm text-gray-300 text-center md:text-left">
                  {t.order.text}
                </p>
                
                <textarea 
                  className="w-full bg-[#10223a] border border-[#47719E]/50 p-3 font-body text-gray-200 text-xs lg:text-sm focus:outline-none focus:border-[#47719E] transition-colors rounded resize-none"
                  rows={4}
                  placeholder={t.order.placeholder}
                  value={orderMessage}
                  onChange={(e) => setOrderMessage(e.target.value)}
                />

                <div className="flex justify-end">
                  <a 
                    href={`mailto:dijanab@freenet.de?subject=Sheet Music Order&body=${encodeURIComponent(orderMessage)}`}
                    className={`font-body bg-[#EAEAEA] hover:bg-[#172F4F] text-[#666] hover:text-white border border-[#47719E] px-6 py-2 text-xs uppercase tracking-widest transition-colors rounded-[5px] ${!orderMessage.trim() ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {t.order.button}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

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