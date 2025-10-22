import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * CTA Block - Call to Action section
 */
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'richText',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'button'}],
      validation: (Rule) => Rule.min(1).max(2).required(),
    }),
    defineField({
      name: 'image',
      title: 'Background Image (Optional)',
      type: 'customImage',
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
          {title: 'Centered', value: 'center'},
          {title: 'Left Aligned', value: 'left'},
          {title: 'Right Aligned', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Regular', value: 'regular'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'regular',
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      media: 'image.image',
    },
    prepare({heading, media}) {
      return {
        title: heading || 'Call to Action',
        subtitle: 'CTA Block',
        media,
      }
    },
  },
})
