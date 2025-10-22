# inSanity Monorepo

Monorepo för Hackathon-projektet med Sanity Studio och web app.

## Struktur

```
insanity/
├── apps/
│   ├── studio/    # Sanity Studio
│   └── web/       # Frontend (kommer snart)
└── packages/      # Delade paket (kommer snart)
```

## Komma igång

### Installera dependencies

```bash
pnpm install
```

### Utveckling

Kör alla apps samtidigt:

```bash
pnpm dev
```

Kör bara Studio:

```bash
pnpm dev:studio
```

Kör bara web:

```bash
pnpm dev:web
```

### Bygga

Bygg alla apps:

```bash
pnpm build
```

Bygg specifik app:

```bash
pnpm build:studio
pnpm build:web
```

## Språkstöd

Projektet stödjer:

- 🇸🇪 Svenska
- 🇬🇧 English
- 🇳🇴 Norsk

## Plugins

- `@sanity/document-internationalization` - Flerspråksstöd
- `sanity-plugin-media` - Förbättrad mediahantering
- `@sanity/dashboard` - Dashboard-översikt
