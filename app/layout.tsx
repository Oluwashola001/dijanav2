import type { Metadata } from "next";
// UNCOMMENT THE LINE BELOW IN YOUR LOCAL PROJECT
import "./globals.css";
// Import Navigation Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dijana Bošković | Composer",
  description: "Portfolio of German-Serbian Composer & Flutist Dijana Bošković",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // REMOVED "scroll-smooth" class to fix the "hanging" sensation
    <html lang="en">
      <head>
        {/* Load Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Kalam:wght@700&display=swap" 
          rel="stylesheet" 
        />
        {/* Manual CSS Variables for Fonts */}
        <style>{`
          :root { 
            --font-geist-sans: 'Geist', sans-serif;
            --font-geist-mono: 'Geist Mono', monospace;
            --font-cormorant: 'Cormorant Garamond', serif;
            background-color: #000000; 
            color: #ffffff; 
          }
          body { margin: 0; padding: 0; overflow-x: hidden; background: #000000; }
          .font-serif { font-family:var(--font-cormorant), serif !important; }
        `}</style>
      </head>
      {/* Added 'relative' to body to support absolute positioning of Nav/Footer if needed */}
      <body className="antialiased min-h-screen relative">
        
        {/* Navigation Bar (Hides automatically on Home) */}
        <Navbar />
        
        {children}
        
        {/* Footer (Hides automatically on Home) */}
        <Footer />
        
      </body>
    </html>
  );
}