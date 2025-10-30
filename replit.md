# Shall's Construction Website

## Overview
This project is a professional, responsive website for Shall's Construction, a commercial construction company with over 30 years of experience. The site aims to showcase their services (construction, maintenance, emergency services) and target property managers in Maryland, Virginia, Washington D.C., and Delaware. The goal is to provide a modern online presence using React, Express, and Tailwind CSS, replacing the original website. The site highlights the company's extensive experience, 24/7 availability, and 100% in-house team.

## User Preferences
- Professional, corporate design aesthetic
- Blue and white color scheme (matches original site)
- Clean, readable typography
- Focus on property manager needs
- 24/7 emergency service emphasis
- Mobile-responsive design

## System Architecture

### Frontend (React + Wouter)
The frontend is built with React 18 and uses Wouter for routing. Key UI/UX decisions include a professional blue and white color scheme, Montserrat and Open Sans typography, and a mobile-first responsive design. Shadcn UI components with custom styling are used. The site features 18 distinct pages, including a comprehensive About Us, detailed Services, Projects portfolio with filtering, Safety & Certifications, Service Areas, and Testimonials. Reusable components like `LogoGrid`, `StatCounter`, `ProjectCard`, `LeadershipCard`, and `TestimonialCard` ensure consistency. SEO is a core implementation with `react-helmet-async` for dynamic meta tags and a comprehensive JSON-LD schema system (LocalBusiness, FAQPage, BreadcrumbList).

### Backend (Express)
The backend uses Express.js and Node.js 20, primarily serving API routes for articles and contact form submissions. Data is stored in-memory using a `MemStorage` class. Zod is used for input validation on all API endpoints.

### Design System
- **Colors**: Primary blue (`#33A9DC`) and white.
- **Typography**: Headings use Montserrat (400-700), body text uses Open Sans (300-600).
- **Responsiveness**: Mobile-first approach with `md`/`lg` breakpoints.
- **Components**: Utilizes Shadcn UI with custom styling for consistent design.

### Feature Specifications
- **Multi-Page Navigation**: Sticky header with mobile menu, "About" dropdown, smooth scrolling to sections, 24/7 phone number prominently displayed.
- **Service Showcase**: Detailed sections for 6 construction services with professional images and emergency service emphasis.
- **Password Protection**:
  - Simple password gate protects entire site when deployed
  - Uses express-session for secure session management
  - Password stored as SITE_PASSWORD environment variable
  - 24-hour session persistence across page refreshes
  - Clean login page with Shall's Construction branding
- **Enhanced Contact Page**: 
  - Three inquiry types: Emergency Service (24/7), Request a Quote, General Inquiry
  - "We respond within 2 hours" promise banner
  - Conditional form fields based on inquiry type
  - Quote requests include: company, project type, budget range, preferred start date
  - Emergency type shows red alert with direct call-to-action
  - Form validated with React Hook Form and Zod, auto-clears on submission
- **Articles System**: Uses TanStack Query for data fetching with loading skeletons.
- **Comprehensive About Us**: Includes company story, leadership, mission, values, community involvement, and industry associations.
- **Projects Portfolio**: Features category filtering, project detail pages with before/after galleries, and project stats.
- **Safety & Certifications**: Displays OSHA compliance, licenses (MD, VA, DC, DE), insurance, bonding, and awards.
- **Testimonials**: Filterable by service type, 5-star ratings, and video testimonial placeholders.
- **Enhanced Homepage**: Includes stats bar, featured projects, client logos, and property manager-focused content.
- **SEO**: Dynamic meta tags, JSON-LD schema, location-specific landing pages, XML sitemap, and robots.txt.

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
- **AI-generated images**: For construction service photos.

## SEO Implementation

### H1/H2 Heading Hierarchy (Updated: October 30, 2025)

All pages now follow proper SEO heading hierarchy with exactly ONE H1 per page and appropriate H2 usage for major sections:

**Core Pages:**
- **Home.tsx**: H1 "Commercial Property Services in Maryland • Virginia • DC" + H2s for Services, Projects, Service Areas, Blog sections
- **About.tsx**: H1 "Who We Are" + H2s for Company Story, Leadership, Mission & Values
- **WhatWeDo.tsx**: H1 "We make your life easier..." + H2s for each service category
- **WhoWeServe.tsx**: H1 "We Serve Property Managers" + H2s for service sections
- **Contact.tsx**: H1 "Contact Us" + H2s for form sections and contact info
- **Safety.tsx**: H1 "Safety & Certifications" + H2s for OSHA, licenses, insurance
- **ServiceAreas.tsx**: H1 "Service Areas" + H2s for regional sections
- **Projects.tsx**: H1 "Our Projects" + H2s for filtering and CTA
- **Testimonials.tsx**: H1 "What Our Clients Say" + H2s for filters and sections

**Dynamic Pages:**
- **ServiceDetail.tsx**: H1 with service title + H2s for description, process, featured projects, related services
- **ProjectDetail.tsx**: H1 with project title + H2s for details, results, related content
- **BlogDetail.tsx**: H1 with blog post title + H2s for sections and related resources
- **Articles.tsx**: H1 "News & Insights from Shall's Construction" + H2s for categories

**Location Pages (6 pages):**
- Each has H1 with "{City} Commercial Property Services" + H2s for services offered, service areas, why choose us

**Error States:**
- All error pages use H2 (not H1) for "Not Found" messages to maintain single H1 on success state

### Internal Linking Strategy (Updated: October 30, 2025)

Comprehensive internal linking has been implemented to create a strong site architecture for SEO and user navigation:

**1. Service Pages → Projects & Locations**
- **ServiceDetail.tsx** includes:
  - "Featured Projects" section: Links to 3 relevant projects filtered by service category
  - Sidebar "Service Areas" section: Links to all 6 location pages (Bethesda, Rockville, Silver Spring, Baltimore, Gaithersburg, DC Metro)
  - "View All Projects" button linking to /projects
  - "View All Service Areas" link

**2. Project Pages → Services & Locations**
- **ProjectDetail.tsx** includes:
  - "View {Category} Services" button linking to related service page
  - "Learn About Our Services in {Location}" link to relevant location page
  - Category-to-service mapping: construction→construction-remodeling, painting→painting-services, asphalt→parking-lot-services, etc.
  - Location-to-slug mapping for Bethesda, Rockville, Silver Spring, Baltimore, Gaithersburg, DC Metro

**3. Blog Posts → Services & Projects**
- **BlogDetail.tsx** includes:
  - "Related Resources" section with contextual links based on blog category:
    - Safety articles → Safety & Certifications page, All Services
    - Maintenance articles → Exterior Building Services, Handyman Services
    - Industry News → What We Do, Who We Serve
    - Tips → All Services, Service Areas
    - Case Studies → Our Projects, What We Do
  - Links use descriptive anchor text and icons

**4. Homepage → All Key Pages**
- **Home.tsx** includes comprehensive linking:
  - Hero: Links to /contact?type=quote and /contact?type=emergency
  - Services section: Links to 6 service detail pages via anchor links
  - Projects section: Links to 3 featured projects and /projects
  - Testimonials section: Links to /testimonials
  - **NEW Service Areas section**: Links to all 6 location pages with descriptions
  - **NEW Blog/Articles section**: Links to /blog with category highlights (Safety, Maintenance, Case Studies)
  - Footer: Links to all major pages

**5. Location Pages → Services** (Already implemented)
- All 6 location pages dynamically link to all available services
- Each service card links to corresponding service detail page

**6. Navigation & Footer** (Global linking)
- Navigation: Links to Home, About, Services, Projects, Blog, Testimonials, Contact, Safety, Service Areas
- Footer: Comprehensive links to all major pages and social media

### SEO Best Practices Implemented

**Anchor Text:**
- All internal links use descriptive, keyword-rich anchor text
- Examples: "View Construction & Remodeling Projects", "Bethesda Commercial Property Services", "Learn About Our Safety Standards"

**Link Distribution:**
- 2-5 contextual links per section (not over-linking)
- Links are natural and provide value to users
- Bi-directional linking where appropriate (e.g., Services ↔ Projects, Projects ↔ Locations)

**User Experience:**
- All links use Wouter's `<Link>` component for client-side navigation
- Hover states and visual feedback on all clickable elements
- Mobile-responsive link layouts

**Technical Implementation:**
- Service-to-project category mapping for automatic related content
- Location slug mapping for consistent URL structure
- TanStack Query for efficient data fetching
- Conditional rendering to show links only when data exists