import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Video Block - Display videos with optional caption
 * Converted from ACF Video block
 */
export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'richText',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Start playing automatically (muted)',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      description: 'Loop the video',
      initialValue: false,
    }),
    defineField({
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      description: 'Display video controls',
      initialValue: true,
    }),
    defineField({
      name: 'size',
      title: 'Video Size',
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
  ],
  preview: {
    select: {
      title: 'video.title',
      media: 'video.thumbnail',
      heading: 'heading.text',
    },
    prepare({title, media, heading}) {
      return {
        title: heading || title || 'Video Block',
        subtitle: 'Video content',
        media,
      }
    },
  },
})
