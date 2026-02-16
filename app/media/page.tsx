'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';
// Stellen Sie sicher, dass Sie folgendes installiert haben: npm install wavesurfer.js @wavesurfer/react
import { useWavesurfer } from '@wavesurfer/react';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    title: "Media",
    nav: [
      { id: "photos", label: "Press Photos" },
      { id: "audio", label: "Audio" },
      { id: "video", label: "Video" },
    ],
    photos: {
      title: "Press Photos",
      text: "High-resolution press photos of Dijana Bošković are available for download.",
      credit: "Please credit the photographer where indicated.",
      download: "Download"
    },
    audio: {
      title: "Audio",
      intro: {
        title: "Recordings of Music by Dijana Bošković",
        textPart1: "Audio recordings of works by Bošković can be found on the ",
        linkText: "Composition",
        textPart2: " page."
      },
      sections: [
        {
          category: "Recordings with Dijana Bošković as Flutist",
          subtext: "Classical and Improvisation",
          groups: [
            {
              header: "Classical",
              items: [
                {
                  performers: [
                    "Carl Reinecke: Sonata for Flute and Piano",
                    "Fikret Amirov: Six Pieces for Flute and Piano",
                    "",
                    "Dijana Bošković — flute",
                    "Maja Nikolić — piano"
                  ],
                  file: "/Music/reinecke_amirov.mp3"
                }
              ]
            },
            {
              header: "Debussy / Bošković – Syrinx",
              items: [
                {
                  performers: ["performed by Dijana Bošković (flute, Tibetan singing bowls)"],
                  file: "/Music/debussy_boskovic_syrinx_in_the_state_of_limbo.mp3"
                }
              ]
            },
            {
              header: "Improvisation",
              items: [
                {
                  performers: ["Dijana Bošković — flute", "Bettina Koziol — vocals", "Marika Falk — percussion", "Paulo Cardoso — double bass"],
                  file: "/Music/impro_bosk_cardoso-koziol.mp3"
                }
              ]
            }
          ]
        },
        {
          category: "Recordings with the Versus Vox Ensemble",
          subtext: null,
          groups: [
            {
              header: "Bošković",
              items: [
                {
                  performers: ["from the sextet <em>Versus Vox Integra</em>"],
                  file: "/Music/vox.mp3"
                }
              ]
            },
            {
              header: "Pogatschar",
              items: [
                {
                  performers: ["Simurgh from the children's opera <em>Mouse and Monster</em>"],
                  file: "/Music/pogatschar-simurgh.mp3"
                }
              ]
            },
            {
              header: "Bogojevich",
              items: [
                {
                  performers: ["<em>Emigrée's Waltz</em>"],
                  file: "/Music/bogojevich-emigree.mp3"
                }
              ]
            }
          ]
        }
      ]
    },
    video: {
      title: "Video",
      subtitle: "On YouTube:",
      watch: "Watch",
      items: [
        { title: "<em>Concerto for String Orchestra</em>", url: "https://www.youtube.com/watch?v=atZjR7nn5gA" },
        { title: "<em>Versus Vox Integra</em> (sextet)", url: "https://www.youtube.com/watch?v=qK4EA-K2VO4" },
        { title: "<em>Suite</em> for violin and cello", url: "https://www.youtube.com/watch?v=WvxSkxnr1bQ" },
        { title: "<em>Sundance</em> for piano trio", url: "https://www.youtube.com/watch?v=qzC-frjrHR0" },
        { title: "<em>Singing Flame</em> for solo cello", url: "https://www.youtube.com/watch?v=yWdFsA8GqxQ" },
        { title: "<em>Trost</em> (after a poem by Ina Seidel)", url: "https://www.youtube.com/watch?v=Z_2WtxWsMIA" },
        { title: "Es ist so schön … – concert piece for mezzo-soprano and piano", url: "https://www.youtube.com/watch?v=GS2njJ_VuhA" },
      ]
    }
  },
  de: {
    title: "Medien",
    nav: [
      { id: "photos", label: "Pressefotos" },
      { id: "audio", label: "Audio" },
      { id: "video", label: "Video" },
    ],
    photos: {
      title: "Pressefotos",
      text: "Hochauflösende Pressefotos von Dijana Bošković stehen zum Download bereit.",
      credit: "Bitte nennen Sie bei Verwendung den angegebenen Fotografen.",
      download: "Download"
    },
    audio: {
      title: "Audio",
      intro: {
        title: "Aufnahmen von Werken Dijana Boškovićs",
        textPart1: "Tonaufnahmen von Werken Boškovićs finden Sie auf der Seite ",
        linkText: "Werke",
        textPart2: "."
      },
      sections: [
        {
          category: "Aufnahmen mit Dijana Bošković als Flötistin",
          subtext: "Klassik und Improvisation",
          groups: [
            {
              header: "Klassik",
              items: [
                {
                  performers: [
                    "Carl Reinecke: Sonate für Flöte und Klavier",
                    "Fikret Amirov: Sechs Stücke für Flöte und Klavier",
                    "",
                    "Dijana Bošković — Flöte",
                    "Maja Nikolić — Klavier"
                  ],
                  file: "/Music/reinecke_amirov.mp3"
                }
              ]
            },
            {
              header: "Debussy / Bošković – Syrinx",
              items: [
                {
                  performers: ["interpretiert von Dijana Bošković (Flöte, Tibetische Klangschalen)"],
                  file: "/Music/debussy_boskovic_syrinx_in_the_state_of_limbo.mp3"
                }
              ]
            },
            {
              header: "Improvisation",
              items: [
                {
                  performers: ["Dijana Bošković — Flöte", "Bettina Koziol — Stimme", "Marika Falk — Perkussion", "Paulo Cardoso — Kontrabass"],
                  file: "/Music/impro_bosk_cardoso-koziol.mp3"
                }
              ]
            }
          ]
        },
        {
          category: "Aufnahmen mit dem Versus Vox Ensemble",
          subtext: null,
          groups: [
            {
              header: "Bošković",
              items: [
                {
                  performers: ["aus dem Sextett <em>Versus Vox Integra</em>"],
                  file: "/Music/vox.mp3"
                }
              ]
            },
            {
              header: "Pogatschar",
              items: [
                {
                  performers: ["Simurgh aus der Kinderoper <em>Maus und Monster</em>"],
                  file: "/Music/pogatschar-simurgh.mp3"
                }
              ]
            },
            {
              header: "Bogojevich",
              items: [
                {
                  performers: ["<em>Emigrée's Waltz</em>"],
                  file: "/Music/bogojevich-emigree.mp3"
                }
              ]
            }
          ]
        }
      ]
    },
    video: {
      title: "Video",
      subtitle: "Auf YouTube:",
      watch: "Ansehen",
      items: [
        { title: "<em>Concerto for Strings</em> (Streichorchester)", url: "https://www.youtube.com/watch?v=atZjR7nn5gA" },
        { title: "<em>Versus Vox Integra</em> (Sextett)", url: "https://www.youtube.com/watch?v=qK4EA-K2VO4" },
        { title: "<em>Suite</em> für Violine und Cello", url: "https://www.youtube.com/watch?v=WvxSkxnr1bQ" },
        { title: "<em>Sundance</em> für Klaviertrio", url: "https://www.youtube.com/watch?v=qzC-frjrHR0" },
        { title: "<em>Singing Flame</em> für Violoncello solo", url: "https://www.youtube.com/watch?v=yWdFsA8GqxQ" },
        { title: "<em>Trost</em> (nach einem Gedicht von Ina Seidel)", url: "https://www.youtube.com/watch?v=Z_2WtxWsMIA" },
        { title: "Es ist so schön … – Konzertstück für Mezzosopran und Klavier", url: "https://www.youtube.com/watch?v=GS2njJ_VuhA" },
      ]
    }
  }
};

// --- WAVESURFER AUDIO PLAYER COMPONENT FOR NEXT.JS ---
function WaveSurferPlayer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: 'rgba(255, 255, 255, 0.3)',
    progressColor: '#fcd34d', // amber-200
    cursorColor: '#fcd34d',
    barWidth: 2,
    barGap: 2,
    barRadius: 3,
    url: src,
    normalize: true,
  });

  // Get duration from wavesurfer
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

  // Calculate remaining time (countdown)
  const remainingTime = duration > 0 ? duration - currentTime : 0;

  return (
    <div className="flex items-center gap-3">
      {/* Play/Pause Button */}
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

      {/* WaveSurfer Container */}
      <div className="flex-1">
        <div ref={containerRef} />
      </div>

      {/* Volume Control */}
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

        {/* Volume Slider - appears on hover */}
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

      {/* Time Display - Countdown */}
      <div className="text-sm font-mono text-amber-200 tabular-nums min-w-[42px] text-right">
        {formatTime(remainingTime)}
      </div>
    </div>
  );
}

// --- IMAGE LIGHTBOX MODAL COMPONENT ---
interface LightboxProps {
  images: Array<{ thumbnail: string; fullSize: string; alt: string; downloadName: string }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  t: any; // Translation props
}

function ImageLightbox({ images, currentIndex, onClose, onNavigate, t }: LightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  };

  const handleDownload = async () => {
    const currentImage = images[currentIndex];
    try {
      const response = await fetch(currentImage.fullSize);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentImage.downloadName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 group"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-mono">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Download Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-amber-200 hover:bg-amber-300 text-black rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t.download}
        </button>

        {/* Main Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center mt-12"
          onClick={(e) => e.stopPropagation()}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
            
          <img
            src={currentImage.fullSize}
            alt={currentImage.alt}
            className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 group"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 group"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
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

const pressPhotos = [
  { 
    thumbnail: "/images/press/presse1.webp",
    fullSize: "/images/press/presse1.jpg",
    alt: "Dijana Boshkovich Press Photo 1",
    downloadName: "dijana-boshkovich-press-photo-1.jpg"
  },
  { 
    thumbnail: "/images/press/presse2.webp",
    fullSize: "/images/press/presse2.jpg",
    alt: "Dijana Boshkovich Press Photo 2",
    downloadName: "dijana-boshkovich-press-photo-2.jpg"
  },
  { 
    thumbnail: "/images/press/presse3.webp",
    fullSize: "/images/press/presse3.jpg",
    alt: "Dijana Boshkovich Press Photo 3",
    downloadName: "dijana-boshkovich-press-photo-3.jpg"
  },
  { 
    thumbnail: "/images/press/presse4.webp",
    fullSize: "/images/press/presse4.jpg",
    alt: "Dijana Boshkovich Press Photo 4",
    downloadName: "dijana-boshkovich-press-photo-4.jpg"
  },
  { 
    thumbnail: "/images/press/presse5.webp",
    fullSize: "/images/press/presse5.jpg",
    alt: "Dijana Boshkovich Press Photo 5",
    downloadName: "dijana-boshkovich-press-photo-5.jpg"
  },
  { 
    thumbnail: "/images/press/presse6.webp",
    fullSize: "/images/press/presse6.jpg",
    alt: "Dijana Boshkovich Press Photo 6",
    downloadName: "dijana-boshkovich-press-photo-6.jpg"
  },
];

export default function MediaPage() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const lastManualScrollTime = useRef<number>(0);
   
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. Language State
  const [language, setLanguage] = useState<Language>('en');

  // 2. Read Language Setting
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, []);

  const t = CONTENT[language];

  // Infinite auto-scroll for mobile nav
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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-[#223C5E] text-white selection:bg-amber-900 selection:text-white pb-32">
       
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <ImageLightbox
          images={pressPhotos}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNavigate={setCurrentImageIndex}
          t={t.photos}
        />
      )}

      {/* --- MOBILE TOP NAV (Sticky) --- */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#223C5E]/95 backdrop-blur-md border-b border-white/10 flex flex-col shadow-lg">
        {/* Row 1: Back Button */}
        <div className="px-4 pt-6 pb-2 w-full border-b border-white/5">
           
        </div>
         
        {/* Row 2: Auto-scrolling Nav Buttons */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar w-full cursor-grab active:cursor-grabbing"
        >
          <div className="flex whitespace-nowrap px-4 py-3 gap-3" style={{ width: 'max-content' }}>
            {t.nav.map((item, index) => (
              <a 
                key={`${item.id}-${index}`}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-white bg-[#172F4F]/80 hover:bg-[#223C5E] border border-[#47719E]/50 hover:border-[#47719E] px-4 py-2 rounded transition-all select-none"
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
        <nav className="flex flex-col gap-2 p-4 bg-[#223C5E]/50 backdrop-blur-sm rounded-lg border border-white/5">
          {t.nav.map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-[11px] font-bold uppercase tracking-wider text-white hover:text-white bg-[#172F4F]/80 hover:bg-[#223C5E] border border-[#47719E]/50 hover:border-[#47719E] px-3 py-2 rounded transition-all duration-300 text-center"
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
          
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-[700px] mx-auto pt-6 md:pt-12 px-4 md:px-8">
         
        {/* PAGE TITLE - REDUCED SPACING */}
        <ScrollReveal>
          <div className="mb-6 mt-6 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 tracking-wide">{t.title}</h1>
            <div className="h-px w-24 bg-[#47719E] mx-auto opacity-50"></div>
          </div>
        </ScrollReveal>

        <div className="space-y-12">

          {/* 1. PRESS PHOTOS - LARGER IMAGES & TEXT */}
          <ScrollReveal delay={0.1}>
            <section id="photos" className="scroll-mt-32 mt-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-serif italic text-white tracking-widest uppercase border-b border-[#47719E]/30 pb-3 inline-block px-12">
                  {t.photos.title}
                </h2>
              </div>
               
              <div className="bg-[#172F4F] border border-[#47719E] p-4 md:p-6 shadow-2xl">
                <div className="mb-4 text-center border-b border-[#47719E]/30 pb-4">
                  <p className="font-body text-blue-50 text-sm md:text-base">{t.photos.text}</p>
                  <p className="font-body text-amber-200/80 text-sm md:text-base italic mt-2">{t.photos.credit}</p>
                </div>
                 
                {/* RESPONSIVE GRID - Mobile: 2 columns responsive, Desktop: 3 columns centered */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mx-auto w-fit px-2 md:px-0">
                  {pressPhotos.map((photo, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                      <motion.div 
                        className="group relative aspect-[4/3] w-full max-w-[155px] md:w-[140px] md:max-w-none overflow-hidden border border-white/10 rounded cursor-pointer"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => openLightbox(i)}
                      >
                        <img 
                          src={photo.thumbnail} 
                          alt={photo.alt}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 vintage-photo"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* 2. AUDIO */}
          <ScrollReveal delay={0.1}>
            <section id="audio" className="scroll-mt-32">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-serif italic text-white tracking-widest uppercase border-b border-[#47719E]/30 pb-3 inline-block px-12">
                  {t.audio.title}
                </h2>
              </div>

              <div className="bg-[#172F4F] border border-[#47719E] p-4 md:p-8 shadow-2xl space-y-12">
                 
                {/* Intro Link - NO LEFT BORDER, LARGER TEXT */}
                <div className="bg-[#0a1625]/30 p-5 md:p-6">
                  <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-3">{t.audio.intro.title}</h3>
                  <p className="text-blue-50 font-body text-base md:text-lg leading-relaxed">
                    {t.audio.intro.textPart1}
                    <Link href="/compositions/works" className="text-amber-200 hover:text-white underline decoration-1 underline-offset-4 transition-colors font-bold">
                      {t.audio.intro.linkText}
                    </Link>
                    {t.audio.intro.textPart2}
                  </p>
                </div>

                {/* Audio Group Mapping */}
                {t.audio.sections.map((group, idx) => (
                  <motion.div 
                    key={idx} 
                    className="space-y-8"
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="border-b border-[#47719E]/30 pb-2">
                      <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide uppercase">
                        {group.category}
                      </h3>
                      {group.subtext && (
                        <p className="text-amber-200/80 italic text-lg md:text-xl mt-2">{group.subtext}</p>
                      )}
                    </div>

                    {/* Sub-groups */}
                    {group.groups.map((subgroup, sIdx) => (
                      <div key={sIdx} className="space-y-4">
                        {/* Sub-Header - NOW ITALIC */}
                        <h4 className="text-lg md:text-xl font-serif italic font-bold text-amber-100/90 tracking-wide">
                          {subgroup.header}
                        </h4>
                          
                        <div className="space-y-6 pl-4 border-l border-[#47719E]/30">
                          {subgroup.items.map((item, iIdx) => (
                            <div key={iIdx}>
                              {/* Text Descriptions */}
                              <div className="space-y-1 text-blue-50 font-body text-sm md:text-base mb-3">
                                {item.performers && item.performers.map((line, pIdx) => (
                                  <p key={pIdx} dangerouslySetInnerHTML={{ __html: line }} />
                                ))}
                              </div>

                              {/* WaveSurfer Player */}
                              <WaveSurferPlayer src={item.file} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* 3. VIDEO */}
          <ScrollReveal delay={0.1}>
            <section id="video" className="scroll-mt-32">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-serif italic text-white tracking-widest uppercase border-b border-[#47719E]/30 pb-3 inline-block px-12">
                  {t.video.title}
                </h2>
              </div>

              <div className="bg-[#172F4F] border border-[#47719E] p-4 md:p-8 shadow-2xl">
                {/* YOUTUBE SUBTITLE - MATCHES YELLOW HEADING WEIGHT */}
                <p className="text-amber-200 italic mb-6 text-center font-serif text-lg md:text-xl font-bold tracking-wide">{t.video.subtitle}</p>
                <div className="grid grid-cols-1 gap-3">
                  {t.video.items.map((video, i) => (
                    <motion.a 
                      key={i}
                      href={video.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-[#0a1625]/30 hover:bg-[#223C5E] border border-white/5 hover:border-amber-200/30 transition-all duration-300 rounded"
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="space-y-1 text-blue-50 font-body text-sm md:text-base font-semibold pr-4">
                        <p dangerouslySetInnerHTML={{ __html: video.title }} />
                      </div>
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 group-hover:text-red-300 shrink-0">
                        {t.video.watch}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

        </div>
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

        /* Vintage green-grey photo effect - UNTOUCHED */
        .vintage-photo {
          filter: 
            grayscale(100%) 
            contrast(115%) 
            brightness(135%)
            sepia(65%)
            hue-rotate(80deg)
            saturate(70%);
        }

        .vintage-photo:hover {
          filter: 
            grayscale(100%) 
            contrast(120%) 
            brightness(95%)
            sepia(35%)
            hue-rotate(60deg)
            saturate(50%);
        }
      `}</style>
    </main>
  );
}