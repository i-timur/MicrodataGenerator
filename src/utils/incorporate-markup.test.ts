import {welcomeComponent, welcomeComponentAnnotated} from '../parser/constants';
import {incorporateMarkup, TokenGroup, TokenType} from './incorporate-markup';

describe('Incorporate markup', () => {
    it('should incorporate markup correctly', () => {
        const tokenGroups: TokenGroup[] = [
            {
                tokens: [
                    {
                        type: TokenType.ITEMSCOPE,
                        content: null,
                    },
                    {
                        type: TokenType.ITEMTYPE,
                        content: 'https://schema.org/Product',
                    },
                ],
                start: {
                    line: 3,
                    column: 9,
                }
            },
            {
                tokens: [
                    {
                        type: TokenType.ITEMPROP,
                        content: 'name',
                    }
                ],
                start: {
                    line: 5,
                    column: 11,
                },
            }
        ];

        expect(incorporateMarkup(welcomeComponent, tokenGroups)).toBe(welcomeComponentAnnotated);
    });
});