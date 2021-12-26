import {slugify} from "./helpers";
import {ParsedModel} from "./interfaces";


export const getAuthors = (authorNames: string[], startIndex = 0): ParsedModel[] => {
    return authorNames.map((name, index) => {
        return {
            model: "authors.author",
            pk: index + startIndex,
            fields: {
                created: "2021-11-20T14:24:21.552Z",
                updated: "2021-11-20T14:24:21.552Z",
                name,
                description: 'Znakomity pisarz i twórca literacki. Autor takich dzieł jak ',
                slug: slugify(name),
                birthDate: '1990-10-20',
                rating: 0,
                genre: [],
                status: 'A'
            }
        };
    });
}
