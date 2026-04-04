import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// 1. IMPORT YOUR SCHEMAS HERE (Pointing to your new 'sanity' folder)
import {schemaTypes} from './sanity/schemaTypes' 

// Fallbacks ensure it doesn't crash if the .env file is loading slowly
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lhj4296n';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  
  title: 'Dijana Boskovic CMS',

  plugins: [structureTool(), visionTool()],

  schema: {
    // 2. PLUG THEM INTO THE CONFIG HERE
    types: schemaTypes,
  },
})