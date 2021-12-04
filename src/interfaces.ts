
export interface ParsedModel {
    model: string;
    pk: number;
    fields: {
        [key: string]: any;
    }
    originalItem?: any;
}

export type Parser = (item: unknown, index: number) => ParsedModel;

export type ResolvedData = {
    [key: string]: ParsedModel[];
}
