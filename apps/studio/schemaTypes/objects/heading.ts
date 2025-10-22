import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Heading component - flexible heading with customizable level
 * Converted from ACF field: field_5ec7db4b90562
 */
export const headingObject = defineType({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Heading Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'h2',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      level: 'level',
    },
    prepare({text, level}) {
      return {
        title: text || 'Heading',
        subtitle: (level || 'h2').toUpperCase(),
      }
    },
  },
})

