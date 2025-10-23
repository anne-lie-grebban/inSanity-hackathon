# Frontend Web App

Minimal React + TypeScript + Emotion CSS frontend for Sanity CMS.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Emotion** - CSS-in-JS styling (styled components pattern)
- **Sanity Client** - CMS data fetching
- **GROQ** - Query language for Sanity

## Project Structure

```
src/
├── components/      # React components
│   └── Page.tsx    # Page component that fetches and displays Sanity pages
├── lib/            # Utilities
│   ├── sanity.client.ts  # Sanity client configuration
│   └── queries.ts        # GROQ queries
├── styles/         # Styling
│   ├── theme.ts          # Emotion theme configuration
│   └── emotion.d.ts      # TypeScript declarations for Emotion
├── App.tsx         # Root component
└── index.tsx       # Entry point
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure Sanity

The `.env` file is already configured with:

```
REACT_APP_SANITY_PROJECT_ID=n7lt74il
REACT_APP_SANITY_DATASET=production
```

### 3. Start development server

```bash
pnpm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Features

### Current

- ✅ Sanity CMS integration
- ✅ Emotion CSS-in-JS styling
- ✅ TypeScript support
- ✅ GROQ queries for pages, header, footer
- ✅ Theme system (colors, spacing, typography, breakpoints)
- ✅ Basic Page component that displays Sanity content

### To Add

- [ ] Content block renderers (Hero, CTA, FAQ, etc.)
- [ ] Header component
- [ ] Footer component
- [ ] Image optimization with Sanity Image URL builder
- [ ] Routing (React Router)
- [ ] SEO (react-helmet)

## Styling with Emotion

This project uses Emotion styled components, similar to sportson-frontend:

```tsx
import styled from "@emotion/styled";

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverted};
  border-radius: 4px;

  &:hover {
    opacity: 0.9;
  }
`;
```

## Fetching Data from Sanity

```tsx
import { sanityClient } from "./lib/sanity.client";
import { PAGE_QUERY } from "./lib/queries";

const data = await sanityClient.fetch(PAGE_QUERY, { slug: "startsidan" });
```

## Image Handling

Use the `urlFor` helper to generate optimized image URLs with hotspot support:

```tsx
import { urlFor } from "./lib/sanity.client";

const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .fit("crop") // Uses hotspot for smart cropping
  .url();
```
