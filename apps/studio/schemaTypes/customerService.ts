import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Customer Service document type
 * Converted from ACF post type: Customer Service
 */
export const customerServiceType = defineType({
  name: 'customer_service',
  title: 'Customer Service',
  type: 'document',
  icon: HelpCircleIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'heroBlock'},
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'carouselBlock'},
        {type: 'productGridBlock'},
        {type: 'faqBlock'},
        {type: 'ctaBlock'},
        {type: 'newsletterBlock'},
      ],
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
