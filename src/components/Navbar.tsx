'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import type { Language } from '@/context/LanguageContext';

const NAV_IDS = ['about', 'menu', 'gallery', 'reservations', 'location'] as const;

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const tr = t(language);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('resetHero'));
    setMenuOpen(false);
  };

  const languages: Language[] = ['es', 'en', 'cat'];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? '#1C1410' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          minHeight: '80px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="relative flex-shrink-0"
            aria-label="WAKASA — volver al inicio"
            style={{ height: '80px', width: '220px', border: 'none', outline: 'none', background: 'none' }}
          >
            <Image
              src="/images/WAKASA LOGO.png"
              alt="WAKASA 3.0"
              fill
              className="object-contain object-left"
              priority
              style={{ border: 'none', outline: 'none' }}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="uppercase transition-colors duration-300"
                style={{
                  color: '#F5EFE6',
                  fontFamily: 'var(--font-okashi)',
                  letterSpacing: '0.15em',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = '#C0392B')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = '#F5EFE6')
                }
              >
                {tr.nav[id]}
              </button>
            ))}
          </div>

          {/* Language switcher + hamburger */}
          <div className="flex items-center gap-4">
            {/* Language switcher — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {languages.map((lang, i) => (
                <span key={lang} className="flex items-center gap-1">
                  <button
                    onClick={() => setLanguage(lang)}
                    className="text-xs tracking-wider uppercase transition-colors duration-200"
                    style={{
                      color:
                        language === lang ? '#B8860B' : 'rgba(245,239,230,0.5)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontWeight: language === lang ? '600' : '400',
                    }}
                  >
                    {lang}
                  </button>
                  {i < languages.length - 1 && (
                    <span style={{ color: 'rgba(245,239,230,0.2)', fontSize: '0.6rem' }}>
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Hamburger — always solid bg */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded"
              style={{ backgroundColor: '#1C1410' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span
                className="block h-0.5 w-5 bg-[#F5EFE6] transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
              />
              <span
                className="block h-0.5 w-5 bg-[#F5EFE6] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 bg-[#F5EFE6] transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ backgroundColor: '#1C1410' }}
        >
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-2xl tracking-widest uppercase"
              style={{
                color: '#F5EFE6',
                fontFamily: 'var(--font-okashi)',
              }}
            >
              {tr.nav[id]}
            </button>
          ))}
          <div className="flex items-center gap-3 mt-6">
            {languages.map((lang, i) => (
              <span key={lang} className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(lang)}
                  className="text-sm tracking-wider uppercase"
                  style={{
                    color: language === lang ? '#B8860B' : 'rgba(245,239,230,0.4)',
                    fontWeight: language === lang ? '600' : '400',
                  }}
                >
                  {lang}
                </button>
                {i < languages.length - 1 && (
                  <span style={{ color: 'rgba(245,239,230,0.2)' }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
