import { Heading } from "../Heading/Heading";
import { Paragraph } from "../Paragraph/Paragraph";
import { Link } from "../Link/Link";
import { List } from "../List/List";
import { Typography } from "../Typography/Typography";
import { Image } from "../Image/Image";

import type { StrapiBlockToJsxComponentProps } from "../../types/components";


export function Strapiblock({ config, block }: StrapiBlockToJsxComponentProps) {

  if(block.type === 'heading')  
    return <Heading block={block} config={config}/>

  else if (block.type === 'text')  
    return <Typography block={block} config={config}/>

  else if(block.type === "paragraph")
    return <Paragraph block={block} config={config}/>

  else if(block.type === "link") 
    return <Link block={block} config={config}/>

  else if(block.type === "list")
    return <List block={block} config={config}/>
    
  else if(block.type === "image")
    return <Image block={block} config={config}/>
    
  else
    return <p>Random element</p>

}
