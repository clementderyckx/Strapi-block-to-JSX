import { jsx as _jsx } from "react/jsx-runtime";
import Heading from "../Heading/Heading";
export function Strapiblock({ config, block }) {
    const environment = config?.environment;
    const classNames = config?.classNames;
    if (block.type === 'heading')
        return _jsx(Heading, { block: block, classNames: classNames, children: block.children[0].text });
    else if (block.type === "paragraph") {
        if (block.children[0].type === "text")
            return _jsx("p", { children: block.children[0].text });
        else
            return _jsx("a", { href: block.children[0].url, children: block.children[0].children[0].text });
    }
    else
        return _jsx("p", { children: "Random element" });
}
