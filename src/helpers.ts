import {ParsedModel, Parser} from "./interfaces";

const fs = require('fs');
const request = require('request');

export const normalize = (array: ParsedModel[]): Omit<ParsedModel, 'originalItem'>[] => {
    return array.map((item) => {
        delete item.originalItem;
        return item;
    });
}

export const save = (path, items) => {
    const jsonContent = JSON.stringify(items);
    fs.writeFile('./fixtures/' + path, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log(`Saved ${items.length} items in file ${path}`)
    });
}

export const slugify = (text) => {
    return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


export const getDate = (date) => {
    if (
        !date
    ) {
        return '2021-11-20T14:43:17.854Z';
    }

    switch (date.length) {
        case 4: {
            return date + '-01-01T14:43:17.854Z';
        }
        case 7: {
            return date + '-01T14:43:17.854Z';
        }
        default: {
            return '2021-11-20T14:43:17.854Z';
        }

    }
};

export const getResolver = (
    parser: Parser,
    url: string,
    firstPk
): () => Promise<ParsedModel[]> => {
    return () => {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res) => {
                if (err) { return reject(err); }
                try {
                    const mappedItems = res.body.items.map((item, index) => {
                            return parser(item, index + firstPk);
                        });

                    resolve(mappedItems);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

export const getLinkedPropertiesNames = (items: ParsedModel[], propertyName): string[] => {
    const linkedProperties: string[] = items.map((book) => {
        return book.originalItem[propertyName] || [];
    }).reduce((prev: string[], next: string[]) => {
        return prev.concat(next);
    });

    return [...new Set(linkedProperties)];
}
