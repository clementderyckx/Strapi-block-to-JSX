import type { StrapiBlockToJsxComponentProps } from "../../types/components";
import { setClassname } from "../../lib/classnames.lib";
import VSpacing from "../VSpacing/VSpacing";
import { Link } from "../..";


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
      {content.map((block, index) => {
        if(block.type === "text") return block.text
        else if(block.type === "link") {
          /**
           * Change it to a Link component to be created
           */
          return <Link block={block} config={config} key={index}/>
        }
      })}
    </p>
  )
}