import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { SEOHead } from '@/components/SEOHead';
import Sidebar from '@/components/Sidebar';
import { moviesList } from '@/data/movies';

export default function MoviesPage() {
  const { t } = useTranslation();

  if (!moviesList || moviesList.length === 0) {
    return (
      <>
        <SEOHead 
          title="Efsane Filmler"
          description="En iyi filmleri HD kalitede Türkçe altyazılı olarak indirin."
        />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Henüz film eklenmemiş.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Efsane Filmler"
        description="En iyi filmleri HD kalitede Türkçe altyazılı olarak indirin."
      />
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {moviesList.map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movies/${movie.id}`}
                  className="block transition-transform hover:-translate-y-1 duration-200"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 flex-shrink-0">
                        <AspectRatio ratio={2/3}>
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                                <span className="font-semibold">{movie.rating}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-5 h-5" />
                                <span>{movie.year}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-5 h-5" />
                                <span>{movie.duration}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-3">
                            {movie.synopsis}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                              <Badge key={genre} variant="secondary">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}