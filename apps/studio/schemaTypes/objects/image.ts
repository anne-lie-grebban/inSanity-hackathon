import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Image component - enhanced image with alt text and caption
 * Supports responsive images and focal point selection
 */
export const imageObject = defineType({
  name: 'customImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
      caption: 'caption',
    },
    prepare({title, media, caption}) {
      return {
        title: title || 'Image',
        subtitle: caption,
        media,
      }
    },
  },
})

