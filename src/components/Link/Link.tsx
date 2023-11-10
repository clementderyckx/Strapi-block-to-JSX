import { Typography } from '../..';
import { setClassname } from '../../lib/classnames.lib';
import type { StrapiBlockToJsxComponentProps } from '../../types/components';
import './Link.css';

export function Link({ config, block }: StrapiBlockToJsxComponentProps) {
    if(block.type !== "link") throw new Error("Block type must be link to be used with component link");

    // Classname
    let className = setClassname( "strapi-btjsx-link", "link", config);

    // Next Link if internal link and environment is set to "next" in the config
    if(config?.environment === "next" && block.url.startsWith('/')){
        const NextLink = require('next/link');
        return <NextLink href={block.url}>{block.children[0].text}</NextLink>
    }

    // By default, it sets external links to open in a new tab with rel="noopener"
    const targetAttributeValue = (config?.elementsConfig?.link?.target) ? config.elementsConfig.link.target : "_blank";
    let relAttributeValue: "noopener" | "noreferrer" | "nofollow" | undefined = (config?.elementsConfig?.link?.rel) ? config.elementsConfig.link.rel : "noopener";
    if(block.url.startsWith('/')) relAttributeValue = undefined;
    

    const style = config?.elementsConfig?.link?.color ? { color: config.elementsConfig.link.color } : undefined;
    
  return (
    <a 
      href={block.url} 
      target={targetAttributeValue} 
      rel={relAttributeValue}
      className={className}
      style={style}
    >
      <Typography block={block.children[0]} config={config}/>
    </a>
  )
}