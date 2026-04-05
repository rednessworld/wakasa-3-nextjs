'use client';

import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const HOURS = [
  { day: 'Lunes', hours: null },
  { day: 'Martes–Jueves', hours: '20:00 – 23:30' },
  { day: 'Viernes', hours: '13:30–15:30 · 20:00–23:30' },
  { day: 'Sábado', hours: '13:30–15:30 · 20:00–23:30' },
  { day: 'Domingo', hours: null },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function ReservationsSection() {
  const { language } = useLanguage();
  const tr = t(language);
  const res = tr.reservations;

  return (
    <section
      className="texture-dark py-32 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto">
        {/* Label */}

        {/* Title */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-okashi)',
            color: '#F5EFE6',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          }}
          className="mb-6"
        >
          {res.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 mx-auto"
          style={{
            color: 'rgba(245,239,230,0.6)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}
        >
          {res.subtitle}
        </motion.p>

        {/* Phone */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4"
        >
          <a
            href="tel:+34932081866"
            style={{
              fontFamily: 'var(--font-okashi)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#C0392B',
              display: 'block',
              transition: 'color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#B8860B')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#C0392B')}
          >
            +34 932 081 866
          </a>
        </motion.div>

        {/* Phone label + WhatsApp */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <p
            style={{
              color: 'rgba(245,239,230,0.5)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.875rem',
            }}
          >
            {res.phoneLabel} · {res.whatsapp}
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
          style={{ borderTop: '1px solid rgba(245,239,230,0.1)' }}
        />

        {/* Hours */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-6 text-center"
            style={{ color: 'rgba(245,239,230,0.4)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            {res.hoursTitle}
          </p>
          <div className="max-w-sm mx-auto">
            {HOURS.map(({ day, hours }) => (
              <div
                key={day}
                className="flex justify-between py-3"
                style={{ borderBottom: '1px solid rgba(245,239,230,0.08)' }}
              >
                <span
                  style={{
                    color: 'rgba(245,239,230,0.5)',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '0.9rem',
                  }}
                >
                  {day}
                </span>
                <span
                  style={{
                    color: hours ? '#F5EFE6' : 'rgba(245,239,230,0.25)',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '0.9rem',
                  }}
                >
                  {hours ?? 'Cerrado'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
