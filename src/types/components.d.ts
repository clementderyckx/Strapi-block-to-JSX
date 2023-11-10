import type { StrapiBlock } from "./strapi";
import type { StrapiBlockToJsxConfig } from "./config";

export type StrapiBlockToJsxComponentProps = {
  config?: StrapiBlockToJsxConfig,
  block: StrapiBlock,
}