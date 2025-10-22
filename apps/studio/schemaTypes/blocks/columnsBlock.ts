import {defineField, defineType} from 'sanity'

/**
 * Columns Block
 * Converted from ACF layouts: 2_columns, 3_columns
 */
export const columnsBlock = defineType({
  name: 'columnsBlock',
  title: 'Columns',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: [
          {title: '2 Columns', value: '2'},
          {title: '3 Columns', value: '3'},
        ],
        layout: 'radio',
      },
      initialValue: '2',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columnContent',
      title: 'Column Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'richText',
            }),
            defineField({
              name: 'image',
              title: 'Image',
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
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(3),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
      title: 'columnContent.0.title',
    },
    prepare({columns, title}) {
      return {
        title: `Columns (${columns})`,
        subtitle: title || 'Column layout',
      }
    },
  },
})
