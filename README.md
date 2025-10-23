# inSanity Monorepo

Monorepo for the Hackathon project with Sanity Studio and web app.

## Structure

```
insanity/
├── apps/
│   ├── studio/    # Sanity Studio
│   └── web/       # Frontend
└── packages/      # Shared packages (coming soon)
```

## Getting Started

### 1. Configure Environment Variables

Before running the project, you need to set up your environment variables:

**Automatic (recommended):**

```bash
./setup-env.sh
```

This creates `.env` files in `apps/studio` and `apps/web` from templates.

**Manual:**

Create `.env` files based on `.env.example`:

```bash
# apps/studio/.env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production

# apps/web/.env
REACT_APP_SANITY_PROJECT_ID=your-project-id
REACT_APP_SANITY_DATASET=production
```

> **Note:** `.env` files are ignored in git and will not be committed.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Development

Run all apps simultaneously:

```bash
pnpm dev
```

Run only Studio:

```bash
pnpm dev:studio
```

Run only web:

```bash
pnpm dev:web
```

### 4. Build

Build all apps:

```bash
pnpm build
```

Build specific app:

```bash
pnpm build:studio
pnpm build:web
```

## Language Support

The project supports:

- 🇸🇪 Swedish
- 🇬🇧 English
- 🇳🇴 Norwegian

## Plugins

- `@sanity/document-internationalization` - Multi-language support
- `sanity-plugin-media` - Enhanced media management
- `@sanity/dashboard` - Dashboard overview

## Security

Sensitive information such as API keys and project IDs are stored in `.env` files which are excluded from git.

**Files that should never be committed:**

- `.env`
- `.env.local`
- `.env*.local`

**Files that are OK to commit:**

- `.env.example` (used as template, contains no real values)
