import { useParams } from "react-router-dom";
import { moviesList } from "@/data/movies";
import { DownloadCard } from "@/components/DownloadCard";
import { AdminProfile } from "@/components/AdminProfile";
import { LikeSystem } from "@/components/LikeSystem";
import { Comments } from "@/components/Comments";
import SimilarContent from "@/components/SimilarContent";
import Sidebar from "@/components/Sidebar";

export default function MovieDetail() {
  const { id } = useParams();
  const movie = moviesList.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Film bulunamadı</h1>
          <p className="text-muted-foreground">İstediğiniz içeriğe ulaşılamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={movie.coverImage}
          alt={`${movie.title} backdrop`}
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
            {/* Movie Info */}
            <div className="flex gap-8 mb-8">
              <div className="w-[200px] h-[300px] flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 pt-4">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center">⭐ {movie.rating}</span>
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                </div>
                <p className="text-lg text-muted-foreground mb-6">{movie.synopsis}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <span className="block text-sm text-muted-foreground mb-1">Altyazı</span>
                    <span className="font-medium">{movie.subtitles}</span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <span className="block text-sm text-muted-foreground mb-1">Ses</span>
                    <span className="font-medium">{movie.audio}</span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <span className="block text-sm text-muted-foreground mb-1">Dosya Boyutu</span>
                    <span className="font-medium">{movie.fileSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Like System */}
            <div className="mb-8">
              <LikeSystem title={movie.title} type="movie" id={movie.id} />
            </div>

            {/* Download Section */}
            <div className="mb-8">
              <DownloadCard 
                downloads={[
                  {
                    quality: "1080p HD",
                    size: movie.fileSize,
                    url: movie.downloadUrl
                  },
                  {
                    quality: "2160p UHD",
                    size: movie.uhdFileSize || "",
                    url: movie.uhdDownloadUrl || ""
                  }
                ]} 
              />
            </div>

            {/* Cast Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Oyuncular</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast?.map((actor, index) => (
                  <span key={index} className="px-4 py-2 bg-accent rounded-full">
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Admin Profile */}
            <AdminProfile />

            {/* Similar Content */}
            <SimilarContent currentId={id!} type="movies" />

            {/* Comments Section */}
            <Comments contentId={id!} contentType="movie" />
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
  );
}