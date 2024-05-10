import * as babelParser from '@babel/parser';
import * as cheerio from 'cheerio';

const reduceAstNode = (oldNode: any, currentNode: any) => {
  let element = {} as any;
  if (currentNode.type === 'JSXElement') {
    element = {
      name: currentNode.openingElement.name.name,
      children: [],
    };
    oldNode.push(element);
  }
  if ('children' in currentNode) {
    currentNode.children.forEach(
      (node: any) =>
        oldNode.length > 0
          ? reduceAstNode(element.children, node)
          : reduceAstNode(oldNode, node),
    );
  }
  return oldNode;
};

export const getTree = (content: any) => {
  const rawAst = babelParser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const decl = rawAst.program.body.find(
    (astNode: any) => astNode.type === 'ExportNamedDeclaration',
  ) as any;

  if (!decl) {
    throw new Error('No export named declaration found');
  }

  const initialAst = decl.declaration?.declarations[0].init.body.body[0].argument;

  return reduceAstNode([], initialAst);
};

interface Node {
  name: string;
  children: Node[];
}

export function htmlToNode(html: string): Node[] {
  const $ = cheerio.load(html);

  function parseElement(element: any): Node {
    const node: Node = {
      name: element.prop('tagName')!.toLowerCase(),
      children: [],
    };
    element.children().each((_: void, child: any) => {
      node.children.push(parseElement($(child)));
    });
    return node;
  }

  return $('body').children().map((_, child) => parseElement($(child))).get();
}

export default {
    getTree,
    htmlToNode,
}
