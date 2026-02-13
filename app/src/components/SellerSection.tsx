'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Button, Input, Select, MultiSelect, Card } from './ui';

export function SellerSection() {
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
    volume: '',
    latamPresence: '',
    countries: [] as string[],
    partnerTypes: [] as string[],
    timeline: '',
    businessType: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/submit-seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError(t('seller.formError'));
    } finally {
      setSubmitting(false);
    }
  };

  const countryOptions = [
    { value: 'mexico', label: t('seller.mexico') },
    { value: 'brazil', label: t('seller.brazil') },
    { value: 'argentina', label: t('seller.argentina') },
    { value: 'colombia', label: t('seller.colombia') },
  ];

  const partnerTypeOptions = [
    { value: 'legal', label: t('seller.partnerType1') },
    { value: 'tax', label: t('seller.partnerType2') },
    { value: 'logistics', label: t('seller.partnerType3') },
    { value: 'marketing', label: t('seller.partnerType4') },
    { value: 'imports', label: t('seller.partnerType5') },
    { value: 'research', label: t('seller.partnerType6') },
  ];

  return (
    <div className="space-y-20">
      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('seller.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('seller.subtitle')}</p>
        </div>

        {/* Why LATAM */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('seller.whyTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#6F3FF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('seller.why1Title')}</h4>
              <p className="text-sm text-gray-600">{t('seller.why1Desc')}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00A5DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('seller.why2Title')}</h4>
              <p className="text-sm text-gray-600">{t('seller.why2Desc')}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('seller.why3Title')}</h4>
              <p className="text-sm text-gray-600">{t('seller.why3Desc')}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Expansion Journey */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">{t('seller.journeyTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#6F3FF5] text-white rounded-full flex items-center justify-center text-sm font-bold">{i}</div>
                  <h4 className="font-bold text-gray-900">{t(`seller.stage${i}`)}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{t(`seller.stage${i}Desc`)}</p>
                <div className="flex items-start gap-2 bg-red-50 rounded-lg p-3">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.27 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  <p className="text-xs text-red-700">{t(`seller.stage${i}Pain`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">{t('seller.countriesTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['mexico', 'brazil', 'argentina', 'colombia'].map((country) => (
            <Card key={country} className="text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">
                {country === 'mexico' ? '🇲🇽' : country === 'brazil' ? '🇧🇷' : country === 'argentina' ? '🇦🇷' : '🇨🇴'}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t(`seller.${country}`)}</h4>
              <p className="text-sm text-gray-600">{t(`seller.${country}Desc`)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Seller Form */}
      <section className="bg-gray-50 py-16" id="seller-form">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('seller.formTitle')}</h3>

          {submitted ? (
            <Card className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-lg text-green-700 font-medium">{t('seller.formSuccess')}</p>
            </Card>
          ) : (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Input label={t('seller.formCompany')} required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <Input label={t('seller.formName')} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('seller.formEmail')} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input label={t('seller.formPhone')} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <Select
                  label={t('seller.formVolume')}
                  required
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  options={[
                    { value: 'under_10k', label: t('seller.volumeOption1') },
                    { value: '10k_50k', label: t('seller.volumeOption2') },
                    { value: '50k_200k', label: t('seller.volumeOption3') },
                    { value: '200k_1m', label: t('seller.volumeOption4') },
                    { value: 'over_1m', label: t('seller.volumeOption5') },
                  ]}
                />
                <Select
                  label={t('seller.formPresence')}
                  required
                  value={form.latamPresence}
                  onChange={(e) => setForm({ ...form, latamPresence: e.target.value })}
                  options={[
                    { value: 'yes', label: t('seller.presenceYes') },
                    { value: 'no', label: t('seller.presenceNo') },
                  ]}
                />
                <MultiSelect
                  label={t('seller.formCountries')}
                  options={countryOptions}
                  selected={form.countries}
                  onChange={(countries) => setForm({ ...form, countries })}
                />
                <MultiSelect
                  label={t('seller.formPartnerTypes')}
                  options={partnerTypeOptions}
                  selected={form.partnerTypes}
                  onChange={(partnerTypes) => setForm({ ...form, partnerTypes })}
                />
                <Select
                  label={t('seller.formTimeline')}
                  required
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  options={[
                    { value: 'immediately', label: t('seller.timeline1') },
                    { value: 'short_term', label: t('seller.timeline2') },
                    { value: 'medium_term', label: t('seller.timeline3') },
                    { value: 'exploring', label: t('seller.timeline4') },
                  ]}
                />
                <Select
                  label={t('seller.formBusiness')}
                  required
                  value={form.businessType}
                  onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  options={[
                    { value: 'ecommerce', label: t('seller.businessType1') },
                    { value: 'brand', label: t('seller.businessType2') },
                    { value: 'distributor', label: t('seller.businessType3') },
                    { value: 'other', label: t('seller.businessType4') },
                  ]}
                />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? '...' : t('seller.formSubmit')}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}



