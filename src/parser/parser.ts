import * as babelParser from '@babel/parser';

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

