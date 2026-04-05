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
  const rafRef          = useRef<number>(0);
  const rafScheduled    = useRef<boolean>(false);
  const completeRef     = useRef<boolean>(false);
  const targetProgress  = useRef<number>(0);
  const currentProgress = useRef<number>(0);

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

  const applyFrame = useCallback(() => {
    const p      = currentProgress.current;
    const mobile = isMobile();

    if (bgRef.current)
      bgRef.current.style.filter = `blur(${p * 8}px)`;

    if (containerRef.current) {
      if (mobile) {
        containerRef.current.style.width  = `${85 + p * 10}vw`;
        containerRef.current.style.height = `${45 + p * 20}vh`;
      } else {
        containerRef.current.style.width  = `${30 + p * 60}vw`;
        containerRef.current.style.height = `${40 + p * 50}vh`;
      }
      containerRef.current.style.borderRadius = `${Math.max(0, 12 - p * 12)}px`;
    }

    if (logoRef.current)
      logoRef.current.style.opacity = String(0.85 + p * 0.15);

    if (taglineRef.current) {
      taglineRef.current.style.opacity  = String(Math.min(1, 0.9 + p * 0.1));
      taglineRef.current.style.fontSize = mobile ? '14px' : 'clamp(0.7rem, 1.4vw, 0.95rem)';
    }

    if (ctaRef.current)
      ctaRef.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.3) * 2)));

    if (hintRef.current)
      hintRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
  }, []);

  const tick = useCallback(() => {
    rafScheduled.current = false;

    // Lerp currentProgress toward targetProgress
    currentProgress.current += (targetProgress.current - currentProgress.current) * 0.06;

    // Snap to endpoints
    if (currentProgress.current >= 0.98) currentProgress.current = 1;
    if (currentProgress.current < 0.001) currentProgress.current = 0;

    // Fire completion events
    if (currentProgress.current >= 1 && !completeRef.current) {
      completeRef.current = true;
      window.dispatchEvent(new CustomEvent('heroComplete'));
    } else if (currentProgress.current < 1 && completeRef.current) {
      completeRef.current = false;
      window.dispatchEvent(new CustomEvent('heroReverse'));
    }

    applyFrame();

    // Keep running until settled
    if (Math.abs(targetProgress.current - currentProgress.current) > 0.001) {
      rafScheduled.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [applyFrame]);

  const scheduleTick = useCallback(() => {
    if (!rafScheduled.current) {
      rafScheduled.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    if (typeof history !== 'undefined') history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // scrollProgress = how far through the first 100vh the user has scrolled
      targetProgress.current = Math.min(window.scrollY / window.innerHeight, 1);
      scheduleTick();
    };

    const handleReset = () => {
      targetProgress.current  = 0;
      currentProgress.current = 0;
      completeRef.current     = false;
      window.scrollTo(0, 0);
      applyFrame();
    };

    window.addEventListener('scroll',    handleScroll, { passive: true });
    window.addEventListener('resetHero', handleReset);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll',    handleScroll);
      window.removeEventListener('resetHero', handleReset);
    };
  }, [tick, scheduleTick, applyFrame]);

  const mobile        = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialWidth  = mobile ? '85vw' : '30vw';
  const initialHeight = mobile ? '45vh' : '40vh';

  return (
    // 200vh wrapper — provides the scroll track for the sticky panel
    <div style={{ position: 'relative', height: '200vh' }}>

      {/* Sticky panel — stays pinned for the full 200vh scroll */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Blurred background — hero1.png */}
        <div
          ref={bgRef}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
        >
          <Image
            src="/images/hero1.png"
            alt="WAKASA interior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)' }} />
          {/* Noise texture */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
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
              opacity: 0.85,
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
                opacity: 0.9,
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
    </div>
  );
}
