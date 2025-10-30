# Shall's Construction Website

## Recent Updates (October 30, 2025)

### SEO & Technical Optimization Complete
Implemented comprehensive SEO and technical improvements to meet industry best practices:

**Heading Hierarchy:**
- ✅ Single H1 per page enforced across entire site
- Homepage H1: "Commercial Construction & Property Services in MD, VA, DC & DE"
- Proper H2 hierarchy throughout all pages
- All pages verified to have exactly one H1 tag

**SEO Elements:**
- ✅ Canonical links implemented for all pages via SEO component
- ✅ Image alt text optimized (descriptive, no keyword stuffing)
- ✅ Proper aria-labels on all interactive elements
- ✅ Meta descriptions and title tags properly configured

**Technical Performance:**
- ✅ All images use optimized webp format
- ✅ Responsive layout tested: mobile (375px), tablet (768px), desktop
- ✅ Accessibility standards met (ARIA labels, keyboard navigation)
- ✅ Internal navigation links verified

### Homepage Optimization
- Condensed content by ~50% following Rock Spring Contracting's minimal style
- Updated H1 to SEO-optimized format
- Service descriptions shortened to single concise lines
- **Removed all redundant information** - each key fact now appears only once:
  - Removed hero trust indicators (duplicated stats bar)
  - Removed "Proven, Responsive, Reliable" differentiators section (duplicated stats bar)
  - Simplified intro text (removed geographic and in-house mentions already in stats)
- Current structure: Hero → Stats → Intro → Services → Testimonials → CTA
- Removed Featured Projects section entirely
- Removed 24/7 Emergency Service button from hero (kept Request a Quote, centered)
- Removed testimonial action buttons (View All, Leave a Review)
- Key facts appear in optimal spots: Stats bar showcases 30+ Years, 24/7/365, 100% In-House, MD/VA/DC/DE

### Pages Hidden
Hidden (commented out) for future re-enablement:
- Blog/Articles pages and navigation
- Testimonials page and navigation  
- Service Areas pages and navigation
- "Latest Insights & News" section on homepage

## Overview
This project is a professional, responsive website for Shall's Construction, a commercial construction company. It aims to showcase their services (construction, maintenance, emergency services) and target property managers in Maryland, Virginia, Washington D.C., and Delaware. The website provides a modern online presence using React, Express, and Tailwind CSS, emphasizing the company's extensive experience, 24/7 availability, and 100% in-house team to generate leads and reinforce the brand.

## User Preferences
- Professional, corporate design aesthetic
- Blue and white color scheme (matches original site)
- Clean, readable typography
- Focus on property manager needs
- 24/7 emergency service emphasis
- Mobile-responsive design

## System Architecture

### UI/UX Decisions
The website uses a professional blue and white color scheme, with Montserrat for headings and Open Sans for body text. It follows a mobile-first approach for responsive design. Shadcn UI components are customized to ensure a consistent and modern look. The site features 18 distinct pages covering services, projects, safety, and testimonials, with a recent focus on a condensed and modernized homepage design, following a minimal, professional style inspired by Rock Spring Contracting. All service pages have been redesigned to match a professional B2B format targeting property managers, including new schema fields for richer content.

### Technical Implementations
The frontend is built with React 18 and Wouter for routing. SEO is a core focus, implemented with `react-helmet-async` for dynamic meta tags, a robust JSON-LD schema (LocalBusiness, FAQPage, BreadcrumbList), and enhanced Organization schema. The backend uses Express.js and Node.js 20, handling API routes for articles and contact form submissions with in-memory storage and Zod for input validation. Google Analytics 4 (GA4) and Google Search Console (GSC) are integrated for analytics, featuring asynchronous loading and detailed event tracking. Performance optimizations include code splitting with `React.lazy()`, font optimization, and icon tree-shaking to achieve high PageSpeed scores.

### Feature Specifications
- **Multi-Page Navigation**: Sticky header with mobile menu, smooth scrolling, and prominent 24/7 phone number.
- **Service Showcase**: Detailed pages for construction services with professional images, focusing on emergency services, now expanded to 12 services (6 primary, 6 secondary).
- **Enhanced Contact Page**: Three inquiry types (Emergency, Quote, General), conditional fields, a "We respond within 2 hours" promise, and validation via React Hook Form and Zod.
- **Articles System**: Fetches and displays articles using TanStack Query.
- **Comprehensive About Us**: Details company story, leadership, mission, values, community involvement, industry associations, and a new section specifically for property managers.
- **Projects Portfolio**: Filterable by category, with project detail pages featuring before/after galleries.
- **Safety & Certifications**: Showcases OSHA compliance, licenses across multiple states, insurance, bonding, and awards.
- **Testimonials**: Filterable by service type, with 5-star ratings, now prepared for real client testimonials with placeholder content removed.
- **Enhanced Homepage**: Includes a stats bar, featured projects, and content targeted at property managers, with a focus on brevity.
- **Advanced SEO**: Dynamic meta tags, JSON-LD schema, breadcrumb navigation on 15 pages, XML sitemap, `robots.txt`, and comprehensive internal linking strategy.
- **Accessibility Improvements**: Descriptive aria-labels for navigation, CTAs, forms, and interactive elements.

### System Design Choices
The project utilizes a component-based architecture for the frontend, promoting reusability. A design system defines colors, typography, and responsiveness, leveraging Shadcn UI. The backend is designed as a lightweight API server. Several pages and sections are temporarily hidden, with code preserved for future re-enablement.

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