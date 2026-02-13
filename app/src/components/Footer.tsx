'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import Image from 'next/image';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#111827] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/brand/payoneer-logo-white.png"
              alt="Payoneer"
              width={128}
              height={24}
              className="w-auto h-6"
            />
            <span className="text-sm">• {t('nav.subtitle')}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="https://www.payoneer.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="https://www.payoneer.com/legal/terms-conditions/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-slate-500 text-center max-w-3xl mx-auto">
          {t('footer.disclaimer')}
        </p>

        <p className="mt-4 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Payoneer Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}



