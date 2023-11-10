export const ulTest = {
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
                    "text": "Bullteted list item 3",
                    "type": "text"
                }
            ]
        }
    ]
}

export const olTest = {
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
        }
    ]
}