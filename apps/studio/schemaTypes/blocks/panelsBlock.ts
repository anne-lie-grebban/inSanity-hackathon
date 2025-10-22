import {defineField, defineType} from 'sanity'

/**
 * Panels Block
 * Converted from ACF layout: panels (Hero Content)
 * Used as hero content with multiple panels
 */
export const panelsBlock = defineType({
  name: 'panelsBlock',
  title: 'Panels',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      description: 'Add 1-4 panels for the hero section',
      of: [
        {
          type: 'object',
          name: 'panel',
          title: 'Panel',
          fields: [
            defineField({
              name: 'title',
              title: 'Panel Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Panel Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'button',
              title: 'Button',
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
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Stack', value: 'stack'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'background',
      title: 'Section Background',
      type: 'background',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      panels: 'panels',
    },
    prepare({title, panels}) {
      const panelCount = panels?.length || 0
      return {
        title: title || 'Panels',
        subtitle: `${panelCount} panel${panelCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
