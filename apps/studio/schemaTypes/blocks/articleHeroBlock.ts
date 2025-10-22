import {defineField, defineType} from 'sanity'

/**
 * Article Hero Block
 * Converted from ACF layout: article_hero (Hero Content)
 * Used as hero content for article pages
 */
export const articleHeroBlock = defineType({
  name: 'articleHeroBlock',
  title: 'Article Hero',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Background', value: 'background'},
          {title: 'Side', value: 'side'},
          {title: 'Top', value: 'top'},
        ],
        layout: 'radio',
      },
      initialValue: 'background',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "5 min read"',
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
      media: 'featuredImage',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Article Hero',
        subtitle: subtitle || 'Article hero section',
      }
    },
  },
})
