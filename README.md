## Configuration object
```typescript
type StrapiBlockToJsxConfig = {
    environment?: "react" | "next",
    classNames?: {
        link?: string,
        image?: string,
        list?: string,
        listItem?: string,
        heading?: string,
        paragraph?: string,
        vspacing?: string,
        typography?: {
            bold: string,
            italic: string,
            underline: string,
            strikethrough: string,
        }
    },
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
        typography?: {
            bold: ElementConfig,
            italic: ElementConfig,
            underline: ElementConfig,
            strikethrough: ElementConfig
        }
    }
}

type ElementConfig = {
    className?: string,
    customElement?: ReactNode
}
type LinkConfig = ElementConfig & {
    target?: "_self" | "_blank" | "_parent" | "_top",
    rel?: "noopener" | "noreferrer" | "nofollow",
    color?: string,
}
```
### `environment` property
This config property allows you to specify the context on which it's being used. It is mostly useful for Next.js development. Setting it  to `"next"` enables the use of Next.js components when needed such as `<Link>` or `<Image>` for optimisation.
The default property is `react` so if using React, you can omit it, it will work as expected.<br>
Example usage:
```typescript
const config: StrapiBlockToJsxConfig = {
    environment: 'next'
}
```

### `generatedClassNames` property
Set to false to not use library classnames on components.
### `classNames` property
This config property allows you to set custom classnames for different block type.

## Classnames
### Included Classnames
Every components has the classname `strapi-btjsx`. <br>
In addition, each component has a specific class name following this pattern:<br>
`strapi-btjsx-{componentName}{specification}`<br>
This behavior can be disabled in the configuration object by setting the property generatedClassNames to false.

```typescript
const config = {
    environment: 'next',
    generatedClassNames: false
}
```
More details on this will be provided below.
- Heading: `strapi-btjsx-heading${block.level}` (level is between 1 and 6)
- Link: `strapi-btjsx-link`
- Paragraph: `strapi-btjsx-paragraph`
- VSpacing: `strapi-btjsx-vspacing`


### Add Classnames
There are few ways to add classNames to elements using the configuration object 

NB: Each classname passed in any methods will be automatically added to the corresponding element.
For example the following configuration object will add multiple classes to the heading component.
```typescript
const config = {
    environment: 'next',
    generatedClassNames: false,
    classNames: {
        heading: "heading-class"
    },
    elementsConfig:{
        heading: {
            className: 'heading-classname-from-elementsConfig'
        } 
    }
}

<Strapiblock block={block} config={config} />
// Will result with classname "heading-class heading-classname-from-elementsConfig"
```

## Links
```typescript
// Generates here the documentation on how links are managed in the documentation.
```

## Empty spaces
In the Strapi CMS, when you add a blank line for spacing, Strapi generates an empty paragraph block.
In this library, it generates a VSpacing component which is define as :
```typescript
<VSpacing />
```
It is a simple div containing an empty character (`&nbsp;`) with a default height of 30px and width set to 100%.
You can override the default height and width by using the generated classname or by setting your own classname to vspacing on the configuration object.

## Styled text
In the Strapi CMS you are able to customize the text displayed by setting some properties like bold, italic, strikethrough and underline.<br>
It is also available by default in the library via the `<Typography/>` component which is used to display all the text.
The component simply adds a `<span>` element included a classname.
- `.strapi-btjsx-bold-text` for bold text
- `.strapi-btjsx-italic-text` for italic text
- `.strapi-btjsx-strikethrough-text` for strikethrough text
- `.strapi-btjsx-underlined-text` for underlined text
  
You can customize them classnames by overriding the style on your css using the generated classes or by setting your own classname in the configuration object.<br>
The typography has a different structure to set you own classes. It uses them properties for setting classnames in each cases.<br>
NB: Like other components, if you don't specify generatedClassNames to false, it will add the classnames you specify in the object. <br>
For examples: 
```typescript
const config = {
    generatedClassNames: false,
    elementsConfig: {
        typography: {
            bold: {
                className: 'bold-config-class'
            },
            italic: {
                className: 'italic-config-class'
            },
            underline: {
                className: 'underline-config-class'
            },
            strikethrough: {
                className: 'strikethrough-config-class'
            },
        }
    }
};
<Strapiblock block={block} config={config}>
/*
* Bold text will end up with span bold-config-class
* Italic text will end up with span italic-config-class
* Underlined text will end up with span underline-config-class
* Strikethrough text will end up with span strikethrough-config-class
*/
```
It is also working the same way by using classnames in the configuration object
```typescript
const config = {
    generatedClassNames: false,
    classNames: {
        typography: {
            bold: 'bold-config-class',
            italic: 'italic-config-class',
            underline: 'underline-config-class',
            strikethrough: 'strikethrough-config-class',
        }
    }
};
<Strapiblock block={block} config={config}>
```