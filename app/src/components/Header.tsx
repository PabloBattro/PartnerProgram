'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import Image from 'next/image';
import type { Persona } from '@/types/persona';

interface HeaderProps {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function Header({ persona, onPersonaChange }: HeaderProps) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Image
              src="/brand/payoneer-logo-onwhite.png"
              alt="Payoneer"
              width={128}
              height={24}
              priority
              className="w-auto h-6"
            />
            <div>
              <p className="text-xs text-slate-500">{t('nav.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            {/* Persona Toggle (Segmented Control) */}
            <div className="inline-flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => onPersonaChange('seller')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F3FF5]/30 ${
                persona === 'seller'
                  ? 'bg-[#6F3FF5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav.seller')}
            </button>
            <button
              onClick={() => onPersonaChange('partner')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F3FF5]/30 ${
                persona === 'partner'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav.partner')}
            </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F3FF5]/30 ${
                language === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F3FF5]/30 ${
                language === 'zh' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              中文
            </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



