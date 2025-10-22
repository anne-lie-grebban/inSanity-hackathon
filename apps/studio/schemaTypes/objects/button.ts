import {ControlsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Button component - customizable button with link and styling
 * Converted from ACF field: field_5e873d56ee94b
 */
export const buttonObject = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
          {title: 'Ghost', value: 'ghost'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size',
      title: 'Button Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
        layout: 'radio',
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Optional)',
      type: 'icon',
      description: 'Add an optional icon to the button',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      hidden: ({parent}) => !parent?.icon,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      variant: 'variant',
    },
    prepare({label, variant}) {
      return {
        title: label || 'Button',
        subtitle: `Variant: ${variant || 'primary'}`,
      }
    },
  },
})
