interface StrapiBlockToJsxConfig {
    environment?: "react" | "next",
    classNames?: ClassNamesConfig
}

type ClassNamesConfig = {
    link?: string,
    image?: string,
    list?: string,
    listItem?: string,
    heading?: string,
    paragraph?: string,
}