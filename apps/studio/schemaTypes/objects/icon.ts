import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Icon component - supports SVG, PNG, and ICO formats
 * Converted from ACF field: field_5ea19eff549b2
 */
export const iconObject = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (Element)',
      type: 'image',
      description: 'Upload an icon (SVG, PNG, or ICO format)',
      options: {
        hotspot: true,
        accept: 'image/svg+xml,image/png,image/x-icon',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the icon for accessibility',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'icon',
    },
    prepare({title, media}) {
      return {
        title: title || 'Icon',
        media,
      }
    },
  },
})

