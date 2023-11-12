import { StrapiBlock, StrapiTextNode } from "../types/strapi";
import type { StrapiBlockToJsxConfig, BlockType } from "../types/config";

export const setClassname = (baseClassName: string, type: BlockType, config?: StrapiBlockToJsxConfig): string => {

    let className = "";
    if(config && config.generatedClassNames === false){
        className = "";
    } else {
        className = `strapi-btjsx ${baseClassName}`;
    }

    if(!config) return className;
    
    const { classNames, elementsConfig } = config;
    if(!classNames && !elementsConfig) return className;
    
    if(type === "typography" || type === "list" || type === "listItem") return className;


    if(classNames && classNames[type]) className += ` ${classNames[type]}`;

    if(elementsConfig && elementsConfig[type]){
        if(elementsConfig[type]?.className) className += ` ${elementsConfig[type]?.className}`
    }

    return className;
}

export const setTypographyClassName = (block: StrapiTextNode, config?: StrapiBlockToJsxConfig): string => {

    let className = "";
    if(config && config.generatedClassNames === false){
        className = "";
    } else {
        /**
         * ClassName from the block
        */
        className = 'strapi-btjsx'
        if(block.bold) className += ' strapi-btjsx-bold-text';
        if(block.italic) className += ' strapi-btjsx-italic-text';
        if(block.strikethrough) className += ' strapi-btjsx-strikethrough-text';
        if(block.underline) className += ' strapi-btjsx-underlined-text';
    }


    if(!config) return className;

    /**
     * ClassName from the config
     */
    const {elementsConfig, classNames} = config;
    if(!classNames && !elementsConfig) return className;

    if(elementsConfig && elementsConfig.typography){
        const { bold, italic, strikethrough, underline } = elementsConfig.typography
        if(block.bold && bold && bold.className) className += ` ${bold.className}`;
        if(block.italic && italic && italic.className) className += ` ${italic.className}`;
        if(block.strikethrough && strikethrough && strikethrough.className) className += ` ${strikethrough.className}`;
        if(block.underline && underline && underline.className) className += ` ${underline.className}`;
    }

    if(classNames && classNames.typography){
        const { bold, italic, strikethrough, underline } = classNames.typography
        if(block.bold && bold) className += ` ${bold}`;
        if(block.italic && italic && italic) className += ` ${italic}`;
        if(block.strikethrough && strikethrough) className += ` ${strikethrough}`;
        if(block.underline && underline) className += ` ${underline}`;
    }

    return className;
}

export const setListClassName = (block: StrapiBlock, config?: StrapiBlockToJsxConfig): string | undefined => {
    if(block.type !== "list") return undefined;

    let className = "";

    /**
     * Generated classnames
     */
    if(config && config.generatedClassNames === false){
        className = "";
    } else {
        className = 'strapi-btjsx-list';

        if(block.format === "ordered"){
            className += ` strapi-btjsx-ol`;
        }
        else if(block.format === "unordered") {
            className += ` strapi-btjsx-ul`;
        }
    }

    if(!config) return className;
    if(!config?.elementsConfig?.list && !config?.classNames?.list) return className;

    /**
     * Config classnames
     */
    const ListElementsConfig = config?.elementsConfig?.list
    const ListClassName = config?.classNames?.list
    switch(block.format){
        case "ordered":
            if(ListClassName?.ordered) className += ` ${ListClassName.ordered}`;
            if(ListElementsConfig?.ordered?.className) className += ` ${ListElementsConfig.ordered.className}`;
            break;
        case "unordered":
            if(ListClassName?.unordered) className += ` ${ListClassName.unordered}`;
            if(ListElementsConfig?.unordered?.className) className += ` ${ListElementsConfig.unordered.className}`;
            break;
        default:
            break;

    }

    return className;
}

export const setListItemClassName = (type: "ordered" | "unordered", config?: StrapiBlockToJsxConfig): string => {
    let className = "";
    /**
     * Generated classnames
     */
    if(config && config.generatedClassNames === false){
        className = "";
    } else {
        className = 'strapi-btjsx-list-item';
        switch(type){
            case "ordered":
                className += " strapi-btjsx-ol-list-item";
                break;
            case "unordered":
                className += " strapi-btjsx-ul-list-item";
                break;
            default:
                break;
        } 
    }
    if (!config) return className;
    if(!config.elementsConfig?.listItem && !config.classNames?.listItem) return className;

    /**
     * Config classnames
     */
    const ListItemElementsConfig = config?.elementsConfig?.list
    const ListItemClassName = config?.classNames?.listItem
    switch(type){
        case "ordered":
            if (ListItemClassName?.ordered) className += ` ${ListItemClassName.ordered}`;
            if(ListItemElementsConfig?.ordered?.className) className += ` ${ListItemElementsConfig.ordered.className}`;
            break;
        case "unordered":
            if (ListItemClassName?.unordered) className += ` ${ListItemClassName.unordered}`;
            if(ListItemElementsConfig?.unordered?.className) className += ` ${ListItemElementsConfig.unordered.className}`;
            break;
        default:
            break;
    }

    return className;

}