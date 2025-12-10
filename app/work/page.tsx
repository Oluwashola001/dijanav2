'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. DATA (Inlined to prevent import errors) ---
export interface Project {
  id: number;
  title: string;
  category: string;
  role: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Roots & Blossoms",
    category: "2014",
    role: "Arrangement & Flutes",
    description: "An extraordinary mixture of folk and classical music. A Sarabande of J.S. Bach meets ancient Serbian-Macedonian folk songs.",
    image: "/works/fruit1.webp",
  },
  {
    id: 2,
    title: "Songs Of Joy",
    category: "2005",
    role: "Flute & Band",
    description: "Modern jazz with sophisticated arrangements. Born from a chance meeting at the Gasteig in 1999.",
    image: "/works/fruit2.webp",
  },
  {
    id: 3,
    title: "Mouse & Monsters",
    category: "2010",
    role: "Musical Direction",
    description: "A mini opera for children exploring mythology. What can a mouse do against a Sphinx or Minotaur?",
    image: "/works/fruit3.webp",
  },
  {
    id: 4,
    title: "Inanna",
    category: "2003",
    role: "Flutes",
    description: "Listening cinema of the Sumerian census 'Inanna's Gang to the Underworld'.",
    image: "/works/fruit4.webp",
  },
  {
    id: 5,
    title: "Encounters",
    category: "2013",
    role: "Artistic Director",
    description: "As artistic director of the Versus Vox Ensemble, Dijana presents works that defy convention.",
    image: "/works/fruit5.webp",
  },
];

// --- 2. COMPONENTS (Inlined to guarantee functionality) ---

// Cinematic Background: Uses simple HTML autoPlay which is robust
function CinematicBackground({ isZoomed = false }: { isZoomed?: boolean }) {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  return (
    <div className="fixed inset-0 w-full h-dvh overflow-hidden bg-black -z-10">
      <div 
        className={`
          relative w-full h-dvh 
          transition-all duration-1500 ease-in-out
          ${isZoomed ? 'scale-125 blur-sm brightness-50' : 'scale-100 blur-0 brightness-100'}
        `}
      >
        {/* Layer 1: Idle Video (Always looping in background) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-dvh object-cover"
        >
          <source src="/videos/hero-tree-idle.webm" type="video/webm" />
          <source src="/videos/hero-tree-idle.mp4" type="video/mp4" />
        </video>

        {/* Layer 2: Intro Video (Plays once then vanishes) */}
        <AnimatePresence>
          {isIntroPlaying && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-10"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={() => setIsIntroPlaying(false)}
                className="w-full h-dvh object-cover"
              >
                <source src="/videos/hero-tree-intro.webm" type="video/webm" />
                <source src="/videos/hero-tree-intro.mp4" type="video/mp4" />
              </video>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-20" />
      </div>
    </div>
  );
}

// Perspective Path: Handles the clickable text nodes
function PerspectivePath({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  const getPositionStyles = (index: number) => {
    switch (index) {
      case 0: return "bottom-[12%] left-1/2 -translate-x-1/2 md:bottom-[10%]"; 
      case 1: return "bottom-[26%] left-[8%] md:bottom-[35%] md:left-[8%]";
      case 2: return "bottom-[26%] right-[8%] md:bottom-[35%] md:right-[8%]";
      case 3: return "bottom-[40%] left-[8%] md:bottom-[65%] md:left-[10%]";
      case 4: return "bottom-[40%] right-[8%] md:bottom-[65%] md:right-[10%]";
      default: return "hidden";
    }
  };

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          onClick={() => onSelectProject(project)}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5 + (index * 0.2) }}
          className={`
            absolute pointer-events-auto cursor-pointer flex flex-col items-center justify-center group
            ${getPositionStyles(index)}
          `}
        >
          {/* Glowing Dot */}
          <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_white] mb-2 group-hover:scale-150 group-hover:shadow-[0_0_20px_#60a5fa] transition-all duration-300" />

          {/* Text Label */}
          <div className="text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="block text-[9px] md:text-[11px] font-bold text-blue-200/80 uppercase tracking-[0.2em] mb-1 group-hover:text-blue-300 transition-colors">
              {project.category}
            </span>
            <h3 className="text-xs md:text-base font-bold text-white tracking-wide group-hover:text-blue-100 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">
              {project.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Project Modal: Displays details when a node is clicked
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />

      {/* The Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ 
          opacity: 1, scale: 1, y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        }}
        exit={{ 
          opacity: 0, scale: 0.95, y: 20, 
          transition: { duration: 0.4, ease: "easeInOut" } 
        }}
        className="relative z-10 w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row max-h-[85vh] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 transition-colors backdrop-blur-md border border-white/10"
        >
          ✕
        </button>

        {/* LEFT: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-900">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80 md:opacity-0 z-10" />
           <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* RIGHT: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">
          <motion.span 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-2"
          >
            {project.category}
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight"
          >
            {project.title}
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-lg text-white/60 italic mb-6 font-light"
          >
            {project.role}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed font-light"
          >
            {project.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// --- 3. MAIN PAGE COMPONENT ---

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isZoomed = selectedProject !== null;

  return (
    <main className="relative w-full h-dvh overflow-hidden text-white">
      <CinematicBackground isZoomed={isZoomed} />

      <div className={`transition-opacity duration-500 ${isZoomed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <PerspectivePath onSelectProject={setSelectedProject} />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="relative z-50 pointer-events-auto">
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}