import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import React from 'react'
import {useFormValue} from 'sanity'

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
      name: 'settings',
      title: 'Settings',
      default: true,
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Language fields for document internationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'translations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'page'}]}],
      readOnly: true,
      hidden: true,
    }),
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
      name: 'template',
      title: 'Page Template',
      type: 'string',
      description: 'Choose a template for this page',
      group: 'settings',
      options: {
        list: [
          {title: 'Default Template', value: 'default'},
          {title: 'Page - 404', value: '404'},
          {title: 'Page - FrontPage', value: 'frontpage'},
          {title: 'Page - About us', value: 'about'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required().error('Template selection is required'),
    }),
    // Template indicator for Content tab
    defineField({
      name: 'templateIndicator',
      type: 'string',
      group: 'content',
      components: {
        input: () => null,
        field: () => {
          // Use Sanity's hook to get the template value from the form
          const template = useFormValue(['template']) as string

          const templateLabels: Record<string, string> = {
            default: 'Default Template',
            '404': 'Page - 404',
            frontpage: 'Page - FrontPage',
            about: 'Page - About us',
          }
          const templateLabel = template ? templateLabels[template] || template : 'Default Template'

          return React.createElement(
            'div',
            {
              style: {
                padding: '12px 16px',
                marginBottom: '16px',
                backgroundColor: '#f1f3f4',
                borderRadius: '4px',
                borderLeft: '4px solid #2276fc',
              },
            },
            React.createElement(
              'div',
              {
                style: {
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#66758d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                },
              },
              'Selected Template',
            ),
            React.createElement(
              'div',
              {
                style: {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#101729',
                },
              },
              templateLabel,
            ),
          )
        },
      },
    }),
    defineField({
      name: 'heroContent',
      title: 'Hero Content',
      type: 'array',
      description: 'Hero section content (appears above main content)',
      group: 'content',
      of: [{type: 'heroBlock'}, {type: 'panelsBlock'}, {type: 'articleHeroBlock'}],
      validation: (Rule) => Rule.max(1).warning('Only one hero content block is recommended'),
      hidden: ({parent}) => parent?.template === 'default',
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'Build your page using content blocks',
      group: 'content',
      of: [
        // Core content blocks
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'carouselBlock'},
        {type: 'productGridBlock'},
        {type: 'faqBlock'},
        {type: 'ctaBlock'},
        {type: 'newsletterBlock'},
        // Additional ACF content types
        {type: 'articlesPromotionBlock'},
        {type: 'columnsBlock'},
        {type: 'discoverBlock'},
        {type: 'htmlBlock'},
        {type: 'informationBlock'},
        {type: 'productPromotionBlock'},
        {type: 'productsPromotionColumnsBlock'},
        {type: 'productsPromotionSliderBlock'},
        {type: 'tableBlock'},
        {type: 'textSectionBlock'},
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
      template: 'template',
    },
    prepare({title, subtitle, slug, template}) {
      const templateLabels = {
        default: 'Default Template',
        '404': '404 Page',
        frontpage: 'Front Page',
        about: 'About Us',
      }
      const templateLabel =
        templateLabels[template as keyof typeof templateLabels] || 'Unknown Template'
      return {
        title,
        subtitle: `${subtitle}${slug ? ` • /${slug}` : ''} • ${templateLabel}`,
      }
    },
  },
})
