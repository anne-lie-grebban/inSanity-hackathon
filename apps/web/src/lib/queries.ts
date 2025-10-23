import groq from "groq";

// Get page by slug (e.g., frontpage with slug "/" or "startsidan")
export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    template,
    slug,
    heroContent[]{
      _type,
      _key,
      ...,
      image{
        ...,
        image{
          asset->{
            _id,
            url,
            metadata{
              dimensions,
              lqip
            }
          },
          hotspot
        }
      }
    },
    content[]{
      _type,
      _key,
      ...,
      image{
        ...,
        image{
          asset->{
            _id,
            url,
            metadata{
              dimensions,
              lqip
            }
          },
          hotspot
        }
      },
      buttons[]{
        ...,
        link{
          ...,
          internalLink->{
            _id,
            _type,
            slug
          }
        }
      },
      products[]{
        ...,
        image{
          asset->{
            _id,
            url,
            metadata{
              dimensions,
              lqip
            }
          },
          hotspot
        }
      }
    },
    seo{
      metaTitle,
      metaDescription,
      ogImage{
        asset->{
          url
        }
      }
    }
  }
`;

// Get header settings
export const HEADER_QUERY = groq`
  *[_type == "header"][0]{
    _id,
    mainNavigation[]{
      _key,
      link,
      subLinks[]{
        _key,
        link,
        column,
        subLinks[]{
          _key,
          link
        }
      }
    },
    bannerMessage{
      text,
      link
    }
  }
`;

// Get footer settings
export const FOOTER_QUERY = groq`
  *[_type == "footer"][0]{
    _id,
    newsletter{
      heading,
      description,
      placeholder,
      button
    },
    socialMedia[]{
      _key,
      platform,
      link
    },
    linkColumns[]{
      _key,
      heading,
      links[]{
        _key,
        link
      }
    }
  }
`;
