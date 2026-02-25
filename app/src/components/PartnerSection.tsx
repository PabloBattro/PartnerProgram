'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Button, Input, Select, MultiSelect, TextArea, Card } from './ui';
import { EventGallery } from './EventGallery';

export function PartnerSection() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* Form state */
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    countries: [] as string[],
    services: [] as string[],
    minSize: '',
    languages: [] as string[],
    credentials: '',
    capacity: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/submit-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError(t('partner.formError'));
    } finally {
      setSubmitting(false);
    }
  };

  const countryOptions = [
    { value: 'mexico', label: '🇲🇽 Mexico' },
    { value: 'brazil', label: '🇧🇷 Brazil' },
    { value: 'argentina', label: '🇦🇷 Argentina' },
    { value: 'colombia', label: '🇨🇴 Colombia' },
  ];

  const serviceOptions = [
    { value: 'legal', label: t('partner.cat1') },
    { value: 'tax', label: t('partner.cat2') },
    { value: 'logistics', label: t('partner.cat3') },
    { value: 'marketing', label: t('partner.cat4') },
    { value: 'imports', label: t('partner.cat5') },
    { value: 'research', label: t('partner.cat6') },
  ];

  const languageOptions = [
    { value: 'english', label: t('partner.lang1') },
    { value: 'spanish', label: t('partner.lang2') },
    { value: 'portuguese', label: t('partner.lang3') },
    { value: 'chinese', label: t('partner.lang4') },
    { value: 'other', label: t('partner.lang5') },
  ];

  return (
    <div className="space-y-14 md:space-y-20">
      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">{t('partner.title')}</h2>
          <p className="text-lg text-gray-600 max-w-[68ch] mx-auto leading-relaxed">{t('partner.subtitle')}</p>
        </div>

        {/* Why Partner */}
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 text-center mb-8 md:mb-10">{t('partner.whyTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-px">
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#6F3FF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('partner.why1Title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{t('partner.why1Desc')}</p>
            </div>
          </Card>
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-px">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00A5DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('partner.why2Title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{t('partner.why2Desc')}</p>
            </div>
          </Card>
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-px">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('partner.why3Title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{t('partner.why3Desc')}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 text-center mb-8 md:mb-12">{t('partner.howTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-px">
                <div className="w-16 h-16 bg-[#6F3FF5] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i}
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{t(`partner.how${i}`)}</h4>
                <p className="text-gray-600 leading-relaxed">{t(`partner.how${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 text-center mb-10 md:mb-12">{t('partner.categoriesTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:shadow-md transition-all duration-200 hover:-translate-y-px">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#6F3FF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t(`partner.cat${i}`)}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(`partner.cat${i}Desc`)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Gallery — pre-form conversion nudge */}
      <EventGallery persona="partner" variant="compact" />

      {/* Partner Form */}
      <section className="py-12 md:py-16" id="partner-form">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 text-center mb-6 md:mb-8">{t('partner.formTitle')}</h3>

          {submitted ? (
            <Card className="text-center py-10 md:py-12">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-lg text-green-700 font-medium">{t('partner.formSuccess')}</p>
            </Card>
          ) : (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('partner.formCompany')} required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <Input label={t('partner.formName')} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('partner.formEmail')} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input label={t('partner.formPhone')} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <MultiSelect
                  label={t('partner.formCountries')}
                  options={countryOptions}
                  selected={form.countries}
                  onChange={(countries) => setForm({ ...form, countries })}
                />
                <MultiSelect
                  label={t('partner.formServices')}
                  options={serviceOptions}
                  selected={form.services}
                  onChange={(services) => setForm({ ...form, services })}
                />
                <Select
                  label={t('partner.formMinSize')}
                  required
                  value={form.minSize}
                  onChange={(e) => setForm({ ...form, minSize: e.target.value })}
                  options={[
                    { value: 'no_min', label: t('partner.minSize1') },
                    { value: '10k', label: t('partner.minSize2') },
                    { value: '50k', label: t('partner.minSize3') },
                    { value: '200k', label: t('partner.minSize4') },
                  ]}
                />
                <MultiSelect
                  label={t('partner.formLanguages')}
                  options={languageOptions}
                  selected={form.languages}
                  onChange={(languages) => setForm({ ...form, languages })}
                />
                <TextArea
                  label={t('partner.formCredentials')}
                  placeholder={t('partner.credentialsPlaceholder')}
                  value={form.credentials}
                  onChange={(e) => setForm({ ...form, credentials: e.target.value })}
                />
                <Select
                  label={t('partner.formCapacity')}
                  required
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  options={[
                    { value: 'immediately', label: t('partner.capacity1') },
                    { value: 'one_month', label: t('partner.capacity2') },
                    { value: 'limited', label: t('partner.capacity3') },
                  ]}
                />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button type="submit" variant="primary" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? '...' : t('partner.formSubmit')}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}



