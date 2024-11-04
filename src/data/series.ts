export interface Episode {
  number: number;
  title: string;
  duration: string;
  download: {
    quality: string;
    size: string;
    url: string;
  };
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Series {
  id: string;
  title: string;
  synopsis: string;
  rating: string;
  year: string;
  duration: string;
  poster: string;
  coverImage: string;
  genres: string[];
  cast: string[];
  subtitles: string;
  audio: string;
  fileSize: string;
  publishedAt: string;
  updatedAt: string;
  seasons: Season[];
}

export const seriesList: Series[] = [
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    synopsis: "Kanser teşhisi konan bir kimya öğretmeni, ailesinin geleceğini güvence altına almak için metamfetamin üretip satmaya başlar.",
    rating: "9.5",
    year: "2008-2013",
    duration: "49 dk",
    poster: "https://source.unsplash.com/random/300x450?tv",
    coverImage: "https://source.unsplash.com/random/1920x1080?desert",
    genres: ["Drama", "Crime", "Thriller"],
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    subtitles: "Türkçe, İngilizce",
    audio: "Türkçe, İngilizce",
    fileSize: "2.1 GB",
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "Pilot",
            duration: "58 dk",
            download: {
              quality: "1080p",
              size: "2.1 GB",
              url: "#"
            }
          },
          {
            number: 2,
            title: "Cat's in the Bag...",
            duration: "48 dk",
            download: {
              quality: "1080p",
              size: "1.8 GB",
              url: "#"
            }
          },
          {
            number: 3,
            title: "...And the Bag's in the River",
            duration: "48 dk",
            download: {
              quality: "1080p",
              size: "1.9 GB",
              url: "#"
            }
          }
        ]
      },
      {
        number: 2,
        episodes: [
          {
            number: 1,
            title: "Seven Thirty-Seven",
            duration: "47 dk",
            download: {
              quality: "1080p",
              size: "1.9 GB",
              url: "#"
            }
          },
          {
            number: 2,
            title: "Grilled",
            duration: "48 dk",
            download: {
              quality: "1080p",
              size: "2.0 GB",
              url: "#"
            }
          }
        ]
      }
    ]
  },
  {
    id: "true-detective",
    title: "True Detective",
    synopsis: "Farklı dedektiflerin karanlık suç vakalarını çözmek için verdikleri mücadeleyi konu alan antoloji serisi.",
    rating: "8.9",
    year: "2014-2024",
    duration: "55 dk",
    poster: "https://source.unsplash.com/random/300x450?detective",
    coverImage: "https://source.unsplash.com/random/1920x1080?noir",
    genres: ["Crime", "Drama", "Mystery"],
    cast: ["Matthew McConaughey", "Woody Harrelson", "Rachel McAdams"],
    subtitles: "Türkçe, İngilizce",
    audio: "Türkçe, İngilizce",
    fileSize: "1.8 GB",
    publishedAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "The Long Bright Dark",
            duration: "58 dk",
            download: {
              quality: "1080p",
              size: "2.3 GB",
              url: "#"
            }
          },
          {
            number: 2,
            title: "Seeing Things",
            duration: "54 dk",
            download: {
              quality: "1080p",
              size: "2.1 GB",
              url: "#"
            }
          }
        ]
      }
    ]
  }
];