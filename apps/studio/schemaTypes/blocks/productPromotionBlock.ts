import {defineField, defineType} from 'sanity'

/**
 * Product Promotion Block
 * Converted from ACF layout: product_promotion
 */
export const productPromotionBlock = defineType({
  name: 'productPromotionBlock',
  title: 'Product Promotion',
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
      name: 'featuredProduct',
      title: 'Featured Product',
      type: 'object',
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
          rows: 3,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'promotionType',
      title: 'Promotion Type',
      type: 'string',
      options: {
        list: [
          {title: 'Sale', value: 'sale'},
          {title: 'New Arrival', value: 'new'},
          {title: 'Featured', value: 'featured'},
          {title: 'Limited Time', value: 'limited'},
        ],
        layout: 'radio',
      },
      initialValue: 'featured',
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Leave empty if not applicable',
    }),
    defineField({
      name: 'promotionText',
      title: 'Promotion Text',
      type: 'string',
      description: 'Custom promotion text (e.g., "50% OFF", "NEW")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
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
      featuredProduct: 'featuredProduct',
    },
    prepare({title, subtitle, featuredProduct}) {
      return {
        title: title || 'Product Promotion',
        subtitle:
          `${subtitle || ''} ${featuredProduct?.name ? `• ${featuredProduct.name}` : ''}`.trim(),
      }
    },
  },
})
