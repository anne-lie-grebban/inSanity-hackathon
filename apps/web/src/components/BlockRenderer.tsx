import { HeroBlock } from "./blocks/HeroBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TextSectionBlock } from "./blocks/TextSectionBlock";

interface BlockProps {
  block: {
    _type: string;
    _key: string;
    [key: string]: any;
  };
}

export const BlockRenderer = ({ block }: BlockProps) => {
  switch (block._type) {
    case "heroBlock":
      return <HeroBlock {...block} />;

    case "ctaBlock":
      return <CtaBlock {...block} />;

    case "imageBlock":
      return <ImageBlock {...block} />;

    case "textSectionBlock":
      return <TextSectionBlock {...block} />;

    // Add more block types here as we build them
    case "panelsBlock":
      return (
        <div style={{ padding: "20px", background: "#f0f0f0" }}>
          <p>
            <strong>Panels Block</strong> (not yet implemented)
          </p>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      );

    case "articleHeroBlock":
      return (
        <div style={{ padding: "20px", background: "#f0f0f0" }}>
          <p>
            <strong>Article Hero Block</strong> (not yet implemented)
          </p>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      );

    default:
      return (
        <div style={{ padding: "20px", background: "#fff3cd" }}>
          <p>
            <strong>Unknown Block Type:</strong> {block._type}
          </p>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      );
  }
};
