import { useId } from "react";
import type { StrapiBlockToJsxComponentProps } from "../../types/components";
import { setClassname } from "../../lib/classnames.lib";
import VSpacing from "../VSpacing/VSpacing";
import { Link, Typography } from "../..";


/**
 * If the paragraph is empty, that means a free space to materialized with a div and defaut space
 */

export function Paragraph({ block, config }: StrapiBlockToJsxComponentProps) {
  if(block.type!== "paragraph" || block.children[0].type !== "text") throw new Error("Block type must be paragraph");

  const content = block.children;

  /**
   * If the paragraph is empty, that means a free space to materialized with a VSpacing component
   */
  if(content.length === 1 && content[0].type === "text") {
    if(content[0].text.length === 0) return <VSpacing />
  }
  /**
   * ClassName statement
   */
  let className = setClassname(`strapi-btjsx-paragraph`, "paragraph", config);

  return (
    <p className={className}>
      {content.map( block => {
        if(block.type === "text") 
          return <Typography block={block} config={config} key={useId()} />
          
        else if(block.type === "link") {
          return <Link block={block} config={config} key={useId()}/>
        }
      })}
    </p>
  )
}