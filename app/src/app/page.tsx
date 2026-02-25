'use client';

import React, { useState, useRef } from 'react';
import { I18nProvider } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SellerSection } from '@/components/SellerSection';
import { PartnerSection } from '@/components/PartnerSection';
import { Footer } from '@/components/Footer';
import { MarketplaceLogos } from '@/components/MarketplaceLogos';
import { EventGallery } from '@/components/EventGallery';
import type { Persona } from '@/types/persona';

function HomePage() {
  const [persona, setPersona] = useState<Persona>('seller');
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
    /* Scroll to content section when persona changes via CTA buttons */
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header persona={persona} onPersonaChange={setPersona} />
      <Hero onPersonaChange={handlePersonaChange} />
      <MarketplaceLogos />
      <EventGallery persona={persona} />

      {/* Persona Content */}
      <div ref={contentRef}>
        {persona === 'seller' ? <SellerSection /> : <PartnerSection />}
      </div>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <I18nProvider>
      <HomePage />
    </I18nProvider>
  );
}
