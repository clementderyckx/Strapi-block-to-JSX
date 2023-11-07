import { ReactNode } from 'react';
type Props = {
    config?: StrapiBlockToJsxConfig;
    block: StrapiBlock;
    children?: ReactNode;
    classNames?: ElementClassNames;
};
export default function Heading({ block, children, config, classNames }: Props): import("react/jsx-runtime").JSX.Element;
export {};
