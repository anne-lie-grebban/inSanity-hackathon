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
  fieldsets: [
    {name: 'content', title: 'Content', options: {collapsible: true, collapsed: true}},
    {name: 'settings', title: 'Carousel Settings', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      fieldset: 'content',
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
      fieldset: 'content',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically advance slides',
      initialValue: true,
      fieldset: 'settings',
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      description: 'Time between slide transitions',
      validation: (Rule) => Rule.min(2).max(10),
      initialValue: 5,
      hidden: ({parent}) => !parent?.autoplay,
      fieldset: 'settings',
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
      fieldset: 'settings',
    }),
    defineField({
      name: 'showDots',
      title: 'Show Dots',
      type: 'boolean',
      description: 'Show dot indicators',
      initialValue: true,
      fieldset: 'settings',
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
