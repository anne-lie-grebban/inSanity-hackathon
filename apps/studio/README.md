# Hackathon Sanity Studio

Sanity Studio for the Hackathon project with multi-language support and enhanced media management.

## Getting Started

### 1. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual Sanity project ID:

```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

> **Note:** The `.env` file is gitignored and will not be committed.

### 2. Install Dependencies

From monorepo root:

```bash
pnpm install
```

### 3. Start Development Server

From monorepo root:

```bash
pnpm dev:studio
```

Or from this directory:

```bash
pnpm dev
```

Studio opens at [http://localhost:3333](http://localhost:3333)

## Features

- **Multi-language Support**: Swedish, English, and Norwegian via `@sanity/document-internationalization`
- **Media Management**: Enhanced media management with `sanity-plugin-media`
- **Dashboard**: Overview with `@sanity/dashboard`
- **Vision**: GROQ queries with `@sanity/vision`

## Schema

All schema types are in the `schemaTypes/` folder. See [schemaTypes/README.md](./schemaTypes/README.md) for more information.

## Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [Join the Sanity Community](https://www.sanity.io/community/join)
- [Extend and Build Plugins](https://www.sanity.io/docs/content-studio/extending)
