import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('renders all sections correctly', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('Tavsiyemiz')).toBeInTheDocument();
    expect(screen.getByText('Haftalık Trendler')).toBeInTheDocument();
    expect(screen.getByText('Son Eklenenler')).toBeInTheDocument();
  });

  it('displays trending items with hashtags', () => {
    renderWithProviders(<Sidebar />);
    
    expect(screen.getByText('#Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('#Game of Thrones')).toBeInTheDocument();
  });

  it('shows recently added items with status', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('Yeni Eklendi')).toBeInTheDocument();
    expect(screen.getByText(/sezon eklendi/i)).toBeInTheDocument();
  });
});