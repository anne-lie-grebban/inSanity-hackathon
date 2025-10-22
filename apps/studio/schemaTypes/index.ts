import {pageType} from './page'
import {articleType} from './article'
import {storeType} from './store'
import {customerServiceType} from './customerService'

// Import all reusable objects
import {
  backgroundObject,
  buttonObject,
  checkboxObject,
  headingObject,
  iconObject,
  imageObject,
  linkObject,
  richTextObject,
  videoObject,
} from './objects'

// Import all blocks
import {
  carouselBlock,
  ctaBlock,
  faqBlock,
  heroBlock,
  imageBlock as imageBlockType,
  newsletterBlock,
  productGridBlock,
  textBlock,
  videoBlock as videoBlockType,
} from './blocks'

export const schemaTypes = [
  // Documents
  pageType,
  articleType,
  storeType,
  customerServiceType,

  // Objects - Reusable components
  backgroundObject,
  buttonObject,
  checkboxObject,
  headingObject,
  iconObject,
  imageObject,
  linkObject,
  richTextObject,
  videoObject,

  // Blocks - Content builder components
  carouselBlock,
  ctaBlock,
  faqBlock,
  heroBlock,
  imageBlockType,
  newsletterBlock,
  productGridBlock,
  textBlock,
  videoBlockType,
]
