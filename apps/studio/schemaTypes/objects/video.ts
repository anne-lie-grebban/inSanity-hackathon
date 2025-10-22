import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Video component - supports YouTube, Vimeo, and direct video uploads
 */
export const videoObject = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Upload Video File', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube video URL',
      hidden: ({parent}) => parent?.videoType !== 'youtube',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context.parent as {videoType?: string}
          if (parent?.videoType === 'youtube' && !url) {
            return 'YouTube URL is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'Full Vimeo video URL',
      hidden: ({parent}) => parent?.videoType !== 'vimeo',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context.parent as {videoType?: string}
          if (parent?.videoType === 'vimeo' && !url) {
            return 'Vimeo URL is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.videoType !== 'file',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Optional custom thumbnail image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Video Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      media: 'thumbnail',
    },
    prepare({title, videoType, media}) {
      return {
        title: title || 'Video',
        subtitle: `Type: ${videoType || 'youtube'}`,
        media,
      }
    },
  },
})

