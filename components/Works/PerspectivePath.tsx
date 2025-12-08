'use client';

import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface PerspectivePathProps {
  onSelectProject: (project: Project) => void;
}

export default function PerspectivePath({ onSelectProject }: PerspectivePathProps) {
  
  const getPositionStyles = (index: number) => {
    switch (index) {
      // 1. Center Base (Entrance) - Unchanged
      case 0: return "bottom-[12%] left-1/2 -translate-x-1/2 md:bottom-[10%]"; 
      
      // 2. Mid Left
      // Mobile: Moved inward to 8% (was 2%) for breathing room
      case 1: return "bottom-[26%] left-[8%] md:bottom-[35%] md:left-[8%]";
      
      // 3. Mid Right
      // Mobile: Moved inward to 8%
      case 2: return "bottom-[26%] right-[8%] md:bottom-[35%] md:right-[8%]";
      
      // 4. Top Left
      // Mobile: Moved inward to 8%
      case 3: return "bottom-[40%] left-[8%] md:bottom-[65%] md:left-[10%]";
      
      // 5. Top Right
      // Mobile: Moved inward to 8%
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
          transition={{ duration: 1.5, delay: 3.5 + (index * 0.5) }}

          className={`
            absolute 
            pointer-events-auto cursor-pointer
            flex flex-col items-center justify-center
            group
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