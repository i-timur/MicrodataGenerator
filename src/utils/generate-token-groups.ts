import {Token, TokenGroup, TokenType} from './incorporate-markup';
import {getTree, htmlToNode} from '../parser/parser';

export function generateTokenGroups(jsx: any, html: string): TokenGroup[] {
    const ast = getTree(jsx, true);
    const htmlTree = htmlToNode(html, true);

    const tokenGroups: TokenGroup[] = [];
    traverseTrees(htmlTree[0], ast[0], (node1: any, node2: any) => {
        const tokens: Token[] = [];
        if (node1.attributes.length) {
            for (const attr of node1.attributes) {
                if (attr.type === 'itemscope') {
                    tokens.push({
                        type: TokenType.ITEMSCOPE,
                        content: null,
                    });
                } else if (attr.type === 'itemtype') {
                    tokens.push({
                        type: TokenType.ITEMTYPE,
                        content: attr.value,
                    });
                } else if (attr.type === 'itemprop') {
                    tokens.push({
                        type: TokenType.ITEMPROP,
                        content: attr.value,
                    });
                }
            }

            if (tokens.length) {
                tokenGroups.push({
                    tokens,
                    start: {
                        line: node2.loc.end.line,
                        column: node2.loc.end.column,
                    }
                });
            }
        }
    });

    return tokenGroups;
}

function traverseTrees(node1: any, node2: any, callback: any) {
    if (!node1 || !node2) {
        return;
    }

    callback(node1, node2);

    if (node1.children.length !== node2.children.length) {
        throw new Error('Nodes have different number of children');
    }

    for (let i = 0; i < node1.children.length; i++) {
        traverseTrees(node1.children[i], node2.children[i], callback);
    }
}
