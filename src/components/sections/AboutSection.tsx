'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function AboutSection() {
  const { language } = useLanguage();
  const tr = t(language);

  return (
    <section
      className="texture-warm py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text column — left on desktop */}
          <motion.div
            className="flex flex-col gap-6 order-2 md:order-1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>

              <h2
                className="mb-3 leading-tight"
                style={{
                  fontFamily: 'var(--font-okashi)',
                  color: '#1C1410',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {tr.about.title}
              </h2>
              <p
                className="italic"
                style={{
                  color: '#B8860B',
                  fontFamily: 'var(--font-okashi)',
                  fontSize: '1.1rem',
                }}
              >
                {tr.about.subtitle}
              </p>
            </div>

            <p
              className="leading-relaxed"
              style={{
                color: '#2C1810',
                lineHeight: 1.8,
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              {tr.about.body1}
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: '#2C1810',
                lineHeight: 1.8,
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              {tr.about.body2}
            </p>
          </motion.div>

          {/* Image column — right on desktop */}
          <div className="relative order-1 md:order-2" style={{ height: '480px' }}>

            {/* Back photo */}
            <motion.div
              className="absolute overflow-hidden shadow-lg"
              style={{
                top: 0,
                left: 0,
                width: '75%',
                height: '75%',
                zIndex: 1,
                transform: 'rotate(-2deg)',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/food5.png"
                alt="Plato en WAKASA 3.0"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Front photo */}
            <motion.div
              className="absolute overflow-hidden shadow-xl"
              style={{
                bottom: 0,
                right: 0,
                width: '65%',
                height: '65%',
                zIndex: 2,
                transform: 'rotate(2deg)',
                border: '4px solid #F5EFE6',
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/food9.png"
                alt="Especialidad WAKASA 3.0"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
