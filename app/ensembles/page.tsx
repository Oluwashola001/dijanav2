'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    pageTitle: "Versus Vox",
    nav: [
      { id: "about", label: "About the Ensemble" },
      { id: "projects", label: "Selected Projects" },
    ],
    paragraphs: [
      <>
        The <strong>Versus Vox Ensemble</strong>, founded in 2000 by <strong>Dijana Bošković</strong>, performs in flexible formations ranging from duo to nonet. At the core of its artistic work lies an ongoing engagement with modern music and a close dialogue with contemporary composers. Within the ensemble’s programs, original compositions meet works of the present and selected repertoire from music history, creating multifaceted musical experiences that often open toward interdisciplinary perspectives.
      </>,
      <>
        A particular focus of the ensemble lies in thematically conceived concert projects, in which music enters into dialogue with diverse forms of artistic expression. From this interaction emerges a shared language that reaches beyond the purely musical and gives shape to the conceptual ideas behind the programs.
      </>,
      <>
        The ensemble has appeared in international intercultural festivals and has also contributed to numerous music projects in Munich.
      </>
    ],
    projectsTitle: "Selected Projects with the Versus Vox Ensemble",
    projects: [
      { title: "ENCOUNTERS – Germany & Serbia", href: "/begegnung", isYoutube: false },
      { title: "Between East and West", href: "/ouw", isYoutube: false },
      { title: "Emigré’s Waltz", href: "https://www.youtube.com/watch?v=qK4EA-K2VO4", isYoutube: true, isExternal: true },
      { title: "Mouse and Monsters", href: "https://www.youtube.com/watch?v=jwJk7OrQymQ", isYoutube: true, isExternal: true },
      { title: "Abteilung 13: Darstellende Kunst", href: "https://www.youtube.com/watch?v=hcPTU9stKtc", isYoutube: true, isExternal: true },
      { title: "Play of Light", href: "https://www.youtube.com/watch?v=7_ST90Cz-CI", isYoutube: true, isExternal: true }
    ],
    imageCredits: {
      img1: "©Siggi Mueller",
      img3: "©Andreas Henn"
    }
  },
  de: {
    pageTitle: "Versus Vox",
    nav: [
      { id: "about", label: "Über das Ensemble" },
      { id: "projects", label: "Ausgewählte Projekte" },
    ],
    paragraphs: [
      <>
        Das <strong>Versus Vox Ensemble</strong>, gegründet im Jahr 2000 von <strong>Dijana Bošković</strong>, tritt in variablen Besetzungen vom Duo bis zum Nonett auf. Im Mittelpunkt seiner Arbeit steht die lebendige Auseinandersetzung mit der Musik der Moderne sowie der intensive Dialog mit zeitgenössischen Komponistinnen und Komponisten. In den Programmen des Ensembles begegnen sich eigene Kompositionen, Werke der Gegenwart und ausgewählte Positionen der Musikgeschichte und verbinden sich zu vielschichtigen musikalischen Erfahrungsräumen, die häufig auch interdisziplinäre Perspektiven einbeziehen.
      </>,
      <>
        Ein besonderer Fokus liegt auf thematisch konzipierten Konzertprojekten, in denen Musik mit unterschiedlichen künstlerischen Ausdrucksformen in Beziehung tritt. Aus diesem Dialog entsteht eine gemeinsame Sprache, die über das rein Musikalische hinausweist und die inhaltliche Idee der Programme erfahrbar macht.
      </>,
      <>
        Mit seinen Projekten war das Ensemble bei internationalen interkulturellen Festivals vertreten und prägte darüber hinaus zahlreiche Musikprojekte in München.
      </>
    ],
    projectsTitle: "Einige Projekte mit dem Versus Vox Ensemble:",
    projects: [
      { title: "Begegnungen Deutschland-Serbien", href: "/begegnung", isYoutube: false },
      { title: "Zwischen Ost und West", href: "/ouw", isYoutube: false },
      { title: "Emigre`s Waltz", href: "/ew", isYoutube: false },
      { title: "Maus und Monster", href: "/mm", isYoutube: false },
      { title: "Abteilung 13 Darstellende Kunst", href: "https://www.youtube.com/watch?v=hcPTU9stKtc", isYoutube: true, isExternal: true },
      { title: "Play of Light", href: "/pol", isYoutube: false }
    ],
    imageCredits: {
      img1: "©Siggi Mueller",
      img3: "©Andreas Henn"
    }
  }
};

// --- SCROLL REVEAL COMPONENT ---
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function VersusVoxPage() {
  const [language, setLanguage] = useState<Language>('en');

  // Read Language Setting
  useEffect(() => {
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
    <main 
      className="w-full min-h-screen text-[#172F4F] selection:bg-[#172F4F] selection:text-white relative"
      style={{ backgroundColor: '#CCCCCC' }}
    >
      
      {/* BACKGROUND IMAGE - Fixed and Full Coverage */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
            backgroundImage: "url('/images/vv_bg_test2.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
        }}
      />

      {/* --- MOBILE TOP NAV --- */}
      <div className="lg:hidden w-full flex flex-col pt-6 relative z-10">
        <div className="px-4 pb-2 w-full"></div>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER - CENTERED --- */}
      <div className="relative z-10 max-w-[950px] mx-auto px-4 md:px-8 pb-20 pt-0 md:pt-0">
        
        {/* EXPANDED #CCCCCC BACKGROUND CONTAINER */}
        <div className="bg-[#CCCCCC]/95 backdrop-blur-sm px-4 md:px-12 py-8 md:py-12 shadow-2xl border-t-4 border-[#172F4F]">
          
          <div className="space-y-12 md:space-y-16">

            {/* 1. ABOUT SECTION */}
            <section id="about" className="scroll-mt-32">
              
              {/* PAGE TITLE */}
              <ScrollReveal delay={0}>
                <div className="mb-10 text-center">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#172F4F] tracking-wide">
                    {currentContent.pageTitle}
                  </h1>
                  <div className="h-px w-24 bg-[#172F4F] mx-auto opacity-30 mt-4"></div>
                </div>
              </ScrollReveal>

              {/* PARAGRAPH 1 */}
              <ScrollReveal delay={0.1}>
                <p className="font-body text-sm md:text-base leading-relaxed text-[#172F4F] mb-6 md:mb-8 text-left break-words">
                  {currentContent.paragraphs[0]}
                </p>
              </ScrollReveal>

              {/* DUAL IMAGES 1 */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <ScrollReveal delay={0.1}>
                    <img 
                      src="/images/ensemble_1a.webp" 
                      alt="Versus Vox Ensemble Performance" 
                      className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                    />
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <img 
                      src="/images/ensemble_1b.webp" 
                      alt="Versus Vox Ensemble Detail" 
                      className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                    />
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.3}>
                  <p className="text-[10px] text-[#172F4F]/70 mt-2 text-right font-body">
                    {currentContent.imageCredits.img1}
                  </p>
                </ScrollReveal>
              </div>

              {/* PARAGRAPHS 2 & 3 */}
              <ScrollReveal delay={0.1}>
                <div className="space-y-4 md:space-y-5 mb-8">
                  <p className="font-body text-sm md:text-base leading-relaxed text-[#172F4F] text-left break-words">
                    {currentContent.paragraphs[1]}
                  </p>
                  <p className="font-body text-sm md:text-base leading-relaxed text-[#172F4F] text-left break-words">
                    {currentContent.paragraphs[2]}
                  </p>
                </div>
              </ScrollReveal>

              {/* DUAL IMAGES 2 */}
              <div className="mb-8 md:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <ScrollReveal delay={0.1}>
                    <img 
                      src="/images/ensemble_2a.webp" 
                      alt="Versus Vox Ensemble Members" 
                      className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                    />
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <img 
                      src="/images/ensemble_2b.webp" 
                      alt="Versus Vox Ensemble Members Alt" 
                      className="w-full aspect-[4/3] object-cover shadow-md border border-[#172F4F]/20"
                    />
                  </ScrollReveal>
                </div>
              </div>
            </section>

            {/* 2. PROJECTS SECTION */}
            <section id="projects" className="scroll-mt-32">
              
              <ScrollReveal delay={0.1}>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#172F4F] mb-6 border-b border-[#172F4F]/20 pb-2">
                  {currentContent.projectsTitle}
                </h3>
              </ScrollReveal>
              
              <ul className="space-y-3 md:space-y-4 font-body text-sm md:text-base mb-10 md:mb-12 break-words">
                {currentContent.projects.map((project, index) => (
                  <ScrollReveal delay={0.1 + (index * 0.05)} key={index}>
                    <li className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#172F4F]/10 pb-4 last:border-0 last:pb-0">
                      
                      {/* Project Title / Link */}
                      <div className="flex items-start md:items-center gap-3 flex-1">
                        <span className="text-[#47719E] mt-0.5 md:mt-0">•</span>
                        {project.isYoutube ? (
                          <span className="text-[#172F4F] font-semibold">{project.title}</span>
                        ) : (
                          <a 
                            href={project.href}
                            className="text-[#172F4F] hover:text-[#47719E] font-semibold underline decoration-[#172F4F]/30 underline-offset-4 transition-colors"
                          >
                            {project.title}
                          </a>
                        )}
                      </div>

                      {/* YouTube Button Overlay */}
                      {project.isYoutube && (
                        <a 
                          href={project.href} 
                          target={project.isExternal ? "_blank" : "_self"} 
                          rel={project.isExternal ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-body font-bold uppercase tracking-wider rounded transition-colors self-start md:self-auto whitespace-nowrap shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                          </svg>
                          YouTube
                        </a>
                      )}
                    </li>
                  </ScrollReveal>
                ))}
              </ul>

              {/* SINGLE IMAGE 3 */}
              <ScrollReveal delay={0.2}>
                <div className="mt-8">
                  <img 
                    src="/images/ensemble_3a.webp" 
                    alt="Versus Vox Ensemble Abstract" 
                    className="w-full h-auto shadow-md border border-[#172F4F]/20"
                  />
                  <p className="text-[10px] text-[#172F4F]/70 mt-2 text-right font-body">
                    {currentContent.imageCredits.img3}
                  </p>
                </div>
              </ScrollReveal>

            </section>

          </div>
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
      `}</style>
    </main>
  );
}