import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fieldsets: [
    {
      name: 'productGridSettings',
      title: 'Product Grid Settings',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'productSelection',
      title: 'Product Selection',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
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
      validation: (Rule) => Rule.required().error('Slug is required for URL generation'),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the category',
      rows: 3,
      group: 'content',
    }),
    // Product Grid Settings
    defineField({
      name: 'productsPerPage',
      title: 'Products per Page',
      type: 'number',
      description:
        'Since the grid is based on 2 and 4 products on mobile, tablet and desktop, the number should be based on those numbers. Step size should always be 4 products.',
      validation: (Rule) =>
        Rule.required()
          .min(12)
          .max(40)
          .custom((value) => {
            if (value && value % 4 !== 0) {
              return 'Number must be divisible by 4'
            }
            return true
          })
          .error('Products per page must be between 12 and 40, divisible by 4'),
      initialValue: 20,
      group: 'content',
      fieldset: 'productGridSettings',
    }),
    // Product Selection - By Category
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the category to fetch from PIM (Norce)',
      validation: (Rule) => Rule.required().error('Category name is required to fetch products'),
      group: 'content',
      fieldset: 'productSelection',
    }),
    defineField({
      name: 'maxNumberOfProducts',
      title: 'Max Number of Products',
      type: 'number',
      description: 'Maximum number of products to display from this category',
      validation: (Rule) => Rule.min(1).warning('At least 1 product should be displayed'),
      initialValue: 100,
      group: 'content',
      fieldset: 'productSelection',
    }),
    // Page Content
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      description: 'Add promotional content blocks to the category page',
      group: 'content',
      of: [
        {type: 'productPromotionBlock'},
        {type: 'productsPromotionSliderBlock'},
        {type: 'newsletterBlock'},
        {type: 'discoverBlock'},
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categoryName: 'categoryName',
      productsPerPage: 'productsPerPage',
    },
    prepare({title, categoryName, productsPerPage}) {
      return {
        title: title || 'Untitled Category',
        subtitle: categoryName
          ? `${categoryName} • ${productsPerPage || 20} products/page`
          : 'No category selected',
        media: TagIcon,
      }
    },
  },
})
