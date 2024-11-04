import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import SeriesCard from '@/components/SeriesCard';
import { seriesList } from '@/data/series';
import { moviesList } from '@/data/movies';

interface FilterState {
  type: string;
  genre: string;
  rating: number;
  year: string;
}

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Documentary',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
];

const years = Array.from({ length: 2024 - 1970 + 1 }, (_, i) => (2024 - i).toString());

export default function DiscoverPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    genre: 'all',
    rating: 0,
    year: 'all',
  });

  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    let filtered = [...seriesList, ...moviesList];

    if (filters.type !== 'all') {
      filtered = filtered.filter(item => 
        filters.type === 'series' ? 'seasons' in item : !('seasons' in item)
      );
    }

    if (filters.genre !== 'all') {
      filtered = filtered.filter(item =>
        item.genres.includes(filters.genre)
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(item =>
        parseFloat(item.rating) >= filters.rating
      );
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter(item =>
        item.year.includes(filters.year)
      );
    }

    setResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Gelişmiş Arama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">İçerik Türü</label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tür seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="series">Diziler</SelectItem>
                  <SelectItem value="movies">Filmler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Select
                value={filters.genre}
                onValueChange={(value) => setFilters({ ...filters, genre: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minimum IMDb Puanı: {filters.rating}
              </label>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => setFilters({ ...filters, rating: value[0] })}
                max={10}
                step={0.1}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Yıl</label>
              <Select
                value={filters.year}
                onValueChange={(value) => setFilters({ ...filters, year: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Yıl seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="mt-6 w-full md:w-auto"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4 mr-2" />
            Ara
          </Button>
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {results.length} sonuç bulundu
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item) => (
                <SeriesCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  poster={item.poster}
                  rating={item.rating}
                  year={item.year}
                />
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                Arama kriterlerinize uygun sonuç bulunamadı.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}