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
  // Core blocks
  carouselBlock,
  ctaBlock,
  faqBlock,
  heroBlock,
  imageBlock as imageBlockType,
  newsletterBlock,
  productGridBlock,
  textBlock,
  videoBlock as videoBlockType,
  // Hero content blocks
  panelsBlock,
  articleHeroBlock,
  // Additional ACF content blocks
  articlesPromotionBlock,
  columnsBlock,
  discoverBlock,
  htmlBlock,
  informationBlock,
  productPromotionBlock,
  productsPromotionColumnsBlock,
  productsPromotionSliderBlock,
  tableBlock,
  textSectionBlock,
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
  // Core blocks
  carouselBlock,
  ctaBlock,
  faqBlock,
  heroBlock,
  imageBlockType,
  newsletterBlock,
  productGridBlock,
  textBlock,
  videoBlockType,
  // Hero content blocks
  panelsBlock,
  articleHeroBlock,
  // Additional ACF content blocks
  articlesPromotionBlock,
  columnsBlock,
  discoverBlock,
  htmlBlock,
  informationBlock,
  productPromotionBlock,
  productsPromotionColumnsBlock,
  productsPromotionSliderBlock,
  tableBlock,
  textSectionBlock,
]
