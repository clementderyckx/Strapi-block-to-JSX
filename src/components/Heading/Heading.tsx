
type Props = {
    block: StrapiBlock,
    config?: StrapiBlockToJsxConfig,
    classNames?: ClassNamesConfig
}

export default function Heading({ block, config, classNames }: Props) {
    const className = (classNames && classNames.heading) ? classNames.heading : '';
    
  return (
    <div>Heading</div>
  )
}