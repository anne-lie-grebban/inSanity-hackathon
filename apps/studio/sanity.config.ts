import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {dashboardTool} from '@sanity/dashboard'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Hackathon Sanity',

  projectId: 'n7lt74il',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool(),
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
