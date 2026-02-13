'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { Button } from './ui';
import type { Persona } from '@/types/persona';

interface HeroProps {
  onPersonaChange: (persona: Persona) => void;
}

export function Hero({ onPersonaChange }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white text-slate-900 overflow-hidden">
      {/* Soft brand glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-20">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-5 md:mb-6 tracking-tight">
            {t('hero.headline')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 max-w-[65ch] mx-auto">
            {t('hero.subheadline')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-7 sm:mb-8">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-left">
              <div className="text-3xl font-bold text-[#6F3FF5] leading-none">{t('hero.stat1')}</div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t('hero.stat1Label')}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-left">
              <div className="text-3xl font-bold text-[#6F3FF5] leading-none">{t('hero.stat2')}</div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t('hero.stat2Label')}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-left">
              <div className="text-3xl font-bold text-[#6F3FF5] leading-none">{t('hero.stat3')}</div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t('hero.stat3Label')}</p>
            </div>
          </div>

          <a href="#seller-form" className="inline-flex items-center text-sm font-semibold text-slate-700 hover:text-[#6F3FF5] transition-colors mb-6 sm:mb-8">
            Start with your expansion profile
            <span className="ml-2">→</span>
          </a>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => onPersonaChange('seller')}>
              {t('hero.ctaSeller')}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#00A5DF] text-[#00A5DF] hover:bg-[#00A5DF] hover:text-white" onClick={() => onPersonaChange('partner')}>
              {t('hero.ctaPartner')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



