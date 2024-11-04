import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { seriesList } from '@/data/series';
import { moviesList } from '@/data/movies';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const allContent = [...seriesList, ...moviesList];
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.synopsis.toLowerCase().includes(query) ||
        item.genres.some(genre => genre.toLowerCase().includes(query))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleItemClick = (item: any) => {
    const type = 'seasons' in item ? 'series' : 'movies';
    navigate(`/${type}/${item.id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>İçerik Ara</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <div className="flex items-center border rounded-lg bg-background px-3">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <Input
              placeholder="Film veya dizi ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
        </div>
        {results.length > 0 && (
          <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.year} • {item.rating} IMDb
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {searchQuery && results.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            Sonuç bulunamadı.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}