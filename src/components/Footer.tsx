'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const NAV_IDS = ['about', 'menu', 'gallery', 'reservations', 'location'] as const;

export default function Footer() {
  const { language } = useLanguage();
  const tr = t(language);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('resetHero'));
  };

  return (
    <footer
      className="texture-dark"
      style={{ borderTop: '3px solid #C0392B' }}
    >
      <div className="max-w-6xl mx-auto py-12 px-6 md:px-16">
        {/* Three column grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogoClick}
              aria-label="WAKASA — volver al inicio"
              style={{
                position: 'relative',
                height: '80px',
                width: '240px',
                display: 'block',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              <Image
                src="/images/WAKASA LOGO.png"
                alt="WAKASA 3.0"
                fill
                className="object-contain object-left"
              />
            </button>
            <p
              className="italic text-sm"
              style={{
                color: 'rgba(245,239,230,0.4)',
                fontFamily: 'var(--font-okashi)',
              }}
            >
              {tr.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: 'rgba(245,239,230,0.25)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              Navegación
            </p>
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-sm text-left transition-colors duration-200"
                style={{
                  color: 'rgba(245,239,230,0.5)',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C0392B')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(245,239,230,0.5)')}
              >
                {tr.nav[id]}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: 'rgba(245,239,230,0.25)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              Contacto
            </p>
            <p
              className="text-sm"
              style={{ color: 'rgba(245,239,230,0.5)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              C/ de Nàpols, 287
              <br />
              08025 Barcelona
            </p>
            <a
              href="tel:+34932081866"
              className="text-sm transition-colors duration-200"
              style={{
                color: 'rgba(245,239,230,0.5)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C0392B')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(245,239,230,0.5)')}
            >
              +34 932 081 866
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 text-center"
          style={{ borderTop: '1px solid rgba(245,239,230,0.08)' }}
        >
          <p
            className="text-xs"
            style={{
              color: 'rgba(245,239,230,0.3)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {tr.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
