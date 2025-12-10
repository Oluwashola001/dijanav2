'use client';

import { useEffect, useState } from 'react';

// This component creates the "King's Blue" atmosphere requested by the client.
// It is reusable for both the About page and the future Work page updates.

export default function StarryBackground() {
  // We use state to ensure stars are generated on the client only (prevents hydration mismatch)
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; opacity: number; duration: string }[]>([]);

  useEffect(() => {
    const starCount = 70; // Enough to look starry, not enough to look like "Star Wars"
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '3px' : '2px', // Varied sizes
      opacity: Math.random() * 0.5 + 0.1, // Subtle opacity
      duration: `${Math.random() * 3 + 3}s`, // Varied twinkling speed (3s to 6s)
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#050B14]">
      {/* 1. The "King's Blue" Gradient Base */}
      {/* Deep Royal Blue fading into black at the bottom for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0e1c3d] via-[#050B14] to-[#000000]" />

      {/* 2. Golden/warm glow from the top (as requested for the "Tree" vibe) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. The Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}