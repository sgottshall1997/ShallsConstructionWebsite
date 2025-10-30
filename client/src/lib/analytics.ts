/**
 * Google Analytics 4 (GA4) Integration
 * 
 * This module provides GA4 tracking functionality with:
 * - Non-blocking script loading
 * - Development mode console logging
 * - Type-safe event tracking
 * - Privacy-conscious implementation
 */

// GA4 Measurement ID from environment variables
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Development mode flag
const isDevelopment = import.meta.env.DEV;

// Track if GA4 has been initialized
let isInitialized = false;

/**
 * Initialize Google Analytics 4
 * Loads the gtag.js script asynchronously and sets up the dataLayer
 */
export function initializeGA4(): void {
  // Skip initialization if no measurement ID is provided
  if (!GA4_MEASUREMENT_ID) {
    if (isDevelopment) {
      console.log('[GA4] No measurement ID provided. Analytics disabled.');
    }
    return;
  }

  // Skip if already initialized
  if (isInitialized) {
    if (isDevelopment) {
      console.log('[GA4] Already initialized.');
    }
    return;
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function as a function expression (not declaration to avoid strict mode issues)
    const gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    
    // Set up gtag function globally
    window.gtag = gtag;
    
    // Configure gtag with timestamp
    gtag('js', new Date());
    
    // Configure GA4 with measurement ID
    gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false, // We'll manually track pageviews for better control
      anonymize_ip: true, // Privacy: anonymize IP addresses
    });

    // Load the gtag.js script asynchronously (non-blocking)
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    isInitialized = true;

    if (isDevelopment) {
      console.log('[GA4] Initialized with measurement ID:', GA4_MEASUREMENT_ID);
    }
  } catch (error) {
    console.error('[GA4] Initialization error:', error);
  }
}

/**
 * Track a pageview
 * @param pagePath - The path of the page being viewed
 * @param pageTitle - The title of the page
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  if (!GA4_MEASUREMENT_ID) return;

  const eventData = {
    page_path: pagePath,
    page_title: pageTitle,
  };

  if (isDevelopment) {
    console.log('[GA4] Page View:', eventData);
  }

  if (window.gtag) {
    window.gtag('event', 'page_view', eventData);
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (!GA4_MEASUREMENT_ID) return;

  if (isDevelopment) {
    console.log(`[GA4] Event: ${eventName}`, eventParams || {});
  }

  if (window.gtag) {
    window.gtag('event', eventName, eventParams || {});
  }
}

// Specific event tracking functions for common actions

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(inquiryType: 'emergency' | 'quote' | 'general'): void {
  trackEvent('contact_form_submit', {
    inquiry_type: inquiryType,
    event_category: 'engagement',
    event_label: `Contact Form - ${inquiryType}`,
  });
}

/**
 * Track CTA (Call-to-Action) clicks
 */
export function trackCTAClick(ctaType: string, ctaLocation?: string): void {
  trackEvent('cta_click', {
    cta_type: ctaType,
    cta_location: ctaLocation || 'unknown',
    event_category: 'engagement',
  });
}

/**
 * Track emergency service button clicks
 */
export function trackEmergencyClick(location: string): void {
  trackEvent('cta_click_emergency', {
    click_location: location,
    event_category: 'high_intent',
    event_label: '24/7 Emergency Service',
  });
}

/**
 * Track quote request button clicks
 */
export function trackQuoteClick(location: string): void {
  trackEvent('cta_click_quote', {
    click_location: location,
    event_category: 'high_intent',
    event_label: 'Request Quote',
  });
}

/**
 * Track phone number clicks (call now)
 */
export function trackPhoneClick(location: string): void {
  trackEvent('phone_click', {
    click_location: location,
    event_category: 'high_intent',
    event_label: 'Call Now',
  });
}

/**
 * Track service page views
 */
export function trackServiceView(serviceName: string): void {
  trackEvent('service_view', {
    service_name: serviceName,
    event_category: 'engagement',
  });
}

/**
 * Track project page views
 */
export function trackProjectView(projectTitle: string, projectCategory?: string): void {
  trackEvent('project_view', {
    project_title: projectTitle,
    project_category: projectCategory || 'unknown',
    event_category: 'engagement',
  });
}

/**
 * Track blog post views
 */
export function trackBlogView(postTitle: string, postCategory?: string): void {
  trackEvent('blog_view', {
    post_title: postTitle,
    post_category: postCategory || 'unknown',
    event_category: 'engagement',
  });
}

/**
 * Track service area page views
 */
export function trackServiceAreaView(location: string): void {
  trackEvent('service_area_view', {
    location: location,
    event_category: 'engagement',
  });
}

/**
 * Track navigation link clicks
 */
export function trackNavigationClick(linkName: string, linkDestination: string): void {
  trackEvent('navigation_click', {
    link_name: linkName,
    link_destination: linkDestination,
    event_category: 'navigation',
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText: string): void {
  trackEvent('outbound_link_click', {
    url: url,
    link_text: linkText,
    event_category: 'engagement',
  });
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
