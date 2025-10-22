import {defineField, defineType} from 'sanity'

/**
 * Articles Promotion Block
 * Converted from ACF layout: articles_promotion
 */
export const articlesPromotionBlock = defineType({
  name: 'articlesPromotionBlock',
  title: 'Articles Promotion',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'articles',
      title: 'Featured Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'button',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Articles Promotion',
        subtitle: subtitle || 'Featured articles section',
      }
    },
  },
})
