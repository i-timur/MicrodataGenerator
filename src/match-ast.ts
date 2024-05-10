import deepEqual from 'deep-equal';
import { getTree, htmlToNode } from './parser/parser';

export function matchAst(jsx: any, html: string) {
    return deepEqual(getTree(jsx), htmlToNode(html));
}