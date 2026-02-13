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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            {t('hero.headline')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            {t('hero.subheadline')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-[#6F3FF5]">{t('hero.stat1')}</div>
              <p className="text-sm text-slate-600 mt-2">{t('hero.stat1Label')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-[#6F3FF5]">{t('hero.stat2')}</div>
              <p className="text-sm text-slate-600 mt-2">{t('hero.stat2Label')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-[#6F3FF5]">{t('hero.stat3')}</div>
              <p className="text-sm text-slate-600 mt-2">{t('hero.stat3Label')}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onPersonaChange('seller')}>
              {t('hero.ctaSeller')}
            </Button>
            <Button variant="outline" size="lg" className="border-[#00A5DF] text-[#00A5DF] hover:bg-[#00A5DF] hover:text-white" onClick={() => onPersonaChange('partner')}>
              {t('hero.ctaPartner')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



