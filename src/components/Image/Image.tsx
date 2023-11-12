import { StrapiBlockToJsxComponentProps } from "../../types/components";
import './Image.css';


export function Image({ block, config }: StrapiBlockToJsxComponentProps) {
    if(block.type!== "image") throw new Error("Block type must be image in Image component");

    
  return (
    <div>Image.test</div>
  )
}