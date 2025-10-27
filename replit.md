# Shall's Construction Website

## Project Overview

Professional commercial construction company website serving property managers in Maryland, Virginia, DC, and Delaware. This is a modern remake of the original shallsconstruction.com website, built with React, Express, and Tailwind CSS.

**Status**: ✅ MVP Complete  
**Last Updated**: October 27, 2025

## Purpose

Create a professional, responsive website for Shall's Construction that showcases their 30+ years of experience in commercial property maintenance and construction services. The site targets property managers who need reliable construction, maintenance, and emergency services. The company is licensed in Maryland, Virginia, DC, and Delaware.

## Recent Changes

### October 27, 2025 - Logo Update & Service Areas Simplification
- Replaced 25 Years gold anniversary badge with official Shall's Construction logo in header and footer
- Logo file: `attached_assets/shalls-construction-logo.png`
- Removed "Shall's Construction" text from header (logo replaces both badge and text)
- Simplified footer service areas from 17 cities to 4 states: Maryland, DC, Virginia, Delaware
- Kept DC link to service area landing page
- Maintained "Celebrating 30+ Years in Business" tagline in footer

### October 27, 2025 - Content Updates (30+ Years & Delaware Licensing)
- Updated all "25 years" references to "30+ years" across the entire site
- Added Delaware (DE) licensing information throughout site
- Updated service coverage from MD/VA/DC to MD/VA/DC/DE
- Updated all location-specific pages with 30+ year messaging
- Added Delaware to Footer service areas list
- Updated all SEO meta descriptions to include DE licensing
- Updated homepage stats badge from "25+ Years" to "30+ Years"
- Updated FAQ content to reflect 30+ years of experience

### October 27, 2025 - What We Do Page Content Enhancement
- Added comprehensive details from original shallsconstruction.com site
- Enhanced Construction & Remodeling: client types, white box terminology, hands-on expertise language
- Expanded Painting Services: wall coverings, wood treatments, drywall, specialty coatings, expert guidance
- Detailed Exterior Building Services: 8 comprehensive services, preventative maintenance, 24/7 response
- Split Parking Lot Services: separate asphalt and concrete categories with detailed examples
- Added missing intro paragraph about wide range of services

### October 27, 2025 - Hero Section Optimization
- Reduced hero height: Mobile 600px→450px (25% smaller), Desktop 700px→500px (28% smaller)
- Widened text container by 50% (max-width 4xl→6xl) for better viewport usage
- Stats section now visible with minimal scrolling

### October 27, 2025 - SEO Enhancement & UX Improvements
- Installed and configured react-helmet-async for dynamic meta tags
- Created comprehensive JSON-LD schema system (LocalBusiness, FAQPage, BreadcrumbList)
- Added SEO metadata to all existing pages with unique titles and descriptions
- Created 6 location-specific landing pages (Bethesda, Rockville, Silver Spring, Baltimore, Gaithersburg, DC Metro)
- Generated sitemap.xml with all 11 pages
- Created robots.txt with sitemap reference
- Added property manager-focused FAQs to all pages
- Implemented strategic internal linking structure
- Updated all content to align with commercial property management focus
- Implemented ScrollToTop component for smooth navigation UX
- Fixed scroll-to-section behavior for service cards linking to What We Do page
- Fixed duplicate data-testid issue in Navigation component

### October 27, 2025 - Initial Build
- Implemented complete 5-page website with professional design
- Created all frontend components with responsive layouts
- Set up backend API with in-memory storage for articles and contact submissions
- Generated professional construction service images using AI
- Configured Montserrat/Open Sans typography system
- Added SEO meta tags and Open Graph tags
- Implemented contact form with validation
- Seeded sample articles for property managers
- Fixed React warnings (nested anchor tags, missing Fax icon)

## Project Architecture

### Frontend (React + Wouter)
- **Homepage**: Hero section, service cards, stats, CTA
- **What We Do**: Detailed service sections with smooth scroll anchors
- **Who We Serve**: Client showcase and benefits
- **Articles**: Blog listing with seeded content
- **Contact**: Form with validation and toast notifications
- **Components**: 
  - Navigation (desktop/mobile) with logo
  - Footer with simplified service areas (4 states)

### Backend (Express)
- In-memory storage (MemStorage class)
- API Routes:
  - `GET /api/articles` - Returns all articles
  - `POST /api/contact` - Accepts contact form submissions
- Zod validation for all inputs
- Seeded with 3 sample articles

### Design System
- **Colors**: Blue (#33A9DC primary) and white professional scheme
- **Typography**: 
  - Headings: Montserrat (400, 500, 600, 700)
  - Body: Open Sans (300, 400, 500, 600)
- **Responsive**: Mobile-first with md/lg breakpoints
- **Components**: Shadcn UI with custom styling

## Key Features

1. **Multi-Page Navigation**
   - Sticky header with mobile menu
   - Smooth scroll to service sections (#construction, #handyman, etc.)
   - Active page highlighting

2. **Service Showcase**
   - 6 construction services with professional images
   - Construction & Remodeling (24/7 emergency)
   - Handyman Services
   - Painting Services
   - Exterior Building Services
   - Parking Lot Asphalt & Concrete
   - Snow Removal

3. **Contact Form**
   - Required: firstName, lastName, email, message (10+ chars)
   - Optional: website
   - React Hook Form + Zod validation
   - Toast notifications on success
   - Form auto-clears after submission

4. **Articles System**
   - React Query for data fetching
   - Loading skeleton states
   - Seeded content for property managers
   - 2-column responsive grid

5. **Professional Touches**
   - Official Shall's Construction logo in header and footer
   - "Celebrating 30+ Years in Business" tagline
   - Phone number always visible: (301) 933-6277
   - Fax: (301) 933-3386
   - Email: shallsconstructionllc@aol.com
   - Licensed in MD/VA/DC/DE
   - Service areas: Maryland, DC, Virginia, Delaware
   - SEO optimized with meta tags

## Technical Stack

- **Frontend**: React 18, Wouter (routing), TanStack Query
- **Backend**: Express.js, Node.js 20
- **Styling**: Tailwind CSS, Shadcn UI
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **Images**: AI-generated construction service photos
- **Storage**: In-memory (MemStorage)

## File Structure

```
client/
  src/
    components/
      Navigation.tsx - Header with desktop/mobile nav
      Footer.tsx - Multi-column footer with contact info
      SEO.tsx - React Helmet wrapper for meta tags and schema
    pages/
      Home.tsx - Landing page with hero and service cards
      WhatWeDo.tsx - Service detail sections
      WhoWeServe.tsx - Client showcase
      Articles.tsx - Blog listing
      Contact.tsx - Contact form
      ServiceAreas/
        BethesdaMD.tsx - Bethesda location landing page
        RockvilleMD.tsx - Rockville location landing page
        SilverSpringMD.tsx - Silver Spring location landing page
        BaltimoreMD.tsx - Baltimore location landing page
        GaithersburgMD.tsx - Gaithersburg location landing page
        DCMetro.tsx - DC Metro region landing page
    lib/
      schema.ts - JSON-LD generation utilities
      queryClient.ts - React Query configuration
    App.tsx - Router configuration with all routes
    index.css - Global styles and CSS variables
    main.tsx - App entry with HelmetProvider
server/
  routes.ts - API endpoints
  storage.ts - In-memory data storage
shared/
  schema.ts - TypeScript types and Zod schemas
attached_assets/
  generated_images/ - AI-generated service photos
public/
  sitemap.xml - XML sitemap for search engines
  robots.txt - Search engine crawler directives
```

## User Preferences

- Professional, corporate design aesthetic
- Blue and white color scheme (matches original site)
- Clean, readable typography
- Focus on property manager needs
- 24/7 emergency service emphasis
- Mobile-responsive design

## Development Commands

```bash
npm run dev  # Start development server (port 5000)
```

## Service Areas

Baltimore, Bethesda, Bowie, Chevy Chase, Clarksburg, Columbia, Frederick, Gaithersburg, Germantown, Laurel, Rockville, Silver Spring, Arlington, Fairfax, Annapolis, Delaware, Washington D.C., DC Metro

**Licensed in**: Maryland, Virginia, Washington DC, and Delaware

## Contact Information

- **Phone**: (301) 933-6277
- **Fax**: (301) 933-3386
- **Email**: shallsconstructionllc@aol.com

## Testing Notes

- All end-to-end tests passing
- Contact form submission verified
- Articles loading correctly from API
- Navigation and routing working
- Mobile menu functional
- Form validation working
- No console errors or warnings
- All 6 location pages accessible and functional
- Sitemap.xml and robots.txt accessible
- JSON-LD schemas validated on all pages
- Image lazy loading and dimensions working
- Footer internal linking functional

## SEO Features Implemented

### JSON-LD Schema Markup
- **LocalBusiness Schema**: On all pages with complete NAP data (Name, Address, Phone)
- **FAQPage Schema**: Property manager-focused Q&As on Home, What We Do, Who We Serve, and all location pages
- **BreadcrumbList Schema**: Navigation hierarchy on all pages for better SERP display
- **Service Areas**: Defined in schema covering all MD/VA/DC/DE locations

### Location Landing Pages (6)
Each location page includes:
- Location-specific H1 and content
- Service list with local context
- 2 location-specific FAQs
- Links to main service pages
- LocalBusiness schema with single area served
- Unique meta titles and descriptions

### Technical SEO
- Dynamic meta tags via react-helmet-async
- Unique titles (50-60 chars) and descriptions (150-160 chars) per page
- Open Graph and Twitter Card tags
- Canonical URLs
- XML sitemap with all 11 pages
- Robots.txt with sitemap reference
- Proper heading hierarchy (one H1 per page)

## Next Phase Features (Future)

- Image optimization (webp conversion, lazy loading)
- Backend email notifications for contact submissions (Resend integration)
- Full blog/article management system
- Individual article detail pages
- Image gallery for completed projects
- Service request/quote form
- Testimonials section with client reviews
- Service Areas dropdown in navigation
- Lighthouse performance audit and optimization
