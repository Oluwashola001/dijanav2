'use client';

import { motion, useInView } from 'framer-motion';
// In your local Next.js project, you can uncomment the import below and use <Link> instead of <a>
// import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// --- DATA STRUCTURE ---
const navigationItems = [
  { id: "strings", label: "Strings & Ensemble" },
  { id: "piano", label: "Piano & Ensemble" },
  { id: "flute", label: "Flute & Ensemble" },
  { id: "young", label: "Young Performers" },
  { id: "chamber", label: "Chamber Music (Large)" },
  { id: "string_orch", label: "String Orchestra" },
  { id: "orch", label: "Orchestra" },
  { id: "voice", label: "Voice & Choir" },
];

const worksData = [
  {
    id: "strings",
    title: "STRING INSTRUMENTS & ENSEMBLE",
    works: [
      {
        title: "Suite after Folk Melodies from Serbia, Macedonia, and Montenegro (2005)",
        details: ["for Violin and Violoncello", "I. Lament Dance · II. Song – Improvisation – Kolo", "Duration: 10 min · World Premiere: Gasteig Cultural Center, Munich, 2006"],
        audio: "/Music/suite.mp3",
        youtube: "https://www.youtube.com/watch?v=WvxSkxnr1bQ"
      },
      {
        title: "Con Fretta (2024)",
        details: ["for String Trio (Violin, Viola, Violoncello)", "Commissioned by the Munich Philharmonic", "Duration: approx. 10 min · World Premiere: German Embassy, Beijing, 2024"],
        audio: null,
        youtube: null
      },
      {
        title: "Memories (2024)",
        details: ["for String Quartet", "Commissioned by the Munich Philharmonic", "I. For My Mother · II. Contourless", "Duration: approx. 20 min · World Premiere: Künstlerhaus, Munich, 2024"],
        audio: null,
        youtube: null
      },
      {
        title: "Sun Dance, from the cycle Light Plays (2015)",
        details: ["for Piano Trio", "Duration: approx. 9 min · World Premiere: Alfred Schnittke Academy, Hamburg, 2016"],
        audio: "/Music/Website Sundance MP3.mp3",
        youtube: "https://www.youtube.com/watch?v=qzC-frjrHR0"
      },
      {
        title: "Light Plays (2012)",
        details: ["for Violin and Piano", "I. Reflections / Darkness · II. Luminance", "Duration: 10 min · World Premiere: Gasteig Cultural Center, Munich, 2013"],
        audio: "/Music/lichtspiele.mp3", 
        youtube: "https://www.youtube.com/watch?v=Mtyn18iBWik"
      },
      {
        title: "Song of the Flame, from the cycle Light Plays (2016)",
        details: ["for Solo Violoncello", "Duration: approx. 7 min · World Premiere: Alfred Schnittke Academy, Hamburg, 2016"],
        audio: "/Music/Website Singing Flame MP3.mp3",
        youtube: "https://www.youtube.com/watch?v=yWdFsA8GqxQ"
      }
    ]
  },
  {
    id: "piano",
    title: "PIANO & ENSEMBLE",
    works: [
      {
        title: "Black and White, from the cycle Light Plays (2023/2024)",
        details: ["for Two Pianos", "Duration: approx. 13 min · World Premiere: Theater Erfurt, 2024"],
        audio: null,
        youtube: null
      },
      {
        title: "No Tinnitus (2011)",
        details: ["for Piano and 21 Tibetan Singing Bowls", "Duration: 17 min · World Premiere: Gasteig Cultural Center, Munich, 2011"],
        audio: "/Music/No Tinnitus Klavier Boskovic.mp3",
        youtube: null
      }
    ]
  },
  {
    id: "flute",
    title: "FLUTE & ENSEMBLE",
    works: [
      {
        title: "Between East and West I (1999)",
        details: ["for Flute and Percussion", "Duration: approx. 5 min · World Premiere: Freies Musikzentrum Munich, 1999"],
        audio: "/Music/Website Zwischen Ost und West I MP3.mp3",
        youtube: null
      },
      {
        title: "Between East and West II (1999; rev. 2016)",
        details: ["for Solo Flute", "Duration: approx. 4 min · World Premiere: Stadtsaal Kaufbeuren, 1999"],
        audio: null,
        youtube: null
      },
      {
        title: "Conversations with Death (2014)",
        details: ["for Flute and Organ", "Prelude · Quasi una Toccata · Postlude", "Duration: approx. 9 min · World Premiere: Altach Organ Soirée, 2014"],
        audio: null,
        youtube: null
      }
    ]
  },
  {
    id: "young",
    title: "MUSIC FOR YOUNG PERFORMERS",
    works: [
      {
        title: "An Encounter with the Sea (1998)",
        details: ["for Solo Flute · Duration: 4 min"],
        audio: null,
        youtube: null
      },
      {
        title: "Catch Me If You Can (2021)",
        details: ["for Two Flutes · World Premiere: Munich, 2022"],
        audio: null,
        youtube: null
      },
      {
        title: "Enchanted Girls (2016)",
        details: ["for Three Flutes with Theatre · Duration: approx. 4 min"],
        audio: null,
        youtube: null
      },
      {
        title: "The Night Flight (2015)",
        details: ["for Flute and Piano · Duration: 2 min"],
        audio: null,
        youtube: null
      },
      {
        title: "Dance Monkey (2015)",
        details: ["for Flute and Piano"],
        audio: null,
        youtube: null
      },
      {
        title: "Between East and West (2016)",
        details: ["for Flute and Tape", "Duration: 7 min · 1st Prize & Special Prize, Jugend musiziert 2017"],
        audio: null,
        youtube: null
      }
    ]
  },
  {
    id: "chamber",
    title: "CHAMBER MUSIC – LARGER ENSEMBLES",
    works: [
      {
        title: "Versus Vox Integra (2007)",
        details: ["for Flute, Violin, Clarinet, Violoncello, Piano, Percussion", "Duration: 12 min · World Premiere: BEMUS Festival, Belgrade, 2007"],
        audio: "/Music/versus II.mp3",
        youtube: "https://www.youtube.com/watch?v=qK4EA-K2VO4"
      },
      {
        title: "Three Pieces after Texts by Spiritual Poets (2000/2001)",
        details: ["for Piano, Two Harps, Two Flutes, Mezzo-Soprano", "Duration: 10 min · World Premiere: Graz Opera House, 2001"],
        audio: null,
        youtube: null
      }
    ]
  },
  {
    id: "string_orch",
    title: "STRING ORCHESTRA",
    works: [
      {
        title: "Divertimento (2007/2008)",
        details: ["Duration: 5:30 min · World Premiere: Munich, 2008"],
        audio: "/Music/divertimento_f_strings.mp3",
        youtube: null
      },
      {
        title: "Concerto for Strings (2009)",
        details: ["Duration: 15 min · World Premiere: Kolarac Hall, Belgrade, 2009"],
        audio: "/Music/concerto_f_strings.mp3",
        youtube: null
      }
    ]
  },
  {
    id: "orch",
    title: "ORCHESTRA",
    works: [
      {
        title: "One (2017/2018)",
        details: ["Duration: 17 min · World Premiere: Hamburg, 2018"],
        audio: "/Music/ONE Orchesterstuck Boskovic.mp3",
        youtube: null
      },
      {
        title: "Danse Archaique",
        details: ["Duration: 5 min"],
        audio: null,
        youtube: null
      }
    ]
  },
  {
    id: "voice",
    title: "VOICE & CHOIR",
    works: [
      {
        title: "Two Songs (2004)",
        details: ["for Mezzo-Soprano or Soprano and Piano", "Duration: 6 min"],
        audio: "/Music/trost.mp3",
        youtube: "https://www.youtube.com/watch?v=Z_2WtxWsMIA"
      },
      {
        title: "It Is So Beautiful… (2015/2016)",
        details: ["for Mezzo-Soprano and Piano", "Duration: 6 min"],
        audio: "/Music/Es ist so schon.mp3",
        youtube: "https://www.youtube.com/watch?v=tE3DgpMd5B8"
      },
      {
        title: "Transit (2016)",
        details: ["Multimedia work for Mezzo-Soprano, Accordion, and Video", "Duration: 9 min"],
        audio: null,
        youtube: null
      },
      {
        title: "Eternal Question (1999/2000)",
        details: ["for Vocal Ensemble and Double Bass", "Duration: 5 min"],
        audio: null,
        youtube: null
      },
      {
        title: "Media Vita – Ātman Aeternus (2025)",
        details: ["for Vocal Ensemble (SSATTTBB) and Two Horns or Natural Horns"],
        audio: null,
        youtube: null
      },
      {
        title: "Dona nobis pacem – Shanti",
        details: ["for Mixed Choir (with or without Percussion)", "Duration: 4:30–5 min"],
        audio: "/Music/Chor Dona nobis pacem Shanti Boskovic.mp3",
        youtube: null
      },
      {
        title: "Ave Maria / Bogorodice Djevo",
        details: ["for Mixed Choir and Tenor Solo", "Duration: 4:50 min"],
        audio: null,
        youtube: null
      }
    ]
  }
];

// Modern Minimal Music Player Component - FIXED VERSION
function MinimalMusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wasPlayingBeforeDrag = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => setIsPlaying(false);

    // Try to get duration immediately if already loaded
    if (audio.duration && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Force load metadata
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isDragging, src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Remember if audio was playing before drag
    wasPlayingBeforeDrag.current = !audio.paused;
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setIsDragging(false);
    
    // Resume playback if it was playing before drag
    if (wasPlayingBeforeDrag.current && audio.paused) {
      audio.play();
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-[#0a1625]/70 px-4 py-3 rounded-lg border border-white/10">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="shrink-0 w-9 h-9 rounded-full bg-amber-200/10 hover:bg-amber-200/20 border border-amber-200/30 hover:border-amber-200/50 flex items-center justify-center transition-all duration-200 group"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-amber-200 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Progress Bar Container */}
      <div className="flex-1 flex items-center gap-3">
        {/* Current Time */}
        <span className="text-[11px] font-mono text-gray-400 min-w-[38px]">
          {formatTime(currentTime)}
        </span>

        {/* Progress Bar */}
        <div 
          className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group/progress"
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Background track */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Filled progress */}
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-200 to-amber-300 rounded-full relative"
              style={{ width: `${progress}%` }}
              initial={false}
              transition={{ duration: 0.1 }}
            >
              {/* Progress dot/handle - REMOVED AS REQUESTED */}
            </motion.div>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
        </div>

        {/* Duration */}
        <span className="text-[11px] font-mono text-gray-400 min-w-[38px] text-right">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

// Scroll Reveal Wrapper Component - Fixed to prevent content shift and work bidirectionally
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
  const autoScrollRef = useRef<number | null>(null);
  const lastManualScrollTime = useRef<number>(0);

  // Improved infinite auto-scroll with manual override
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5; // Pixels per frame
    let animationId: number;

    const animate = () => {
      // Check if user recently scrolled manually
      const timeSinceManualScroll = Date.now() - lastManualScrollTime.current;
      const shouldAutoScroll = !isTouching && timeSinceManualScroll > 2000 && isAutoScrolling;

      if (shouldAutoScroll) {
        // Increment scroll position
        container.scrollLeft += scrollSpeed;
        
        // Seamless loop: when we reach 1/3 of the way, jump back to start
        // Since we have 3 copies of the nav items, this creates infinite loop
        const oneThirdWidth = container.scrollWidth / 3;
        
        // When scrolled past first set of items, reset to beginning
        if (container.scrollLeft >= oneThirdWidth) {
          container.scrollLeft = 1; // Reset to 1 instead of 0 to avoid visual snap
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start animation immediately
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling, isTouching]);

  // Handle manual scroll detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      lastManualScrollTime.current = Date.now();
    };

    const handleTouchStart = () => {
      setIsTouching(true);
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
      lastManualScrollTime.current = Date.now();
    };

    const handleMouseDown = () => {
      setIsTouching(true);
    };

    const handleMouseUp = () => {
      setIsTouching(false);
      lastManualScrollTime.current = Date.now();
    };

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

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsAutoScrolling(false);
    lastManualScrollTime.current = Date.now();
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Resume auto-scrolling after 3 seconds
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#050B14] text-white selection:bg-amber-900 selection:text-white pb-32">
      
      {/* --- MOBILE TOP NAV (Sticky) --- */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#050B14]/95 backdrop-blur-md border-b border-white/10 flex flex-col shadow-lg">
        {/* Row 1: Back Button */}
        <div className="px-4 pt-6 pb-2 w-full border-b border-white/5">
             <a href="/compositions">
                <button className="text-white/50 hover:text-amber-200 transition-colors uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                    ← Back
                </button>
            </a>
        </div>
        
        {/* Row 2: Infinite Auto-scrolling Nav Buttons with Manual Override */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar w-full cursor-grab active:cursor-grabbing"
        >
            <div className="flex whitespace-nowrap px-4 py-3 gap-3" style={{ width: 'max-content' }}>
            {/* Triple duplicate for smoother infinite effect */}
            {[ ...navigationItems].map((item, index) => (
                <a 
                    key={`${item.id}-${index}`}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white border border-gray-700 hover:border-white px-3 py-1.5 rounded transition-all select-none"
                >
                    {item.label}
                </a>
            ))}
            </div>
        </div>
      </div>

      {/* --- DESKTOP FIXED SIDEBAR NAV (Right) --- */}
      <motion.div 
        className="hidden lg:block fixed top-24 right-8 z-40 w-64"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex flex-col gap-2 p-4 bg-[#050B14]/50 backdrop-blur-sm rounded-lg border border-white/5">
          {navigationItems.map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-[#172F4F]/50 hover:bg-[#172F4F] border border-[#47719E]/30 hover:border-[#47719E] px-3 py-2 rounded transition-all duration-300 text-center"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      {/* --- BACK BUTTON (Desktop Only) --- */}
      <motion.div 
        className="hidden lg:block fixed top-6 left-6 z-50"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a href="/compositions">
            <button className="text-white/50 hover:text-amber-200 transition-colors uppercase tracking-widest text-xs md:text-sm font-bold flex items-center gap-2">
                ← Back
            </button>
        </a>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-[950px] mx-auto pt-6 md:pt-16 px-4 md:px-8 lg:pr-72">
        
        {/* WORKS CATEGORIES */}
        <div className="space-y-16 mb-20">
            {worksData.map((category, categoryIndex) => (
                <ScrollReveal key={category.id} delay={categoryIndex * 0.05}>
                  <section id={category.id} className="scroll-mt-32">
                    
                    {/* Category Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase border-b border-[#47719E]/30 pb-4 inline-block px-12">
                            {category.title}
                        </h2>
                    </div>

                    {/* Content Box */}
                    <div className="bg-[#172F4F] border border-[#47719E] p-4 md:p-8 space-y-12 shadow-2xl">
                        {category.works.map((work, idx) => {
                            const hasMedia = work.audio || work.youtube;
                            
                            return (
                                <motion.div 
                                    key={idx} 
                                    className={`border-b border-[#47719E]/30 ${hasMedia ? 'pb-10' : 'pb-6'} last:border-0 last:pb-0`}
                                    initial={{ opacity: 1 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <h3 className="text-xl md:text-2xl font-serif text-amber-100 mb-4 tracking-wide">
                                        {work.title}
                                    </h3>
                                    
                                    <div className={`space-y-1 text-gray-300 font-light text-sm md:text-base ${hasMedia ? 'mb-6' : 'mb-1'}`}>
                                        {work.details.map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>

                                    {/* Media Controls */}
                                    {hasMedia && (
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            
                                            {work.audio && (
                                                <div className="flex-1 w-full">
                                                    <MinimalMusicPlayer src={work.audio} />
                                                </div>
                                            )}

                                            {work.youtube && (
                                                <a 
                                                    href={work.youtube} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ml-auto"
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
            ))}
        </div>

        {/* ORDER BOX */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[#172F4F] border border-[#47719E] p-6 mt-16 shadow-2xl">
              <div className="bg-[#10223a] border border-[#47719E]/50 p-6 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 italic text-center md:text-left">
                      Dear visitors*, for many of the listed works you can order the sheet music if you are interested. Please enter your contact details and exact order description below.
                  </p>
                  
                  <textarea 
                      className="w-full bg-[#050B14] border border-[#47719E]/30 p-3 text-gray-200 text-sm focus:outline-none focus:border-amber-200/50 transition-colors rounded resize-none"
                      rows={4}
                      placeholder="Example: I would like to order the score for 'Light Plays'. My contact info is..."
                      value={orderMessage}
                      onChange={(e) => setOrderMessage(e.target.value)}
                  />

                  <div className="flex justify-end">
                      <a 
                          href={`mailto:dijanab@freenet.de?subject=Sheet Music Order&body=${encodeURIComponent(orderMessage)}`}
                          className={`bg-[#223C5E] hover:bg-[#2e4d75] text-white border border-[#47719E] px-8 py-2 text-sm uppercase tracking-widest transition-colors ${!orderMessage.trim() ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                          Send Order Request
                      </a>
                  </div>
              </div>
          </div>
        </ScrollReveal>

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
      `}</style>
    </main>
  );
}