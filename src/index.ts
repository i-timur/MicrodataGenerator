import {matchAst} from './utils/match-ast';
import {generateTokenGroups} from './utils/generate-token-groups';
import * as fs from 'fs';
import {incorporateMarkup} from './utils/incorporate-markup';

export function generateAnnotatedFile(path: string, html: string, output?: string): void {
    const file = fs.readFileSync(path, 'utf-8');

    if (matchAst(file, html)) {
        const tokens = generateTokenGroups(file, html)
        const annotatedFile = incorporateMarkup(file, tokens);

        if (output) {
            fs.writeFileSync(output, annotatedFile);
        } else {
            fs.writeFileSync(path, annotatedFile);
        }
    }
}