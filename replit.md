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