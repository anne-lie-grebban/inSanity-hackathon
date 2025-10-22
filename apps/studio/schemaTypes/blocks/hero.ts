import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Hero Block - Main hero section with heading, text, image/video and CTAs
 * Converted from ACF Hero block
 */
export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Optional subheading text',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'richText',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'customImage',
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Hero Video',
      type: 'video',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'buttons',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [{type: 'button'}],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Content Left, Media Right', value: 'left'},
          {title: 'Content Right, Media Left', value: 'right'},
          {title: 'Content Center, Full Width', value: 'center'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'fullHeight',
      title: 'Full Screen Height',
      type: 'boolean',
      description: 'Make the hero section full viewport height',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      media: 'image.image',
    },
    prepare({heading, media}) {
      return {
        title: heading || 'Hero Section',
        subtitle: 'Hero Block',
        media,
      }
    },
  },
})
