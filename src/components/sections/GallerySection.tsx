'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const GALLERY_IMAGES = [
  { src: '/images/food1.png',    alt: 'Plato japonés' },
  { src: '/images/food2.png',    alt: 'Plato japonés' },
  { src: '/images/food3.png',    alt: 'Nigiri' },
  { src: '/images/food4.png',    alt: 'Plato japonés' },
  { src: '/images/food5.png',    alt: 'Maki' },
  { src: '/images/food6.png',    alt: 'Plato japonés' },
  { src: '/images/food7.png',    alt: 'Cocina japonesa' },
  { src: '/images/food8.png',    alt: 'Plato japonés' },
  { src: '/images/food9.png',    alt: 'Especialidad de la casa' },
  { src: '/images/food10.png',   alt: 'Plato japonés' },
  { src: '/images/drink2.png',   alt: 'Bebida japonesa' },
  { src: '/images/food11.png',   alt: 'Plato japonés' },
  { src: '/images/food12.png',   alt: 'Plato japonés' },
  { src: '/images/food13.png',   alt: 'Plato japonés' },
  { src: '/images/food14.png',   alt: 'Plato japonés' },
  { src: '/images/food15.png',   alt: 'Plato japonés' },
  { src: '/images/food16.png',   alt: 'Plato japonés' },
  { src: '/images/dessert1.png', alt: 'Postre japonés' },
  { src: '/images/dessert2.png', alt: 'Postre japonés' },
  { src: '/images/dessert3.png', alt: 'Postre japonés' },
  { src: '/images/dessert4.png', alt: 'Postre japonés' },
];

const CAPTIONS = [
  'Ontama', 'Nigiris', 'Karaage', 'Donburi', 'Wakasa-maki', 'Sashimi',
  'Gyoza', 'Aburi', 'Carpaccio', 'Unagi', 'Hotate', 'Ikura',
  'Toro', 'Edamame', 'Mochi', 'Sake', 'Ontama', 'Nigiris',
  'Karaage', 'Donburi', 'Wakasa-maki',
];

const ROTATIONS = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2];

// Alternating aspect ratios for visual rhythm in the masonry
const ASPECTS = ['4/3', '3/4', '1/1', '3/4', '4/3', '1/1', '4/3', '3/4'];

function Polaroid({
  img,
  caption,
  rotation,
  index,
  onClick,
}: {
  img: { src: string; alt: string };
  caption: string;
  rotation: number;
  index: number;
  onClick: () => void;
}) {
  const aspect = ASPECTS[index % ASPECTS.length];

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      style={{
        backgroundColor: '#fff',
        padding: '8px 8px 32px 8px',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        display: 'inline-block',
        width: '100%',
        transition: 'box-shadow 0.3s ease',
        willChange: 'transform',
      }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).closest?.('.polaroid-wrap')?.setAttribute('style',
          'box-shadow: 4px 8px 24px rgba(0,0,0,0.4)');
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden' }}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
      </div>
      {/* Caption */}
      <p style={{
        fontFamily: 'var(--font-okashi)',
        fontSize: '11px',
        color: '#555',
        textAlign: 'center',
        marginTop: '10px',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {caption}
      </p>
    </motion.div>
  );
}

export default function GallerySection() {
  const { language } = useLanguage();
  const tr = t(language);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() =>
    setLightboxIndex((i) => i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null), []);
  const goNext = useCallback(() =>
    setLightboxIndex((i) => i !== null ? (i + 1) % GALLERY_IMAGES.length : null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  // Split into 3 columns for desktop masonry
  const col1 = GALLERY_IMAGES.filter((_, i) => i % 3 === 0);
  const col2 = GALLERY_IMAGES.filter((_, i) => i % 3 === 1);
  const col3 = GALLERY_IMAGES.filter((_, i) => i % 3 === 2);

  return (
    <section className="texture-dark py-24 px-4 md:px-16" style={{ overflow: 'hidden' }}>
      <style>{`
        .polaroid-col { display: flex; flex-direction: column; gap: 8px; }
        @media (max-width: 767px) {
          .polaroid-desktop { display: none !important; }
          .polaroid-mobile  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .polaroid-desktop { display: flex !important; }
          .polaroid-mobile  { display: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <h2 style={{
            fontFamily: 'var(--font-okashi)',
            color: '#F5EFE6',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.02em',
          }}>
            {tr.gallery.title}
          </h2>
        </div>

        {/* ── DESKTOP: 3-column masonry ── */}
        <div
          className="polaroid-desktop"
          style={{ gap: '8px', alignItems: 'flex-start' }}
        >
          {[col1, col2, col3].map((col, colIdx) => (
            <div key={colIdx} className="polaroid-col" style={{ flex: 1 }}>
              {col.map((img, colItemIdx) => {
                const i = GALLERY_IMAGES.indexOf(img);
                return (
                  <div key={img.src} style={{ marginTop: colItemIdx % 2 !== 0 ? '-20px' : '0px' }}>
                    <Polaroid
                      img={img}
                      caption={CAPTIONS[i]}
                      rotation={ROTATIONS[i % 8]}
                      index={i}
                      onClick={() => setLightboxIndex(i)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── MOBILE: 2-column with slight overlap ── */}
        <div
          className="polaroid-mobile"
          style={{
            display: 'none',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              style={{
                width: 'calc(50% - 2px)',
                marginTop: i % 2 !== 0 ? '-20px' : '0px',
              }}
            >
              <Polaroid
                img={img}
                caption={CAPTIONS[i]}
                rotation={ROTATIONS[i % 8]}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                width={1200}
                height={900}
                className="object-contain"
                style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
              />
            </motion.div>

            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox} aria-label="Cerrar">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <line x1="6" y1="6" x2="26" y2="26" stroke="currentColor" strokeWidth="2" />
                <line x1="26" y1="6" x2="6" y2="26" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Anterior">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polyline points="20,4 8,16 20,28" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Siguiente">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polyline points="12,4 24,16 12,28" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
