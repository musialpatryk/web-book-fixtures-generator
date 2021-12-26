import {getBooks} from "./books-resolver";
import {getLinkedPropertiesNames, normalize, save} from "./helpers";
import {ResolvedData} from "./interfaces";
import {getGenre} from "./genre-resolver";
import {getAuthors} from "./author-resolver";


async function resolveData(): Promise<ResolvedData> {
    const books1 = await getBooks('it'),
        books2 = await getBooks('Oprogramowanie', books1.length),
        books3 = await getBooks('komputer', books1.length),
        books = [...books1, ...books2, ...books3];

    const authorNames = getLinkedPropertiesNames(books, 'authors'),
        genreNames = getLinkedPropertiesNames(books, 'categories');

    const generatedAuthors = getAuthors(authorNames),
        generatedGenre = getGenre(genreNames);

    books.forEach((book) => {
        book.fields.genre = book.fields.genre.map((genreName) => {
            const searchedGenre = generatedGenre.find((genre) => {
                return genre.fields.genreName === genreName;
            });
            return searchedGenre ? searchedGenre.pk : null;
        });

        book.fields.authors = book.fields.authors.map((authorName) => {
            const searchedAuthor = generatedAuthors.find((author) => {
                return author.fields.name === authorName;
            });

            if (
                searchedAuthor
            ) {
                searchedAuthor.fields.description += ` '${book.fields.title}'`;
            }
            return searchedAuthor ? searchedAuthor.pk : null;
        });
    });

    generatedAuthors.forEach((author) => {
        return author.fields.description += ' i wiele innych.';
    });

    return {
        books,
        genre: generatedGenre,
        authors: generatedAuthors
    };
}

resolveData().then(({books, genre, authors}) => {
    const normalizedBooks = normalize(books);
    save('0001_Genre.json', genre);
    save('0002_Authors.json', authors);
    save('0003_Books.json', normalizedBooks);
});
