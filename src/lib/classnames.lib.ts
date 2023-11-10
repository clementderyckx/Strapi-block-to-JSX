import type { StrapiBlockToJsxConfig, BlockType } from "../types/config";

export const setClassname = (baseClassName: string, type: BlockType, config?: StrapiBlockToJsxConfig): string => {

    let className = `strapi-btjsx ${baseClassName}`;

    if(!config) return className;


    const { classNames, elementsConfig } = config;

    if(classNames && classNames[type]) className += ` ${classNames[type]}`;

    if(elementsConfig && elementsConfig[type]){
        if(elementsConfig[type]?.className) className += ` ${elementsConfig[type]?.className}`
    ;}

    return className;
}
