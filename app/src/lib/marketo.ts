'use client';

/**
 * Marketo Forms 2.0 integration.
 *
 * We keep our own styled forms as the UI. After successful submission to
 * Supabase, we push the same data to Marketo in the background so marketing
 * gets the lead with full Munchkin tracking (cookies, UTM, referrer).
 *
 * If Marketo fails to load or submit, the lead is still safe in Supabase.
 */

const MARKETO_BASE = '//go.payoneer.com';
const MUNCHKIN_ID = '039-FTK-845';

export const MARKETO_SELLER_FORM_ID = 20090;
// Partner form ID — set this once Dikla provides the second embed code
export const MARKETO_PARTNER_FORM_ID: number | null = null;

interface MktoForm {
  vals: (values: Record<string, string>) => void;
  submit: () => void;
  onSuccess: (callback: () => boolean) => void;
}

interface MktoForms2 {
  loadForm: (
    baseUrl: string,
    munchkinId: string,
    formId: number,
    callback?: (form: MktoForm) => void,
  ) => void;
}

declare global {
  interface Window {
    MktoForms2?: MktoForms2;
  }
}

/**
 * Submit lead data to a Marketo form in the background.
 * Resolves to `true` on success, `false` on failure (never throws).
 * The caller should NOT block on this — fire and forget after Supabase succeeds.
 */
export function submitToMarketo(
  formId: number,
  values: Record<string, string>,
): Promise<boolean> {
  return new Promise((resolve) => {
    const mkto = window.MktoForms2;
    if (!mkto) {
      console.warn('Marketo forms2.js not loaded — skipping Marketo submission');
      resolve(false);
      return;
    }

    const timeout = setTimeout(() => {
      console.warn('Marketo submission timed out');
      resolve(false);
    }, 8000);

    try {
      mkto.loadForm(MARKETO_BASE, MUNCHKIN_ID, formId, (form) => {
        form.vals(values);

        form.onSuccess(() => {
          clearTimeout(timeout);
          resolve(true);
          return false; // prevent Marketo's default redirect
        });

        form.submit();
      });
    } catch (err) {
      clearTimeout(timeout);
      console.warn('Marketo submission error', err);
      resolve(false);
    }
  });
}
