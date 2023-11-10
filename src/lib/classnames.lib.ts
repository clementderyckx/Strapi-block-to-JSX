import { StrapiTextNode } from "../types/strapi";
import type { StrapiBlockToJsxConfig, BlockType } from "../types/config";

export const setClassname = (baseClassName: string, type: BlockType, config?: StrapiBlockToJsxConfig): string => {

    let className = `strapi-btjsx ${baseClassName}`;
    
    if(!config) return className;
    
    
    const { classNames, elementsConfig } = config;
    
    if(type === "typography") return className;


    if(classNames && classNames[type]) className += ` ${classNames[type]}`;

    if(elementsConfig && elementsConfig[type]){
        if(elementsConfig[type]?.className) className += ` ${elementsConfig[type]?.className}`
    }

    return className;
}

export const setTypographyClassName = (block: StrapiTextNode, config?: StrapiBlockToJsxConfig): string => {
    let className = 'strapi-btjsx'
    /**
     * ClassName from the block
     */
    if(block.bold) className += ' strapi-btjsx-bold-text';
    if(block.italic) className += ' strapi-btjsx-italic-text';
    if(block.strikethrough) className += ' strapi-btjsx-strikethrough-text';
    if(block.underline) className += ' strapi-btjsx-underlined-text';

    /**
     * ClassName from the config
     */
    if(!config) return className;


    if(config.elementsConfig && config.elementsConfig.typography){
        const { bold, italic, strikethrough, underline } = config.elementsConfig.typography
        if(block.bold && bold && bold.className) className += ` ${bold.className}`;
        if(block.italic && italic && italic.className) className += ` ${italic.className}`;
        if(block.strikethrough && strikethrough && strikethrough.className) className += ` ${strikethrough.className}`;
        if(block.underline && underline && underline.className) className += ` ${underline.className}`;
    }

    if(config.classNames && config.classNames.typography){
        const { bold, italic, strikethrough, underline } = config.classNames.typography
        if(block.bold && bold) className += ` ${bold}`;
        if(block.italic && italic && italic) className += ` ${italic}`;
        if(block.strikethrough && strikethrough) className += ` ${strikethrough}`;
        if(block.underline && underline) className += ` ${underline}`;
    }

    return className;
}