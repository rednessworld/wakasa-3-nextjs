'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollExpansionHero from '@/components/ui/scroll-expansion-hero';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import GallerySection from '@/components/sections/GallerySection';
import ReservationsSection from '@/components/sections/ReservationsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LocationSection from '@/components/sections/LocationSection';

export default function Home() {
  const [heroComplete, setHeroComplete] = useState(false);

  useEffect(() => {
    const onComplete = () => setHeroComplete(true);
    const onReverse  = () => setHeroComplete(false);
    const onReset    = () => { setHeroComplete(false); };

    window.addEventListener('heroComplete', onComplete);
    window.addEventListener('heroReverse',  onReverse);
    window.addEventListener('resetHero',    onReset);

    return () => {
      window.removeEventListener('heroComplete', onComplete);
      window.removeEventListener('heroReverse',  onReverse);
      window.removeEventListener('resetHero',    onReset);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero — fixed panel + 100vh spacer */}
      <div id="home" style={{ background: 'transparent' }}>
        <ScrollExpansionHero />
      </div>

      {/* Main content — fades in once hero expansion completes */}
      <main
        id="main-content"
        style={{
          position: 'relative',
          opacity: heroComplete ? 1 : 0,
          transition: 'opacity 1.2s ease',
          pointerEvents: heroComplete ? 'auto' : 'none',
        }}
      >
        <section id="about">
          <AboutSection />
        </section>
        <section id="menu">
          <MenuSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="reservations">
          <ReservationsSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="location">
          <LocationSection />
        </section>
        <Footer />
      </main>
    </>
  );
}
