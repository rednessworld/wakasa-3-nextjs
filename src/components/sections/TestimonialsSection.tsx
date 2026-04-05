'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const REVIEWS = [
  {
    text: 'Uno de los mejores japoneses de Barcelona. Cocina auténtica de Osaka, servicio impecable y un local con muchísima personalidad.',
    name: 'Marc B.',
    stars: 5,
  },
  {
    text: 'Taka explica cada plato con pasión y detalle. Los nigiris son simplemente impresionantes. Una experiencia que no olvidarás.',
    name: 'Sophie L.',
    stars: 5,
  },
  {
    text: 'Un rincón que me recuerda mucho a Japón. Producto fresco, ambiente íntimo y precios muy razonables para la calidad.',
    name: 'Stefania R.',
    stars: 5,
  },
  {
    text: 'Reserva con semanas de antelación, pero vale absolutamente la pena. El mejor japonés que he probado fuera de Japón.',
    name: 'David K.',
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#B8860B">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const tr = t(language);

  return (
    <section
      className="texture-warm py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">

          <h2
            style={{
              fontFamily: 'var(--font-okashi)',
              color: '#1C1410',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.02em',
            }}
          >
            {tr.testimonials.title}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-sm"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 16px rgba(44,24,16,0.06)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Big quotation mark */}
              <div
                aria-hidden
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '5rem',
                  color: '#C0392B',
                  opacity: 0.15,
                  lineHeight: 1,
                  position: 'absolute',
                  top: '1rem',
                  left: '1.5rem',
                  pointerEvents: 'none',
                }}
              >
                "
              </div>

              <div className="relative">
                <Stars count={review.stars} />
                <p
                  className="mt-4 mb-6 italic leading-relaxed"
                  style={{
                    color: '#2C1810',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                  }}
                >
                  {review.text}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-okashi)',
                    color: '#1C1410',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  {review.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google link */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=WAKASA+3.0+Barcelona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              border: '1px solid #1C1410',
              color: '#1C1410',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#1C1410';
              el.style.color = '#F5EFE6';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'transparent';
              el.style.color = '#1C1410';
            }}
          >
            {tr.testimonials.googleLink}
          </a>
        </div>
      </div>
    </section>
  );
}
