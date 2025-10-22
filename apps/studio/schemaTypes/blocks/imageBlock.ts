import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Image Block - Display images with optional caption and link
 * Converted from ACF Image block
 */
export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Full Width', value: 'full'},
        ],
        layout: 'radio',
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: 'Original', value: 'original'},
          {title: '16:9', value: '16/9'},
          {title: '4:3', value: '4/3'},
          {title: '1:1 (Square)', value: '1/1'},
          {title: '3:2', value: '3/2'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'original',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Optional link when clicking the image',
    }),
    defineField({
      name: 'showCaption',
      title: 'Show Caption',
      type: 'boolean',
      description: 'Display the image caption',
      initialValue: true,
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      title: 'image.alt',
      media: 'image.image',
      size: 'size',
    },
    prepare({title, media, size}) {
      return {
        title: title || 'Image Block',
        subtitle: `Size: ${size || 'large'}`,
        media,
      }
    },
  },
})
