# Automotive Coil Spring Buffer Fitment Landing Page

A premium, high-converting automotive ecommerce landing page built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Vehicle Fitment Finder**: Interactive tool that recommends the right product based on vehicle make, model, and year
- **Measurement Fallback**: Alternative flow for vehicles not in the database
- **Premium Design**: Professional automotive technology aesthetic with corporate colors (intense red, black, grey)
- **Responsive**: Mobile-first design with optimal experience across all devices
- **Accessible**: WCAG-friendly implementation with keyboard navigation and screen reader support
- **SEO Optimized**: Proper metadata and semantic HTML structure
- **Analytics Ready**: Abstracted analytics layer ready for integration

## Tech Stack

- **Next.js 14** - App Router with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Lucide React** - Consistent icon system
- **React** - Component architecture

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── hero/                # Hero section
│   ├── fitment/             # Fitment finder components
│   ├── product/             # Product display components
│   ├── sections/            # Landing page sections
│   └── navigation/          # Nav and Footer
├── lib/
│   ├── fitment/             # Fitment engine logic
│   ├── analytics/           # Analytics abstraction
│   └── utils.ts             # Utility functions
├── data/
│   ├── fitment/             # Vehicle compatibility data
│   └── products/            # Product catalog
├── types/                   # TypeScript type definitions
└── public/
    └── images/              # Product images
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Add product images to `public/images/`:
   - product-buffer-e.jpg
   - product-buffer-d.jpg
   - product-buffer-c.jpg
   - product-buffer-b-plus.jpg
   - product-buffer-a-plus.jpg

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Design System

### Colors

- **Brand Red**: `#DC0000` - Primary CTA, accents, selected states
- **Black**: `#0A0A0A` - Text, backgrounds
- **Grey**: `#71727A` - Secondary text, borders

### Typography

- **Font**: Inter
- **Headings**: Bold, precise hierarchy
- **Body**: Readable, well-spaced

### Components

- Buttons: Primary (red), Secondary (black), Outline
- Cards: Clean borders, subtle shadows
- Inputs: Clear focus states, accessible labels

## Fitment System

### Data Architecture

The fitment system is designed to be replaceable:

- **Current**: Local demo data in `data/fitment/vehicle-data.ts`
- **Future**: Can be replaced with REST API, database, CMS, or external fitment API

### Fitment Engine

Core business logic in `lib/fitment/fitment-engine.ts`:

- `getFitmentRecommendation(vehicle)` - Returns recommendation based on vehicle
- `getFitmentFromMeasurement(measurement)` - Returns recommendation based on spring gap

### Size Ranges

Configurable in `data/fitment/size-ranges.ts`:

- Type E: 0.85" - 1.10"
- Type D: 1.10" - 1.25"
- Type C: 1.25" - 1.45"
- Type B+: 1.65" - 1.85"
- Type A+: 2.60" - 3.50"

## Analytics

Analytics abstraction in `lib/analytics/analytics.ts` provides tracking without vendor lock-in.

Events tracked:
- vehicle_finder_viewed
- make_selected
- model_selected
- year_selected
- fitment_check_started
- fitment_match_found
- measurement_required
- product_viewed
- product_cta_clicked

To integrate with your analytics provider, update the `track()` method.

## Deployment

This is a standard Next.js application and can be deployed to:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

## Demo Data

The current implementation uses clearly labeled demo data. All vehicle fitment data includes an `isDemo` flag.

In production, replace with:
- Verified vehicle compatibility database
- External fitment API
- CMS-managed product data

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels and descriptions
- Focus visible states
- Color contrast compliant
- Screen reader friendly
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved

## Support

For questions or support, contact your development team.
