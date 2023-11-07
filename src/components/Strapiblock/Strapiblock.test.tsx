import Strapiblock from "./Strapiblock";
import '@testing-library/jest-dom';
import {screen, render} from '@testing-library/react';


it('renders without crashing', () => {
    render(<Strapiblock/>);
    const element = screen.getByRole('heading', {name: /Strapiblock/i});
    expect(element).toBeInTheDocument();
})