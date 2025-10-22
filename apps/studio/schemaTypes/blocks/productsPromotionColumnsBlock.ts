import {defineField, defineType} from 'sanity'

/**
 * Products Promotion Columns Block
 * Converted from ACF layout: products_promotion_columns
 */
export const productsPromotionColumnsBlock = defineType({
  name: 'productsPromotionColumnsBlock',
  title: 'Products Promotion (Columns)',
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
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'product',
          title: 'Product',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Product Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'link',
              title: 'Product Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: [
          {title: '2 Columns', value: '2'},
          {title: '3 Columns', value: '3'},
          {title: '4 Columns', value: '4'},
        ],
        layout: 'radio',
      },
      initialValue: '3',
    }),
    defineField({
      name: 'showPrices',
      title: 'Show Prices',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showAddToCart',
      title: 'Show Add to Cart Buttons',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaButton',
      title: 'View All Products Button',
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
      columns: 'columns',
    },
    prepare({title, subtitle, columns}) {
      return {
        title: title || 'Products Promotion (Columns)',
        subtitle: `${subtitle || ''} • ${columns} columns`.trim(),
      }
    },
  },
})
