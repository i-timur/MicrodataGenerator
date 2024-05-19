import { insertTextAtPosition } from './insert-text';

const productComponent = `export const Welcome = (props) => {
  return (
    <div>
      <div>
        <p>dawwadwad</p>
        <div>
          <span>awdwad</span>
        </div>
      </div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
};

export default Welcome;
`

const productComponentAnnotated = `export const Welcome = (props) => {
  return (
    <div itemscope itemtype="https://schema.org/Product">
      <div>
        <p>dawwadwad</p>
        <div>
          <span>awdwad</span>
        </div>
      </div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
};

export default Welcome;
`

describe('Insert text', () => {
    it('should insert text at the correct position', () => {
        expect(insertTextAtPosition(productComponent, 3, 8, ' itemscope itemtype="https://schema.org/Product"'))
            .toBe(productComponentAnnotated);
    });
});