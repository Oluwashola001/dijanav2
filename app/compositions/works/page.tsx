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
  { id: "young", label: "Youth Music" },
  { id: "chamber", label: "Chamber Music (Large)" },
  { id: "string_orch", label: "String Orchestra" },
  { id: "orch", label: "Orchestra" },
  { id: "voice", label: "Voice & Choir" },
  { id: "order", label: "Order Request" },
];

const worksData = [
  {
    id: "strings",
    title: "STRING INSTRUMENTS & ENSEMBLE",
    works: [
      {
        title: "Suite after Folk Melodies from Serbia, Macedonia and Montenegro (2005)",
        details: ["Duo – Violin & Violoncello", "I. Lament–Dance · II. Song–Improvisation–Kolo", "Duration: ca. 10 min · Premiere: Gasteig Cultural Center, Munich (2006)"],
        audio: "/Music/suite.mp3",
        youtube: "https://www.youtube.com/watch?v=WvxSkxnr1bQ"
      },
      {
        title: "Con Fretta (2024)",
        details: ["String Trio – Violin, Viola, Violoncello", "Commission by the Munich Philharmonic", "Duration: ca. 10 min · Premiere: German Embassy, Beijing (2024)"],
        audio: null,
        youtube: null
      },
      {
        title: "Memories (2024)",
        details: ["String Quartet – 2 Violins, Viola, Violoncello", "Commission by the Munich Philharmonic", "I. For My Mother · II. Blurred Edges", "Duration: ca. 20 min · Premiere: Künstlerhaus, Munich (2024)"],
        audio: null,
        youtube: null
      },
      {
        title: "Sun Dance from the cycle Light Plays (2015)",
        details: ["Piano Trio – Violin, Violoncello, Piano", "Duration: ca. 9 min · Premiere: Alfred Schnittke Academy, Hamburg (2016)"],
        audio: "/Music/Website Sundance MP3.mp3",
        youtube: "https://www.youtube.com/watch?v=qzC-frjrHR0"
      },
      {
        title: "Light Plays (2012)",
        details: ["Violin & Piano", "I. Reflections / Darkness · II. Luminance", "Duration: ca. 10 min · Premiere: Gasteig Cultural Center, Munich (2013)"],
        audio: "/Music/lichtspiele.mp3", 
        youtube: "https://www.youtube.com/watch?v=Mtyn18iBWik"
      },
      {
        title: "Song of the Flame from Light Plays (2016)",
        details: ["Violoncello Solo", "Duration: ca. 7 min · Premiere: Alfred Schnittke Academy, Hamburg (2016)"],
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
        title: "Black and White from Light Plays (2023/24)",
        details: ["Two Pianos", "Duration: ca. 13 min · Premiere: Theatre Erfurt, Grand Hall (2024)"],
        audio: null,
        youtube: null
      },
      {
        title: "No Tinnitus (2011)",
        details: ["Piano & 21 Tibetan Singing Bowls", "Duration: ca. 17 min · Premiere: Gasteig Cultural Center, Munich (2011)"],
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
        details: ["Flute & Percussion", "Duration: ca. 5 min · Premiere: Freies Musikzentrum Munich (1999)"],
        audio: "/Music/Website Zwischen Ost und West I MP3.mp3",
        youtube: null
      },
      {
        title: "Between East and West II (1999 / rev. 2016)",
        details: ["Solo Flute", "Duration: ca. 4 min · Premiere: Stadtsaal Kaufbeuren (1999)"],
        audio: null,
        youtube: null
      },
      {
        title: "Conversations with Death (2014)",
        details: ["Flute & Organ", "Prelude · Quasi una Toccata · Postlude", "Duration: ca. 9 min · Premiere: Altach Organ Soirée (2014)"],
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
        details: ["Solo Flute", "Duration: ca. 4 min · Premiere: Town Hall, Kaufbeuren (1998)"],
        audio: null,
        youtube: null
      },
      {
        title: "Catch Me If You Can (2021)",
        details: ["Two Flutes", "Premiere: Municipal Music School Munich (2022)"],
        audio: null,
        youtube: null
      },
      {
        title: "Enchanted Girls (2016)",
        details: ["Three Flutes & Acting", "Duration: ca. 4 min · Premiere: Jugend musiziert Competition, Munich (2017)"],
        audio: null,
        youtube: null
      },
      {
        title: "Night Flight (2015)",
        details: ["Flute & Piano", "Premiere: Jugend musiziert Competition (2016)"],
        audio: null,
        youtube: null
      },
      {
        title: "Dance Monkey (2015)",
        details: ["Flute & Piano", "Premiere: Jugend musiziert Competition (2016)"],
        audio: null,
        youtube: null
      },
      {
        title: "Between East and West (2016)",
        details: ["Flute & Tape", "Duration: ca. 7 min · First Prize & Special Award, Jugend musiziert (2017)", "Premiere: Carl Orff Hall, Munich"],
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
        details: ["Sextet – Flute, Violin, Clarinet, Violoncello, Piano, Percussion", "Canticum – Versus – Vox – Integra", "Duration: ca. 12 min · Premiere: BEMUS International Music Festival, Belgrade (2007)"],
        audio: "/Music/versus II.mp3",
        youtube: "https://www.youtube.com/watch?v=qK4EA-K2VO4"
      },
      {
        title: "Three Pieces after Spiritual Poets (2000/01)",
        details: ["Sextet – Piano, 2 Harps, 2 Flutes, Mezzo-Soprano", "Duration: ca. 10 min · Premiere: Graz Opera House (2001)"],
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
        title: "Divertimento (2007/08)",
        details: ["Duration: ca. 5:30 min · Premiere: Gasteig Cultural Center, Munich (2008)"],
        audio: "/Music/divertimento_f_strings.mp3",
        youtube: null
      },
      {
        title: "Concerto for Strings (2008/2009)",
        details: ["Duration: ca. 15 min · Premiere: Kolarac Hall, Belgrade – BEMUS Festival (2009)"],
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
        title: "One (2017/18)",
        details: ["For symphony orchestra and two archaic instruments (one wind and one string instrument from spiritual traditions of the world)", "Duration: ca. 17 min · Premiere: Hamburg University of Music and Theatre (2018)"],
        audio: "/Music/ONE Orchesterstuck Boskovic.mp3",
        youtube: null
      },
      {
        title: "Danse Archaïque",
        details: ["Duration: ca. 5 min"],
        audio: null,
        youtube: null
      }
    ]
  },
  {
    id: "voice",
    title: "VOICE & ENSEMBLE",
    works: [
      {
        title: "Two Songs (2004)",
        details: ["Voice & Piano", "I. Consolation · II. Song of the Blackbird", "Duration: ca. 6 min · Versions for mezzo-soprano and soprano", "Premiere: Max-Joseph-Saal, Munich Residenz (2004)"],
        audio: "/Music/trost.mp3",
        youtube: "https://www.youtube.com/watch?v=Z_2WtxWsMIA"
      },
      {
        title: "It Is So Beautiful… (2015/16)",
        details: ["Concert piece from Transit", "Duration: ca. 6 min · Premiere: Laeiszhalle, Hamburg (2016)"],
        audio: "/Music/Es ist so schon.mp3",
        youtube: "https://www.youtube.com/watch?v=tE3DgpMd5B8"
      },
      {
        title: "Transit (2016)",
        details: ["Multimedia Work – mezzo-soprano, accordion & video", "Duration: ca. 9 min · Premiere: Resonanzraum, Hamburg (2016)"],
        audio: null,
        youtube: null
      },
      {
        title: "Eternal Question (1999/2000)",
        details: ["Vocal Ensemble – vocal ensemble & double bass", "Duration: ca. 5 min · Premiere: Kunsthaus Kaufbeuren (2000)"],
        audio: null,
        youtube: null
      },
      {
        title: "Media Vita – Ātman Aeternus (2025)",
        details: ["For vocal ensemble (SSATTTBB) and 2 horns or natural horns", "A contemplation after Media Vita in Morte sumus and Vedic philosophy"],
        audio: null,
        youtube: null
      },
      {
        title: "Dona nobis pacem – Shanti",
        details: ["For mixed choir & percussion", "Duration: ca. 5 min · Premiere: St. Reinoldi Church, Dortmund / Deutschlandradio (2017)"],
        audio: "/Music/Chor Dona nobis pacem Shanti Boskovic.mp3",
        youtube: null
      },
      {
        title: "Dona nobis pacem – Shanti",
        details: ["For mixed choir", "Duration: ca. 4:30 min"],
        audio: null,
        youtube: null
      },
      {
        title: "Ave Maria / Bogorodice djevo",
        details: ["For mixed choir & tenor solo", "Duration: ca. 4:50 min · Premiere: St. Sylvester's Church, Munich (2015)"],
        audio: null,
        youtube: null
      }
    ]
  }
];

// Animated Waveform Music Player Component with Web Audio API
function WaveformMusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const wasPlayingBeforeDrag = useRef(false);

  // Initialize Web Audio API
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initAudioContext = () => {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 128; // Smaller for visible bars
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
      }
    };

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

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', initAudioContext);

    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', initAudioContext);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, src]);

  // Draw waveform visualization
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    
    if (!canvas || !analyser || !dataArray) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const bufferLength = analyser.frequencyBinCount;

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * HEIGHT * 0.8;
      
      // Gold gradient for bars
      const gradient = ctx.createLinearGradient(0, HEIGHT - barHeight, 0, HEIGHT);
      gradient.addColorStop(0, '#fde68a'); // amber-200
      gradient.addColorStop(1, '#fcd34d'); // amber-300
      
      ctx.fillStyle = isPlaying ? gradient : 'rgba(253, 230, 138, 0.3)';
      ctx.fillRect(x, HEIGHT - barHeight, barWidth - 1, barHeight);

      x += barWidth;
    }

    animationRef.current = requestAnimationFrame(drawWaveform);
  };

  // Start/stop visualization
  useEffect(() => {
    if (isPlaying) {
      drawWaveform();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      // Draw static waveform when paused
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Draw minimal bars when not playing
          const barCount = 32;
          const barWidth = canvas.width / barCount;
          for (let i = 0; i < barCount; i++) {
            const height = 8 + Math.random() * 12;
            ctx.fillStyle = 'rgba(253, 230, 138, 0.2)';
            ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
          }
        }
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
      } catch (err) {
        console.error('Playback failed:', err);
      }
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !duration || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setDragPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    wasPlayingBeforeDrag.current = !audio.paused;
    setIsDragging(true);
    handleCanvasClick(e as any);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleCanvasClick(e as any);
  };

  const handleMouseUp = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setIsDragging(false);
    
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

  const progress = duration > 0 ? (isDragging ? dragPosition : currentTime / duration) : 0;

  return (
    <div className="flex items-center gap-3 bg-[#0a1625]/70 px-4 py-3 rounded-lg border border-white/10">
      <audio ref={audioRef} src={src} preload="metadata" crossOrigin="anonymous" />
      
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

      {/* Waveform Container */}
      <div className="flex-1 flex items-center gap-3">
        {/* Current Time */}
        <span className="text-[11px] font-mono text-gray-400 min-w-[38px]">
          {formatTime(currentTime)}
        </span>

        {/* Waveform Canvas with Scrubber */}
        <div className="flex-1 relative group/waveform">
          <canvas
            ref={canvasRef}
            width={800}
            height={40}
            className="w-full h-10 cursor-pointer rounded"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {/* Progress indicator overlay */}
          <div 
            className="absolute top-0 left-0 h-full pointer-events-none"
            style={{ width: `${progress * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-300 rounded-full shadow-lg border-2 border-white/20 opacity-0 group-hover/waveform:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Duration */}
        <span className="text-[11px] font-mono text-gray-400 min-w-[38px] text-right">
          {formatTime(duration)}
        </span>
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
  const autoScrollRef = useRef<number | null>(null);
  const lastManualScrollTime = useRef<number>(0);

  // Improved infinite auto-scroll with manual override
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
        
        const oneThirdWidth = container.scrollWidth / 3;
        
        if (container.scrollLeft >= oneThirdWidth) {
          container.scrollLeft = 1;
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
            {navigationItems.map((item, index) => (
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
                                                    <WaveformMusicPlayer src={work.audio} />
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
          <div id="order" className="bg-[#172F4F] border border-[#47719E] p-6 mt-16 shadow-2xl scroll-mt-32">
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