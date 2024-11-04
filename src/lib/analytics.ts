import ReactGA from 'react-ga4';

// Initialize GA4
export const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('G-XXXXXXXXXX'); // Replace with your GA4 measurement ID
  }
};

// Page view tracking
export const trackPageView = (path: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

// Custom events
export const trackEvent = (category: string, action: string, label?: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

// User engagement metrics
export const trackEngagement = {
  seriesView: (seriesId: string, title: string) => {
    trackEvent('Series', 'view', title);
  },
  movieView: (movieId: string, title: string) => {
    trackEvent('Movie', 'view', title);
  },
  search: (query: string) => {
    trackEvent('Search', 'query', query);
  },
  download: (contentId: string, contentType: 'series' | 'movie', title: string) => {
    trackEvent('Download', contentType, title);
  },
  storyView: (storyId: string, title: string) => {
    trackEvent('Story', 'view', title);
  },
  languageChange: (language: string) => {
    trackEvent('Settings', 'language_change', language);
  },
};