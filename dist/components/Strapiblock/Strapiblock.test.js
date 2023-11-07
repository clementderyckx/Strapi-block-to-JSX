import { jsx as _jsx } from "react/jsx-runtime";
import { Strapiblock } from "./Strapiblock";
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { content } from '../../datas/content-exemple.json';
const blocks = content.filter(b => b.type === "heading");
it('renders without crashing', () => {
    render(_jsx(Strapiblock, { block: blocks[0] }));
    const element = screen.getByRole('heading', { name: /Strapiblock/i });
    expect(element).toBeInTheDocument();
});
