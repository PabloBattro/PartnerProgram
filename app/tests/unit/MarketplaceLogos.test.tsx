import { render, screen } from '@testing-library/react';
import { MarketplaceLogos } from '@/components/MarketplaceLogos';

jest.mock('@/lib/i18n', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      key === 'hero.marketplaces' ? 'Sell on leading LATAM marketplaces' : key,
  }),
}));

describe('MarketplaceLogos', () => {
  it('renders heading and all marketplace logos', () => {
    render(<MarketplaceLogos />);

    expect(
      screen.getByText('Sell on leading LATAM marketplaces')
    ).toBeInTheDocument();

    expect(screen.getByAltText('Amazon')).toBeInTheDocument();
    expect(screen.getByAltText('Mercado Libre')).toBeInTheDocument();
    expect(screen.getByAltText('Walmart')).toBeInTheDocument();
    expect(screen.getByAltText('Linio')).toBeInTheDocument();
  });
});
