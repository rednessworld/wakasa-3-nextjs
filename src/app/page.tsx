'use client';

import { useEffect, useRef } from 'react';
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
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!mainRef.current) return;
      // Hero fade ends at 0.95vh — flip main to visible at the same threshold.
      // No CSS transition: instant sync with hero reaching opacity 0.
      mainRef.current.style.opacity = window.scrollY >= window.innerHeight * 0.95 ? '1' : '0';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero — fixed panel (z-25) + 100vh spacer */}
      <div id="home" style={{ margin: 0, padding: 0 }}>
        <ScrollExpansionHero />
      </div>

      {/* Main content — hidden while hero is fading, revealed instantly when hero is gone */}
      <main
        ref={mainRef}
        id="main-content"
        style={{ position: 'relative', zIndex: 1, opacity: 0 }}
      >
        <section id="about" style={{ paddingTop: 0, marginTop: 0 }}>
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
