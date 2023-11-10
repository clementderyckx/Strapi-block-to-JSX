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
        vspacing?: string
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
`strapi-btjsx-{componentName}{specification}`<br
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