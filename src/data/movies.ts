export interface Movie {
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
}

export const moviesList: Movie[] = [
  {
    id: "the-godfather",
    title: "The Godfather",
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: "9.2",
    year: "1972",
    duration: "2h 55min",
    poster: "https://source.unsplash.com/random/400x600?movie-1",
    coverImage: "https://source.unsplash.com/random/1920x1080?movie-1",
    genres: ["Crime", "Drama"],
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    subtitles: "Türkçe",
    audio: "İngilizce",
    fileSize: "2.1 GB"
  },
  {
    id: "shawshank-redemption",
    title: "The Shawshank Redemption",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: "9.3",
    year: "1994",
    duration: "2h 22min",
    poster: "https://source.unsplash.com/random/400x600?movie-2",
    coverImage: "https://source.unsplash.com/random/1920x1080?movie-2",
    genres: ["Drama"],
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    subtitles: "Türkçe",
    audio: "İngilizce",
    fileSize: "1.8 GB"
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: "8.9",
    year: "1994",
    duration: "2h 34min",
    poster: "https://source.unsplash.com/random/400x600?movie-3",
    coverImage: "https://source.unsplash.com/random/1920x1080?movie-3",
    genres: ["Crime", "Drama"],
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    subtitles: "Türkçe",
    audio: "İngilizce",
    fileSize: "2.3 GB"
  },
  {
    id: "inception",
    title: "Inception",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: "8.8",
    year: "2010",
    duration: "2h 28min",
    poster: "https://source.unsplash.com/random/400x600?movie-4",
    coverImage: "https://source.unsplash.com/random/1920x1080?movie-4",
    genres: ["Action", "Sci-Fi", "Thriller"],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    subtitles: "Türkçe",
    audio: "İngilizce",
    fileSize: "2.5 GB"
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: "9.0",
    year: "2008",
    duration: "2h 32min",
    poster: "https://source.unsplash.com/random/400x600?movie-5",
    coverImage: "https://source.unsplash.com/random/1920x1080?movie-5",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    subtitles: "Türkçe",
    audio: "İngilizce",
    fileSize: "2.4 GB"
  }
];