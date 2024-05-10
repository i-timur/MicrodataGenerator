import { getTree, htmlToNode } from './parser';
import { welcomeComponent, customComponent } from './constants';

describe('Get Tree', () => {
  it('should return a proper tree of jsx elements for the welcome component', () => {
    const result = getTree(welcomeComponent);
    expect(result).toEqual([
      {
        children: [
          {
            children: [
              { children: [], name: 'p' },
              { children: [{ children: [], name: 'span' }], name: 'div' },
            ],
            name: 'div',
          },
          { children: [], name: 'h1' },
        ],
        name: 'div',
      },
    ]);
  });

  it('should return a proper tree of jsx elements for the welcome component', () => {
    const result = getTree(customComponent);
    expect(result).toEqual([
      {
        children: [
          {
            children: [
              { children: [], name: 'p' },
              {
                children: [{ children: [], name: 'span' }],
                name: 'TestComponent',
              },
            ],
            name: 'div',
          },
          { children: [], name: 'h1' },
        ],
        name: 'div',
      },
    ]);
  });

  it('should parse a simple html string to a tree of nodes', () => {
    const html = '<div><h1>Hello World</h1><p>Paragraph</p></div>';
    const result = htmlToNode(html);
    expect(result).toEqual([
      {
        name: 'div',
        children: [
          { name: 'h1', children: [] },
          { name: 'p', children: [] },
        ],
      },
    ]);
  });
});
