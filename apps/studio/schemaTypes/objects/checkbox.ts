import {CheckmarkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Checkbox component - single checkbox with customizable label
 * Converted from ACF field: field_5f0d6bfff4970
 */
export const checkboxObject = defineType({
  name: 'checkbox',
  title: 'Checkbox',
  type: 'object',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Checkbox Label',
      type: 'text',
      rows: 2,
      description: 'The text displayed next to the checkbox',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'required',
      title: 'Required Field',
      type: 'boolean',
      description: 'Make this checkbox mandatory',
      initialValue: false,
    }),
    defineField({
      name: 'defaultChecked',
      title: 'Default Checked',
      type: 'boolean',
      description: 'Should this checkbox be checked by default?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      required: 'required',
    },
    prepare({label, required}) {
      return {
        title: label || 'Checkbox',
        subtitle: required ? 'Required' : 'Optional',
      }
    },
  },
})

