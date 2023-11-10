import type { StrapiBlock } from "../../types/strapi";
import type { StrapiBlockToJsxConfig, ClassNamesConfig } from "../../types/config";
import { setClassname } from "../../lib/classnames.lib";
type Props = {
    block: StrapiBlock,
    config?: StrapiBlockToJsxConfig,
}

export function Heading({ block, config }: Props) {
    if(block.type !== "heading") throw new Error("Block type must be heading");

    /**
     * ClassName statement
     */
    let className = (config?.generatedClassNames === false) ? '' : `strapi-btjsx-heading${block.level}`;
    className = setClassname(className, "heading", config);

    /**
     * Content of the block
     */
    const title = block.children[0].text;
    
    switch(block.level) {
        case 1:
            return <h1 className={className}>{title}</h1>
        case 2:
            return <h2 className={className}>{title}</h2>
        case 3:
            return <h3 className={className}>{title}</h3>
        case 4:
            return <h4 className={className}>{title}</h4>
        case 5:
            return <h5 className={className}>{title}</h5>
        case 6:
            return <h6 className={className}>{title}</h6>
        default:
            return <h1 className={className}>{title}</h1>
    }
}