# Getting Started

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Development

The site is now running locally. You can:

- Edit pages in `app/`
- Modify components in `components/`
- Update fitment data in `data/fitment/vehicle-data.ts`
- Configure product catalog in `data/products/products.ts`
- Adjust size ranges in `data/fitment/size-ranges.ts`

## Adding Product Images

Place product images in `public/images/`:

- `product-buffer-e.jpg` - Type E buffer
- `product-buffer-d.jpg` - Type D buffer
- `product-buffer-c.jpg` - Type C buffer
- `product-buffer-b-plus.jpg` - Type B+ buffer
- `product-buffer-a-plus.jpg` - Type A+ buffer

## Building for Production

```bash
npm run build
npm start
```

## Customization

### Update Corporate Colors

Edit `tailwind.config.ts`:
- `brand.red` - Primary CTA color
- `brand.black` - Text and backgrounds
- `brand.grey` - Secondary elements

### Add More Vehicles

Edit `data/fitment/vehicle-data.ts`:
```typescript
{
  make: 'Tesla',
  model: 'Model 3',
  yearStart: 2020,
  yearEnd: 2024,
  position: 'rear',
  recommendedType: 'C',
  springGapMin: 1.25,
  springGapMax: 1.45,
  confidence: 'HIGH',
  isDemo: true, // Remove this for production data
}
```

### Integrate Analytics

Update `lib/analytics/analytics.ts` to connect to your analytics provider:

```typescript
track(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
  // Add your analytics implementation:
  // Google Analytics:
  gtag('event', event, properties);
  // Or Segment:
  analytics.track(event, properties);
}
```

### Replace with Real API

Update `lib/fitment/fitment-engine.ts` to fetch from your API:

```typescript
export async function getFitmentRecommendation(vehicle: Vehicle) {
  const response = await fetch('/api/fitment', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  });
  return response.json();
}
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx             # Landing page assembly
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI (Button, Input, etc.)
│   ├── hero/                # Hero section
│   ├── fitment/             # Vehicle fitment finder
│   ├── product/             # Product display
│   ├── sections/            # Page sections
│   └── navigation/          # Header & Footer
├── lib/
│   ├── fitment/             # Business logic
│   ├── analytics/           # Event tracking
│   └── utils.ts             # Helpers
├── data/
│   ├── fitment/             # Vehicle data (replace with API)
│   └── products/            # Product catalog
└── types/                   # TypeScript definitions
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Features

✅ Vehicle fitment finder  
✅ Manual measurement fallback  
✅ Multiple product sizes  
✅ Confidence indicators  
✅ Mobile-responsive design  
✅ Accessibility compliant  
✅ SEO optimized  
✅ Analytics ready  
✅ Demo data clearly labeled  

## Support

For questions or issues, refer to the main README.md file.

## Next Steps

1. Replace demo data with production vehicle compatibility data
2. Add real product images
3. Connect to your analytics platform
4. Configure purchase URLs for actual checkout
5. Deploy to your hosting provider (Vercel recommended)

Happy building! 🚀
