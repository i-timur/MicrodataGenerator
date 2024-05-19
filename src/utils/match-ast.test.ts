import { matchAst } from './match-ast';
import { welcomeComponent, welcomeComponentHtml } from '../parser/constants';
import {getTree} from '../parser/parser';

describe('Match AST', () => {
    it('should match AST', () => {
        expect(matchAst(welcomeComponent, welcomeComponentHtml)).toBe(true);
    });
});