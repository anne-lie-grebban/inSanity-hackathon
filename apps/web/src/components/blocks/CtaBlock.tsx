import styled from "@emotion/styled";
import { urlFor } from "../../lib/sanity.client";

const CtaWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
  border-radius: 4px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 400px;
  }
`;

const BackgroundImage = styled.div<{ imageUrl: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  z-index: 0;
  border-radius: 4px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    mix-blend-mode: multiply;
  }
`;

const BackgroundColor = styled.div<{ color?: string }>`
  position: absolute;
  inset: 0;
  background: ${({ color }) => color || "transparent"};
  z-index: 0;
  border-radius: 4px;
`;

const ContentContainer = styled.div<{
  horizontalAlign?: string;
  verticalAlign?: string;
}>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: ${({ verticalAlign }) => verticalAlign || "flex-end"};
  justify-content: ${({ horizontalAlign }) => horizontalAlign || "flex-start"};
  flex: 1;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const TextContent = styled.div<{
  showBackground?: boolean;
  textAlign?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  text-align: ${({ textAlign }) => textAlign || "left"};
  background: ${({ showBackground }) =>
    showBackground ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  backdrop-filter: ${({ showBackground }) =>
    showBackground ? "blur(6px)" : "none"};
  padding: ${({ theme, showBackground }) =>
    showBackground ? theme.spacing.lg : "0"};
  border-radius: 8px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  line-height: 1.3;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  }
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const Button = styled.a<{ isPrimary?: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, isPrimary }) =>
    isPrimary ? theme.colors.primary : "transparent"};
  color: ${({ theme }) => theme.colors.text.inverted};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: 2px solid
    ${({ theme, isPrimary }) =>
      isPrimary ? theme.colors.primary : theme.colors.text.inverted};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface CtaBlockProps {
  _type?: string;
  _key?: string;
  tag?: string;
  heading?: {
    text?: string;
    level?: string;
  };
  text?: {
    content?: Array<{
      children?: Array<{
        text?: string;
      }>;
    }>;
  };
  paragraph?: {
    text?: string;
  };
  buttons?: Array<{
    label?: string;
    text?: string;
    link?: {
      linkType?: string;
      url?: string;
      internalLink?:
        | {
            slug?: {
              current?: string;
            };
          }
        | {
            _id?: string;
            _type?: string;
            slug?: {
              current?: string;
            };
          };
    };
    variant?: string;
    theme?: string;
  }>;
  background?: {
    type?: string;
    color?: string;
    image?: any;
  };
  contentHorizontalAlignment?: string;
  contentVerticalAlignment?: string;
  enableTextContentBackground?: boolean;
  [key: string]: any;
}

export const CtaBlock = ({
  tag,
  heading,
  text,
  paragraph,
  buttons,
  background,
  contentHorizontalAlignment = "flex-start",
  contentVerticalAlignment = "flex-end",
  enableTextContentBackground = true,
}: CtaBlockProps) => {
  // Extract heading text
  const headingText =
    typeof heading === "string" ? heading : heading?.text || "";

  // Extract text from richText content (Portable Text format)
  const richTextContent = text?.content
    ?.map((block) => block.children?.map((child) => child.text).join(""))
    .join("\n\n");

  // Extract paragraph text (fallback)
  const paragraphText =
    richTextContent ||
    (typeof paragraph === "string" ? paragraph : paragraph?.text || "");

  // Handle background
  const imageData: any =
    background?.image && "image" in background.image && background.image.image
      ? background.image.image
      : background?.image;

  const imageUrl =
    imageData?.asset && background?.type === "image"
      ? urlFor(imageData).width(1600).height(600).fit("crop").url()
      : "";

  const backgroundColor =
    background?.type === "color" ? background.color : undefined;

  // Text alignment based on horizontal alignment
  const textAlign =
    contentHorizontalAlignment === "center"
      ? "center"
      : contentHorizontalAlignment === "flex-end"
      ? "right"
      : "left";

  if (!headingText && !paragraphText && !buttons?.length) {
    return null;
  }

  return (
    <CtaWrapper>
      {imageUrl && <BackgroundImage imageUrl={imageUrl} />}
      {backgroundColor && <BackgroundColor color={backgroundColor} />}

      <ContentContainer
        horizontalAlign={contentHorizontalAlignment}
        verticalAlign={contentVerticalAlignment}
      >
        <TextContent
          showBackground={enableTextContentBackground}
          textAlign={textAlign}
        >
          {tag && <Tag>{tag}</Tag>}
          {headingText && <Heading>{headingText}</Heading>}
          {paragraphText && <Paragraph>{paragraphText}</Paragraph>}

          {buttons && buttons.length > 0 && (
            <ButtonWrapper>
              {buttons.map((button, index) => {
                // Build link URL
                let buttonHref = "#";
                if (button.link?.linkType === "external") {
                  buttonHref = button.link?.url || "#";
                } else if (button.link?.linkType === "internal") {
                  const slug = button.link?.internalLink?.slug?.current;
                  buttonHref = slug ? (slug === "/" ? "/" : `/${slug}`) : "#";
                }

                const buttonText = button.label || button.text || "";
                const isPrimary =
                  button.variant === "primary" || button.theme !== "secondary";

                return (
                  <Button key={index} href={buttonHref} isPrimary={isPrimary}>
                    {buttonText}
                  </Button>
                );
              })}
            </ButtonWrapper>
          )}
        </TextContent>
      </ContentContainer>
    </CtaWrapper>
  );
};
