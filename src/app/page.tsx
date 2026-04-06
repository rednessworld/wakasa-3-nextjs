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

      {/* Hero — fixed panel (z-25) + 100vh spacer */}
      <div id="home" style={{ margin: 0, padding: 0 }}>
        <ScrollExpansionHero />
      </div>

      {/* Main content — sits below hero (z-1); hero fades out naturally revealing it */}
      <main
        id="main-content"
        style={{ position: 'relative', zIndex: 1 }}
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
