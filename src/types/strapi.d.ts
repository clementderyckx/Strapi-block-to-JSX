interface StrapiTextNode {
    text: string;
    type: 'text';
}
  
interface StrapiLinkNode {
    url: string;
    type: 'link';
    children: StrapiTextNode[];
}
  
interface StrapiHeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6; 
    children: StrapiTextNode[];
}
  
interface StrapiParagraphBlock {
    type: 'paragraph';
    children: (StrapiTextNode | StrapiLinkNode)[]; // Assuming paragraphs can contain text and links
}
  
interface StrapiListItemBlock {
    type: 'list-item';
    children: (StrapiTextNode | StrapiLinkNode)[]; // List items can contain text and links
}
  
interface StrapiListBlock {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: StrapiListItemBlock[];
}
  
interface StrapiImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    size: number;
    width: number;
    height: number;
}
  
interface StrapiImageBlock {
    type: 'image';
    image: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      size: number;
      width: number;
      height: number;
      caption: string | null;
      formats: {
        large?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        thumbnail: StrapiImageFormat;
      };
      provider: string;
      createdAt: string;
      updatedAt: string;
      previewUrl: string | null;
      alternativeText: string;
      provider_metadata: any | null;
    };
    children: StrapiTextNode[];
}
  
type StrapiBlock = StrapiHeadingBlock | StrapiParagraphBlock | StrapiListBlock | StrapiImageBlock;
  
interface StrapiContentStructure {
    content: StrapiContentBlock[];
}