import {getDate, getResolver, slugify} from "./helpers";
import {ParsedModel} from "./interfaces";


const bookParser = (item, index): ParsedModel => {
    const volumeInfo = item.volumeInfo;

    return {
        model: 'books.book',
        pk: index,
        fields: {
            created: `2021-11-20T14:43:17.854Z`,
            updated: `2021-11-20T14:43:17.854Z`,
            title: volumeInfo.title,
            description: volumeInfo.description,
            rating: 5.0,
            pages: volumeInfo.pageCount || 0,
            slug: slugify(volumeInfo.title),
            publishDate: getDate(volumeInfo.publishedDate),
            status: 'A',
            authors: volumeInfo.authors,
            genre: volumeInfo.categories,
        },
        originalItem: item.volumeInfo
    };
}

export const getBooks = (searchString, startIndex = 0) => {
    return getResolver(
        bookParser,
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}&langRestrict=pl&maxResults=40`,
        startIndex
    )();
};


