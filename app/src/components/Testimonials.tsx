'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';

const TESTIMONIAL_COUNT = 3;

export function Testimonials() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const testimonials = Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      quote: t(`testimonials.quote${n}`),
      name: t(`testimonials.name${n}`),
      role: t(`testimonials.role${n}`),
      company: t(`testimonials.company${n}`),
      type: t(`testimonials.type${n}`) as 'seller' | 'partner',
    };
  });

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
    const next = Math.min(active + 1, TESTIMONIAL_COUNT - 1);
    setActive(next);
    scrollToIndex(next);
  };

  const goPrev = () => {
    const prev = Math.max(active - 1, 0);
    setActive(prev);
    scrollToIndex(prev);
  };

  const initials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const avatarColors = ['bg-[#6F3FF5]', 'bg-[#00A5DF]', 'bg-emerald-500'];

  return (
    <section className="py-14 md:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
            {t('testimonials.title')}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-[58ch] mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Arrow buttons — visible on md only, hidden on lg+ where all cards are visible */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="hidden md:flex lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-30 cursor-pointer"
            disabled={active === 0}
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="hidden md:flex lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-30 cursor-pointer"
            disabled={active === TESTIMONIAL_COUNT - 1}
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, idx) => (
              <article
                key={item.id}
                className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)] bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col transition-all duration-200 hover:shadow-md"
              >
                {/* Quote icon */}
                <svg className="w-8 h-8 text-[#6F3FF5]/20 mb-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.199 0-2.344-.611-2.917-1.179zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C20.591 11.69 22 13.166 22 15c0 1.933-1.567 3.5-3.5 3.5-1.199 0-2.344-.611-2.917-1.179z" />
                </svg>

                {/* Quote text — <strong> tags from i18n render key metrics in bold */}
                <blockquote
                  className="text-slate-700 leading-relaxed text-[15px] flex-1 mb-6 [&_strong]:font-semibold [&_strong]:text-slate-900"
                  dangerouslySetInnerHTML={{ __html: `\u201c${item.quote}\u201d` }}
                />

                {/* Person */}
                <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-11 h-11 ${avatarColors[idx % avatarColors.length]} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5`}
                  >
                    {initials(item.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${
                          item.type === 'seller'
                            ? 'bg-violet-100 text-[#6F3FF5]'
                            : 'bg-cyan-100 text-[#008FBE]'
                        }`}
                      >
                        {item.type === 'seller'
                          ? t('testimonials.badgeSeller')
                          : t('testimonials.badgePartner')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots — only on mobile/tablet where scrolling is needed */}
        <div className="flex items-center justify-center gap-2 mt-6 lg:hidden">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActive(idx);
                scrollToIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`rounded-full transition-all duration-200 cursor-pointer p-2 ${
                idx === active
                  ? 'w-6 h-2 bg-[#6F3FF5] p-0'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400 p-0'
              }`}
              style={{ padding: 0, boxSizing: 'content-box', border: '8px solid transparent' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
