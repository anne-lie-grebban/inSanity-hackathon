import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Store document type
 * Converted from ACF post type: Stores
 */
export const storeType = defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'location', title: 'Location'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Store Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
      group: 'content',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {name: 'street', type: 'string', title: 'Street'},
        {name: 'city', type: 'string', title: 'City'},
        {name: 'postalCode', type: 'string', title: 'Postal Code'},
        {name: 'country', type: 'string', title: 'Country'},
      ],
      group: 'location',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      description: 'Geographic coordinates',
      fields: [
        {
          name: 'lat',
          type: 'number',
          title: 'Latitude',
          validation: (Rule) => Rule.min(-90).max(90),
        },
        {
          name: 'lng',
          type: 'number',
          title: 'Longitude',
          validation: (Rule) => Rule.min(-180).max(180),
        },
      ],
      group: 'location',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      group: 'content',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', type: 'string', title: 'Day'},
            {name: 'hours', type: 'string', title: 'Hours'},
          ],
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'address.city',
      media: 'featuredImage.image',
    },
  },
})
