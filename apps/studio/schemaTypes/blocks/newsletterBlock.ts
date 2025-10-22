import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Newsletter Block - Newsletter signup form
 * Converted from ACF Newsletter block (field_66684e17ef34c)
 */
export const newsletterBlock = defineType({
  name: 'newsletterBlock',
  title: 'Newsletter Signup',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
      description: 'Explain the benefits of subscribing',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      description: 'Placeholder text for email input',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'submitButton',
      title: 'Submit Button',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentCheckbox',
      title: 'Consent Checkbox',
      type: 'checkbox',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      description: 'Message shown after successful signup',
      initialValue: 'Thank you for subscribing!',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      description: 'Message shown if signup fails',
      initialValue: 'Something went wrong. Please try again.',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Inline', value: 'inline'},
          {title: 'Stacked', value: 'stacked'},
          {title: 'Card', value: 'card'},
        ],
        layout: 'radio',
      },
      initialValue: 'inline',
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
    },
    prepare({heading}) {
      return {
        title: heading || 'Newsletter Signup',
        subtitle: 'Newsletter Block',
      }
    },
  },
})
