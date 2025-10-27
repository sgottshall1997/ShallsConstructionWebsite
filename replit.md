# Shall's Construction Website

## Project Overview

Professional commercial construction company website serving property managers in Maryland, Virginia, and DC. This is a modern remake of the original shallsconstruction.com website, built with React, Express, and Tailwind CSS.

**Status**: ✅ MVP Complete  
**Last Updated**: October 27, 2025

## Purpose

Create a professional, responsive website for Shall's Construction that showcases their 25+ years of experience in commercial property maintenance and construction services. The site targets property managers who need reliable construction, maintenance, and emergency services.

## Recent Changes

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
- **Components**: Navigation (desktop/mobile), Footer

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
   - 25 Years Anniversary badge throughout
   - Phone number always visible: (301) 933-6277
   - Fax: (301) 933-3386
   - Email: shallsconstructionllc@aol.com
   - Service areas listed in footer
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
    pages/
      Home.tsx - Landing page with hero and service cards
      WhatWeDo.tsx - Service detail sections
      WhoWeServe.tsx - Client showcase
      Articles.tsx - Blog listing
      Contact.tsx - Contact form
    App.tsx - Router configuration
    index.css - Global styles and CSS variables
server/
  routes.ts - API endpoints
  storage.ts - In-memory data storage
shared/
  schema.ts - TypeScript types and Zod schemas
attached_assets/
  generated_images/ - AI-generated service photos
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

Baltimore, Bethesda, Bowie, Chevy Chase, Clarksburg, Columbia, Frederick, Gaithersburg, Germantown, Laurel, Rockville, Silver Spring, Arlington, Fairfax, Annapolis, Washington D.C., DC Metro

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

## Next Phase Features (Future)

- Backend email notifications for contact submissions
- Full blog/article management system
- Individual article detail pages
- Image gallery for completed projects
- Service request/quote form
- Testimonials section with client reviews
- Integration with email service (SendGrid/Resend)
