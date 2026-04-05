'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  section?: string; // optional sub-section header
}

const MENU_DATA: Record<string, MenuItem[]> = {
  entrantes: [
    { name: 'Edamame', description: 'Soja verde japonesa', price: '5,50€' },
    { name: 'Ontama', description: 'Huevo típico japonés a baja temperatura', price: '3,50€' },
    { name: 'Gyoza', description: '6 piezas de empanadilla japonesa', price: '9,00€' },
    { name: 'Kara-age', description: 'Pollo crujiente', price: '11,00€' },
    { name: 'Pincho de hotate', description: 'Pincho de vieira', price: '12,00€' },
    { name: 'Ankimo', description: 'Hígado de rape', price: '12,50€' },
    { name: 'Aburi shime saba', description: 'Caballa a la vinagreta braseada', price: '14,50€' },
    { name: 'Carpaccio de vieira y salmón', description: '', price: '24,00€' },
    { name: 'Carpaccio de vieira, salmón y gambas', description: 'Con gambas de la costa', price: '32,00€' },
    { name: 'Natto', description: 'Soja fermentada', price: '7,20€' },
    { name: 'Sopa de miso', description: '', price: '6,50€' },
    { name: 'Arroz blanco', description: '', price: '5,50€' },
  ],
  nigiri: [
    { section: 'Nigiri にぎり — por unidad', name: 'Salmón', description: '', price: '5,80€/ud' },
    { name: 'Atún', description: '', price: '5,80€/ud' },
    { name: 'Hotate (vieira)', description: '', price: '6,00€/ud' },
    { name: 'Toro', description: 'Ventresca de atún', price: '6,50€/ud' },
    { name: 'Aburi salmón', description: 'Braseado', price: '6,00€/ud' },
    { name: 'Aburi hotate', description: 'Vieira braseada', price: '6,20€/ud' },
    { name: 'Aburi toro', description: 'Ventresca braseada', price: '6,70€/ud' },
    { name: 'Anguila', description: 'Braseada', price: '6,70€/ud' },
    { section: 'Gunkan 軍艦 — por unidad', name: 'Ikura', description: 'Huevas de salmón', price: '6,90€' },
    { name: 'Negi-toro', description: 'Ventresca de atún con cebolleta picada', price: '6,90€' },
  ],
  maki: [
    { section: 'Maki 巻 — 6 piezas', name: 'Salmón', description: '', price: '9,80€' },
    { name: 'Tekka (atún)', description: '', price: '9,80€' },
    { name: 'Atún (3) y salmón (3)', description: '', price: '10,00€' },
    { name: 'Toro', description: 'Ventresca de atún', price: '13,80€' },
    { name: 'Negi-toro', description: 'Ventresca con cebolleta picada', price: '14,00€' },
    { name: 'Kappa (pepino)', description: '', price: '8,50€' },
    { name: 'Aguacate', description: '', price: '9,00€' },
    { name: 'Natto', description: 'Soja fermentada', price: '9,80€' },
    { section: 'Maki 巻 — 8 piezas', name: 'WAKASA', description: 'Anguila, pepino, crema de queso y aguacate con salsa', price: '17,00€' },
    { name: 'California', description: 'Salmón, aguacate, palitos de cangrejo y crema de queso', price: '15,50€' },
  ],
  sashimi: [
    { name: 'Sashimi mixto', description: '', price: '32,00€' },
    { name: '½ Sashimi mixto', description: '', price: '19,50€' },
  ],
  donburi: [
    { name: 'Kaisen-don', description: 'Varios pescados y mariscos frescos sobre arroz', price: '26,00€' },
    { name: 'Tekka-don', description: 'Atún fresco sobre arroz', price: '24,00€' },
    { name: 'Atún yukke-don', description: 'Con ontama catalá-yu', price: '27,00€' },
    { name: 'Aburi salmón ikura-don', description: 'Salmón braseado con huevas de salmón sobre arroz, con catalá-yu', price: '27,00€' },
    { name: 'Una-ju', description: 'Anguila braseada sobre arroz', price: '29,80€' },
    { name: 'Arroz con salsa de curry', description: '', price: '19,50€' },
  ],
  fideos: [
    { name: 'Kimuchi yaki-udon', description: 'Fideos gordos salteados con verduras picantes', price: '16,50€' },
    { name: 'Wakasa udon salteado', description: 'Fideos gordos salteados con verduras y sepia', price: '15,00€' },
    { name: 'Wakasa udon salteado con ontama*', description: 'Con catalá-yu', price: '18,00€' },
    { name: 'Wakasa udon con sopa', description: '', price: '15,00€' },
    { name: 'Wakasa udon con sopa con ontama*', description: 'Con catalá-yu', price: '18,00€' },
    { name: 'Curry Udon', description: '', price: '19,50€' },
    { name: 'Curry Udon con ontama*', description: '', price: '22,00€' },
  ],
  bandejas: [
    { name: 'Aburi tsukushi', description: '4 nigiri braseados: salmón, toro, anguila, hotate', price: '23,00€' },
    { name: 'Toro tsukushi', description: '1 nigiri toro fresco + 3 nigiri braseados diferentes', price: '23,00€' },
  ],
};

const CARD_CONFIG: { category: string; label: string; sublabel: string; image: string }[] = [
  { category: 'entrantes', label: 'Entrantes',      sublabel: 'おつまみ',       image: '/images/food3.png'    },
  { category: 'nigiri',    label: 'Nigiri & Gunkan', sublabel: 'にぎり・軍艦',  image: '/images/food1.png'    },
  { category: 'maki',      label: 'Maki',            sublabel: '巻',             image: '/images/food5.png'    },
  { category: 'sashimi',   label: 'Sashimi',         sublabel: '刺身',           image: '/images/food2.png'    },
  { category: 'donburi',   label: 'Donburi',         sublabel: '丼',             image: '/images/food8.png'    },
  { category: 'fideos',    label: 'Fideos',          sublabel: '麺',             image: '/images/food7.png'    },
  { category: 'bandejas',  label: 'Bandejas',        sublabel: '盛り合わせ',     image: '/images/food4.png'    },
];

function FlipCard({
  category, label, sublabel, image,
}: {
  category: string; label: string; sublabel: string; image: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const items = MENU_DATA[category];
  const cardRef = useRef<HTMLDivElement>(null);
  const hintedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hintedRef.current && window.innerWidth < 768) {
          hintedRef.current = true;
          const t1 = setTimeout(() => setFlipped(true),  600);
          const t2 = setTimeout(() => setFlipped(false), 1800);
          return () => { clearTimeout(t1); clearTimeout(t2); };
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => setFlipped((f) => !f)}
      style={{ width: '280px', height: '520px', cursor: 'pointer', perspective: '1000px', flexShrink: 0 }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: '4px', overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={label}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
            <p
              style={{
                color: 'rgba(245,239,230,0.5)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Toca para ver
            </p>
            <p
              style={{
                color: 'rgba(245,239,230,0.45)',
                fontFamily: 'var(--font-okashi)',
                fontSize: '0.85rem',
                marginBottom: '4px',
              }}
            >
              {sublabel}
            </p>
            <h3
              style={{
                color: '#F5EFE6',
                fontFamily: 'var(--font-okashi)',
                fontSize: '1.6rem',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {label}
            </h3>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '4px', overflow: 'hidden',
            backgroundColor: '#1C1410',
            display: 'flex', flexDirection: 'column',
            padding: '1.25rem',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '0.75rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(245,239,230,0.12)', flexShrink: 0 }}>
            <p style={{ color: 'rgba(245,239,230,0.35)', fontFamily: 'var(--font-okashi)', fontSize: '0.8rem', marginBottom: '2px' }}>
              {sublabel}
            </p>
            <h3
              style={{
                color: '#C0392B',
                fontFamily: 'var(--font-okashi)',
                fontSize: '1.05rem',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              {label}
            </h3>
          </div>

          {/* Scrollable items */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item, i) => (
              <div key={i}>
                {item.section && (
                  <p
                    style={{
                      color: '#B8860B',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginTop: i > 0 ? '6px' : '0',
                      marginBottom: '4px',
                    }}
                  >
                    {item.section}
                  </p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '6px' }}>
                  <span
                    style={{
                      color: '#F5EFE6',
                      fontFamily: 'var(--font-okashi)',
                      fontSize: '14px',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      color: '#B8860B',
                      fontFamily: 'var(--font-okashi)',
                      fontSize: '13px',
                      flexShrink: 0,
                    }}
                  >
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p
                    style={{
                      color: 'rgba(245,239,230,0.45)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '11px',
                      lineHeight: 1.4,
                      marginTop: '1px',
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Close hint */}
          <p
            style={{
              color: 'rgba(245,239,230,0.2)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.58rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            Toca para cerrar
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const { language } = useLanguage();
  const tr = t(language);

  return (
    <section className="texture-dark" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1260px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >

          <h2
            style={{
              fontFamily: 'var(--font-okashi)',
              color: '#F5EFE6',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            {tr.menu.title}
          </h2>
        </motion.div>

        {/* Cards — flexbox, wraps naturally, last row centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
          }}
        >
          {CARD_CONFIG.map(({ category, label, sublabel, image }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <FlipCard category={category} label={label} sublabel={sublabel} image={image} />
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: '3rem',
            color: 'rgba(245,239,230,0.35)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '0.82rem',
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.7,
          }}
        >
          * 10% de IVA incluido. Carta sujeta a disponibilidad de producto fresco.<br />
          Consulte con Taka sobre la salsa especial Catalá-yu.
        </motion.p>
      </div>
    </section>
  );
}
