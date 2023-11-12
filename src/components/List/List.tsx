import { useId } from "react";

import { OrderedListType, UnorderedListType } from "../..";
import type { StrapiBlockToJsxComponentProps } from "../../types/components";
import ListItem from "./ListItem";
import { setListClassName } from "../../lib/classnames.lib";


export function List({ config, block }: StrapiBlockToJsxComponentProps) {
  if(block.type !== "list") throw new Error("Block type must be list in List component");

  const listType = block.format;
  const listItems = block.children;

  /**
   * Unordered list config
   */
  let ulType: UnorderedListType = "circle";
  /**
   * Ordered list config
   */
  let olReversed = false;
  let olStart = 1;
  let olType: OrderedListType = "1";
  if(listType === "ordered"){
    if(config?.elementsConfig?.list?.ordered){
      const { reversed, start, type } = config.elementsConfig.list.ordered;
      if(reversed) olReversed = reversed;
      if(start) olStart = start;
      if(type) olType = type;
    }
  }
  else if (listType === "unordered") {
    if(config?.elementsConfig?.list?.unordered?.type) 
      ulType = config.elementsConfig.list.unordered.type;
  }

  /**
   * Classnames 
   */
  let className = setListClassName(block, config);


  return (listType === "ordered") ? (
    <ol 
      type={olType} 
      reversed={olReversed} 
      start={olStart}
      className={className}
    >
      { listItems.map(listItem => (
        <ListItem type="ordered" block={listItem} config={config} key={useId()}/>
      ) )}
    </ol>
  ) : (
    <ul 
      itemType={ulType}
      className={className}
    >
      { listItems.map(listItem => (
        <ListItem type="unordered" block={listItem} config={config} key={useId()}/>
      ) )}
    </ul>
  )
}