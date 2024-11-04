import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';

interface SeriesCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number | string;
  year: string;
}

export default function SeriesCard({ id, title, poster, rating, year }: SeriesCardProps) {
  return (
    <Link to={`/series/${id}`} className="series-card block">
      <div className="rounded-lg overflow-hidden bg-card border border-border/50">
        <AspectRatio ratio={2/3}>
          <img
            src={poster}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
        <div className="p-3">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          <div className="flex items-center justify-between mt-1 text-muted-foreground text-sm">
            <span>{year}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}