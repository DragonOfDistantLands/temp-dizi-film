import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { useAnalytics } from '@/hooks/useAnalytics';
import { initializeAnalytics } from '@/lib/analytics';
import AppRoutes from '@/routes';
import './App.css';

// Initialize analytics
initializeAnalytics();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppContent() {
  useAnalytics(); // Track page views

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-center">Series Download</h1>
        </div>
      </header>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark" attribute="class">
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}