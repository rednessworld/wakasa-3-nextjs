'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function LocationSection() {
  const { language } = useLanguage();
  const tr = t(language);
  const loc = tr.location;

  return (
    <section
      className="texture-warm py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>

              <h2
                style={{
                  fontFamily: 'var(--font-okashi)',
                  color: '#1C1410',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {loc.title}
              </h2>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <span style={{ color: '#C0392B', fontSize: '1.2rem', lineHeight: 1.4 }}>
                📍
              </span>
              <div>
                <a
                  href="https://maps.app.goo.gl/URsZBfUAnXBMSw139"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2C1810',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    lineHeight: 1.6,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C0392B')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#2C1810')}
                >
                  {loc.address}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <span style={{ color: '#C0392B', fontSize: '1.2rem', lineHeight: 1.4 }}>
                📞
              </span>
              <a
                href="tel:+34932081866"
                style={{
                  color: '#C0392B',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#B8860B')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#C0392B')}
              >
                +34 932 081 866
              </a>
            </div>

            {/* Metro */}
            <div className="flex gap-4 items-start">
              <span style={{ color: '#C0392B', fontSize: '1.2rem', lineHeight: 1.4 }}>
                🚇
              </span>
              <p
                style={{
                  color: '#2C1810',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                {loc.metro}
              </p>
            </div>

            {/* Parking */}
            <div className="flex gap-4 items-start">
              <span style={{ color: '#C0392B', fontSize: '1.2rem', lineHeight: 1.4 }}>
                🅿️
              </span>
              <p
                style={{
                  color: '#2C1810',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                {loc.parking}
              </p>
            </div>
          </motion.div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d748.1643643995681!2d2.1690317!3d41.4032448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2c19d1fd751%3A0x9d6b7d9d063d31e3!2sTasca%20Japonesa%20WAKASA%203.0!5e0!3m2!1sen!2ses!4v1775393095611!5m2!1sen!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="WAKASA 3.0 — C/ de Nàpols, 287, Barcelona"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
