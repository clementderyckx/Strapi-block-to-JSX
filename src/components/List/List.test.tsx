import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { List } from './List';
import { ulTest, olTest } from './List.datas-test';
import { StrapiBlockToJsxConfig } from '../..';

const listConfig: StrapiBlockToJsxConfig = {
    elementsConfig: {
        list: {
            unordered : {
                type: "circle",
                className: "unordered-config",
            },
            ordered: {
                start: 1,
                reversed: false,
                type: 'A',
                className: "ordered-config",
            }
        },
        listItem: {
            ordered: {
                className: "ordered-item-className"
            },
            unordered: {
                className: "unordered-item-className"
            },
        }
    },
    classNames: {
        list: {
            ordered: "ordered-className",
            unordered: "unordered-className",
        },
        listItem: {
            ordered: "ordered-item-className",
            unordered: "unordered-item-className",
        }
    }
}

describe('List component', () => {

    describe('Unordered list', () => {
        it('Should render the unordered list', () => {
            render(<List block={ulTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('UL');

        });

        it('Has the correct number of list items', () => {
            render(<List block={ulTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('listitem');
            expect(listItems.length).toBe(3);
        });

        it('Has the type attribute set to "Square"', () => {
            render(<List block={olTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('list');
            expect(listItems[0].getAttribute('type')).toBe('A');
        })

    })

    describe('Ordered list', () => {
        it('Should render the ordered list', () => {
            render(<List block={olTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('OL');
        })
        it('Has the correct number of list items', () => {
            render(<List block={olTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('listitem');
            expect(listItems.length).toBe(4);
        });

        it('Has the type attribute set to "A"', () => {
            render(<List block={olTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list.getAttribute('type')).toBe('A');
        })

        it('Has the start attribute set to "3"', () => {
            const config: StrapiBlockToJsxConfig = {
                elementsConfig: { list: {
                    ordered: { start: 3 }
                } }
            }
            render(<List block={olTest} config={config}/>);

            const list = screen.getByRole('list');
            expect(list.getAttribute('start')).toBe('3');
        })

    })

    describe('Lists Classnames', () => {

        /**
         * Default Classnames
         */
        it('Has the default classname set to strapi-btjsx-list', () => {
            render(<List block={ulTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list).toHaveClass('strapi-btjsx-list');
        })

        it('UL Has the element classname set to "strapi-btjsx-ul"', () => {
            render(<List block={ulTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list).toHaveClass('strapi-btjsx-ul');
        })

        it('OL has the element classname set to "strapi-btjsx-ol"', () => {
            render(<List block={olTest} config={listConfig}/>);

            const list = screen.getByRole('list');
            expect(list).toHaveClass('strapi-btjsx-ol');
        })

        it('List-item has the element classname set to "strapi-btjsx-list-item"', () => {
            render(<List block={olTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('listitem');
            expect(listItems[0]).toHaveClass('strapi-btjsx-list-item');
        })

        it('List-item from OL has the element classname set to "strapi-btjsx-ol-list-item"', () => {
            render(<List block={olTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('listitem');
            expect(listItems[0]).toHaveClass('strapi-btjsx-ol-list-item');
        })

        it('List-item from UL has the element classname set to "strapi-btjsx-ul-list-item"', () => {
            render(<List block={ulTest} config={listConfig}/>);

            const listItems = screen.getAllByRole('listitem');
            expect(listItems[0]).toHaveClass('strapi-btjsx-ul-list-item');
        })

        /**
         * Configuration Classnames
         */
        it('Unordered list should have the elementConfig class set', () => {
            render(<List block={ulTest} config={listConfig} />)

            const list = screen.getByRole('list');
            expect(list).toHaveClass('unordered-config');
        })

        it('Unordered list should have the config className set', () => {
            render(<List block={ulTest} config={listConfig} />)

            const list = screen.getByRole('list');
            expect(list).toHaveClass('unordered-className');
        })

        it('Ordered list should have the elementConfig class set', () => {
            render(<List block={olTest} config={listConfig} />)

            const list = screen.getByRole('list');
            expect(list).toHaveClass('ordered-config');
        })

        it('Ordered list should have the config className set', () => {
            render(<List block={olTest} config={listConfig} />)

            const list = screen.getByRole('list');
            expect(list).toHaveClass('ordered-className');
        })

        it('Has no classNames set on config.generatedClassnames = false', () => {
            const config: StrapiBlockToJsxConfig = {...listConfig, generatedClassNames: false }
            render(<List block={ulTest} config={config}/>);

            const list = screen.getByRole('list');

            expect(list).not.toHaveClass('strapi-btjsx-list');
            expect(list).not.toHaveClass('strapi-btjsx-ul');
        })

    })

})