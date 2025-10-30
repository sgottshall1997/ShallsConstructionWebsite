# Shall's Construction Website

## Overview
This project is a professional, responsive website for Shall's Construction, a commercial construction company with over 30 years of experience. The site aims to showcase their services (construction, maintenance, emergency services) and target property managers in Maryland, Virginia, Washington D.C., and Delaware. The goal is to provide a modern online presence using React, Express, and Tailwind CSS, highlighting the company's extensive experience, 24/7 availability, and 100% in-house team. The website replaces an older version and focuses on providing a modern online presence for lead generation and brand reinforcement.

## Recent Changes

### Pages Temporarily Hidden (October 30, 2025)
Hidden several pages and sections for future re-enablement (code preserved, not deleted):

**Hidden Navigation Links:**
- Blog
- Service Areas
- Testimonials

**Hidden Home Page Section:**
- "Latest Insights & News" section

**Hidden Routes:**
- `/blog` and `/blog/:slug` (Articles and BlogDetail pages)
- `/testimonials` (Testimonials page)
- `/service-areas` and all location-specific pages (Service Areas pages)

**How to Re-enable:**
All code is commented out with clear markers. To re-enable:
1. Uncomment navigation links in `client/src/components/Navigation.tsx`
2. Uncomment lazy imports in `client/src/App.tsx`
3. Uncomment routes in `client/src/App.tsx`
4. For homepage section: Uncomment section in `client/src/pages/Home.tsx`

### What We Do Page Removed & About Page Updated (October 30, 2025)
Removed the What We Do page and moved key property manager messaging to the About Us page:

**Changes Made:**
- Removed `/what-we-do` page completely from site navigation and routes
- Removed "What We Do" link from main navigation
- Updated all service card links on homepage to point directly to service detail pages (`/services/[slug]`)
- Added property manager introduction section to top of About Us page (blue section after hero)

**New About Page Structure:**
1. Hero section - "Who We Are"
2. **Property Manager Introduction** (new blue section) - "For property managers with countless projects, there's one name to remember: Shall's Construction"
3. Company Story
4. Company Stats
5. Mission & Values
6. Leadership
7. Community Involvement
8. Industry Associations

**How to Add Property Manager Content:**
The new blue section on the About page contains the key messaging about serving property managers, "One Call Does It All", 30+ years experience, 100% in-house staff, and 24/7 responsiveness.

### Testimonials Removed (October 30, 2025)
All sample/placeholder testimonials removed from the website to prepare for real client testimonials:

**Changes Made:**
- Removed all testimonial data from 6 primary service pages (construction-remodeling, handyman-services, exterior-building-services, parking-lot-services, painting-services, snow-removal)
- Set testimonialQuote, testimonialAuthor, testimonialRole, and testimonialCompany fields to null in server/storage.ts
- Emptied sampleTestimonials array on home page
- Left helpful template comments in storage for easy addition of real testimonials

**User Experience:**
- Service pages: Testimonial sections are hidden (not rendered when testimonialQuote is null)
- Home page: Shows "No featured testimonials available." message with View All Testimonials and Leave a Review buttons
- Testimonials page: Shows "No testimonials found for this service." message
- All testimonial structure remains in place for easy future addition

**How to Add Real Testimonials:**
1. Edit `server/storage.ts`
2. Find `sampleTestimonials` array (line ~973)
3. Uncomment template and add testimonial objects
4. For service-specific testimonials, update individual service objects with testimonialQuote, testimonialAuthor, testimonialRole, testimonialCompany fields

### Rock Spring Service Page Rebuild (October 30, 2025)
Complete redesign of all service pages to match Rock Spring Contracting's professional B2B format targeting property managers:

**Schema Extension:**
- Extended Service type in `shared/schema.ts` with 9 new fields: tagline, philosophy, servicesInclude, testimonial (quote/author/role/company), relatedServices, seoKeywords
- All new fields nullable for backwards compatibility with existing data
- Updated storage to normalize undefined values to null

**Service Catalog Expansion:**
- Expanded from 6 to 12 total services (6 primary + 6 secondary)
- Primary services (in Navigation): construction-remodeling, handyman-services, exterior-building-services, parking-lot-services, painting-services, snow-removal
- Secondary services: demolition, interior-fit-out, tenant-improvements, facility-maintenance, emergency-services, general-maintenance
- Created SERVICE_CATALOG.md documenting all services, priorities, relationships, and SEO keywords

**ServiceDetail Component Redesign:**
- Complete rebuild of `client/src/pages/ServiceDetail.tsx` following Rock Spring layout
- New structure: Hero (H1) → Breadcrumb → Tagline (H2) → Philosophy → Services Include (H2 + H3 bullets) → Testimonial → CTA → Related Services
- Removed old benefits/processSteps presentation
- Added intelligent fallbacks: default tagline, philosophy falls back to fullDescription, servicesInclude falls back to benefits
- Proper H1-H3 hierarchy throughout (one H1, multiple H2/H3)
- Testimonials conditionally displayed only when present
- Related services with internal linking

**Professional Content Generation:**
- Created SERVICE_CONTENT_PRIMARY.json with complete Rock Spring-format content for 6 primary services
- Each service: 10-15 word tagline, 150-200 word philosophy, 8-15 service bullets, unique testimonial, related services mapping, 12 SEO keywords
- Professional B2B tone: concise, safety-focused, operations-oriented, minimal-disruption emphasis
- Geographic targeting: Montgomery County MD, Bethesda MD, Kensington MD
- Total 400-600 words per service for SEO optimization
- All content imported into server/storage.ts

**SEO & Accessibility:**
- Unique meta descriptions (140-160 chars) for each service
- Canonical URLs configured
- Hero sections use background images with proper aria-label attributes
- All sections have data-testid attributes for testing
- Service schema JSON-LD generated for each page

**Testing Results:**
- Comprehensive end-to-end testing passed
- Rock Spring layout verified across desktop and mobile
- Content quality confirmed (400-600 words, professional tone)
- SEO metadata validated
- Fallback behavior working correctly for secondary services
- Navigation and internal linking functional
- Responsive design verified (375px mobile width)

**Files Modified:**
- `shared/schema.ts` - Service type extension
- `server/storage.ts` - 12 services with Rock Spring data
- `client/src/pages/ServiceDetail.tsx` - Complete redesign
- `SERVICE_CATALOG.md` - Service documentation (new)
- `SERVICE_CONTENT_PRIMARY.json` - Professional content (new)

### Advanced SEO Enhancements (October 30, 2025)
Comprehensive SEO improvements to maximize search visibility and accessibility:

**Enhanced Organization Schema:**
- Added `hasOfferCatalog` to Organization schema with all 6 service categories
- Nested OfferCatalog structure following schema.org best practices
- Detailed service descriptions for improved search engine understanding

**Breadcrumb Navigation:**
- Added visible breadcrumb navigation to 15 pages
- Consistent styling across detail pages, location pages, and content pages
- Breadcrumbs match existing BreadcrumbList schema structure
- Mobile-responsive with proper spacing

**SEO Documentation:**
- Created `SEO_AUDIT_REPORT.md` with comprehensive analysis (current score: 72/100)
- Audited 19+ pages with detailed metrics
- Prioritized recommendations for next improvements
- Created `CONTENT_PRODUCTION_PLAN.md` with 12-week roadmap
- 36 detailed blog post briefs targeting property managers
- Complete keyword research and internal linking strategy

**Accessibility Improvements:**
- Added descriptive aria-labels to navigation (main nav, mobile menu)
- Enhanced all CTAs, forms, and interactive elements
- Added aria-labels to filters, cards, and links across 7 key pages
- Follows WCAG 2.1 AA guidelines

**Files Modified:**
- `client/src/lib/schema.ts` - Enhanced Organization schema
- 15 page files - Added breadcrumb navigation
- `client/src/components/Navigation.tsx` - Added aria-labels
- Multiple page components - Accessibility enhancements

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