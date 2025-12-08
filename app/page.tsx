'use client'; // Essential: This allows us to use State

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';

import CinematicBackground from '@/components/Hero/CinematicBackground';
import PerspectivePath from '@/components/Works/PerspectivePath';
import ProjectModal from '@/components/Works/ProjectModal';

export default function Home() {
  // State: Which project is open?
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derived State: Are we zoomed in? (Yes, if a project is selected)
  const isZoomed = selectedProject !== null;

  return (
    <main className="relative w-full h-dvh overflow-hidden text-white">
      
      {/* 1. Background (Controls Zoom based on state) */}
      <CinematicBackground isZoomed={isZoomed} />

      {/* 2. Text Triggers (Sets the state when clicked) */}
      {/* We hide the triggers when zoomed in for a cleaner look */}
      <div className={`transition-opacity duration-500 ${isZoomed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <PerspectivePath onSelectProject={setSelectedProject} />
      </div>

      {/* 3. The Modal (Controlled by state) */}
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