import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * FAQ Block - Frequently Asked Questions with accordion
 * Converted from ACF field: field_5ea7dc73cbe6c
 */
export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
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
      description: 'Optional introductory text',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'richText',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
            prepare({title}) {
              return {
                title: title || 'FAQ Item',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Accordion (One at a time)', value: 'accordion-single'},
          {title: 'Accordion (Multiple open)', value: 'accordion-multiple'},
          {title: 'All Expanded', value: 'expanded'},
        ],
        layout: 'radio',
      },
      initialValue: 'accordion-single',
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      count: 'faqItems.length',
    },
    prepare({heading, count}) {
      return {
        title: heading || 'FAQ Section',
        subtitle: `${count || 0} questions`,
      }
    },
  },
})
