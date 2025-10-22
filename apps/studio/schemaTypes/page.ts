import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Page Document Type
 * Main page type with flexible content builder
 * Supports all converted ACF blocks
 */
export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The main title of the page',
      group: 'content',
      validation: (Rule) => [
        Rule.required().error('Title is required to identify the page'),
        Rule.min(3).warning('Title should be at least 3 characters for better readability'),
        Rule.max(100).warning('Title should be less than 100 characters for SEO purposes'),
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL-friendly identifier for the page',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => [Rule.required().error('Slug is required to generate the page URL')],
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Internal name for reference (not shown to visitors)',
      group: 'settings',
      validation: (Rule) => [Rule.required().error('Name is required for internal reference')],
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'Build your page using content blocks',
      group: 'content',
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
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default title for search engines',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Keep SEO title under 60 characters'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Keep SEO description under 160 characters'),
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      description: 'Image used when sharing on social media',
      group: 'seo',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
      slug: 'slug.current',
    },
    prepare({title, subtitle, slug}) {
      return {
        title,
        subtitle: `${subtitle}${slug ? ` • /${slug}` : ''}`,
      }
    },
  },
})
