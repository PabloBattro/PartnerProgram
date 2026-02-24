'use client';

import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

const marketplaces = [
  { name: 'Amazon', src: '/logos/amazon.png', width: 130, height: 40 },
  { name: 'Mercado Libre', src: '/logos/mercadolibre.png', width: 140, height: 40 },
  { name: 'Walmart', src: '/logos/walmart.svg', width: 130, height: 36 },
  { name: 'Linio', src: '/logos/linio.svg', width: 90, height: 36 },
];

export function MarketplaceLogos() {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-widest mb-5">
          {t('hero.marketplaces')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {marketplaces.map((mp) => (
            <div
              key={mp.name}
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={mp.src}
                alt={mp.name}
                width={mp.width}
                height={mp.height}
                className="h-7 md:h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
