'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---

const CONTENT = {
  en: {
    hero: {
      name: "Dijana Bošković",
      role: "German-Serbian Composer & Flutist"
    },
    blocks: {
      2: (
        <>
          Born in Belgrade, <span className="text-amber-200/90">Dijana Bošković</span> was recognized early for her extraordinary musical talent, receiving the <span className="text-amber-200/90">October Prize of the City of Belgrade</span> and multiple first prizes at national competitions. She studied <span className="text-amber-200/90">flute in Belgrade</span> and at the <span className="text-amber-200/90">University of Music in Munich</span> with <span className="text-amber-200/90">Prof. Paul Meisen</span>, earning both the Artistic Diploma and Master Class certification.
        </>
      ),
      3: {
        title: "Flute & Performances",
        content: (
          <>
            As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles, and at renowned festivals including the <span className="text-amber-200/90">Schleswig-Holstein Music Festival</span>, the <span className="text-amber-200/90">BEMUS Festival</span> in Belgrade, and the <span className="text-amber-200/90">Hohenloher Kultursommer</span>. Collaborations with the <span className="text-amber-200/90">Kammerphilharmonie Bremen</span> and the <span className="text-amber-200/90">Bamberger Solisten</span>, along with jazz performances in venues such as the <span className="text-amber-200/90">Münchner Unterfahrt</span> and on recordings with jazz composers, shaped her multifaceted musical voice.
          </>
        )
      },
      4: {
        title: "Versus Vox & Composition Studies",
        content: (
          <>
            In 2005, she founded the <span className="text-amber-200/90">Versus Vox Ensemble</span> in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences. Her <span className="text-amber-200/90">studies in composition</span> with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project ONE, premiered by the Hamburg Symphony Orchestra.
          </>
        )
      },
      5: (
        <>
          The work bridges Western and Eastern classical music, exploring new forms of notation and performance practice.
        </>
      ),
      6: {
        title: "Works, Performances & Awards",
        content: (
          <>
            Her compositions span <span className="text-amber-200/90">solo instruments, chamber music, orchestra, choir, voice, and theater</span>, performed by the <span className="text-amber-200/90">Chamber Orchestra Solisten from St. Petersburg</span>, members of the <span className="text-amber-200/90">Munich Philharmonic</span> and <span className="text-amber-200/90">Frankfurt Opera</span>, at the <span className="text-amber-200/90">BEMUS Music Festival</span> in Belgrade, and the <span className="text-amber-200/90">Tiroler Volksschauspiele</span>. The chamber orchestra work <span className="text-amber-200/90">"Concerto for Strings"</span> has been broadcast on leading European radio stations.
          </>
        )
      },
      7: (
        <>
          For <span className="text-amber-200/90">"Lichtspiele"</span>, she received support from the <span className="text-amber-200/90">Ernst von Siemens Art Foundation</span> and the <span className="text-amber-200/90">Gerhard Trede Foundation</span>, and in 2017 won <span className="text-amber-200/90">1st Prize</span> at the International Choral Music Competition organized by the <span className="text-amber-200/90">German Choir Association</span>.
        </>
      )
    },
    staticBio: {
      block1: {
        title: "Dijana Bošković",
        subtitle: "German-Serbian Composer & Flutist",
        p1: "Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the October Prize of the City of Belgrade and multiple first prizes at national competitions.",
        p2: "She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification. As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles.",
        p3: "Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten (from the Bamberger Symphoniker), along with jazz performances in venues such as the Münchner Unterfahrt and on recordings with jazz composers, shaped her multifaceted musical voice."
      },
      block2: {
        title: "Versus Vox & Composition Studies",
        p1: "In 2005, she founded the Versus Vox Ensemble in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences.",
        p2: "Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk at the University of Music and Theatre Hamburg culminated in the orchestral project \"ONE\", premiered by the Symphonikern Hamburg.",
        p3: "The work bridges Western and Eastern classical music, exploring new forms of notation and performance practice."
      },
      block3: {
        title: "Works, Performances & Awards",
        p1: "Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater, performed by the Chamber Orchestra Solisten from St. Petersburg, members of the Munich Philharmonic and Frankfurt Opera, at the BEMUS Music Festival in Belgrade, and the Tiroler Volksschauspiele.",
        p2: "The chamber orchestra work \"Concerto for Strings\" has been broadcast on leading European radio stations.",
        p3: "For \"Lichtspiele\", she received support from the Ernst von Siemens Art Foundation and the Gerhard Trede Foundation, and in 2017 won 1st Prize at the International Choral Music Competition organized by the German Choir Association."
      }
    },
    button: "View Compositions",
    scrollIndicator: "Full Biography"
  },
  de: {
    hero: {
      name: "Dijana Bošković",
      role: "Deutsch-serbische Komponistin & Flötistin"
    },
    blocks: {
      2: (
        <>
          Geboren in Belgrad, wurde <span className="text-amber-200/90">Dijana Bošković</span> bereits früh für ihre außergewöhnliche Musikalität ausgezeichnet – unter anderem mit dem <span className="text-amber-200/90">Oktober-Preis der Stadt Belgrad</span> sowie mehreren ersten Preisen bei nationalen Wettbewerben. Das Studium der <span className="text-amber-200/90">Querflöte</span> absolvierte sie zunächst in Belgrad, anschließend an der <span className="text-amber-200/90">Hochschule für Musik und Theater München</span> bei <span className="text-amber-200/90">Prof. Paul Meisen</span>, wo sowohl das Künstlerische Diplom als auch die Meisterklasse erfolgreich abgeschlossen wurden.
        </>
      ),
      3: {
        title: "Flöte & Performances",
        content: (
          <>
            Als vielseitige Musikerin war sie als Solistin, Orchestermusikerin und Kammermusikerin tätig und gastierte bei renommierten Festivals wie dem <span className="text-amber-200/90">Schleswig-Holstein Musik Festival</span>, dem <span className="text-amber-200/90">BEMUS Festival</span> in Belgrad und dem <span className="text-amber-200/90">Hohenloher Kultursommer</span>. Kooperationen mit der <span className="text-amber-200/90">Kammerphilharmonie Bremen</span> und den <span className="text-amber-200/90">Bamberger Solisten</span> sowie Jazzauftritte in der <span className="text-amber-200/90">Münchner Unterfahrt</span> und CD-Produktionen mit Jazz-Komponist*innen prägten eine facettenreiche musikalische Handschrift.
          </>
        )
      },
      4: {
        title: "Versus Vox & Kompositionsstudium",
        content: (
          <>
            2005 gründete sie in München das <span className="text-amber-200/90">Versus Vox Ensemble</span>, das sie bis heute künstlerisch leitet. In dessen Arbeit verbinden sich eigene Kompositionen mit Werken zeitgenössischer und historischer Komponist*innen zu lebendigen, interdisziplinären Musikerlebnissen. Das <span className="text-amber-200/90">Kompositionsstudium</span> bei Prof. Manfred Stahnke und Prof. Fredrik Schwenk an der Hochschule für Musik und Theater Hamburg schloss sie mit der Orchesterkomposition ONE ab, die von den Symphonikern Hamburg uraufgeführt wurde.
          </>
        )
      },
      5: (
        <>
          Das Werk schlägt eine Brücke zwischen westlicher und östlicher Klassik und erforscht neue Formen der Notation und Aufführungspraxis.
        </>
      ),
      6: {
        title: "Werke, Aufführungen & Auszeichnungen",
        content: (
          <>
            Das kompositorische Spektrum umfasst Werke für <span className="text-amber-200/90">Solo-Instrumente, Kammermusik, Orchester, Chor, Gesang sowie Musiktheater</span>. Aufführungen fanden unter anderem mit dem <span className="text-amber-200/90">Kammerorchester Solisten aus St. Petersburg</span>, mit Mitgliedern der <span className="text-amber-200/90">Münchner Philharmoniker</span> und der <span className="text-amber-200/90">Frankfurter Oper</span>, beim <span className="text-amber-200/90">BEMUS Musikfestival</span> in Belgrad sowie bei den <span className="text-amber-200/90">Tiroler Volksschauspielen</span> statt. Das Kammerorchesterwerk <span className="text-amber-200/90">Concerto for Strings</span> wurde von führenden europäischen Radiosendern ausgestrahlt.
          </>
        )
      },
      7: (
        <>
          Für das Projekt <span className="text-amber-200/90">Lichtspiele</span> erhielt sie Förderungen der <span className="text-amber-200/90">Ernst von Siemens Kunststiftung</span> sowie der <span className="text-amber-200/90">Gerhard-Trede-Stiftung</span>. 2017 wurde sie mit dem <span className="text-amber-200/90">1. Preis</span> beim Internationalen Wettbewerb für Chormusik des <span className="text-amber-200/90">Deutschen Chorverbands</span> ausgezeichnet.
        </>
      )
    },
    staticBio: {
      block1: {
        title: "Dijana Bošković",
        subtitle: "Deutsch-serbische Komponistin & Flötistin",
        p1: "Geboren in Belgrad, wurde Dijana Bošković bereits früh für ihre außergewöhnliche Musikalität ausgezeichnet – unter anderem mit dem Oktober-Preis der Stadt Belgrad sowie mehreren ersten Preisen bei nationalen Wettbewerben.",
        p2: "Das Studium der Querflöte absolvierte sie zunächst in Belgrad, anschließend an der Hochschule für Musik und Theater München bei Prof. Paul Meisen, wo sowohl das Künstlerische Diplom als auch die Meisterklasse erfolgreich abgeschlossen wurden. Als vielseitige Musikerin war sie als Solistin, Orchestermusikerin und Kammermusikerin tätig.",
        p3: "Kooperationen mit der Kammerphilharmonie Bremen und den Bamberger Solisten sowie Jazzauftritte in der Münchner Unterfahrt und CD-Produktionen mit Jazz-Komponist*innen prägten eine facettenreiche musikalische Handschrift."
      },
      block2: {
        title: "Versus Vox & Kompositionsstudium",
        p1: "2005 gründete sie in München das Versus Vox Ensemble, das sie bis heute künstlerisch leitet. In dessen Arbeit verbinden sich eigene Kompositionen mit Werken zeitgenössischer und historischer Komponist*innen zu lebendigen, interdisziplinären Musikerlebnissen.",
        p2: "Das Kompositionsstudium bei Prof. Manfred Stahnke und Prof. Fredrik Schwenk an der Hochschule für Musik und Theater Hamburg schloss sie mit der Orchesterkomposition ONE ab, die von den Symphonikern Hamburg uraufgeführt wurde.",
        p3: "Das Werk schlägt eine Brücke zwischen westlicher und östlicher Klassik und erforscht neue Formen der Notation und Aufführungspraxis."
      },
      block3: {
        title: "Werke, Aufführungen & Auszeichnungen",
        p1: "Das kompositorische Spektrum umfasst Werke für Solo-Instrumente, Kammermusik, Orchester, Chor, Gesang sowie Musiktheater. Aufführungen fanden unter anderem mit dem Kammerorchester Solisten aus St. Petersburg, mit Mitgliedern der Münchner Philharmoniker und der Frankfurter Oper, beim BEMUS Musikfestival in Belgrad sowie bei den Tiroler Volksschauspielen statt.",
        p2: "Das Kammerorchesterwerk Concerto for Strings wurde von führenden europäischen Radiosendern ausgestrahlt.",
        p3: "Für das Projekt Lichtspiele erhielt sie Förderungen der Ernst von Siemens Kunststiftung sowie der Gerhard-Trede-Stiftung. 2017 wurde sie mit dem 1. Preis beim Internationalen Wettbewerb für Chormusik des Deutschen Chorverbands ausgezeichnet."
      }
    },
    button: "Kompositionen ansehen",
    scrollIndicator: "Vollständige Biografie"
  }
};

// --- HELPER TO GET OVERLAY BLOCKS ---
const getOverlayBlocks = (lang: Language) => [
  {
    id: 1,
    desktop: { start: 1, end: 7 },
    mobile: { start: 1, end: 7 },
    position: "top-left",
    mobilePosition: "top-left",
    lines: [
      { text: CONTENT[lang].hero.name, className: "font-heading text-4xl md:text-6xl text-white font-bold" },
      { text: CONTENT[lang].hero.role, className: "font-heading text-2xl md:text-3xl text-amber-200/90 italic" }
    ]
  },
  {
    id: 2,
    desktop: { start: 7.5, end: 29 },
    mobile: { start: 6.5, end: 29 },
    position: "right",
    mobilePosition: "upper-right",
    content: CONTENT[lang].blocks[2]
  },
  {
    id: 3,
    desktop: { start: 29, end: 50 },
    mobile: { start: 29, end: 50 },
    position: "left",
    mobilePosition: "full-width",
    title: CONTENT[lang].blocks[3].title,
    content: CONTENT[lang].blocks[3].content
  },
  {
    id: 4,
    desktop: { start: 54, end: 79 },
    mobile: { start: 54, end: 79 },
    position: "top-center-higher",
    mobilePosition: "full-width",
    title: CONTENT[lang].blocks[4].title,
    content: CONTENT[lang].blocks[4].content
  },
  {
    id: 5,
    desktop: { start: 80, end: 92 },
    mobile: { start: 80, end: 94 },
    position: "top-center",
    mobilePosition: "mid-screen",
    content: CONTENT[lang].blocks[5],
    isQuote: true
  },
  {
    id: 6,
    desktop: { start: 92, end: 114 },
    mobile: { start: 94, end: 117 },
    position: "left",
    mobilePosition: "high-up",
    title: CONTENT[lang].blocks[6].title,
    content: CONTENT[lang].blocks[6].content
  },
  {
    id: 7,
    desktop: { start: 125, end: 147 },
    mobile: { start: 127, end: 149 },
    position: "top-center",
    mobilePosition: "mid-screen",
    content: CONTENT[lang].blocks[7]
  }
];


// --- COMPONENTS ---

function SplashScreen({ onComplete, language }: { onComplete: () => void, language: Language }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videoSrc = isMobile 
    ? (language === 'de' ? "/videos/splashm-de.mp4" : "/videos/splashm.mp4")
    : (language === 'de' ? "/videos/splash-de.mp4" : "/videos/splash.mp4");

  const posterSrc = isMobile 
    ? "/images/splash-mobile-poster.webp"
    : "/images/splash-desktop-poster.webp";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      <video
        key={`${language}-${isMobile}`} 
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        poster={posterSrc}
        className="w-full h-full object-cover object-center md:scale-100 scale-105"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </motion.div>
  );
}

function TextBlockWithLineAnimation({ 
  block, 
  currentTime, 
  positionClasses,
  isMobile,
  language
}: { 
  block: any, 
  currentTime: number, 
  positionClasses: string,
  isMobile: boolean,
  language: Language
}) {
  const timing = isMobile ? block.mobile : block.desktop;
  const duration = timing.end - timing.start;
  const progress = (currentTime - timing.start) / duration;
  
  const getBackgroundClass = () => {
    if (block.id === 2 || block.id === 7) {
      return 'bg-[#223C5E]/50';
    }
    return 'bg-[#223C5E]/15';
  };
  
  if (block.id === 1 && 'lines' in block && block.lines) {
    const waitDuration = 0.167;
    const fadeInDuration = 0.1;
    const fadeOutStart = 0.75;
    const fadeOutDuration = 0.25;
    
    let blockOpacity = 0;
    
    if (progress < waitDuration) {
      blockOpacity = 0;
    } else if (progress >= waitDuration && progress < (waitDuration + fadeInDuration)) {
      const fadeProgress = (progress - waitDuration) / fadeInDuration;
      blockOpacity = fadeProgress;
    } else if (progress >= (waitDuration + fadeInDuration) && progress < fadeOutStart) {
      blockOpacity = 1;
    } else if (progress >= fadeOutStart && progress < (fadeOutStart + fadeOutDuration)) {
      const fadeProgress = (progress - fadeOutStart) / fadeOutDuration;
      blockOpacity = Math.max(0, 1 - fadeProgress);
    } else {
      blockOpacity = 0;
    }
    
    const overlayVisible = progress < 1;
    const linesToShow = block.lines;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayVisible ? blockOpacity : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute z-20 p-4 md:p-6 rounded-xl ${getBackgroundClass()} border border-white/5 shadow-2xl overflow-hidden ${positionClasses}`}
      >
        {linesToShow.map((line: any, lineIndex: number) => (
          <div
            key={`line-${lineIndex}`}
            className={line.className}
          >
            {line.text}
          </div>
        ))}
      </motion.div>
    );
  }
  
  const waitDuration = 0.08;
  const fadeInDuration = 0.08;
  const fadeOutStart = 0.85;
  const fadeOutDuration = 0.15;
  
  let opacity = 0;
  
  if (progress < waitDuration) {
    opacity = 0;
  } else if (progress >= waitDuration && progress < (waitDuration + fadeInDuration)) {
    const fadeProgress = (progress - waitDuration) / fadeInDuration;
    opacity = fadeProgress;
  } else if (progress >= (waitDuration + fadeInDuration) && progress < fadeOutStart) {
    opacity = 1;
  } else if (progress >= fadeOutStart && progress < (fadeOutStart + fadeOutDuration)) {
    const fadeProgress = (progress - fadeOutStart) / fadeOutDuration;
    opacity = 1 - fadeProgress;
  } else {
    opacity = 0;
  }
  
  if (opacity === 0) return null;
  
  const getPadding = () => {
    if (isMobile) {
      if (block.id === 2) return 'py-12 px-6';
      if (block.id === 3) return 'py-12 px-4';
      if (block.id === 4) return 'py-12 px-4';
      if (block.id === 5) return 'py-8 px-4';
      if (block.id === 6) return 'py-8 px-4';
      if (block.id === 7) return 'py-10 px-6';
      return 'py-8 px-4';
    }
    if (block.id === 2) return 'md:py-12 md:px-8';
    if (block.id === 4) return 'md:py-8 md:px-10';
    if (block.id === 6) return 'md:py-8 md:px-8';
    if (block.id === 7) return 'md:py-14 md:px-12';
    return 'md:py-12 md:px-8';
  };
  
  const titleClass = "font-heading text-2xl md:text-4xl text-amber-200/90 italic mb-2 md:mb-4";
  
  const getBodyClass = () => {
    if (isMobile) {
      if (block.id === 2) {
        if (language === 'de') return "text-white/95 font-body text-[1.1rem] md:text-lg leading-relaxed";
        return "text-white/95 font-body text-[1.4rem] md:text-xl leading-relaxed";
      }
      if (block.id === 3) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 4) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 5) return "text-white/95 font-body text-lg md:text-2xl leading-relaxed italic";
      if (block.id === 6) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
      if (block.id === 7) return "text-white/95 font-body text-lg md:text-xl leading-relaxed";
    }
    
    if (block.id === 2) {
      if (language === 'de') return "text-white/95 font-body text-xs md:text-[1.4rem] leading-relaxed";
      return "text-white/95 font-body text-xs md:text-[1.75rem] leading-relaxed";
    }
    if (block.id === 3) return "text-white/95 font-body text-xs md:text-2xl leading-relaxed";
    if (block.id === 4) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.id === 6) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.id === 7) return "text-white/95 font-body text-xs md:text-[1.7rem] leading-relaxed";
    if (block.isQuote) return "text-white/95 font-body text-sm md:text-4xl leading-relaxed italic";
    return "text-white/95 font-body text-xs md:text-lg leading-relaxed";
  };
  
  const bodyClass = getBodyClass();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`absolute z-20 p-4 ${getPadding()} rounded-xl ${getBackgroundClass()} border border-white/5 shadow-2xl ${positionClasses}`}
    >
      {'title' in block && block.title && (
        <div className={titleClass}>{block.title}</div>
      )}
      <div className={bodyClass}>
        {block.content}
      </div>
    </motion.div>
  );
}

function HeroVideo({ startPlaying, language, isVideoMuted }: { 
  startPlaying: boolean; 
  language: Language;
  isVideoMuted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const overlayBlocks = getOverlayBlocks(language);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (startPlaying && videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video play error:", e));
    }
  }, [startPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const mobileWebm = "/videos/about-film-mobile-new.webm";
  const mobileMp4  = "/videos/about-film-mobile-ios.mp4";
  const desktopWebm = "/videos/about-film.webm";
  const desktopMp4  = "/videos/about-film.mp4";

  const posterSrc = isMobile
    ? "/images/about-film-mobile-poster.webp"
    : "/images/about-film-desktop-poster.webp";

  const activeBlock = overlayBlocks.find(block => {
    const timing = isMobile ? block.mobile : block.desktop;
    return currentTime >= timing.start && currentTime <= timing.end;
  });

  const getPositionClasses = (pos: string, mobilePos: string) => {
    const position = isMobile ? mobilePos : pos;
    
    if (isMobile) {
      switch (position) {
        case 'top-center': 
          return 'top-18 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] max-w-md items-center text-center';
        case 'top-left':
          return 'top-[10%] left-4 w-[60%] max-w-xs items-start text-left';
        case 'upper-right':
          return 'top-16 right-4 w-[80%] max-w-sm items-center text-center';
        case 'full-width':
          return 'top-[8%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center'; 
        case 'high-up':
          return 'top-[8%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center';
        case 'mid-screen':
          return 'top-[21%] left-4 right-4 w-[calc(100%-2rem)] items-center text-center';
        default: 
          return 'top-16 left-1/2 -translate-x-1/2 w-[85%] max-w-md items-center text-center';
      }
    }
    
    switch (position) {
      case 'top-left': 
        return 'top-8 left-8 md:top-20 md:left-8 max-w-xs md:max-w-md items-start text-left';
      case 'left': 
        return 'top-1/2 -translate-y-1/2 left-4 md:left-16 max-w-xs md:max-w-2xl items-center text-center';
      case 'upper-right':
        return 'top-8 right-4 md:right-8 max-w-xs md:max-w-lg items-start text-left';
      case 'top-center': 
        return 'top-12 md:top-16 left-1/2 -translate-x-1/2 max-w-xs w-full md:max-w-6xl items-center text-center';
      case 'top-center-higher':
        return 'top-8 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-6xl items-center text-center';
      case 'right': 
        return 'top-1/2 -translate-y-1/2 right-4 md:right-6 max-w-xs md:max-w-xl items-center text-center';
      default: 
        return 'bottom-20 left-1/2 -translate-x-1/2 max-w-xs md:max-w-2xl items-center text-center';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        ref={videoRef}
        muted={isVideoMuted}
        playsInline
        loop
        onTimeUpdate={handleTimeUpdate}
        poster={posterSrc}
        className="w-full h-full object-cover md:object-center"
        style={{ 
          objectPosition: isMobile ? '15% 15%' : 'center center'
        }}
      >
        {isMobile && <source src={mobileWebm} type="video/webm" />}
        {isMobile && <source src={mobileMp4}  type="video/mp4"  />}
        {!isMobile && <source src={desktopWebm} type="video/webm" />}
        {!isMobile && <source src={desktopMp4}  type="video/mp4"  />}
      </video>

      <div className="absolute inset-0 bg-[#223C5E]/15 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {activeBlock && (
          <TextBlockWithLineAnimation 
            key={activeBlock.id}
            block={activeBlock}
            currentTime={currentTime}
            positionClasses={getPositionClasses(activeBlock.position, activeBlock.mobilePosition)}
            isMobile={isMobile}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FIXED SCROLL INDICATOR ──────────────────────────────────────────────────
function FixedScrollIndicator({ language, splashFinished }: { language: Language, splashFinished: boolean }) {
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);

  const scrollText = CONTENT[language].scrollIndicator;

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY >= heroHeight) {
        setVisible(false);
        setOpacity(0);
      } else {
        setVisible(true);
        const fadeStart = heroHeight * 0.2;
        if (scrollY <= fadeStart) {
          setOpacity(1);
        } else {
          const fadeProgress = (scrollY - fadeStart) / (heroHeight - fadeStart);
          setOpacity(Math.max(0, 1 - fadeProgress));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBio = () => {
    const bioSection = document.getElementById('bio-section');
    if (bioSection) {
      bioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hide entirely while splash is still playing
  if (!splashFinished || !visible) return null;

  return (
    <div
      className="fixed bottom-4 right-2 md:bottom-4 md:right-4 z-[100] pointer-events-auto"
      style={{ opacity, transition: 'opacity 0.1s linear' }}
    >
      <button
        onClick={scrollToBio}
        className="flex flex-row items-end gap-1 cursor-pointer group"
        aria-label="Scroll to biography"
      >
        <span className="text-white/70 group-hover:text-amber-200/90 text-sm md:text-base uppercase tracking-wider transition-colors duration-300">
          {scrollText}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-amber-200/90 group-hover:text-amber-200 transition-colors duration-300 mb-[2px]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </button>
    </div>
  );
}

// ─── ANIMATED COMPONENTS ─────────────────────────────────────────────────────
function AnimatedParagraph({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode, 
  delay?: number 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function BioBlocks({ language }: { language: Language }) {
  const text = CONTENT[language].staticBio;

  return (
    <>
      <div id="bio-section" className="relative z-10 w-full max-w-5xl mx-auto md:ml-[2%] md:mr-auto px-6 py-12 md:py-24 space-y-12 md:space-y-16">
        
        {/* Block 1 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <div>
              <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-2">{text.block1.title}</h2>
              <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">{text.block1.subtitle}</h3>
            </div>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}><p>{text.block1.p1}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.15}><p>{text.block1.p2}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.2}><p>{text.block1.p3}</p></AnimatedParagraph>
          </div>
        </section>

        {/* Block 2 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">{text.block2.title}</h3>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}><p>{text.block2.p1}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.15}><p>{text.block2.p2}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.2}><p>{text.block2.p3}</p></AnimatedParagraph>
          </div>
        </section>

        {/* Block 3 */}
        <section className="space-y-6">
          <AnimatedHeading>
            <h3 className="font-heading text-xl md:text-3xl text-amber-200/90 italic">{text.block3.title}</h3>
          </AnimatedHeading>
          
          <div className="space-y-4 text-blue-50 font-body leading-relaxed text-base md:text-xl">
            <AnimatedParagraph delay={0.1}><p>{text.block3.p1}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.15}><p>{text.block3.p2}</p></AnimatedParagraph>
            <AnimatedParagraph delay={0.2}><p>{text.block3.p3}</p></AnimatedParagraph>
          </div>
        </section>
      </div>

      {/* Final Image - OUTSIDE the constrained container */}
      <motion.section 
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full overflow-hidden">
          <img 
            src="/about/bio-final.webp" 
            alt="Dijana Bošković Portrait" 
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </motion.section>
    </>
  );
}

export default function HomePage() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [splashFullyGone, setSplashFullyGone] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }

    if (typeof window !== 'undefined') {
      const shouldAutoUnmute = sessionStorage.getItem('autoPlayMusic');
      if (shouldAutoUnmute === 'true') {
        setIsVideoMuted(false);
        sessionStorage.removeItem('autoPlayMusic');
      }
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  // Wait for splash exit animation to complete (1.5s) before showing indicator
  useEffect(() => {
    if (splashFinished) {
      const timer = setTimeout(() => {
        setSplashFullyGone(true);
      }, 1500); // Match the exit animation duration
      return () => clearTimeout(timer);
    }
  }, [splashFinished]);

  const toggleVideoMute = () => {
    setIsVideoMuted(prev => !prev);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#223C5E] text-white overflow-x-hidden">
      
      {/* VIDEO MUTE BUTTON */}
      <div className="fixed top-1 right-14 md:top-12 md:right-2 z-[110] pointer-events-auto">
        <button 
          onClick={toggleVideoMute}
          className="text-white/70 hover:text-amber-200 transition-colors p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
          aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
        >
          {isVideoMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>

      <FixedScrollIndicator language={language} splashFinished={splashFullyGone} />
      
      <AnimatePresence>
        {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} language={language} />}
      </AnimatePresence>

      <HeroVideo startPlaying={splashFinished} language={language} isVideoMuted={isVideoMuted} />

      <div className="relative z-10 bg-linear-to-b from-[#111f33] to-[#223C5E] pb-24">
        <BioBlocks language={language} />
        
        <div className="flex justify-center mt-12">
          <a href="/compositions" onClick={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('autoUnmute', 'true');
            }
          }}>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.8)", color: "rgba(251, 191, 36, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border border-white/20 text-white/70 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium bg-[#050B14]/50 backdrop-blur-md rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              {CONTENT[language].button}
            </motion.button>
          </a>
        </div>
      </div>

    </main>
  );
}