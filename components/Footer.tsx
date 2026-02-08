'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();

  // Smart Hiding Logic
  if (pathname === '/' || pathname === '/compositions') {
    return null;
  }

  return (
    <footer className="w-full bg-[#223C5E] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-white/90 font-serif text-lg tracking-wider mb-4 uppercase">Contact</h3>
            <div className="text-white/60 text-sm leading-relaxed space-y-2">
              <p className="font-bold text-white/80">Dijana Bošković</p>
              <p>Sibeliusstr. 25<br />81245 München</p>
              <p className="pt-2">Mobile: <a href="tel:+491734724882" className="hover:text-amber-200 transition-colors">+49 173 4724882</a></p>
              <p>Email: <a href="mailto:mail@dijana-boskovic.com" className="hover:text-amber-200 transition-colors">mail@dijana-boskovic.com</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white/90 font-serif text-lg tracking-wider mb-4 uppercase">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-white/60 hover:text-amber-200 transition-colors">Biography</Link>
              <Link href="/news" className="text-white/60 hover:text-amber-200 transition-colors">News</Link>
              <Link href="/compositions/works" className="text-white/60 hover:text-amber-200 transition-colors">Compositions</Link>
              <Link href="/press" className="text-white/60 hover:text-amber-200 transition-colors">Press</Link>
              <Link href="/media" className="text-white/60 hover:text-amber-200 transition-colors">Media</Link>
            </nav>
          </div>

          {/* Credits */}
          <div className="text-center md:text-left">
            <h3 className="text-white/90 font-serif text-lg tracking-wider mb-4 uppercase">Credits</h3>
            <div className="text-white/60 text-sm leading-relaxed">
              <p className="text-white/70 font-semibold mb-2">Photography</p>
              <p className="text-xs leading-relaxed">
                <a href="http://www.sabine-klem.de/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Sabine Klem</a>, {' '}
                <a href="http://alois-schuetz.de/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Alois Schütz</a>, {' '}
                <a href="http://www.andreashenn.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Andreas Henn</a>, {' '}
                Jan Roeder, Dragan Bosnic, {' '}
                <a href="http://evbphoto.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Eric van den Brulle</a>, {' '}
                Siggi Mueller
              </p>
            </div>
          </div>

        </div>

        {/* Legal Notice */}
        <div className="border-t border-white/10 pt-8">
          <details className="text-white/50 text-xs leading-relaxed max-w-4xl mx-auto">
            <summary className="cursor-pointer hover:text-white/70 transition-colors text-center mb-4 uppercase tracking-wider">
              Liability & Copyright
            </summary>
            <p className="text-justify px-4 md:px-0">
              No responsibility or liability is assumed for the content of offers to which a link is possible and which do not originate from Dijana Bošković. All data - in particular the databases - of this website enjoy copyright protection in accordance with § 4 and § 87 a ff UrhG. Editing or copying is only permitted to the extent that this is necessary for access to the databases or for their normal use. Any further processing, duplication, distribution and/or public reproduction, in particular unauthorised transfer to an intranet offer, exceeds the normal exploitation of the databases and constitutes a copyright infringement.
            </p>
          </details>
        </div>

        {/* Copyright Bar */}
        <div className="text-center text-white/40 text-xs tracking-widest mt-8 pt-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} DIJANA BOŠKOVIĆ. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}