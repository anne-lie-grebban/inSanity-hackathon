import {ColorWheelIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Background component - color or image background
 * Converted from ACF field: field_5efdcc16fa431
 */
export const backgroundObject = defineType({
  name: 'background',
  title: 'Background',
  type: 'object',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Color', value: 'color'},
          {title: 'Image', value: 'image'},
          {title: 'Gradient', value: 'gradient'},
        ],
        layout: 'radio',
      },
      initialValue: 'color',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Background Color',
      type: 'string',
      description: 'Enter a hex color code (e.g., #000000)',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }).custom((value, context) => {
          if (!value && context.parent?.type === 'color') {
            return 'Color is required when background type is Color'
          }
          return true
        }),
      hidden: ({parent}) => parent?.type !== 'color',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient From',
      type: 'string',
      description: 'Enter a hex color code (e.g., #000000)',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
        }),
      hidden: ({parent}) => parent?.type !== 'gradient',
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient To',
      type: 'string',
      description: 'Enter a hex color code (e.g., #000000)',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
        }),
      hidden: ({parent}) => parent?.type !== 'gradient',
    }),
    defineField({
      name: 'gradientDirection',
      title: 'Gradient Direction',
      type: 'string',
      options: {
        list: [
          {title: 'Top to Bottom', value: 'to-b'},
          {title: 'Left to Right', value: 'to-r'},
          {title: 'Diagonal (TL to BR)', value: 'to-br'},
          {title: 'Diagonal (TR to BL)', value: 'to-bl'},
        ],
      },
      initialValue: 'to-b',
      hidden: ({parent}) => parent?.type !== 'gradient',
    }),
    defineField({
      name: 'overlay',
      title: 'Dark Overlay',
      type: 'boolean',
      description: 'Add a dark overlay (useful for text readability)',
      initialValue: false,
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Opacity percentage (0-100)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 50,
      hidden: ({parent}) => !parent?.overlay,
    }),
  ],
  preview: {
    select: {
      type: 'type',
      media: 'image',
    },
    prepare({type, media}) {
      return {
        title: 'Background',
        subtitle: `Type: ${type || 'color'}`,
        media,
      }
    },
  },
})
