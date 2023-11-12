import { ReactNode } from "react";

export type StrapiBlockToJsxConfig = {
    environment?: "react" | "next",
    cmsBaseUrl?: string,
    classNames?: ClassNamesConfig,
    generatedClassNames?: boolean,
    elementsConfig?: ElementsConfig
}

/**
 * Classnames configuration
 */
export type ClassNamesConfig = {
    link?: string,
    image?: string,
    heading?: string,
    paragraph?: string,
    vspacing?: string,
    typography?: TypographyConfig<string>,
    list?: {
        ordered?: string,
        unordered?: string,
    },
    listItem?: {
        ordered?: string,
        unordered?: string,
    },
}

/**
 * Elements configuration
 */
export type ElementsConfig = {
    heading?: ElementConfig,
    image?: ImageConfig,
    list?: ListConfig,
    listItem?: {
        ordered?: ElementConfig,
        unordered?: ElementConfig,
    },
    paragraph?: ElementConfig,
    text?: ElementConfig,
    link?: LinkConfig,
    vspacing?: {
        className?: string,
    },
    typography?: TypographyConfig<ElementConfig>
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

export type ListConfig = {
    ordered?: ElementConfig & {
        type?: OrderedListType,
        start?: number,
        reversed?: boolean,
    },
    unordered?: ElementConfig & {
        type?: UnorderedListType,
    }
}

export type UnorderedListType = "circle" | "square" | "disc";
export type OrderedListType = "a" | "A" | "i" | "I" | "1";

export type TypographyConfig<T> = {
    bold?: T,
    italic?: T,
    underline?: T,
    strikethrough?: T,
}

export type ImageConfig = ElementConfig & {
    title?: boolean,
    loading?: "lazy" | "eager",
    size?: "default" | "large" | "small" | "medium" | "thumbnail",
    width?: number,
    height?: number,
    crossorigin?: "anonymous" | "use-credentials",
    decoding?: "sync" | "async" | "auto",
}

export type BlockType = keyof ClassNamesConfig;