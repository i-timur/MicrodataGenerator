import {welcomeComponent, welcomeComponentHtml} from '../parser/constants';
import {generateTokenGroups} from './generate-token-groups';
import {TokenType} from './incorporate-markup';

describe('Generate tokens', () => {
    it('should create correct tokens', () => {
        expect(generateTokenGroups(welcomeComponent, welcomeComponentHtml)).toStrictEqual([
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
        ])
    });
});