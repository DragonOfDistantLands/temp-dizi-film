import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SeriesDetail from '@/pages/SeriesDetail';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SeriesListPage = lazy(() => import('@/pages/SeriesListPage'));
const MoviesPage = lazy(() => import('@/pages/MoviesPage'));
const MovieDetail = lazy(() => import('@/pages/MovieDetail'));
const DiscoverPage = lazy(() => import('@/pages/DiscoverPage'));
const HowToDownloadPage = lazy(() => import('@/pages/HowToDownloadPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/best-series" element={<SeriesListPage />} />
        <Route path="/legendary-movies" element={<MoviesPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/how-to-download" element={<HowToDownloadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}