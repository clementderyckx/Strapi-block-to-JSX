import { StrapiBlockToJsxTypographyProps } from "../../types/components";
import { setTypographyClassName } from "../../lib/classnames.lib";
import './Typography.css';

export function Typography({ config, block }: StrapiBlockToJsxTypographyProps) {
    if(block.type !== "text") throw new Error("Block passed to Typography is not a text block");

    const className = setTypographyClassName(block, config)

  return (block.bold || block.italic || block.strikethrough || block.underline) ? (
    <span 
        className={className} 
        data-testid="test-span"
    >
        {block.text}
    </span>
  ) : (
    <>{block.text}</>
  )
}