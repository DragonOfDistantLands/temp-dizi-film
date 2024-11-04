import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";
import SeriesCard from "@/components/SeriesCard";
import Sidebar from "@/components/Sidebar";
import StoryCarousel from "@/components/StoryCarousel";
import { seriesList } from "@/data/series";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = 'latest' | 'downloads' | 'comments' | 'likes';

export default function HomePage() {
  const { t } = useTranslation();
  const [series, setSeries] = useState(seriesList);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const handleSort = (value: SortOption) => {
    setSortBy(value);
    // Burada gerçek API'dan veri çekilecek, şimdilik örnek sıralama:
    const sortedSeries = [...series].sort((a, b) => {
      if (value === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // Diğer sıralama seçenekleri için mock data:
      return Math.random() - 0.5;
    });
    setSeries(sortedSeries);
  };

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Stories Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Öne Çıkanlar</h2>
            <StoryCarousel />
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Series Grid */}
            <div className="lg:col-span-7">
              <div className="flex justify-between items-center mb-6">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <Select
                  value={sortBy}
                  onValueChange={(value) => handleSort(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px] mx-4 bg-background/50 backdrop-blur-sm">
                    <SelectValue placeholder="Sıralama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Son Eklenenler</SelectItem>
                    <SelectItem value="downloads">En Çok İndirilenler</SelectItem>
                    <SelectItem value="comments">En Çok Yorumlananlar</SelectItem>
                    <SelectItem value="likes">En Çok Beğenilenler</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-border via-border to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {series.map((item) => (
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
              
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              )}
              
              {!loading && hasMore && (
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="w-full mt-8 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
                >
                  Daha Fazla
                </button>
              )}
              
              {!hasMore && (
                <p className="text-center text-muted-foreground mt-8">
                  Başka içerik kalmadı!
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}