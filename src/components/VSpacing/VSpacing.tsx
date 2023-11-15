import { StrapiBlockToJsxConfig } from '../../types/config';
import { setClassname } from '../../lib/classnames.lib';
import './VSpacing.css';

export function VSpacing( { config } :{config?: StrapiBlockToJsxConfig}) {
  const className = setClassname("strapi-btjsx-vspacing","vspacing", config);
  return (
    <div className={className}>&nbsp;</div>
  )
}
