# Sanity Schema - Konverterat från ACF

Detta schema är konverterat från ACF (Advanced Custom Fields) i sportson-cms WordPress-installationen.

## Struktur

```
schemaTypes/
├── objects/          # Återanvändbara komponentobjekt
│   ├── icon.ts
│   ├── link.ts
│   ├── button.ts
│   ├── heading.ts
│   ├── richText.ts
│   ├── checkbox.ts
│   ├── image.ts
│   ├── video.ts
│   ├── background.ts
│   └── index.ts
├── blocks/           # Content builder block
│   ├── hero.ts
│   ├── textBlock.ts
│   ├── imageBlock.ts
│   ├── videoBlock.ts
│   ├── carouselBlock.ts
│   ├── productGrid.ts
│   ├── faq.ts
│   ├── ctaBlock.ts
│   ├── newsletterBlock.ts
│   └── index.ts
├── page.ts          # Huvuddokumenttyp
└── index.ts         # Huvudindex med alla scheman
```

## Objects (Återanvändbara komponenter)

### icon

- **ACF Field:** `field_5ea19eff549b2`
- Stöder SVG, PNG och ICO format
- Inkluderar alt-text för accessibility

### link

- **ACF Field:** `component_link` (custom field)
- Stöder:
  - Interna länkar (references till andra dokument)
  - Externa länkar (URL)
  - Produktlänkar (SKU)
- Inkluderar "öppna i ny flik" option

### button

- **ACF Field:** `field_5e873d56ee94b`
- Varianter: primary, secondary, outline, ghost
- Storlekar: small, medium, large
- Valfri ikon (vänster eller höger)

### heading

- **ACF Field:** `field_5ec7db4b90562`
- H1-H6 nivåer
- Justerbar textalignment

### richText

- **ACF Field:** `grebbcommerce_textarea_bbcode`
- Portable Text med BBCode-liknande formatering
- Stöder:
  - H1-H6, normal text, blockquote
  - Listor (bullet, numbered)
  - Formatering (strong, emphasis, underline, code)
  - Länkar med target option

### checkbox

- **ACF Field:** `field_5f0d6bfff4970`
- Konfigurerbar label
- Required/optional
- Default checked state

### image (customImage)

- Förbättrad bildkomponent
- Hotspot/focal point
- Alt-text (required för accessibility)
- Valfri caption

### video

- YouTube, Vimeo eller uppladdad fil
- Custom thumbnail
- Titel och beskrivning

### background

- **ACF Field:** `field_5efdcc16fa431`
- Typer: färg, bild, gradient
- Valfri dark overlay för läsbarhet

## Blocks (Content Builder)

### heroBlock

Hero-sektion med:

- Heading och subheading
- Rich text content
- Bild eller video
- CTA-knappar (max 3)
- Anpassningsbar layout (left, right, center)
- Full height option

### textBlock

Enkel textsektion med:

- Valfri heading
- Rich text content
- Justerbar bredd (narrow, medium, wide, full)
- Textalignment

### imageBlock

Bildsektion med:

- Image med caption
- Storlekar (small, medium, large, full)
- Aspect ratio control
- Valfri länk
- Alignment

### videoBlock

Videosektion med:

- Video (YouTube/Vimeo/upload)
- Valfri heading och caption
- Autoplay, loop, controls
- Storlekar

### carouselBlock

Carousel/slider med:

- Flera slides (min 2)
- Heading, text och knapp per slide
- Autoplay med konfigurerbar hastighet
- Pilar och dots

### productGridBlock

Produktvisning med:

- Flera valmetoder (manual, category, brand, featured, etc)
- Konfigurerbart antal kolumner (mobile, tablet, desktop)
- Filter och sortering
- "View All" knapp

### faqBlock

FAQ-sektion med:

- **ACF Field:** `field_5ea7dc73cbe6c`
- Frågor och svar (accordion)
- Display styles: single accordion, multiple, eller expanded
- Heading och beskrivning

### ctaBlock

Call-to-action med:

- Heading och text
- Knappar (1-2 st)
- Bakgrundsbild eller färg
- Layout och storlek

### newsletterBlock

Nyhetsbrevsprenumeration med:

- **ACF Field:** `field_66684e17ef34c`
- Heading och beskrivning
- Email input
- Submit-knapp
- Consent checkbox
- Success/error meddelanden
- Layout styles

## Användning i React/Next.js

När du senare hämtar data från Sanity Studio använder du GROQ-queries:

```javascript
// Exempel: Hämta en sida
const query = `*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  content[]{
    _type,
    _type == "heroBlock" => {
      heading,
      subheading,
      "image": image.image.asset->url,
      buttons[]
    },
    _type == "textBlock" => {
      heading,
      content
    },
    // ... andra block-typer
  }
}`
```

## Nästa Steg

1. ✅ Grundläggande objects skapade
2. ✅ Content blocks skapade
3. ✅ Page document uppdaterat
4. 🔄 Skapa fler document-typer (article, store, customer_service)
5. 🔄 Lägg till custom input components om behövs
6. 🔄 Testa alla fält i Sanity Studio
7. 🔄 Konfigurera GROQ-queries i frontend

## Mappning från ACF

| ACF Koncept      | Sanity Koncept             |
| ---------------- | -------------------------- |
| Field Group      | Document Type eller Object |
| Flexible Content | Array of Blocks            |
| Repeater         | Array                      |
| Clone Field      | Reference till Object      |
| Post Object      | Reference                  |
| Taxonomy         | Reference eller Array      |

## Noteringar

- Vissa ACF-specifika fält (som `storm_stores`, `storm_manufacturers`) behöver anpassas till din produktdatabas
- Custom ACF field types (`component_link`, `grebbcommerce_textarea_bbcode`) har konverterats till standard Sanity-typer
- Conditional logic från ACF har översatts till `hidden` props i Sanity
- Validation rules har anpassats till Sanity's validation API
