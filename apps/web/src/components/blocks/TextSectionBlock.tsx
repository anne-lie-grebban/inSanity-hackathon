import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    padding: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    margin: 0;
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    padding: ${({ theme }) => theme.spacing.md} 0;
    margin: 0;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    padding: ${({ theme }) => theme.spacing.md} 0;
    margin: 0;
  }

  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: 1.5;
    padding: 0;
    margin: 0 0 1em 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  blockquote {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    line-height: 1.3;
    margin: ${({ theme }) => theme.spacing.xl} 0;
    padding: 0;
    font-style: italic;

    &::before,
    &::after {
      content: '"';
    }
  }

  ul,
  ol {
    padding: 0 0 0 ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.md} 0;

    li {
      padding: 0;
      margin: 0;

      + li {
        margin-top: ${({ theme }) => theme.spacing.xs};
      }
    }

    p {
      margin: 0;
      padding: 0;
    }
  }

  ul {
    li {
      list-style-type: none;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -20px;
        top: 8px;
        width: 6px;
        height: 6px;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 2px;
      }
    }
  }

  ol {
    counter-reset: number;
    list-style-type: none;

    li {
      position: relative;
      counter-increment: number;

      &::marker {
        display: none;
      }

      &::before {
        position: absolute;
        left: -24px;
        font-size: ${({ theme }) => theme.typography.fontSize.base};
        line-height: 1.5;
        content: counter(number) ".";
        color: inherit;
        display: inline-block;
      }
    }
  }
`;

interface TextSectionBlockProps {
  _type?: string;
  _key?: string;
  title?: string;
  content?: {
    content?: Array<{
      _type: string;
      style?: string;
      children?: Array<{
        text?: string;
        marks?: string[];
      }>;
    }>;
  };
  text?: {
    content?: Array<{
      _type: string;
      style?: string;
      children?: Array<{
        text?: string;
        marks?: string[];
      }>;
    }>;
  };
  [key: string]: any;
}

// Helper to convert Portable Text to HTML-like structure
const renderPortableText = (content: any[] = []) => {
  return content.map((block, index) => {
    if (block._type === "block") {
      const style = block.style || "normal";
      const text = block.children
        ?.map((child: any) => {
          let t = child.text || "";
          // Handle marks (bold, italic, etc.)
          if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark: string) => {
              if (mark === "strong") t = `<strong>${t}</strong>`;
              if (mark === "em") t = `<em>${t}</em>`;
            });
          }
          return t;
        })
        .join("");

      // Map style to HTML tag
      const tagMap: Record<string, string> = {
        normal: "p",
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        blockquote: "blockquote",
      };

      const tag = tagMap[style] || "p";
      return React.createElement(tag, {
        key: index,
        dangerouslySetInnerHTML: { __html: text || "" },
      });
    }

    return null;
  });
};

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TextSectionBlock = ({
  title,
  content,
  text,
}: TextSectionBlockProps) => {
  // Try both content.content and text.content
  const richTextContent = content?.content || text?.content;

  if (!richTextContent || richTextContent.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {renderPortableText(richTextContent)}
    </Wrapper>
  );
};
