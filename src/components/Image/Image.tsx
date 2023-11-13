import { StrapiImageBlock, StrapiImageBlockProps, StrapiImageFormat } from "../..";
import { setClassname } from "../../lib/classnames.lib";
import { StrapiBlockToJsxComponentProps } from "../../types/components";
import './Image.css';

export function Image({ block, config }: StrapiBlockToJsxComponentProps) {
  if(block.type!== "image") throw new Error("Block type must be image in Image component");

  /**
  * Choose the right block to use
  */
  let imageFormatBlock: StrapiImageFormat | StrapiImageBlockProps = block.image;
  if(config?.elementsConfig?.image?.size && config?.elementsConfig?.image?.size !== "default"){
    const size = config.elementsConfig.image.size;
    const imageFormats = block.image.formats;
    if(imageFormats[size] && imageFormats[size]?.url) {
      imageFormatBlock = imageFormats[size] as StrapiImageFormat;
    }
  }

  /**
   * ImageUrl
   */
  let cmsBaseUrl = config?.cmsBaseUrl ? config.cmsBaseUrl : "/";
  if(cmsBaseUrl.endsWith('/')) cmsBaseUrl = cmsBaseUrl.substring(0, cmsBaseUrl.length - 1);
  const url = `${cmsBaseUrl}${imageFormatBlock.url}`
  const srcSetAttr = Object.keys(block.image.formats).map(imgFormat => {
    const formatBlock = block.image.formats[imgFormat as keyof typeof block.image.formats];
    if(formatBlock && formatBlock.url && formatBlock.width)
      return `${cmsBaseUrl}${formatBlock.url} ${formatBlock.width}w` 
  }).join(', ');

  /**
   * AlternativeText & title
   */
  const altText = (block.image.alternativeText) ? block.image.alternativeText : block.image.name;
  const imgTitle = (block.image.caption)? block.image.caption : altText;
  
  /**
   * Optimization & security attributes
   */
  const loadingAttr = (config?.elementsConfig?.image?.loading)? config?.elementsConfig?.image?.loading : "lazy";
  const decodingAttr = (config?.elementsConfig?.image?.decoding)? config?.elementsConfig?.image?.decoding : "async";
  const crossOriginAttr = (config?.elementsConfig?.image?.crossorigin)? config?.elementsConfig?.image?.crossorigin : "anonymous";

  /**
   * ClassName attribute
   */
  const className = setClassname("strapi-btjsx-image", "image", config);

  /**
   * Return nextJs component if it is a next project
   */
  if(config?.environment && config.environment === "next"){
    const NextImage = require('next/image').default;
    return (
      <NextImage 
        src={url}
        width={imageFormatBlock.width}
        height={imageFormatBlock.height}
        loading={loadingAttr}
        crossOrigin={crossOriginAttr}
        className={className}
      />
    )
  }
    
  return (
    <img 
      src={url} 
      alt={altText} 
      title={imgTitle}
      loading={loadingAttr}
      crossOrigin={crossOriginAttr}
      decoding={decodingAttr}
      srcSet={srcSetAttr}
      className={className}
    />
  )
}