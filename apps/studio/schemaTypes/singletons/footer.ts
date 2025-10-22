import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Footer Singleton
 * Global footer configuration
 * Converted from ACF Options Page: grebbcommerce-footer
 */
export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockContentIcon,
  // @ts-ignore - Sanity supports this but types might not be up to date
  __experimental_singleton: true,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'social',
      title: 'Social Media',
    },
    {
      name: 'legal',
      title: 'Legal',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    // Content
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Newsletter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'placeholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Enter your email',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Subscribe',
          hidden: ({parent}) => !parent?.enabled,
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      description: 'Footer link columns',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Link Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({title, links}) {
              return {
                title,
                subtitle: links?.length ? `${links.length} links` : 'No links',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'showContact',
          title: 'Show Contact Info',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          hidden: ({parent}) => !parent?.showContact,
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
          hidden: ({parent}) => !parent?.showContact,
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          hidden: ({parent}) => !parent?.showContact,
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          hidden: ({parent}) => !parent?.showContact,
        }),
      ],
    }),
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      description: 'Social media profiles',
      group: 'social',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Pinterest', value: 'pinterest'},
                  {title: 'Other', value: 'other'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Display Name',
              type: 'string',
              description: 'Optional custom name',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Custom Icon',
              type: 'icon',
              description: 'Optional custom icon (overrides default platform icon)',
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              name: 'name',
              url: 'url',
            },
            prepare({platform, name, url}) {
              return {
                title: name || platform,
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    // Legal
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'legal',
      initialValue: `© ${new Date().getFullYear()} All rights reserved`,
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      description: 'Privacy policy, terms, etc.',
      group: 'legal',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      type: 'array',
      description: 'Payment method logos',
      group: 'legal',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    // Settings
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
      group: 'settings',
    }),
    defineField({
      name: 'showLanguageSwitcher',
      title: 'Show Language Switcher',
      type: 'boolean',
      description: 'Display language/region selector in footer',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'showCurrencySwitcher',
      title: 'Show Currency Switcher',
      type: 'boolean',
      description: 'Display currency selector in footer',
      group: 'settings',
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Global footer configuration',
      }
    },
  },
})
