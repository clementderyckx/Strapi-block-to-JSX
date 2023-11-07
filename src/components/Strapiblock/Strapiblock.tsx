import Heading from "../Heading/Heading";

type Props = {
  config?: StrapiBlockToJsxConfig,
  block: StrapiBlock
}

export function Strapiblock({ config, block }: Props) {
  const environment = config?.environment;
  const classNames = config?.classNames;

  if(block.type === 'heading') 
    return <Heading block={block} classNames={classNames}/>

  else if(block.type === "paragraph") {
    if(block.children[0].type === "text")
      return <p>{block.children[0].text}</p>
    else 
      return <a href={block.children[0].url}>{block.children[0].children[0].text}</a>
  }

  else
    return <p>Random element</p>

}
