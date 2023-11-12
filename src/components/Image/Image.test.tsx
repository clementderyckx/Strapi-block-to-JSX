import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StrapiBlock } from '../../types/strapi';
import { StrapiBlockToJsxConfig } from '../../types/config';
import { Image } from './Image';

const testImageBlock: StrapiBlock = {
    type: "image",
    image: {
        ext: ".jpg",
        url: "http://localhost:1337/uploads/crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg",
        hash: "crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874",
        mime: "image/jpeg",
        name: "crystalweed-cannabis-fMitdRhOr_c-unsplash.jpg",
        size: 6554.47,
        width: 9504,
        height: 6336,
        caption: null,
        formats: {
            large: {
                ext: ".jpg",
                url: "/uploads/large_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg",
                hash: "large_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874",
                mime: "image/jpeg",
                name: "large_crystalweed-cannabis-fMitdRhOr_c-unsplash.jpg",
                path: null,
                size: 46.28,
                width: 1000,
                height: 667
            },
            small: {
                ext: ".jpg",
                url: "/uploads/small_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg",
                hash: "small_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874",
                mime: "image/jpeg",
                name: "small_crystalweed-cannabis-fMitdRhOr_c-unsplash.jpg",
                path: null,
                size: 16.67,
                width: 500,
                height: 333
            },
            medium: {
                ext: ".jpg",
                url: "/uploads/medium_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg",
                hash: "medium_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874",
                mime: "image/jpeg",
                name: "medium_crystalweed-cannabis-fMitdRhOr_c-unsplash.jpg",
                path: null,
                size: 30.09,
                width: 750,
                height: 500
            },
            thumbnail: {
                ext: ".jpg",
                url: "/uploads/thumbnail_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg",
                hash: "thumbnail_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874",
                mime: "image/jpeg",
                name: "thumbnail_crystalweed-cannabis-fMitdRhOr_c-unsplash.jpg",
                path: null,
                size: 5.76,
                width: 234,
                height: 156
            }
        },
        provider: "local",
        createdAt: "2023-11-03T11:39:17.311Z",
        updatedAt: "2023-11-03T11:39:17.311Z",
        previewUrl: null,
        alternativeText: "A super alt text for my image",
        provider_metadata: null
    },
    children: [
        {
            text: "",
            type: "text"
        }
    ]
}

/**
 * Image size is correctly set
 * Attribues :
 * * Alt text is correctly set in the component
 * * Has the right cross-origin attribute sets (default is anonymous)
 * * Sets the correct title attribute
 * * Sets the correct loading attribute. Default is loading="lazy"
 * * * Specify in the docs that this is not recommended to change the default loading attributes
 * * srcSet & sizes are correctly sets with appropriates format
 * Sets the correct decoding attribute. Default is decoding="async"
 */

describe("Image component", () => {

    describe("Image attributes", () => {

        it("Image treats correctly cmsBaseUrl", () => {
            const config: StrapiBlockToJsxConfig = {
                cmsBaseUrl: "http://localhost:1337/",
                elementsConfig: {
                    image: {
                        size: "large"
                    }
                }
            }
            render(<Image block={testImageBlock} config={config} />)

            const image = screen.getByAltText("A super alt text for my image")
            expect(image).toHaveAttribute("src", "http://localhost:1337/uploads/large_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg")
        })

        it("Loads the correct image using the sizes config", () => {
            const config: StrapiBlockToJsxConfig = {
                cmsBaseUrl: "http://localhost:1337",
                elementsConfig: {
                    image: {
                        size: "large"
                    }
                }
            }
            render(<Image block={testImageBlock} config={config} />)

            const image = screen.getByAltText("A super alt text for my image")
            expect(image).toHaveAttribute("src", "http://localhost:1337/uploads/large_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg")
        })

        it("Image has the correct alt text", () => {
            render(<Image block={testImageBlock} />)
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toBeInTheDocument();
        })
    
        it("Image has a title from the alt text", () => {
            render(<Image block={testImageBlock} />)
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("title", "A super alt text for my image");
        })
    
        it("Image has the correct default loading attribute", () => {
            render(<Image block={testImageBlock} />)
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("loading", "lazy");
        })
    
        it("Image has the loading attributes set using the config object", () => {
            const config: StrapiBlockToJsxConfig = {
                elementsConfig: {
                    image: {
                        loading: "eager"
                    }
                }
            }
            render(<Image block={testImageBlock} config={config} />);
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("loading", "eager");
        });
    
        it("Image has the correct automatically generated srcSet attribute", () => {
            const config: StrapiBlockToJsxConfig = {
                cmsBaseUrl: "http://localhost:1337"
            } 
            render(<Image block={testImageBlock} config={config}/>)
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("srcset", "http://localhost:1337/uploads/large_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg 1000w, http://localhost:1337/uploads/medium_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg 750w, http://localhost:1337/uploads/small_crystalweed_cannabis_f_Mitd_Rh_Or_c_unsplash_3a653d4874.jpg 500w")
        })
    
        it("Image has default cross-origin attribute set to anonymous", () => {
            render(<Image block={testImageBlock} />)
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("crossorigin", "anonymous");
        })
    
        it("Image has the cross-origin attribute sets by the config object", () => {
            const config: StrapiBlockToJsxConfig = { elementsConfig: { 
                image : {
                    crossorigin: "use-credentials"
                } 
            } }
            render(<Image block={testImageBlock} config={config} />);
    
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("crossorigin", "use-credentials");
        })

        it('Image has the default decoding attribute sets to "async"', () => {
            render(<Image block={testImageBlock} />)

            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveAttribute("decoding", "async");
        })

        it('Image has the decoding attribute sets by the config object', () => {
            const config: StrapiBlockToJsxConfig = { elementsConfig: { 
                image : {
                    decoding: "sync"
                } 
            } }
            render(<Image block={testImageBlock} config={config} />);

            const image = screen.getByAltText("A super alt text for my image");

            expect(image).toHaveAttribute("decoding", "sync");
        })
    })

    describe('Image classnames', () => { 
        it("Image has the correct default classnames", () => {
            render(<Image block={testImageBlock} />)
            const image = screen.getByAltText("A super alt text for my image");
            expect(image).toHaveClass("strapi-btjsx-image");
        })

        it("mage has the correct classnames set by the elementsConfig object", () => {
            const config: StrapiBlockToJsxConfig = { elementsConfig: { 
                image : {
                    className: "strapi-btjsx-image-custom"
                } 
            } }
            render(<Image block={testImageBlock} config={config} />);

            const image = screen.getByAltText("A super alt text for my image");

            expect(image).toHaveClass("strapi-btjsx-image-custom");
        })

        it("Image has the correct classnames set by the classNames Config object", () => {
            const config: StrapiBlockToJsxConfig = {
                classNames: {
                    image: "strapi-btjsx-image-classname"
                }
            }
            render(<Image block={testImageBlock} config={config} />);

            const image = screen.getByAltText("A super alt text for my image");

            expect(image).toHaveClass("strapi-btjsx-image-classname");
        })

        it('Image has all clasnames add when setting its in different config object', () => {
            const config: StrapiBlockToJsxConfig = {
                classNames: {
                    image: "strapi-btjsx-image-classname"
                },
                elementsConfig: {
                    image: {
                        className: "strapi-btjsx-image-custom"
                    }
                }
            }
            render(<Image block={testImageBlock} config={config} />);

            const image = screen.getByAltText("A super alt text for my image");

            expect(image).toHaveClass("strapi-btjsx-image-classname");
            expect(image).toHaveClass("strapi-btjsx-image-custom");
        })

        it('Image does not have default classnames when generatedClassnames is set to false', () => {
            const config: StrapiBlockToJsxConfig = {
                generatedClassNames: false
            }
            render(<Image block={testImageBlock} config={config} />);

            const image = screen.getByAltText("A super alt text for my image");

            expect(image).not.toHaveClass("strapi-btjsx-image");
        })
    })

})