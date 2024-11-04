import { useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { seriesList } from "@/data/series";
import Sidebar from "@/components/Sidebar";
import { AdminProfile } from "@/components/AdminProfile";
import SimilarContent from "@/components/SimilarContent";
import { DownloadAccordion } from "@/components/DownloadAccordion";
import { Comments } from "@/components/Comments";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SeriesDetail() {
  const { id } = useParams();
  const series = seriesList.find(s => s.id === id);

  if (!series) {
    return (
      <>
        <SEOHead
          title="Dizi Bulunamadı"
          description="İstediğiniz içeriğe ulaşılamadı."
          type="website"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Dizi bulunamadı</h1>
            <p className="text-muted-foreground">İstediğiniz içeriğe ulaşılamadı.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={series.title}
        description={series.synopsis}
        type="article"
        image={series.poster}
        url={`https://seriesdownload.com/series/${series.id}`}
        keywords={`${series.title}, ${series.title} dizi indir, ${series.title} izle, ${series.genres.join(', ')}`}
        publishedTime={series.publishedAt}
        modifiedTime={series.updatedAt}
      />
      
      <div className="min-h-screen pb-8">
        {/* Hero Section - Background Image */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={series.coverImage}
            alt={`${series.title} backdrop`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Series Info */}
              <div className="flex gap-8 mb-8">
                {/* Poster Image */}
                <div className="w-[200px] h-[300px] flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={series.poster}
                    alt={series.title}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex-1 pt-4">
                  <h1 className="text-4xl font-bold mb-4">{series.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                      <span className="font-semibold">{series.rating}</span>
                    </div>
                    <span>{series.year}</span>
                    <span>{series.duration}</span>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{series.synopsis}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-card/50 p-4 rounded-lg">
                      <span className="block text-sm text-muted-foreground mb-1">Altyazı</span>
                      <span className="font-medium">{series.subtitles}</span>
                    </div>
                    <div className="bg-card/50 p-4 rounded-lg">
                      <span className="block text-sm text-muted-foreground mb-1">Ses</span>
                      <span className="font-medium">{series.audio}</span>
                    </div>
                    <div className="bg-card/50 p-4 rounded-lg">
                      <span className="block text-sm text-muted-foreground mb-1">Dosya Boyutu</span>
                      <span className="font-medium">{series.fileSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cast Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Oyuncular</h2>
                <div className="flex flex-wrap gap-4">
                  {series.cast?.map((actor, index) => (
                    <span key={index} className="px-4 py-2 bg-accent rounded-full">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Section */}
              <div className="mb-8">
                <DownloadAccordion seasons={series.seasons || []} />
              </div>

              {/* Admin Profile */}
              <AdminProfile />

              {/* Similar Content */}
              <SimilarContent currentId={id!} type="series" />

              {/* Comments Section */}
              <Comments contentId={id!} contentType="series" />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky" style={{ top: 'calc(5.5rem + 8rem)' }}>
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}