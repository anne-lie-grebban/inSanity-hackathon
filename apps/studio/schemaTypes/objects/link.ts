import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Link component - supports internal, external, and product links
 * Converted from ACF custom field: component_link
 */
export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Product Link', value: 'product'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [
        {type: 'page'},
        {type: 'article'},
        {type: 'store'},
        {type: 'customer_service'},
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'productSku',
      title: 'Product SKU',
      type: 'string',
      description: 'Enter the product SKU or identifier',
      hidden: ({parent}) => parent?.linkType !== 'product',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Override the default link text',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      linkText: 'linkText',
      internalTitle: 'internalLink.title',
      externalUrl: 'externalUrl',
      productSku: 'productSku',
    },
    prepare({linkType, linkText, internalTitle, externalUrl, productSku}) {
      let subtitle = ''
      switch (linkType) {
        case 'internal':
          subtitle = internalTitle || 'Internal Link'
          break
        case 'external':
          subtitle = externalUrl || 'External URL'
          break
        case 'product':
          subtitle = `Product: ${productSku || 'Not specified'}`
          break
      }
      return {
        title: linkText || subtitle,
        subtitle,
      }
    },
  },
})

