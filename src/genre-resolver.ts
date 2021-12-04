import {slugify} from "./helpers";
import {ParsedModel} from "./interfaces";


export const getGenre = (genreNames: string[], startIndex = 0): ParsedModel[] => {
    return genreNames.map((name, index) => {
        return {
            model: "books.genre",
            pk: index + startIndex,
            fields: {
                created: "2021-11-20T14:24:21.552Z",
                updated: "2021-11-20T14:24:21.552Z",
                genreName: name,
                slug: slugify(name)
            }
        };
    });
}
