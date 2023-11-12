import { useId } from "react";
import { StrapiBlockToJsxComponentProps } from "../../types/components";
import { Typography } from "../../components/Typography/Typography";
import { Link } from "../../components/Link/Link";
import { setListItemClassName } from "../../lib/classnames.lib";

type ListItemProps = StrapiBlockToJsxComponentProps & {
  type: "ordered" | "unordered",
}

export default function ListItem({ block, config, type }: ListItemProps) {
  if(block.type!== "list-item") throw new Error("Block type must be list-item in listItem component");

  const className = setListItemClassName(type, config);
  
  return (
    <li className={className}>
      { block.children.map(childBlock => (
        (childBlock.type === "text") ? ( 
          <Typography block={childBlock} config={config} key={useId()}/> 
        ): <Link block={childBlock} config={config} key={useId()}/>
      )) }
    </li>
  )
}
