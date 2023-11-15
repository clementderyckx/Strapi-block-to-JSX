# Strapi-block-to-jsx
## Why strapi block to jsx ?
Strapi introduces a feature enabling the generation of content as JSON blocks. This approach enhances control over content rendering. As a developper, you have to convert these blocks into JSX or plain HTML. It could be a long and arduous process. This is where strapi-block-to-jsx comes in. <br>
The library automatically converts blocks into JSX elements. It focuses on SEO and DOM optimization, allowing complete customization of HTML element attributes using its configuration object. <br>
You only need to configure once, then iterates through the CMS blocks you have fetched and ... That's it !<br>
The library is compatible with the Next.js environement by setting the `environment` property of the configuration object to use Next.js components. <br>
Let's very quickly create fully customizable content !<br>
NB: This is NOT a component library. Components come with minimum style, but styling is not the main focus of this library.<br>


## Getting started
### Prerequisites
Before diving into strapi-block-to-jsx, ensure your development environment meets the following prerequisites:

1. **Node.js**: A recent version of Node.js must be installed on your system. This is essential as both npm and yarn are Node.js package managers. You can check your Node.js version by running node -v in your terminal. You can download and install from [Node.js official website](https://nodejs.org/en/download/current) or using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) .  
2. **Strapi CMS**: As this library is designed to work with content from Strapi, having a Strapi instance (either locally or hosted) is necessary. Ensure that you are familiar with Strapi's content management features and how it generates JSON blocks.
3. **React(v16 or higher)** or **Next.js** Project: This library is intended for use within React or Next.js projects. Make sure you have an existing project or are prepared to create new projects using [vite](https://vitejs.dev/guide/), [create-react-app](https://create-react-app.dev/) or [create-next-app](https://nextjs.org/docs/getting-started/installation).


### Installation
The library can be easily integrated into your project using npm:

```bash
npm install --save strapi-block-to-jsx
```
or using yarn:
```bash
yarn add strapi-block-to-jsx
```

### Quick Start
Simply import the `Strapiblock` component into your project, and then pass the fetched block in the `block` prop.<br>
Example using React: 
```typescript
import {useState, useEffect} from 'react';
import { Strapiblock } from 'strapi-block-to-jsx';

export default function Post() {

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost(id)
        .then(data => data.json())
        .then(postBlocks => setPost(postBlocks))
    }, [])

    // This will be covered in the bellow section
    const strapiBtjsxConfig = {
        cmsBaseUrl: "https://your-strapi-instance-domain.com",
        elementsConfig: {
            // Your elements configuration here
        }
    }
    
  return (
    <article>
        { post.content.map( block => (
            <Strapiblock block={block} config={strapiBtjsxConfig} /> 
        ) )}
    </article>
  )
}
```

### Working with Next.js
When working with Next.js, specify the `environment` using the configuration object property. The library will automatically use Next.js components when needed.

## Configuration object
You can find below the global configuration type 
```typescript
type StrapiBlockToJsxConfig = {
    environment?: "react" | "next",
    cmsBaseUrl?: string,
    generatedClassNames?: boolean,
    classNames?: ClassNames // Allows for custom class name settings
    elementsConfig?: ElementConfig // Allows full customization of elements
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

### `cmsBaseUrl` property
This is where you can set the url of your strapi instance. this is mostly useful if :
- Your strapi instance is on an other domain or subdomain than your main application
- Content load images from the CMS.
If the property is not specified, it will default to `/` as the base url. <br>
Example usage:
```typescript
const config = {
    cmsBaseUrl: "https://your-strapi-instance-domain.com"
}
```

### `generatedClassNames` property
Set to false to not use library classnames on components.

### `elementsConfig` property
This is where you can fully customize the properties of each elements.
Each types of elements has his own configuration for setting its attributes. Each one will be describe in it corresponding section.
Each configuration is based on the type ElementConfig which includes a custom component settings if you want to use your own component to use with (not recommended) and a className property to set your own class names.<br>
Here is the full overview of the elementsConfig property. Every custom element will be reminded and described in it corresponding section :
```typescript
type ElementsConfig = {
    heading?: ElementConfig,
    image?:  ElementConfig & {
        title?: boolean,
        loading?: "lazy" | "eager",
        size?: "original" | "large" | "small" | "medium" | "thumbnail",
        width?: number,
        height?: number,
        crossorigin?: "anonymous" | "use-credentials",
        decoding?: "sync" | "async" | "auto",
    },
    list?: {
    ordered?: ElementConfig & {
            type?: "a" | "A" | "i" | "I" | "1",
            start?: number,
            reversed?: boolean,
        },
        unordered?: ElementConfig & {
            type?: "circle" | "square" | "disc",
        }
    },
    listItem?: {
        ordered?: ElementConfig,
        unordered?: ElementConfig,
    },
    paragraph?: ElementConfig,
        text?: ElementConfig,
        link?: ElementConfig & {
        target?: "_self" | "_blank" | "_parent" | "_top",
        rel?: "noopener" | "noreferrer" | "nofollow",
        color?: string,
    },
    vspacing?: {
        className?: string,
    },
    typography?: {
        bold?: ElementConfig,
        italic?: ElementConfig,
        underline?: ElementConfig,
        strikethrough?: ElementConfig,
    }
}
type ElementConfig = {
    className?: string,
    customElement?: ReactNode
}
```

### `classNames` property
This config property allows you to set custom classnames for different block type.
```typescript
type ClassNames = {
        link?: string,
        image?: string,
        list?: {
            ordered?: string,
            unordered?: string,
        },
        listItem?: {
            ordered?: string,
            unordered?: string,
        },
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
```
Learn more on how classnames in `strapi-block-to-jsx` works in the section just bellow.


## Classnames
### Included Classnames
Every components has the classname `strapi-btjsx`. <br>
In addition, each component has a specific class name prefixed with `strapi-btjsx` following this pattern:<br>
`strapi-btjsx-{componentName}{specification}`<br>
This behavior can be disabled in the configuration object by setting the property generatedClassNames to false.

```typescript
const config = {
    environment: 'next',
    generatedClassNames: false
}
```
More details on this will be provided below.
- Heading: `.strapi-btjsx-heading` (applied to all types of heading) and `.strapi-btjsx-heading${block.level}` (level is between 1 and 6)
- Image: `.strapi-btjsx-image`
- Link: `.strapi-btjsx-link`
- List: `.strapi-btjsx-list` (for all types of list)
  - `.strapi-btjsx-ol` for ordered list
  - `.strapi-btjsx-ul` for unordered list
- Paragraph: `.strapi-btjsx-paragraph`
- VSpacing: `.strapi-btjsx-vspacing`


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

// Will result with classname "heading-class heading-classname-from-elementsConfig"
return <Strapiblock block={block} config={config} />
```
NB: The classnames property of the configuration is made for simplified configuration the only config needed is to specified classname.

## Components customization
### Links
The link blocks have few attributes you can customize. The config object allows you to specify the `target` (default is `_blank`) and the `rel` (default is `noopener`). This is not recommended to change the `rel` attributes for security and SEO purposes. <br>
The color attributes adds a style attribute with the color sets. This is a shortcut for implementing custom color directly in the element.

Here is the customization types for the link blocks.
```typescript
type LinkConfig = ElementConfig & {
    target?: "_self" | "_blank" | "_parent" | "_top",
    rel?: "noopener" | "noreferrer" | "nofollow",
    color?: string,
}
// Generates here the documentation on how links are managed in the documentation.
```
More information about attributes and its values on the [MDN documentation for links](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) <br>
Example of link configuration:
```typescript
const config = {
    elementsConfig:{
        link: {
            target: "_self",
            color: "inherit",
            className: "links-classname"
        }
    }
}
return <Strapiblock block={block} config={config}>
```
### Images
#### CMS url
If you have images included in your articles. The configuration object will be needed to work properly with the minimum value of cmsBaseUrl which represents the domain with protocol where your strapi instance is available. You still can skip it if the strapi instance is on the same domain than your application. If cmsBaseUrl is not specified, the library will use `/` as base url for finding the images.
```typescript
// Here is the configuration object type for image blocks
type ImageConfig = ElementConfig & {
    title?: boolean,
    loading?: "lazy" | "eager",
    size?: "original" | "large" | "small" | "medium" | "thumbnail",
    width?: number,
    height?: number,
    crossorigin?: "anonymous" | "use-credentials",
    decoding?: "sync" | "async" | "auto",
}
```
#### Classnames
Like every component in this library, images has their own classnames generated by the library which are the global `.strapi-btjsx` and it own classname `.strapi-btjsx-image`.
You still can customize the classnames by adding the ones you do want to use.<br>
Example of setting custom classnames
```typescript
const config: StrapiBlockToJsxConfig = {
    cmsBaseUrl: "https://your-strapi-instance-domain.com",
    elementsConfig: {
        image: {
            className: "strapi-image-custom",
        }
    },
    classNames: {
        image: "strapi-btjsx-classname"
    }
}

return <Strapiblock block={block} config={config}>
```

#### Size
By default, Strapi formats your images with multiple sizes and additionally, keep the original one.
The image component selects the correct image format based on the configuration object you provide. If no config object is provided, the default size will be large, if there is no large format it will be the original.<br>
You can specify 5 values as the size property that are `"original"`, `"large"`, `"medium"`, `"small"` and `"thumbnail"`. Those are the values generated from Strapi and are not specific to this library. You can find those referenced as the property `block.image.format`.<br>
Example of size configuration:
```typescript
const config = {
    cmsBaseUrl: `https://your-strapi-instance-domain.com`
    elementsConfig: {
        image: {
            size: "medium"
        }
    }
}
return <Strapiblock block={block} config={config}>
```
It worth mention that the `srcset` HTML property is automatically generated by taking all images formats from the block and added it to the `srcset` property of the img component. For Next.js environment, this is the framework that generates the `srcset` value using its own optimizations functionnalities.

#### Alt Text & Title: 
The alternative text is sets using the one you provided in the CMS. If not provided, it defaults to the image name. <br>
It is the same for title that choose the caption of the image you have setted in the CMS. if there is no caption, uses the alternative text.

#### Optimization & Security Attributes: 
As mentionned earlier, the library has focused on filling all attributes that can help for SEO and loading performance. Each one is customizable using the configuration object: 
- `loading`: available values are `lazy` or `eager`. The default value is `lazy`. It is not recommended to change this setting.
- `decoding`: available values are `sync` | `async` | `auto`. The default value is `async`.
- `crossorigin`: available values are `anonymous` | `use-credentials`. The default value is `anonymous`.
Example of setting attributes
```typescript
const config = {
    cmsBaseUrl: `https://your-strapi-instance-domain.com`
    elementsConfig: {
        image: {
            loading: "lazy",
            decoding: "sync",
            crossorigin: "anonymous"
        }
    }
}
return <Strapiblock block={block} config={config}>
```
For more informations related to these attributes, plese refer to the [MDN documentation for `<img/>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)


#### Working with NextJS
If the config.environment is set to "next", the component will use the Next.js `<Image/>` component. Otherwise, it defaults to a standard HTML `<img/>` tag.


### List & List items
#### Overview
This section covers the implementation of ordered (ol) and unordered (ul) lists in Strapi CMS, and how they are rendered into JSX components using our library.<br>
You can find below the customization type object for lists :
```typescript
type ListConfig = {
    ordered?: ElementConfig & {
        type?: "a" | "A" | "i" | "I" | "1",
        start?: number,
        reversed?: boolean,
    },
    unordered?: ElementConfig & {
        type?:"circle" | "square" | "disc",
    }
}
```


#### Styling and Classes
Strapi CMS disposes of 2 types of lists: ordered (ol) and unordered (ul).<br>
Both types of list container use the global class name `strapi-btjsx` and `strapi-btjsx-list`, for global list customization. Additionally, specific classes are assigned following the type, desbribed bellow.<br>
It is the same for list items elements with the global class name `strapi-btjsx-list-item`.
- Ordered lists: 
  - `strapi-btjsx-ol` for the list container (`<ol>`)
  - `strapi-btjsx-ol-list-item` for the list items elements (`<li>`)
- Unordered lists: 
  - `strapi-btjsx-ul` for the list container (`<ul>`)
  - `strapi-btjsx-ul-list-item` for the list items elements (`<li>`)

#### Customization
For high customization purpose, the config choice has been to differentiate both for list elements and also list items elements.<br>
As every component in this library, you can customize it by the elementsConfig property and the classNames property in the configuration object.<br>
Configuration example for both ordered and unordered lists:
```typescript
const listConfig = {
    generatedClassNames: false, // If you want to disable the library classNames
    elementsConfig: {
        // Configuration for list types
        list: {
            unordered : {
                className: "unordered-config",
            },
            ordered: {
                className: "ordered-config",
            }
        },
        // Configuration for list items
        listItem: {
            ordered: {
                className: "ordered-item-className"
            },
            unordered: {
                className: "unordered-item-className"
            },
        }
    },
    // Additional classNames configuration
    classNames: {
        list: {
            ordered: "ordered-className",
            unordered: "unordered-className",
        },
        listItem: {
            ordered: "ordered-item-className",
            unordered: "unordered-item-className",
        }
    }
}

return <Strapiblock block={block} config={listConfig} />
```
Reminder: None of the configuration for any components is needed for a basic render.

#### Elements properties
In the configuration object, you can set various HTML attributes for both `<ol>` and `<ul>` elements. This allows further customization of list behavior and appearance.

##### Ordered list
- `type`: Sets the numbering style of the `<ol>` HTML element. Default is set to `"1"`
- `start`: Specifies the starting number for the list. Default is set to `1`
- `reversed`: When set to true, reverses the numbering order of the list. Default is set to `false`
For more information of these attributes, see the [MDN documentation for ordered lists](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)
##### Unordered list
- `type`: Sets the bullet style of the `<ul>` element, such as `"circle"`, `"square"`, or `"disc"`.
For more information of these attributes, see the [MDN documentation for unordered lists](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)

Example
```typescript
const listConfig = {
    elementsConfig: {
        // Configuration for list types
        list: {
            unordered : {
                type: "circle",
            },
            ordered: {
                start: 3 // Starts the numbering from 3,
                reversed: true // Reversed the numbering order,
                type: 'A' // Uses uppercase alphabetic numbering,
            }
        }
    }
}
return <Strapiblock block={block} config={config} />
```
In this example, the unordered list will use circle bullets, and the ordered list will start from 3, be reversed, and use uppercase alphabetic numbering.

### Empty spaces
In the Strapi CMS, when you add a blank line for spacing, Strapi generates an empty paragraph block.
In this library, it generates a VSpacing component which is define as :
```typescript
<VSpacing />
```
It is a simple div containing an empty character (`&nbsp;`) with a default height of 30px and width set to 100%.
You can override the default height and width by using the generated classname or by setting your own classname to vspacing on the configuration object.

### Styled text
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

/*
* Bold text will end up with span bold-config-class
* Italic text will end up with span italic-config-class
* Underlined text will end up with span underline-config-class
* Strikethrough text will end up with span strikethrough-config-class
*/
return <Strapiblock block={block} config={config}>

```
It is also working the same way by using classnames in the configuration object:
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
return <Strapiblock block={block} config={config}>
```

## Using Components independently `<Strapiblock/>`
Each block component is importable from the library. It is recommended to use `<Strapiblock />` component for every type of block. But if you prefer to directly use the block components, you can import them. Those are :
```typescript
<Heading /> 
<Image />
<Link />
<List />
<Paragraph />
<Typography /> 
<VSpacing /> // Just takes the config as props
```
