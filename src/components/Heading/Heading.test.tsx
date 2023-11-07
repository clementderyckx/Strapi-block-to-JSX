import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

const headingDatas: StrapiBlock = {
    type: "heading",
    level: 1,
    children: [
        {
            text: "Title of the first article",
            type: "text"
        }
    ]
}

const classNames: ClassNamesConfig = {
    heading: "heading-classname"
}

const config: StrapiBlockToJsxConfig = {
    environment: 'react',
    classNames
}

describe("Heading component", () => {

    describe('content' , () => {
        it('Renders the good title content', () => {
            render(<Heading block={headingDatas}/>);

            const element = screen.getByRole('heading', {name: "Title of the first article"});

            expect(element).toBeInTheDocument();
        })
    })


    describe.skip('Classnames', () => {
        it('Has the className set by ClassNames object', () => {
            const { container } = render(<div> <Heading block={headingDatas} classNames={classNames}/></div>)

            const element = container.querySelector(".heading-classname");

            expect(element).toBeInTheDocument()
        })
    
        it('Has the className set by Config object', () => {
            const { container } = render(<div><Heading block={headingDatas} config={config}/></div>)

            const element = container.querySelector(".heading-classname");

            expect(element).toBeInTheDocument()
        })
    })

    describe.skip('Tag', () => {
        it('Should render as an H1', () => {
            headingDatas.level = 1;
            const { container } = render(<div><Heading block={headingDatas} /></div>);
            
            const element = container.getElementsByTagName('h1');

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
        it('Should render as an H2', () => {
            headingDatas.level = 2;
            const { container } = render(<div><Heading block={headingDatas} /></div>);
            
            const element = container.getElementsByTagName('h2');

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
        it('Should render as an H3', () => {
            headingDatas.level = 3;
            const { container } = render(<div><Heading block={headingDatas} /></div>);
            
            const element = container.getElementsByTagName('h3');

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
        it('Should render as an H4', () => {
            headingDatas.level = 4;
            const { container } = render(<div><Heading block={headingDatas} /></div>);

            const element = container.getElementsByTagName('h4');

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
        it('Should render as an H5', () => {
            headingDatas.level = 5;
            const { container } = render(<div><Heading block={headingDatas} /></div>);

            const element = container.getElementsByTagName('h5');

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
        it('Should render as an H6', () => {
            headingDatas.level = 6;
            const { container } = render(<div><Heading block={headingDatas} /></div>);

            const element = container.getElementsByTagName('h6')

            expect(element.length).toBeGreaterThanOrEqual(1);
        })
    })
    
})