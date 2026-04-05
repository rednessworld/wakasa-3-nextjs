'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

// Explicit bento grid positions — 3-column, 260px base row height
// col: gridColumn value, row: gridRow value
const GRID_POSITIONS = [
  { col: '1',          row: '1 / span 2' }, // tall
  { col: '2',          row: '1' },
  { col: '3',          row: '1' },
  { col: '2 / span 2', row: '2' },          // wide
  { col: '1 / span 2', row: '3' },          // wide
  { col: '3',          row: '3 / span 2' }, // tall
  { col: '1',          row: '4' },
  { col: '2',          row: '4' },
  { col: '1',          row: '5' },
  { col: '2 / span 2', row: '5 / span 2' }, // featured large
  { col: '1',          row: '6' },
  { col: '1 / span 2', row: '7' },          // wide
  { col: '3',          row: '7 / span 2' }, // tall
  { col: '1',          row: '8' },
  { col: '2',          row: '8' },
  { col: '1',          row: '9 / span 2' }, // tall
  { col: '2',          row: '9' },
  { col: '3',          row: '9' },
  { col: '2 / span 2', row: '10' },         // wide
  { col: '1 / span 2', row: '11' },         // wide
  { col: '3',          row: '11' },
];

function TiltCard({
  img,
  index,
  gridCol,
  gridRow,
  onClick,
}: {
  img: { src: string; alt: string };
  index: number;
  gridCol: string;
  gridRow: string;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      style={{
        gridColumn: gridCol,
        gridRow,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
      }}
      className="bento-card"
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Glare */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-end p-4"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        }} />
        <span style={{
          position: 'relative',
          color: 'rgba(245,239,230,0.85)',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Ver foto
        </span>
      </motion.div>
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

  return (
    <section
      className="texture-warm py-24 px-6 md:px-16"
      style={{ overflow: 'hidden', isolation: 'isolate' }}
    >
      {/* Responsive override: collapse bento to 2-col auto grid on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
          }
          .bento-card {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <h2 style={{
            fontFamily: 'var(--font-okashi)',
            color: '#1C1410',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.02em',
          }}>
            {tr.gallery.title}
          </h2>
        </div>

        {/* Bento grid */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '260px',
            gap: '10px',
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <TiltCard
              key={img.src}
              img={img}
              index={i}
              gridCol={GRID_POSITIONS[i].col}
              gridRow={GRID_POSITIONS[i].row}
              onClick={() => setLightboxIndex(i)}
            />
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
