import {StructureResolver} from 'sanity/structure'
import {MenuIcon, BlockContentIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons Section
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              // Header Singleton
              S.listItem()
                .title('Header')
                .icon(MenuIcon)
                .child(S.document().schemaType('header').documentId('header')),
              // Footer Singleton
              S.listItem()
                .title('Footer')
                .icon(BlockContentIcon)
                .child(S.document().schemaType('footer').documentId('footer')),
            ]),
        ),

      // Divider
      S.divider(),

      // Regular document types (automatically added)
      ...S.documentTypeListItems().filter(
        (listItem) => !['header', 'footer'].includes(listItem.getId() || ''),
      ),
    ])
