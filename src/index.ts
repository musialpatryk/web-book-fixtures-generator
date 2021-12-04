import {getBooks} from "./books-resolver";
import {getLinkedPropertiesNames, normalize, save} from "./helpers";
import {ResolvedData} from "./interfaces";
import {getGenre} from "./genre-resolver";


async function resolveData(): Promise<ResolvedData> {
    const books1 = await getBooks('it'),
        books2 = await getBooks('Oprogramowanie', books1.length),
        books = [...books1, ...books2];

    const authorNames = getLinkedPropertiesNames(books, 'authors'),
        genreNames = getLinkedPropertiesNames(books, 'categories');

    // TODO: Mock authors and connect books to author/genre.

    return {
        books: [...books1, ...books2],
        genre: getGenre(genreNames)
    };
}

resolveData().then(({books, genre}) => {
    const normalizedBooks = normalize(books);
    save('0004_Books.json', normalizedBooks);
    save('0003_Books.json', genre);
});
