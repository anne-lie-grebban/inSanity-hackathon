import {SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) =>
        Rule.max(60).warning('Meta title should be 50-60 characters for optimal display'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) =>
        Rule.max(160).warning('Meta description should be 150-160 characters for optimal display'),
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search engines (optional, less important nowadays)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'string',
      description: 'Prevent search engines from indexing this page',
      options: {
        list: [
          {title: 'Index (Default)', value: 'index'},
          {title: 'No Index', value: 'noindex'},
        ],
        layout: 'radio',
      },
      initialValue: 'index',
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'string',
      description: 'Prevent search engines from following links on this page',
      options: {
        list: [
          {title: 'Follow (Default)', value: 'follow'},
          {title: 'No Follow', value: 'nofollow'},
        ],
        layout: 'radio',
      },
      initialValue: 'follow',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      description: 'metaDescription',
    },
    prepare({title, description}) {
      return {
        title: title || 'No meta title',
        subtitle: description || 'No meta description',
        media: SearchIcon,
      }
    },
  },
})
