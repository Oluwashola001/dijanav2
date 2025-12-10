'use client';

import { motion, Variants } from 'framer-motion';

// This component implements the "Zig-Zag" layout requested (Text+Image, Image+Text).
// It uses the "Cormorant Garamond" font for that Classical Composer vibe.

export default function BioBlocks() {
  
  // FIX: Explicitly type this object as 'Variants' to satisfy TypeScript
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
      
      {/* --- BLOCK 1: The Foundation --- 
          Layout: Text Left, Image Right 
      */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text Side */}
        <div className="order-2 md:order-1 space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            The Foundation
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              <strong className="text-white font-normal">German-Serbian Composer & Flutist.</strong> Born in Belgrade, Dijana Bošković was recognized early for her extraordinary musical talent, receiving the <span className="text-amber-200">October Prize of the City of Belgrade</span> and multiple first prizes at national competitions.
            </p>
            <p>
              She studied flute in Belgrade and at the University of Music in Munich with Prof. Paul Meisen, earning both the Artistic Diploma and Master Class certification. As a versatile musician, Dijana performed as a soloist, in orchestras and chamber ensembles.
            </p>
            <p className="italic text-white/60 text-base border-l border-amber-500/30 pl-4 mt-4">
              "Renowned festivals including the Schleswig-Holstein Music Festival, the BEMUS Festival in Belgrade, and the Hohenloher Kultursommer."
            </p>
          </div>
        </div>

        {/* Image Side */}
        <div className="order-1 md:order-2 relative group">
           <div className="absolute inset-0 bg-amber-500/10 blur-2xl -z-10 group-hover:bg-amber-500/20 transition-all duration-700" />
           {/* FIX: Changed aspect-[4/5] to aspect-4/5 to fix Tailwind warning */}
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img 
               src="/about/block1.jpg" 
               alt="Dijana Performing" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
             />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>
      </motion.section>


      {/* --- BLOCK 2: Versus Vox & Studies --- 
          Layout: Image Left, Text Right (Zig-Zag)
      */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Image Side */}
        <div className="order-1 relative group">
           <div className="absolute inset-0 bg-blue-500/10 blur-2xl -z-10 group-hover:bg-blue-500/20 transition-all duration-700" />
           {/* FIX: Changed aspect-[4/5] to aspect-4/5 */}
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img 
               src="/about/block2.jpg" 
               alt="Versus Vox Ensemble" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
             />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>

        {/* Text Side */}
        <div className="order-2 space-y-6">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            Versus Vox
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              Collaborations with the Kammerphilharmonie Bremen and the Bamberger Solisten, along with jazz performances in venues such as the Münchner Unterfahrt, shaped her multifaceted musical voice.
            </p>
            <p>
              In 2005, she founded the <strong className="text-white font-normal">Versus Vox Ensemble</strong> in Munich, which she has led ever since, blending her own compositions with works by other contemporary and historical composers into vibrant musical experiences.
            </p>
            <p>
               Her compositional studies with Prof. Manfred Stahnke and Prof. Fredrik Schwenk culminated in the orchestral project “ONE”, premiered by the Symphonikern Hamburg.
            </p>
          </div>
        </div>
      </motion.section>


      {/* --- BLOCK 3: Recognition --- 
          Layout: Text Left, Image Right 
      */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text Side */}
        <div className="order-2 md:order-1 space-y-6 text-right md:text-left">
           <h3 className="font-serif text-3xl md:text-4xl text-amber-100/90 italic mb-4">
            Recognition & Awards
          </h3>
          <div className="space-y-4 text-blue-50/80 font-light leading-relaxed text-lg">
            <p>
              Her compositions span solo instruments, chamber music, orchestra, choir, voice, and theater. The chamber orchestra work <span className="text-white font-serif italic">“Concerto for Strings”</span> has been broadcast on leading European radio stations.
            </p>
            <p>
              For “Lichtspiele”, she received support from the Ernst von Siemens Art Foundation and the Gerhard Trede Foundation.
            </p>
            <div className="mt-6 p-6 border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm rounded-sm">
              <p className="text-amber-200 font-serif text-xl italic text-center">
                "1st Prize at the International Choral Music Competition 2017"
              </p>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="order-1 md:order-2 relative group">
           <div className="absolute inset-0 bg-amber-500/10 blur-2xl -z-10 group-hover:bg-amber-500/20 transition-all duration-700" />
           {/* FIX: Changed aspect-[4/5] to aspect-4/5 */}
           <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-gray-900">
             <img 
               src="/about/block3.jpg" 
               alt="Award Ceremony" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
             />
             <div className="absolute inset-0 bg-[#050B14]/20 mix-blend-multiply" />
           </div>
        </div>
      </motion.section>

    </div>
  );
}