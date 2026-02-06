# PrecisionGlass - Glass & Aluminium Installer Website

A bold, industrial, high-performance website for a glass and aluminium installation company. Mobile-first, SEO-optimized, and built for fast conversion.

## Project Structure

```
SH/
├── index.html          # Home page
├── our-work.html       # Portfolio/Gallery page
├── contact.html        # Contact & Quote request page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── images/             # Image assets (to be added)
    ├── hero-bg.webp    # Hero background
    ├── favicon.png     # Site favicon
    ├── project-1.webp  # Featured work images
    ├── project-2.webp
    ├── ...
    └── gallery/        # Gallery images
        ├── residential-1.webp
        ├── commercial-1.webp
        └── retail-1.webp
```

## Required Images

### Hero Section
- `images/hero-bg.webp` - Main hero background (1920x1080px recommended)
- `images/hero-bg.avif` - AVIF version for supported browsers (optional)
- `images/hero-bg.jpg` - JPEG fallback

### Featured Work Carousel (Home Page)
- `images/project-1.webp` through `images/project-6.webp`
- Recommended size: 1600x1200px (4:3 ratio)

### Gallery Page
Place in `images/gallery/` folder:
- Residential: `residential-1.webp` through `residential-5.webp`
- Commercial: `commercial-1.webp` through `commercial-4.webp`
- Retail: `retail-1.webp` through `retail-3.webp`

### Image Guidelines
- **Primary format:** WebP (75-85% quality)
- **Optional:** AVIF for hero images
- **Fallback:** JPEG only if required
- **Hero images:** max width 1920px
- **Gallery images:** max width 1600px
- **Thumbnails:** max width 600px

## Features

### Home Page
- Full-width hero with CTA
- Service cards grid
- Trust points / stats section
- Image carousel (manual navigation)
- Testimonials
- Final CTA section

### Our Work Page
- Filterable gallery (All / Residential / Commercial / Retail)
- Click-to-open lightbox
- Keyboard navigation in lightbox (Esc, Left, Right arrows)

### Contact Page
- Quote request form with:
  - Name, Phone, Email
  - Service type dropdown
  - Property type (Residential/Commercial/Retail)
  - Location
  - Project details
  - Image upload (drag & drop supported)
- Business hours
- Google Maps embed
- Contact information

### Global Features
- Sticky header with "Request a Quote" button
- Mobile-responsive hamburger menu
- Floating WhatsApp & Call buttons (mobile only)
- Lazy loading images
- Smooth scroll
- SEO meta tags

## Setup Instructions

1. **Add Images**
   Create the `images/` folder and add all required images in WebP format.

2. **Update Contact Information**
   Replace placeholder contact details in all HTML files:
   - Phone number: `+64211234567`
   - Email: `info@precisionglass.co.nz`
   - Address: `123 Industrial Ave, Auckland 1010`
   - WhatsApp link: `https://wa.me/64211234567`

3. **Google Maps**
   Update the iframe `src` in `contact.html` with your actual Google Maps embed URL.

4. **Form Backend**
   The quote form currently simulates submission. To make it functional:
   - Connect to your preferred form handling service (e.g., Formspree, Netlify Forms)
   - Or implement a custom backend endpoint

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --color-primary: #1a1a1a;      /* Charcoal/near-black */
  --color-accent: #0ea5e9;        /* Electric blue (CTA) */
  /* Alternative accent options: */
  /* --color-accent: #f97316;     Safety orange */
  /* --color-accent: #059669;     Deep industrial green */
}
```

### Typography
- **Headings:** Barlow Condensed (Google Fonts)
- **Body:** Inter (Google Fonts)

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile Safari, Chrome for Android
- Internet Explorer NOT supported

## Performance Notes
- Images use lazy loading
- Hero image is preloaded
- CSS and JS are production-ready (minify for deployment)
- Google Fonts loaded with `preconnect`

## Deployment
This is a static site that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any web hosting with HTML support

## License
Custom website for glass & aluminium installer business.
