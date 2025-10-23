import styled from "@emotion/styled";
import { urlFor } from "../../lib/sanity.client";

const HeroWrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 500px;
  }
`;

const BackgroundImage = styled.div<{ imageUrl: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.lg};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 4px;
  width: fit-content;
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverted};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border-radius: 4px;
  width: fit-content;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
  }
`;

interface HeroBlockProps {
  _type?: string;
  _key?: string;
  tag?: string;
  heading?:
    | string
    | {
        _type?: string;
        alignment?: string;
        level?: string;
        text?: string;
      };
  description?: string;
  button?: {
    text?: string;
    link?: {
      linkType?: string;
      url?: string;
      internalLink?: {
        slug?: {
          current?: string;
        };
      };
    };
  };
  image?:
    | {
        asset?: {
          _id: string;
          url: string;
        };
        hotspot?: {
          x: number;
          y: number;
        };
      }
    | {
        // customImage type with nested image
        image?: {
          asset?: {
            _id: string;
            url: string;
          };
          hotspot?: {
            x: number;
            y: number;
          };
        };
      };
  [key: string]: any; // Allow additional properties from Sanity
}

export const HeroBlock = ({
  tag,
  heading,
  description,
  button,
  image,
}: HeroBlockProps) => {
  // Extract heading text (handle both string and object formats)
  const headingText =
    typeof heading === "string"
      ? heading
      : heading && typeof heading === "object"
      ? heading.text
      : undefined;

  // Handle nested image structure (customImage -> image -> asset)
  const imageData: any =
    image && "image" in image && image.image ? image.image : image;

  // Generate optimized image URL with hotspot
  const imageUrl = imageData?.asset
    ? urlFor(imageData).width(1920).height(800).fit("crop").url()
    : "";

  // Generate button link
  const buttonHref =
    button?.link?.linkType === "external"
      ? button?.link?.url || "#"
      : button?.link?.internalLink?.slug?.current
      ? `/${button.link.internalLink.slug.current}`
      : "#";

  if (!headingText && !description && !image) {
    return null;
  }

  return (
    <HeroWrapper>
      {imageUrl && <BackgroundImage imageUrl={imageUrl} />}

      <ContentContainer>
        <TextContent>
          {tag && <Tag>{tag}</Tag>}
          {headingText && <Heading>{headingText}</Heading>}
          {description && <Description>{description}</Description>}
          {button?.text && <Button href={buttonHref}>{button.text}</Button>}
        </TextContent>
      </ContentContainer>
    </HeroWrapper>
  );
};
