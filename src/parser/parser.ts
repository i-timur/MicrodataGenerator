import * as babelParser from '@babel/parser';
import * as cheerio from 'cheerio';

interface Node {
  name: string;
  children: Node[];
}

const reduceAstNode = (oldNode: any, currentNode: any, returnAttributes = false) => {
  let element = {} as any;
  if (currentNode.type === 'JSXElement') {
    element = {
      name: currentNode.openingElement.name.name,
      children: [],
    };

    if (returnAttributes) {
      element.attributes = currentNode.openingElement.attributes.filter(
          (attr: any) => isMicrodataAttribute(attr.name.name),
      );
      element.attributes.map((attr: any) => ({
        type: attr.name.name,
        value: attr.value.value,
      }))
      element.loc = currentNode.openingElement.loc;
    }

    oldNode.push(element);
  }

  if ('children' in currentNode) {
    currentNode.children.forEach(
      (node: any) =>
        oldNode.length > 0
          ? reduceAstNode(element.children, node, returnAttributes)
          : reduceAstNode(oldNode, node, returnAttributes),
    );
  }

  return oldNode;
};

export const getTree = (content: any, returnAttributes = false) => {
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

  return reduceAstNode([], initialAst, returnAttributes);
};

export function htmlToNode(html: string, returnAttributes?: boolean): Node[] {
  const $ = cheerio.load(html);

  function parseElement(element: any): Node {
    const node: any = {
      name: element.prop('tagName')!.toLowerCase(),
      children: [],
    };

    if (returnAttributes) {
      const attributes = element.attr() || [];
      node.attributes = Object.entries(attributes)
        .filter((attr: any) => isMicrodataAttribute(attr[0]))
        .map((attr: any) => ({
            type: attr[0],
            value: attr[1],
        }))
    }

    element.children().each((_: void, child: any) => {
      node.children.push(parseElement($(child)));
    });

    return node;
  }

  return $('body').children().map((_, child) => parseElement($(child))).get();
}

function isMicrodataAttribute(type: string): boolean {
  return type === 'itemscope' || type === 'itemtype' || type === 'itemprop';
}

export default {
    getTree,
    htmlToNode,
}