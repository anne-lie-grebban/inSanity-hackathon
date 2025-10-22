import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Carousel Block - Image/content carousel/slider
 */
export const carouselBlock = defineType({
  name: 'carouselBlock',
  title: 'Carousel/Slider',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'customImage',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Slide Heading',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Slide Text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'button',
              title: 'Button',
              type: 'button',
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              media: 'image.image',
            },
            prepare({title, media}) {
              return {
                title: title || 'Slide',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).required(),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically advance slides',
      initialValue: true,
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      description: 'Time between slide transitions',
      validation: (Rule) => Rule.min(2).max(10),
      initialValue: 5,
      hidden: ({parent}) => !parent?.autoplay,
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showDots',
      title: 'Show Dots',
      type: 'boolean',
      description: 'Show dot indicators',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      count: 'slides.length',
    },
    prepare({heading, count}) {
      return {
        title: heading || 'Carousel',
        subtitle: `${count || 0} slides`,
      }
    },
  },
})
