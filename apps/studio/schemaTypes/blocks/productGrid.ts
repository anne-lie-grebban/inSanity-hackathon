import {ThLargeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Product Grid Block - Display products in a grid layout
 * Converted from ACF Product Grid block
 */
export const productGridBlock = defineType({
  name: 'productGridBlock',
  title: 'Product Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'heading',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
    }),
    defineField({
      name: 'selectionType',
      title: 'Product Selection Type',
      type: 'string',
      options: {
        list: [
          {title: 'Manual Selection', value: 'manual'},
          {title: 'Category', value: 'category'},
          {title: 'Brand', value: 'brand'},
          {title: 'Featured Products', value: 'featured'},
          {title: 'New Arrivals', value: 'new'},
          {title: 'Best Sellers', value: 'bestsellers'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productSkus',
      title: 'Product SKUs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Enter product SKUs manually',
      hidden: ({parent}) => parent?.selectionType !== 'manual',
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug',
      type: 'string',
      description: 'Enter the category slug/ID',
      hidden: ({parent}) => parent?.selectionType !== 'category',
    }),
    defineField({
      name: 'brandSlug',
      title: 'Brand Slug',
      type: 'string',
      description: 'Enter the brand slug/ID',
      hidden: ({parent}) => parent?.selectionType !== 'brand',
    }),
    defineField({
      name: 'maxProducts',
      title: 'Maximum Products',
      type: 'number',
      description: 'Maximum number of products to display',
      validation: (Rule) => Rule.min(1).max(50),
      initialValue: 12,
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'object',
      fields: [
        defineField({
          name: 'mobile',
          title: 'Mobile',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(2),
          initialValue: 2,
        }),
        defineField({
          name: 'tablet',
          title: 'Tablet',
          type: 'number',
          validation: (Rule) => Rule.min(2).max(4),
          initialValue: 3,
        }),
        defineField({
          name: 'desktop',
          title: 'Desktop',
          type: 'number',
          validation: (Rule) => Rule.min(2).max(6),
          initialValue: 4,
        }),
      ],
    }),
    defineField({
      name: 'showFilters',
      title: 'Show Filters',
      type: 'boolean',
      description: 'Display product filters (category, price, etc.)',
      initialValue: false,
    }),
    defineField({
      name: 'showSorting',
      title: 'Show Sorting',
      type: 'boolean',
      description: 'Allow users to sort products',
      initialValue: true,
    }),
    defineField({
      name: 'viewAllButton',
      title: 'View All Button',
      type: 'button',
      description: 'Optional button to view all products',
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      selectionType: 'selectionType',
      maxProducts: 'maxProducts',
    },
    prepare({heading, selectionType, maxProducts}) {
      return {
        title: heading || 'Product Grid',
        subtitle: `${selectionType || 'manual'} - Max ${maxProducts || 12} products`,
      }
    },
  },
})
