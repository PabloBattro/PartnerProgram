export interface SellerSubmissionPayload {
  company: string;
  name: string;
  email: string;
  phone: string | null;
  volume: string;
  latamPresence: string;
  countries: string[];
  partnerTypes: string[];
  timeline: string;
  businessType: string;
  website: string;
}

export interface PartnerSubmissionPayload {
  company: string;
  name: string;
  email: string;
  phone: string | null;
  countries: string[];
  services: string[];
  minSize: string;
  languages: string[];
  credentials: string | null;
  capacity: string;
  website: string;
}

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toTrimmedString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed;
}

function requireNonEmptyString(
  value: unknown,
  fieldName: string,
  maxLength = 200
): ValidationResult<string> {
  const parsed = toTrimmedString(value);
  if (!parsed) return { ok: false, error: `${fieldName} is required` };
  if (parsed.length > maxLength) return { ok: false, error: `${fieldName} is too long` };
  return { ok: true, data: parsed };
}

function optionalString(
  value: unknown,
  fieldName: string,
  maxLength = 500
): ValidationResult<string | null> {
  if (value == null || value === '') return { ok: true, data: null };
  const parsed = toTrimmedString(value);
  if (parsed == null) return { ok: false, error: `${fieldName} must be a string` };
  if (parsed.length > maxLength) return { ok: false, error: `${fieldName} is too long` };
  return { ok: true, data: parsed };
}

function requiredStringArray(
  value: unknown,
  fieldName: string,
  maxItems = 20
): ValidationResult<string[]> {
  if (!Array.isArray(value)) return { ok: false, error: `${fieldName} must be an array` };
  const normalized = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalized.length === 0) return { ok: false, error: `${fieldName} must include at least one value` };
  if (normalized.length > maxItems) return { ok: false, error: `${fieldName} has too many values` };
  return { ok: true, data: normalized };
}

function validateEmail(value: unknown): ValidationResult<string> {
  const parsed = toTrimmedString(value);
  if (!parsed) return { ok: false, error: 'email is required' };
  if (parsed.length > 320 || !EMAIL_REGEX.test(parsed)) {
    return { ok: false, error: 'email is invalid' };
  }
  return { ok: true, data: parsed.toLowerCase() };
}

function validateHoneypot(value: unknown): ValidationResult<string> {
  if (value == null || value === '') return { ok: true, data: '' };
  const parsed = toTrimmedString(value);
  if (parsed == null) return { ok: false, error: 'website must be a string' };
  return { ok: true, data: parsed };
}

export function validateSellerPayload(body: unknown): ValidationResult<SellerSubmissionPayload> {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' };
  const payload = body as Record<string, unknown>;

  const company = requireNonEmptyString(payload.company, 'company');
  if (!company.ok) return company;
  const name = requireNonEmptyString(payload.name, 'name');
  if (!name.ok) return name;
  const email = validateEmail(payload.email);
  if (!email.ok) return email;
  const phone = optionalString(payload.phone, 'phone');
  if (!phone.ok) return phone;
  const volume = requireNonEmptyString(payload.volume, 'volume');
  if (!volume.ok) return volume;
  const latamPresence = requireNonEmptyString(payload.latamPresence, 'latamPresence');
  if (!latamPresence.ok) return latamPresence;
  const countries = requiredStringArray(payload.countries, 'countries');
  if (!countries.ok) return countries;
  const partnerTypes = requiredStringArray(payload.partnerTypes, 'partnerTypes');
  if (!partnerTypes.ok) return partnerTypes;
  const timeline = requireNonEmptyString(payload.timeline, 'timeline');
  if (!timeline.ok) return timeline;
  const businessType = requireNonEmptyString(payload.businessType, 'businessType');
  if (!businessType.ok) return businessType;
  const website = validateHoneypot(payload.website);
  if (!website.ok) return website;

  return {
    ok: true,
    data: {
      company: company.data,
      name: name.data,
      email: email.data,
      phone: phone.data,
      volume: volume.data,
      latamPresence: latamPresence.data,
      countries: countries.data,
      partnerTypes: partnerTypes.data,
      timeline: timeline.data,
      businessType: businessType.data,
      website: website.data,
    },
  };
}

export function validatePartnerPayload(body: unknown): ValidationResult<PartnerSubmissionPayload> {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' };
  const payload = body as Record<string, unknown>;

  const company = requireNonEmptyString(payload.company, 'company');
  if (!company.ok) return company;
  const name = requireNonEmptyString(payload.name, 'name');
  if (!name.ok) return name;
  const email = validateEmail(payload.email);
  if (!email.ok) return email;
  const phone = optionalString(payload.phone, 'phone');
  if (!phone.ok) return phone;
  const countries = requiredStringArray(payload.countries, 'countries');
  if (!countries.ok) return countries;
  const services = requiredStringArray(payload.services, 'services');
  if (!services.ok) return services;
  const minSize = requireNonEmptyString(payload.minSize, 'minSize');
  if (!minSize.ok) return minSize;
  const languages = requiredStringArray(payload.languages, 'languages');
  if (!languages.ok) return languages;
  const credentials = optionalString(payload.credentials, 'credentials', 2000);
  if (!credentials.ok) return credentials;
  const capacity = requireNonEmptyString(payload.capacity, 'capacity');
  if (!capacity.ok) return capacity;
  const website = validateHoneypot(payload.website);
  if (!website.ok) return website;

  return {
    ok: true,
    data: {
      company: company.data,
      name: name.data,
      email: email.data,
      phone: phone.data,
      countries: countries.data,
      services: services.data,
      minSize: minSize.data,
      languages: languages.data,
      credentials: credentials.data,
      capacity: capacity.data,
      website: website.data,
    },
  };
}


