import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders story carousel', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
  });

  it('displays series grid', async () => {
    renderWithProviders(<HomePage />);
    
    await waitFor(() => {
      const seriesCards = screen.getAllByRole('link');
      expect(seriesCards.length).toBeGreaterThan(0);
    });
  });

  it('shows sidebar', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Tavsiyemiz')).toBeInTheDocument();
    expect(screen.getByText('Haftalık Trendler')).toBeInTheDocument();
  });
});