import type { StrapiBlock, StrapiTextNode } from "./strapi";
import type { StrapiBlockToJsxConfig } from "./config";

export type StrapiBlockToJsxComponentProps = {
  config?: StrapiBlockToJsxConfig,
  block: StrapiBlock,
}

export type StrapiBlockToJsxTypographyProps = {
  config?: StrapiBlockToJsxConfig,
  block: StrapiTextNode
};