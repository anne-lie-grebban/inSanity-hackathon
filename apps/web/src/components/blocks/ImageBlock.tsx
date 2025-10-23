import styled from "@emotion/styled";
import { urlFor } from "../../lib/sanity.client";

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const Caption = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
`;

interface ImageBlockProps {
  _type?: string;
  _key?: string;
  image?: any;
  alt?: string;
  caption?: string;
  [key: string]: any;
}

export const ImageBlock = ({ image, alt, caption }: ImageBlockProps) => {
  // Handle nested image structure (customImage -> image -> asset)
  const imageData: any =
    image && "image" in image && image.image ? image.image : image;

  // Generate optimized image URL
  const imageUrl = imageData?.asset
    ? urlFor(imageData).width(1200).fit("max").url()
    : "";

  // Try to get alt and caption from various places
  const altText = alt || image?.alt || "";
  const captionText = caption || image?.caption || "";

  if (!imageUrl) {
    return null;
  }

  return (
    <div>
      <ImageWrapper>
        <StyledImage src={imageUrl} alt={altText} />
      </ImageWrapper>
      {captionText && <Caption>{captionText}</Caption>}
    </div>
  );
};
