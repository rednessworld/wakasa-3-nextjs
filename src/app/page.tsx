'use client';

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
  return (
    <>
      <Navbar />

      <div id="home">
        <ScrollExpansionHero />
      </div>

      <main id="main-content">
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
