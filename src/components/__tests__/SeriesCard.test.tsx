import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import SeriesCard from '../SeriesCard';

describe('SeriesCard', () => {
  const mockProps = {
    id: 'test-series',
    title: 'Test Series',
    poster: 'test-poster.jpg',
    rating: '9.5',
    year: '2024',
  };

  it('renders series information correctly', () => {
    renderWithProviders(<SeriesCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.year)).toBeInTheDocument();
    expect(screen.getByText(mockProps.rating)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute('src', mockProps.poster);
  });

  it('links to the correct series detail page', () => {
    renderWithProviders(<SeriesCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/series/${mockProps.id}`);
  });
});