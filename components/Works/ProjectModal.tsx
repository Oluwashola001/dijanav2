'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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
           <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent opacity-80 md:opacity-0" />
        </div>

        {/* RIGHT: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">
          {/* Year / Category */}
          <motion.span 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-2"
          >
            {project.category}
          </motion.span>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight"
          >
            {project.title}
          </motion.h2>

          {/* Role (New Field) */}
          <motion.h3
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-lg text-white/60 italic mb-6 font-light"
          >
            {project.role}
          </motion.h3>
          
          {/* Description */}
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