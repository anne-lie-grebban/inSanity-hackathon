import {defineField, defineType} from 'sanity'

/**
 * Products Promotion Slider Block
 * Converted from ACF layout: products_promotion_slider
 */
export const productsPromotionSliderBlock = defineType({
  name: 'productsPromotionSliderBlock',
  title: 'Products Promotion (Slider)',
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
      validation: (Rule) => Rule.min(3).max(12),
    }),
    defineField({
      name: 'slidesToShow',
      title: 'Slides to Show',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      initialValue: 5,
      hidden: ({parent}) => !parent?.autoplay,
    }),
    defineField({
      name: 'showDots',
      title: 'Show Dots Navigation',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Arrow Navigation',
      type: 'boolean',
      initialValue: true,
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
      slidesToShow: 'slidesToShow',
    },
    prepare({title, subtitle, slidesToShow}) {
      return {
        title: title || 'Products Promotion (Slider)',
        subtitle: `${subtitle || ''} • ${slidesToShow} slides visible`.trim(),
      }
    },
  },
})
