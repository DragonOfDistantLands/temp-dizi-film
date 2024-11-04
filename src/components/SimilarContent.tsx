import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star } from 'lucide-react';
import { seriesList } from '@/data/series';
import { moviesList } from '@/data/movies';

interface SimilarContentProps {
  currentId: string;
  type: 'series' | 'movies';
}

export default function SimilarContent({ currentId, type }: SimilarContentProps) {
  const contentList = type === 'series' ? seriesList : moviesList;
  const similarContent = contentList
    .filter(item => item.id !== currentId)
    .slice(0, 5); // Ensure exactly 5 items

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Bunları da Sevebilirsin</h2>
      <div className="grid grid-cols-5 gap-4">
        {similarContent.map((item) => (
          <Link 
            key={item.id} 
            to={`/${type}/${item.id}`}
            className="block transition-transform hover:-translate-y-1 duration-200"
          >
            <Card className="overflow-hidden">
              <AspectRatio ratio={2/3}>
                <img
                  src={item.poster}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">{item.year}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}