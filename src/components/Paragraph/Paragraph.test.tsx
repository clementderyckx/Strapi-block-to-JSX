import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { StrapiBlock } from '../../types/strapi';
import {Paragraph} from './Paragraph';

const paragraphBlock: StrapiBlock={
    type: "paragraph",
    children: [
        {
            text: "An introduction for the first article",
            type: "text"
        }
    ]
}

const emptyParagraphBlock: StrapiBlock={
    type: "paragraph",
    children: [
        {
            text: "",
            type: "text"
        }
    ]
}

const paragraphWithLink: StrapiBlock = {
    type: "paragraph",
    children: [
        {
            text: "Here is a link ",
            type: "text"
        },
        {
            url: "https://strapi.io",
            type: "link",
            children: [
                {
                    text: "a link in a paragraph",
                    type: "text"
                }
            ]
        },
        {
            text: " followed by a text",
            type: "text"
        }
    ]
}

describe('Paragraph component', () => {

    describe('It shows the right element', () => {
        it('Generates a paragraph HTML element', () => {
            const { container } = render(
            <div>
              <Paragraph block={paragraphBlock}/>  
            </div>
            )
            const paragraph = container.querySelector('p.strapi-btjsx-paragraph')
            expect(paragraph).toBeInTheDocument()
        });
    
        it('Generates a spacing element on empty paragraph', () => {
            const { container } = render(
            <div>
              <Paragraph block={emptyParagraphBlock}/>  
            </div>
            )
            const vspacing = container.querySelector('div.strapi-btjsx-vspacing')
            expect(vspacing).toBeInTheDocument()
        });

    
    })
    
    describe('It has the right content', () => {
        it('has the correct text', () => {
            render(<Paragraph block={paragraphBlock}/>)
            const element = screen.getByText('An introduction for the first article')
            expect(element).toBeInTheDocument()
        })

        it('Includes the link and the text', () => {
            const {container} = render(
                <div>
                    <Paragraph block={paragraphWithLink}/>
                </div>
            )
            const link = container.querySelector('a');
            expect(link).toBeInTheDocument();
            expect(link?.getAttribute('href')).toBe('https://strapi.io');
        })
    })

})
