'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function ScrollExpansionHero() {
  const { language } = useLanguage();
  const tr = t(language);

  // DOM refs
  const panelRef     = useRef<HTMLDivElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLImageElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const hintRef      = useRef<HTMLDivElement>(null);

  // Animation state
  const displayRef    = useRef(0);
  const rafRef        = useRef(0);
  const completeRef   = useRef(false);

  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.75), 1);
      displayRef.current += (scrollProgress - displayRef.current) * 0.08;

      const d      = displayRef.current;
      const mobile = window.innerWidth < 768;

      // Background blur
      if (bgRef.current)
        bgRef.current.style.filter = `blur(${d * 10}px)`;

      // Center container sizing
      if (containerRef.current) {
        const w = mobile ? (82 + d * 13) : (35 + d * 50);
        const h = mobile ? (55 + d * 17) : (55 + d * 20);
        containerRef.current.style.width        = `${w}vw`;
        containerRef.current.style.height       = `${h}vh`;
        containerRef.current.style.borderRadius = `${Math.max(0, 12 - d * 12)}px`;
      }

      // Logo
      if (logoRef.current)
        logoRef.current.style.opacity = String(0.7 + d * 0.3);

      // Tagline
      if (taglineRef.current)
        taglineRef.current.style.opacity = String(Math.min(1, 0.7 + d * 0.3));

      // CTA button
      if (ctaRef.current)
        ctaRef.current.style.opacity = String(Math.min(1, Math.max(0, (d - 0.4) * 2.5)));

      // Scroll hint
      if (hintRef.current)
        hintRef.current.style.opacity = String(Math.max(0, 1 - d * 4));

      // Fade out fixed panel as user scrolls past the hero section
      if (panelRef.current) {
        const fadeStart = window.innerHeight * 0.85;
        const fadeEnd   = window.innerHeight * 1.05;
        const scrollY   = window.scrollY;
        const opacity   = scrollY >= fadeEnd   ? 0
                        : scrollY >= fadeStart ? 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
                        : 1;
        panelRef.current.style.opacity       = String(opacity);
        panelRef.current.style.pointerEvents = scrollY >= fadeEnd ? 'none' : 'auto';
      }

      // heroComplete event for page content fade-in
      if (d >= 0.98 && !completeRef.current) {
        completeRef.current = true;
        window.dispatchEvent(new CustomEvent('heroComplete'));
      } else if (d < 0.98 && completeRef.current) {
        completeRef.current = false;
        window.dispatchEvent(new CustomEvent('heroReverse'));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Fixed fullscreen panel */}
      <div ref={panelRef} style={{ position: 'fixed', inset: 0, zIndex: 10, overflow: 'hidden' }}>

        {/* Background — hero1.png with blur */}
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero1.png"
            alt="WAKASA interior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Expanding center container */}
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '35vw',
            height: '55vh',
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 2,
            backgroundColor: '#111',
          }}
        >
          {/* Hero image — fills container exactly like a video would */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero2.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoRef}
            src="/images/WAKASA LOGO.png"
            alt="WAKASA 3.0"
            style={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '680px',
              maxWidth: '90%',
              objectFit: 'contain',
              display: 'block',
              opacity: 0.7,
              zIndex: 2,
            }}
          />

          {/* Tagline + CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: 0, right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 3,
              padding: '0 1.5rem',
              textAlign: 'center',
              background: 'transparent',
              backgroundColor: 'transparent',
            }}
          >
            <div
              ref={taglineRef}
              style={{
                color: '#F5EFE6',
                fontFamily: 'var(--font-okashi)',
                fontSize: 'clamp(0.65rem, 1.4vw, 0.95rem)',
                letterSpacing: '0.12em',
                opacity: 0.7,
                lineHeight: 1.5,
                background: 'transparent',
                backgroundColor: 'transparent',
              }}
            >
              {tr.hero.tagline}
            </div>

            <div ref={ctaRef} style={{ opacity: 0, background: 'transparent' }}>
              <a
                href="tel:+34932081866"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#C0392B',
                  color: 'white',
                  padding: '10px 28px',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  textDecoration: 'none',
                }}
              >
                {tr.hero.cta}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}
        >
          <span
            style={{
              color: 'rgba(245,239,230,0.55)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {tr.hero.scrollHint}
          </span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none"
            style={{ color: 'rgba(245,239,230,0.4)', animation: 'bounce 2s ease-in-out infinite' }}
          >
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            <polyline points="2,10 7,18 12,10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* Spacer — pushes page content below viewport */}
      <div style={{ height: '100vh', background: 'transparent', pointerEvents: 'none' }} />
    </>
  );
}
