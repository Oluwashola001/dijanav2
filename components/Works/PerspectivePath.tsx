'use client';

import { motion } from 'framer-motion';

// --- DATA ---
export interface Project {
  id: number;
  title: string;
  category: string;
  role: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
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

interface PerspectivePathProps {
  onSelectProject: (project: Project) => void;
}

export default function PerspectivePath({ onSelectProject }: PerspectivePathProps) {
  
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
            absolute 
            pointer-events-auto cursor-pointer
            flex flex-col items-center justify-center
            group
            ${getPositionStyles(index)}
          `}
        >
          <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_white] mb-2 group-hover:scale-150 group-hover:shadow-[0_0_20px_#60a5fa] transition-all duration-300" />
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