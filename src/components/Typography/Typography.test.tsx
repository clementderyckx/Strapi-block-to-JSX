import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Typography } from './Typography';
import type { StrapiTextNode } from '../../types/strapi';
import { StrapiBlockToJsxConfig } from '../..';

const simpleText: StrapiTextNode = {
    text: "A text block",
    type: "text"
};
const boldTextBlock: StrapiTextNode = {...simpleText, bold: true };
const strikedTextBlock: StrapiTextNode = {...simpleText, strikethrough: true };
const underlinedTextBlock: StrapiTextNode = {...simpleText, underline: true };
const italicTextBlock: StrapiTextNode = {...simpleText, italic: true };
const boldItalicUnderlinedTextBlock: StrapiTextNode = {...simpleText, bold: true, underline: true, italic: true };

const textTypoConfig: StrapiBlockToJsxConfig = {
    elementsConfig: {
        typography: {
            bold: {
                className: "bold-config"
            },
            italic: {
                className: "italic-config"
            },
            strikethrough: {
                className: "strikethrough-config"
            },
            underline: {
                className: "underline-config"
            }
        }
    }
}

describe('Typography component', () => {

    describe('Render elements', () => {
        it('Has the correct text', () => {
            render(<Typography block={simpleText} />)
            const element = screen.getByText('A text block');
            expect(element).toBeInTheDocument();
        })
    
        it('Contains a span element', () => {
            render(<Typography block={boldTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toBeInTheDocument()
    
        })
    })

    describe('Utlilities classes', () => {
        it('contains a bold utility class', () => {
            render(<Typography block={boldTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strapi-btjsx-bold-text');
        })
    
        it('contains a italic utility class', () => {
            render(<Typography block={italicTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strapi-btjsx-italic-text');
        })
    
    
        it('contains a strikethrough utility class', () => {
            render(<Typography block={strikedTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strapi-btjsx-strikethrough-text');
        })
    
        it('contains a underlined utility class', () => {
            render(<Typography block={underlinedTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strapi-btjsx-underlined-text');
        })
    
        it('Adds multiples utilities classes when few properties are true', () => {
            render(<Typography block={boldItalicUnderlinedTextBlock} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strapi-btjsx-bold-text strapi-btjsx-italic-text strapi-btjsx-underlined-text');
        })
    })

    describe('Config object is working on the component', () => {

        it('Config added all classNames setted on the component', () => {
            render(<Typography block={boldItalicUnderlinedTextBlock} config={textTypoConfig} />)
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('bold-config italic-config underline-config');
        })

        it('Only has bold class', () => {
            render(<Typography block={boldTextBlock} config={textTypoConfig} />)
            
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('bold-config');
            expect(span).not.toHaveClass('italic-config');
            expect(span).not.toHaveClass('strikethrough-config');
            expect(span).not.toHaveClass('underline-config');
        })

        it('Only has italic class', () => {
            render(<Typography block={italicTextBlock} config={textTypoConfig} />)
            
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('italic-config');
            expect(span).not.toHaveClass('bold-config');
            expect(span).not.toHaveClass('strikethrough-config');
            expect(span).not.toHaveClass('underline-config');
        })

        it('Only has strikethrough class', () => {
            render(<Typography block={strikedTextBlock} config={textTypoConfig} />)
            
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('strikethrough-config');
            expect(span).not.toHaveClass('bold-config');
            expect(span).not.toHaveClass('italic-config');
            expect(span).not.toHaveClass('underline-config');
        })

        it('Only has underlined class', () => {
            render(<Typography block={underlinedTextBlock} config={textTypoConfig} />)
            
            const span = screen.getByTestId('test-span');
            expect(span).toHaveClass('underline-config');
            expect(span).not.toHaveClass('bold-config');
            expect(span).not.toHaveClass('strikethrough-config');
            expect(span).not.toHaveClass('italic-config');
        })
    })

})