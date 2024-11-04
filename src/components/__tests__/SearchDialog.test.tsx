import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import { SearchDialog } from '../SearchDialog';

describe('SearchDialog', () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    mockOnOpenChange.mockClear();
  });

  it('renders search input when open', () => {
    renderWithProviders(
      <SearchDialog open={true} onOpenChange={mockOnOpenChange} />
    );

    expect(screen.getByPlaceholderText(/film veya dizi ara/i)).toBeInTheDocument();
  });

  it('filters content based on search query', async () => {
    renderWithProviders(
      <SearchDialog open={true} onOpenChange={mockOnOpenChange} />
    );

    const searchInput = screen.getByPlaceholderText(/film veya dizi ara/i);
    fireEvent.change(searchInput, { target: { value: 'break' } });

    await waitFor(() => {
      expect(screen.getByText(/Breaking Bad/i)).toBeInTheDocument();
    });
  });

  it('shows no results message when no matches found', async () => {
    renderWithProviders(
      <SearchDialog open={true} onOpenChange={mockOnOpenChange} />
    );

    const searchInput = screen.getByPlaceholderText(/film veya dizi ara/i);
    fireEvent.change(searchInput, { target: { value: 'xyzabc' } });

    await waitFor(() => {
      expect(screen.getByText(/sonuç bulunamadı/i)).toBeInTheDocument();
    });
  });
});