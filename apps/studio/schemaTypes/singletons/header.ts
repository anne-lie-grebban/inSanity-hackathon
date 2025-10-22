import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Header Singleton
 * Global header configuration
 * Converted from ACF Options Page: grebbcommerce-header
 */
export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  // @ts-ignore - Sanity supports this but types might not be up to date
  __experimental_singleton: true,
  groups: [
    {
      name: 'navigation',
      title: 'Navigation',
      default: true,
    },
    {
      name: 'basket',
      title: 'Basket',
    },
    {
      name: 'banner',
      title: 'Banner',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fieldsets: [
    {
      name: 'basketLabels',
      title: 'Basket Labels',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'basketButtons',
      title: 'Basket Buttons',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'basketContent',
      title: 'Empty Basket Content',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    // Navigation - Main Navigation (3 levels deep as in Sportson CMS)
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      description: 'Create the menu of product categories',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item (Level 1)',
          fields: [
            defineField({
              name: 'link',
              title: 'Menu Link',
              type: 'link',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subLinks',
              title: 'Sub Links (Level 2)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'subNavItem',
                  title: 'Sub Navigation Item (Level 2)',
                  fields: [
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'column',
                      title: 'Column',
                      type: 'number',
                      description:
                        'Select 1-4. Determines which column the menu-item should be rendered in on desktop.',
                      validation: (Rule) => Rule.required().min(1).max(4),
                      initialValue: 1,
                    }),
                    defineField({
                      name: 'subLinks',
                      title: 'Sub Links (Level 3)',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'link',
                              title: 'Link',
                              type: 'link',
                              validation: (Rule) => Rule.required(),
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'link.text',
                            },
                          },
                        },
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'link.text',
                      column: 'column',
                      subLinksCount: 'subLinks',
                    },
                    prepare({title, column, subLinksCount}) {
                      const count = subLinksCount?.length || 0
                      return {
                        title: title || 'Untitled',
                        subtitle: `Col ${column}${count > 0 ? ` • ${count} sub-links` : ''}`,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'link.text',
              subLinksCount: 'subLinks',
            },
            prepare({title, subLinksCount}) {
              const count = subLinksCount?.length || 0
              return {
                title: title || 'Untitled',
                subtitle: count > 0 ? `${count} sub-links` : 'No sub-links',
              }
            },
          },
        },
      ],
    }),
    // Basket
    defineField({
      name: 'emptyBasketLabel',
      title: 'Empty Basket Label',
      type: 'string',
      description: 'Text shown when basket is empty',
      group: 'basket',
      fieldset: 'basketLabels',
    }),
    defineField({
      name: 'checkoutButton',
      title: 'Checkout Button',
      type: 'button',
      description: 'Checkout button configuration',
      group: 'basket',
      fieldset: 'basketButtons',
    }),
    defineField({
      name: 'emptyBasketText',
      title: 'Empty Basket Text',
      type: 'richText',
      description: 'Rich text content shown when basket is empty',
      group: 'basket',
      fieldset: 'basketContent',
    }),
    // Banner
    defineField({
      name: 'bannerMessage',
      title: 'Banner Message',
      type: 'object',
      description:
        'Top banner message. Leave link empty to only show text without making it clickable.',
      group: 'banner',
      fields: [
        defineField({
          name: 'text',
          title: 'Message Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link (Optional)',
          type: 'link',
          description: 'Leave empty to only show text',
        }),
      ],
    }),
    // Settings (legacy fields - can be hidden or removed later)
    defineField({
      name: 'showSearch',
      title: 'Show Search',
      type: 'boolean',
      description: 'Display search in header',
      group: 'settings',
      initialValue: true,
      hidden: true, // Hidden but kept for backwards compatibility
    }),
    defineField({
      name: 'showCart',
      title: 'Show Cart',
      type: 'boolean',
      description: 'Display cart icon in header',
      group: 'settings',
      initialValue: true,
      hidden: true,
    }),
    defineField({
      name: 'showAccount',
      title: 'Show Account',
      type: 'boolean',
      description: 'Display account/login in header',
      group: 'settings',
      initialValue: true,
      hidden: true,
    }),
    defineField({
      name: 'stickyHeader',
      title: 'Sticky Header',
      type: 'boolean',
      description: 'Make header sticky on scroll',
      group: 'settings',
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      description: 'Legacy announcement bar (replaced by Banner)',
      group: 'settings',
      hidden: true,
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Announcement Bar',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
        defineField({
          name: 'background',
          title: 'Background Color',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        subtitle: 'Global header configuration',
      }
    },
  },
})
