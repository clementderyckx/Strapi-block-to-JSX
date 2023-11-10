import { Heading } from "../Heading/Heading";
import type { StrapiBlockToJsxComponentProps } from "../../types/components";


export function Strapiblock({ config, block }: StrapiBlockToJsxComponentProps) {

  if(block.type === 'heading') 
    return <Heading block={block} config={config}/>

  else if(block.type === "paragraph") {
    if(block.children[0].type === "text")
      return <p>{block.children[0].text}</p>
    else 
      return <a href={block.children[0].url}>{block.children[0].children[0].text}</a>
  }

  else
    return <p>Random element</p>

}
