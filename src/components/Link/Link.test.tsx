import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { StrapiBlock } from '../../types/strapi';
import { Link } from './Link';
import { StrapiBlockToJsxConfig } from '../..';


const config: StrapiBlockToJsxConfig = {
    environment: "react",
    elementsConfig: {
        link: {
            target: "_blank",
            rel: "noopener",
            className: 'test-link-classname'
        }
    }
}

const testLinkBlock: StrapiBlock = {
    url: "https://strapi.io/",
    type: "link",
    children: [
        {
            text: "a link in a paragraph",
            type: "text"
        }
    ]
}

describe('Link component', () => {

    /**
     * Rendering basics
     */
    describe("Rendering", () => {

        it('External link renders correctly', () => {
            render(<Link config={config} block={testLinkBlock} />);
            expect(screen.getByText("a link in a paragraph")).toBeInTheDocument();
        })

    
        it('Internal link on next environment renders correctly', () => {
            const nextConfig: StrapiBlockToJsxConfig = {...config, environment: "next" };
            const internalLinkBlock = {...testLinkBlock, url: '/blog/about'}
            const {container} = render(
                <div>
                    <Link config={nextConfig} block={internalLinkBlock} />
                </div>
            );
            const element = container.querySelector('a');
            expect(element?.hasAttribute('rel')).toBeFalsy();
        })

    })


    /**
     * Basic attributes
     */
    describe("Link Basic Attributes", () => {

        it('Has the correct default classname', () => {
            const {container} = render(
                <div>
                    <Link config={config} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element).toBeInTheDocument();
        })

        it('Add classnames on config', () => {
            const {container} = render(
                <div>
                    <Link config={config} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a[class="strapi-btjsx strapi-btjsx-link test-link-classname"]');
            expect(element).toBeInTheDocument();
        })


        it('Link has the correct href', () => {
            const {container} = render(
                <div>
                    <Link config={config} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a');
            expect(element?.href).toBe("https://strapi.io/");
        })

    })



    /**
     * Behaviour
     */
    describe('Link behavior attributes', () => {

        it('Has a target="_blank" set By default', () => {
            const {container} = render(
                <div>
                    <Link block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('target')).toBe("_blank");
        })

        it('Has a target="_blank" explicitely sets', () => {
            const {container} = render(
                <div>
                    <Link config={config} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('target')).toBe("_blank");
        })

        it('Has no target on internal Link', () => {
            const internalLinkBlock = { ...testLinkBlock, url: '/blog/article1' };
            const {container} = render(
                <div>
                    <Link config={config} block={internalLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('target')).toBe("_blank");
        })

    })


    /**
     * Security
     */
    describe('Link security', () => { 
        it('Has a rel "noopener" set by default on external link', () => {
            const {container} = render(
                <div>
                    <Link block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('rel')).toBe("noopener");
        })

        it('Has a rel "noopener" set on target="_blank"', () => {
            const {container} = render(
                <div>
                    <Link config={config} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('rel')).toBe("noopener");
        })

        it('sets a correct other rel attribute value on config object', () => {
            const noFollowConfig: StrapiBlockToJsxConfig = {
                elementsConfig: {
                    link: {
                        target: "_blank",
                        rel: "nofollow"
                    }
                }
            }
            const {container} = render(
                <div>
                    <Link config={noFollowConfig} block={testLinkBlock} />
                </div>
            );
            const element = container.querySelector('a.strapi-btjsx-link');
            expect(element?.getAttribute('rel')).toBe("nofollow");
        })


    })
})