import {insertTextAtPosition} from './insert-text';

export interface Position {
    line: number;
    column: number;
}

export interface Token {
    type: TokenType,
    content: string | null;
}

export enum TokenType {
    ITEMSCOPE,
    ITEMTYPE ,
    ITEMPROP,
}

export interface TokenGroup {
    tokens: Token[];
    start: Position;
}

export const incorporateMarkup = (content: string, tokenGroups: TokenGroup[]): string => {
    let annotatedContent = content;

    for (const group of tokenGroups) {
        let tokenString = '';

        for (const token of group.tokens) {
            if (token.type === TokenType.ITEMSCOPE) {
                tokenString += ' itemscope';
            } else if (token.type === TokenType.ITEMTYPE) {
                tokenString += ` itemtype="${token.content}"`;
            } else if (token.type === TokenType.ITEMPROP) {
                tokenString += ` itemprop="${token.content}"`;
            }
        }

        annotatedContent = insertTextAtPosition(annotatedContent, group.start.line, group.start.column - 1, tokenString);
    }

    return annotatedContent;
};