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
  fieldsets: [
    {name: 'content', title: 'Content', options: {collapsible: true, collapsed: true}},
    {name: 'form', title: 'Form Settings', options: {collapsible: true, collapsed: true}},
    {name: 'settings', title: 'Layout & Settings', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      validation: (Rule) => Rule.required(),
      fieldset: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
      description: 'Explain the benefits of subscribing',
      fieldset: 'content',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      description: 'Placeholder text for email input',
      initialValue: 'Enter your email',
      fieldset: 'form',
    }),
    defineField({
      name: 'submitButton',
      title: 'Submit Button',
      type: 'button',
      validation: (Rule) => Rule.required(),
      fieldset: 'form',
    }),
    defineField({
      name: 'consentCheckbox',
      title: 'Consent Checkbox',
      type: 'checkbox',
      validation: (Rule) => Rule.required(),
      fieldset: 'form',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      description: 'Message shown after successful signup',
      initialValue: 'Thank you for subscribing!',
      fieldset: 'form',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      description: 'Message shown if signup fails',
      initialValue: 'Something went wrong. Please try again.',
      fieldset: 'form',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
      fieldset: 'settings',
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
      fieldset: 'settings',
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
