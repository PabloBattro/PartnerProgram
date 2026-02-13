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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/brand/payoneer-logo-onwhite.png"
              alt="Payoneer"
              width={128}
              height={24}
              priority
              className="w-auto h-6"
            />
            <div>
              <p className="text-xs text-slate-500 hidden sm:block">{t('nav.subtitle')}</p>
            </div>
          </div>

          {/* Persona Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => onPersonaChange('seller')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                persona === 'seller'
                  ? 'bg-[#6F3FF5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav.seller')}
            </button>
            <button
              onClick={() => onPersonaChange('partner')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                persona === 'partner'
                  ? 'bg-[#00A5DF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav.partner')}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'zh' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}



