import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { sanityClient } from "../lib/sanity.client";
import { PAGE_QUERY } from "../lib/queries";
import { BlockRenderer } from "./BlockRenderer";

const PageWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ContentSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const BlockWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
`;

const BlockTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BlockType = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverted};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface PageData {
  _id: string;
  title: string;
  template: string;
  slug: { current: string };
  heroContent?: any[];
  content?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface PageProps {
  slug?: string;
}

export const Page = ({ slug = "/" }: PageProps) => {
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // @ts-ignore - Sanity client types issue with parameters
        const data: PageData = await sanityClient.fetch(PAGE_QUERY, { slug });
        setPage(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper>
        <p>Loading...</p>
      </PageWrapper>
    );
  }

  if (error || !page) {
    return (
      <PageWrapper>
        <p>{error || "Page not found"}</p>
      </PageWrapper>
    );
  }

  return (
    <div>
      {/* Hero Content - Full Width */}
      {page.heroContent &&
        page.heroContent.length > 0 &&
        page.heroContent.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}

      {/* Main Content - Constrained Width */}
      <PageWrapper>
        <PageTitle>{page.title}</PageTitle>

        {page.content && page.content.length > 0 && (
          <ContentSection>
            {page.content.map((block) => (
              <BlockRenderer key={block._key} block={block} />
            ))}
          </ContentSection>
        )}
      </PageWrapper>
    </div>
  );
};
