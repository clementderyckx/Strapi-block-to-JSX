import { ReactNode } from "react";

export type StrapiBlockToJsxConfig = {
    environment?: "react" | "next",
    classNames?: ClassNamesConfig,
    generatedClassNames?: boolean,
    elementsConfig?: {
        heading?: ElementConfig,
        image?: ElementConfig,
        list?: ElementConfig,
        listItem?: ElementConfig,
        paragraph?: ElementConfig,
        text?: ElementConfig,
        link?: LinkConfig,
        vspacing?: {
            className?: string,
        },
    }
}

export type ClassNamesConfig = {
    link?: string,
    image?: string,
    list?: string,
    listItem?: string,
    heading?: string,
    paragraph?: string,
    vspacing?: string
}

export type ElementConfig = {
    className?: string,
    customElement?: ReactNode
}
export type LinkConfig = ElementConfig & {
    target?: "_self" | "_blank" | "_parent" | "_top",
    rel?: "noopener" | "noreferrer" | "nofollow",
    color?: string,
}


export type BlockType = keyof ClassNamesConfig;