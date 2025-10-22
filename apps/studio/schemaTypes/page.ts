import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The main title of the page',
      validation: (Rule) => [
        Rule.required().error('Title is required to identify the page'),
        Rule.min(3).warning('Title should be at least 3 characters for better readability'),
        Rule.max(100).warning('Title should be less than 100 characters for SEO purposes'),
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL-friendly identifier for the page',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => [Rule.required().error('Slug is required to generate the page URL')],
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Internal name for reference',
      validation: (Rule) => [Rule.required().error('Name is required for internal reference')],
    }),
    defineField({
      name: 'content',
      type: 'array',
      description: 'Main content of the page',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
      slug: 'slug.current',
    },
    prepare({title, subtitle, slug}) {
      return {
        title,
        subtitle: `${subtitle}${slug ? ` • /${slug}` : ''}`,
      }
    },
  },
})
