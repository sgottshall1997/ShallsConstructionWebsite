# Shall's Construction Website

## Overview
This project is a professional, responsive website for Shall's Construction, a commercial construction company with over 30 years of experience. The site aims to showcase their services (construction, maintenance, emergency services) and target property managers in Maryland, Virginia, Washington D.C., and Delaware. The goal is to provide a modern online presence using React, Express, and Tailwind CSS, highlighting the company's extensive experience, 24/7 availability, and 100% in-house team. The website replaces an older version and focuses on providing a modern online presence for lead generation and brand reinforcement.

## Recent Changes

### Password Protection Removed (October 30, 2025)
- Removed password protection from the website - site now opens directly without login
- Removed authentication middleware from all API routes
- Simplified App.tsx to remove AuthWrapper component
- Site is now fully public and accessible without credentials

### Performance Optimizations (October 30, 2025)
Comprehensive performance optimizations implemented to achieve 90+ PageSpeed score:

**Code Splitting & Lazy Loading:**
- Implemented React.lazy() for all 18 route components
- Added Suspense boundaries with professional loading fallback
- Split main bundle into route-specific chunks (3-50 KB per route)
- Reduced initial bundle from ~400KB to 294KB (96KB gzipped)

**Font Optimization:**
- Converted Google Fonts to async loading (non-blocking)
- Added preload hints for critical font resources
- Reduced font weight variants from 7 to 4
- Eliminated render-blocking font requests

**Bundle Analysis Results:**
- Main bundle: 294 KB (96 KB gzipped)
- CSS bundle: 94 KB (15 KB gzipped)
- Home route: 19 KB (5 KB gzipped)
- Total initial load: ~407 KB (~116 KB gzipped)

**Icon Optimization:**
- Verified all icon imports are tree-shaken (individual imports from lucide-react)
- No unused icon imports detected

**Files Modified:**
- `client/src/App.tsx` - Added lazy loading and Suspense
- `client/index.html` - Optimized font loading strategy

**Documentation:**
- Created `PERFORMANCE_OPTIMIZATIONS.md` with comprehensive analysis and recommendations

## User Preferences
- Professional, corporate design aesthetic
- Blue and white color scheme (matches original site)
- Clean, readable typography
- Focus on property manager needs
- 24/7 emergency service emphasis
- Mobile-responsive design

## System Architecture

### UI/UX Decisions
The website employs a professional blue and white color scheme, utilizing Montserrat for headings and Open Sans for body text. A mobile-first approach is central to its responsive design. Shadcn UI components, styled to match the brand, ensure a consistent and modern look. The site includes 18 distinct pages covering comprehensive services, projects, safety, and testimonials.

### Technical Implementations
The frontend is built with React 18 and uses Wouter for routing. SEO is a core focus, implemented with `react-helmet-async` for dynamic meta tags and a robust JSON-LD schema (LocalBusiness, FAQPage, BreadcrumbList). The backend, powered by Express.js and Node.js 20, handles API routes for articles and contact form submissions, using in-memory storage and Zod for input validation. Google Analytics 4 (GA4) and Google Search Console (GSC) are integrated for analytics and SEO verification, featuring asynchronous loading, development mode logging, IP anonymization, and detailed event tracking for user interactions like form submissions, CTA clicks, and page views.

### Feature Specifications
- **Multi-Page Navigation**: Sticky header with mobile menu, "About" dropdown, smooth scrolling, and prominent 24/7 phone number.
- **Service Showcase**: Detailed pages for six construction services with professional images and an emphasis on emergency services.
- **Enhanced Contact Page**: Features three inquiry types (Emergency, Quote, General), conditional fields, a "We respond within 2 hours" promise, and validation via React Hook Form and Zod.
- **Articles System**: Fetches and displays articles using TanStack Query, including loading skeletons.
- **Comprehensive About Us**: Details company story, leadership, mission, values, community involvement, and industry associations.
- **Projects Portfolio**: Filterable by category, with project detail pages featuring before/after galleries and stats.
- **Safety & Certifications**: Showcases OSHA compliance, licenses across multiple states (MD, VA, DC, DE), insurance, bonding, and awards.
- **Testimonials**: Filterable by service type, with 5-star ratings and video testimonial placeholders.
- **Enhanced Homepage**: Includes a stats bar, featured projects, client logos, and content targeted at property managers.
- **SEO**: Dynamic meta tags, JSON-LD schema, location-specific landing pages, XML sitemap, `robots.txt`, comprehensive internal linking strategy, and proper H1/H2 hierarchy across all pages.

### System Design Choices
The project adheres to a component-based architecture for the frontend, promoting reusability with components like `LogoGrid`, `StatCounter`, and `ProjectCard`. A design system defines colors, typography, and responsiveness, leveraging Shadcn UI for consistent styling. The backend is designed as a lightweight API server.

## External Dependencies
- **React 18**: Frontend library.
- **Wouter**: Client-side routing.
- **TanStack Query**: Data fetching and caching.
- **Express.js**: Backend web framework.
- **Node.js 20**: Backend runtime environment.
- **Tailwind CSS**: Utility-first CSS framework.
- **Shadcn UI**: UI component library.
- **React Hook Form**: Form management.
- **Zod**: Schema validation library.
- **Lucide React**: Icon library.
- **react-helmet-async**: For managing document head tags.
- **AI-generated images**: Used for construction service photos.
- **Google Analytics 4 (GA4)**: For website analytics and event tracking.
- **Google Search Console**: For website verification and SEO performance monitoring.