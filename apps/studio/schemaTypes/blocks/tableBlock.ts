import {defineField, defineType} from 'sanity'

/**
 * Table Block
 * Converted from ACF layout: table
 */
export const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Table Title',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Table Caption',
      type: 'string',
      description: 'Optional caption for the table',
    }),
    defineField({
      name: 'headers',
      title: 'Table Headers',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          title: 'Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Row Cells',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({cells}) {
              return {
                title: cells ? cells.join(' | ') : 'Empty row',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tableStyle',
      title: 'Table Style',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Striped', value: 'striped'},
          {title: 'Bordered', value: 'bordered'},
          {title: 'Compact', value: 'compact'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'responsive',
      title: 'Responsive Table',
      type: 'boolean',
      initialValue: true,
      description: 'Make table horizontally scrollable on mobile',
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
      headers: 'headers',
      rows: 'rows',
    },
    prepare({title, headers, rows}) {
      const headerCount = headers?.length || 0
      const rowCount = rows?.length || 0
      return {
        title: title || 'Table',
        subtitle: `${headerCount} columns × ${rowCount} rows`,
      }
    },
  },
})
