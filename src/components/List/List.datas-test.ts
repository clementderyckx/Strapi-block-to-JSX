import { StrapiBlock } from "../../types/strapi";

export const ulTest: StrapiBlock = {
    type: "list",
    format: "unordered",
    children: [
        {
            type: "list-item",
            children: [
                {
                    text: "bulleted list item1",
                    type: "text"
                }
            ]
        },
        {
            type: "list-item",
            children: [
                {
                    text: "Bulleted list item2",
                    type: "text"
                }
            ]
        },
        {
            type: "list-item",
            children: [
                {
                    text: "Bullteted list item 3",
                    type: "text"
                }
            ]
        }
    ]
}

export const olTest: StrapiBlock = {
    type: "list",
    format: "ordered",
    children: [
        {
            type: "list-item",
            children: [
                {
                    text: "Num list item 1",
                    type: "text"
                }
            ]
        },
        {
            type: "list-item",
            children: [
                {
                    text: "Num list item 2",
                    type: "text"
                }
            ]
        },
        {
            type: "list-item",
            children: [
                {
                    text: "Num list item 3",
                    type: "text"
                }
            ]
        },        {
            type: "list-item",
            children: [
                {
                    text: "Num list item 4",
                    type: "text"
                }
            ]
        },
    ]
}