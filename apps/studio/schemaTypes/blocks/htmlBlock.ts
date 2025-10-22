import {defineField, defineType} from 'sanity'

/**
 * HTML Block
 * Converted from ACF layout: html
 */
export const htmlBlock = defineType({
  name: 'htmlBlock',
  title: 'HTML',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      description: 'Internal title for reference',
    }),
    defineField({
      name: 'htmlContent',
      title: 'HTML Content',
      type: 'text',
      rows: 10,
      description: 'Raw HTML content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cssClasses',
      title: 'CSS Classes',
      type: 'string',
      description: 'Additional CSS classes to apply',
    }),
    defineField({
      name: 'containerWidth',
      title: 'Container Width',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Container', value: 'container'},
          {title: 'Narrow', value: 'narrow'},
        ],
        layout: 'radio',
      },
      initialValue: 'container',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'htmlContent',
    },
    prepare({title, content}) {
      const preview = content ? content.substring(0, 100) + '...' : 'No HTML content'
      return {
        title: title || 'HTML Block',
        subtitle: preview,
      }
    },
  },
})
