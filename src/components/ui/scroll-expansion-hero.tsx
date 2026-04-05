'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function ScrollExpansionHero() {
  const { language } = useLanguage();
  const tr = t(language);

  // DOM refs
  const bgRef        = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLImageElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const hintRef      = useRef<HTMLDivElement>(null);

  // Animation state — refs only, never useState
  const progressRef  = useRef<number>(0);
  const rafRef       = useRef<number>(0);
  const completeRef  = useRef<boolean>(false);
  const touchLastRef = useRef<number>(0);
  const velocityRef  = useRef<number>(0);

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

  const applyFrame = useCallback(() => {
    const p = progressRef.current;
    const mobile = isMobile();

    if (bgRef.current)
      bgRef.current.style.filter = `blur(${p * 8}px)`;

    if (containerRef.current) {
      if (mobile) {
        // Mobile: start wide, expand to near-full
        containerRef.current.style.width        = `${85 + p * 10}vw`;
        containerRef.current.style.height       = `${45 + p * 20}vh`;
      } else {
        // Desktop
        containerRef.current.style.width        = `${30 + p * 60}vw`;
        containerRef.current.style.height       = `${40 + p * 50}vh`;
      }
      containerRef.current.style.borderRadius = `${Math.max(0, 12 - p * 12)}px`;
    }

    if (logoRef.current)
      logoRef.current.style.opacity = String(0.3 + p * 0.7);

    if (taglineRef.current) {
      taglineRef.current.style.opacity  = String(Math.min(1, 0.3 + p * 0.7));
      taglineRef.current.style.fontSize = mobile ? '14px' : 'clamp(0.7rem, 1.4vw, 0.95rem)';
    }

    if (ctaRef.current)
      ctaRef.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.3) * 2)));

    if (hintRef.current)
      hintRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
  }, []);

  const tick = useCallback(() => {
    applyFrame();
    rafRef.current = requestAnimationFrame(tick);
  }, [applyFrame]);

  const advance = useCallback((delta: number) => {
    const next = clamp01(progressRef.current + delta);
    progressRef.current = next;

    if (next >= 1 && !completeRef.current) {
      completeRef.current = true;
      window.dispatchEvent(new CustomEvent('heroComplete'));
    } else if (next < 1 && completeRef.current) {
      completeRef.current = false;
      window.dispatchEvent(new CustomEvent('heroReverse'));
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (progressRef.current < 1) {
      e.preventDefault();
      advance(e.deltaY * 0.002);
      return;
    }
    if (e.deltaY < 0 && window.scrollY <= 0) {
      e.preventDefault();
      advance(e.deltaY * 0.002);
    }
  }, [advance]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchLastRef.current = e.touches[0].clientY;
    velocityRef.current  = 0;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const y     = e.touches[0].clientY;
    const delta = (touchLastRef.current - y) * 0.004;

    if (!completeRef.current) {
      // Allow pull-to-refresh: if at progress 0 and pulling down, don't intercept
      if (progressRef.current === 0 && delta < 0) {
        touchLastRef.current = y;
        return;
      }
      e.preventDefault();
      velocityRef.current  = delta;
      touchLastRef.current = y;
      advance(delta);
      return;
    }
    if (delta < 0 && window.scrollY <= 0) {
      e.preventDefault();
      velocityRef.current  = delta;
      touchLastRef.current = y;
      advance(delta);
    }
  }, [advance]);

  const handleTouchEnd = useCallback(() => {
    if (completeRef.current) return;
    const decay = () => {
      if (Math.abs(velocityRef.current) < 0.0002 || completeRef.current) return;
      velocityRef.current *= 0.94;
      advance(velocityRef.current);
      requestAnimationFrame(decay);
    };
    decay();
  }, [advance]);

  const handleReset = useCallback(() => {
    progressRef.current = 0;
    completeRef.current = false;
    window.scrollTo(0, 0);
    applyFrame();
  }, [applyFrame]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof history !== 'undefined') history.scrollRestoration = 'manual';

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('wheel',      handleWheel,      { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    window.addEventListener('touchend',   handleTouchEnd,   { passive: true  });
    window.addEventListener('resetHero',  handleReset);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('wheel',      handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
      window.removeEventListener('resetHero',  handleReset);
    };
  }, [tick, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleReset]);

  // Set correct initial size based on viewport
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialWidth  = mobile ? '85vw' : '30vw';
  const initialHeight = mobile ? '45vh' : '40vh';

  return (
    <>
      {/* ── Full-screen fixed hero panel ── */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        {/* Blurred background — hero1.png */}
        <div
          ref={bgRef}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/hero1.png"
            alt="WAKASA interior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)' }} />
          {/* Noise texture over hero */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Expanding center container — CSS background, no child image ── */}
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: initialWidth,
            height: initialHeight,
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 2,
            backgroundImage: 'url("/images/dessert3.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
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
              opacity: 0.3,
              zIndex: 2,
            }}
          />

          {/* Tagline + CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 2,
              padding: '0 1.5rem',
              textAlign: 'center',
            }}
          >
            <div
              ref={taglineRef}
              style={{
                color: '#F5EFE6',
                fontFamily: 'var(--font-okashi)',
                fontSize: mobile ? '14px' : 'clamp(0.7rem, 1.4vw, 0.95rem)',
                letterSpacing: '0.12em',
                opacity: 0.3,
                lineHeight: 1.5,
              }}
            >
              {tr.hero.tagline}
            </div>
            <div ref={ctaRef} style={{ opacity: 0 }}>
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
            opacity: 1,
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
          <svg
            width="14" height="22"
            viewBox="0 0 14 22"
            fill="none"
            style={{
              color: 'rgba(245,239,230,0.4)',
              animation: 'bounce 2s ease-in-out infinite',
            }}
          >
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            <polyline points="2,10 7,18 12,10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* 100vh spacer — pushes page content below viewport */}
      <div style={{ height: '100vh', pointerEvents: 'none' }} />
    </>
  );
}
