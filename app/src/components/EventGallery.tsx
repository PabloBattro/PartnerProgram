'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import type { Persona } from '@/types/persona';

interface EventGalleryProps {
  persona: Persona;
  /** "full" = single hero photo (shared strip), "compact" = 3-photo carousel (pre-form nudge) */
  variant?: 'full' | 'compact';
}

const HERO_PHOTO = { src: '/events/summit-panel.jpg', altKey: 'eventGallery.altPanel' };

const CAROUSEL_PHOTOS = [
  { src: '/events/summit-enviopack.jpg', altKey: 'eventGallery.altEnviopack' },
  { src: '/events/summit-tally.jpg', altKey: 'eventGallery.altTally' },
  { src: '/events/summit-snowball.jpg', altKey: 'eventGallery.altSnowball' },
] as const;

function EventBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide text-white/80 mb-4">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {label}
    </div>
  );
}

/**
 * Full variant: single hero photo with headline overlay — used as the shared strip after MarketplaceLogos.
 * Compact variant: 3-photo carousel with persona-specific copy — used as pre-form nudge inside persona sections.
 */
export function EventGallery({ persona, variant = 'full' }: EventGalleryProps) {
  const { t } = useTranslation();

  if (variant === 'full') {
    return <HeroStrip t={t} />;
  }

  return <PhotoCarousel persona={persona} t={t} />;
}

/* ── Full variant: single hero image ── */

function HeroStrip({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Hero photo with overlay */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] lg:aspect-[4/1]">
        <Image
          src={HERO_PHOTO.src}
          alt={t(HERO_PHOTO.altKey)}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_70%]"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-10 md:pb-14 px-4 sm:px-6 lg:px-8">
          <EventBadge label={t('eventGallery.eventLabel')} />
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-center">
            {t('eventGallery.title')}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-[58ch] mx-auto leading-relaxed text-center">
            {t('eventGallery.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Compact variant: 3-photo carousel ── */

function PhotoCarousel({ persona, t }: { persona: Persona; t: (key: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const photos = CAROUSEL_PHOTOS;

  const title = t(persona === 'seller' ? 'eventGallery.sellerTitle' : 'eventGallery.partnerTitle');
  const subtitle = t(persona === 'seller' ? 'eventGallery.sellerSubtitle' : 'eventGallery.partnerSubtitle');

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Array.from(container.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const goNext = () => {
    const next = Math.min(active + 1, photos.length - 1);
    setActive(next);
    scrollToIndex(next);
  };

  const goPrev = () => {
    const prev = Math.max(active - 1, 0);
    setActive(prev);
    scrollToIndex(prev);
  };

  return (
    <section className="py-10 md:py-14 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <EventBadge label={t('eventGallery.eventLabel')} />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-[62ch] mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrow buttons — visible on md only, hidden on lg+ where all 3 cards fit */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="hidden md:flex lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 disabled:opacity-30 cursor-pointer"
            disabled={active === 0}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="hidden md:flex lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 disabled:opacity-30 cursor-pointer"
            disabled={active === photos.length - 1}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photos.map((photo, idx) => (
              <div
                key={photo.src}
                className="snap-center shrink-0 w-[80vw] sm:w-[65vw] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-[16/10] bg-slate-800">
                  <Image
                    src={photo.src}
                    alt={t(photo.altKey)}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Photo counter */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[11px] font-medium text-white/90">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {idx + 1}/{photos.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots — only on mobile/tablet where scrolling is needed */}
        <div className="flex items-center justify-center gap-2 mt-6 lg:hidden">
          {photos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActive(idx);
                scrollToIndex(idx);
              }}
              aria-label={`Go to photo ${idx + 1}`}
              className={`rounded-full transition-all duration-200 cursor-pointer ${
                idx === active
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              style={{ padding: 0, boxSizing: 'content-box', border: '8px solid transparent' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
