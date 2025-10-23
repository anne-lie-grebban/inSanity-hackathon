import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {dashboardTool} from '@sanity/dashboard'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Hackathon Sanity',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    dashboardTool({
      widgets: [],
    }),
    media(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'sv', title: 'Svenska'},
        {id: 'en', title: 'English'},
        {id: 'no', title: 'Norsk'},
      ],
      schemaTypes: ['page'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
