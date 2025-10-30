import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { initializeGA4, trackPageView } from '@/lib/analytics';

/**
 * Custom hook to initialize Google Analytics and track pageviews
 * Should be called once at the app root level
 */
export function useAnalytics() {
  const [location] = useLocation();

  // Initialize GA4 once on mount
  useEffect(() => {
    initializeGA4();
  }, []);

  // Track pageviews on route change
  useEffect(() => {
    const pageTitle = document.title;
    trackPageView(location, pageTitle);
  }, [location]);
}
