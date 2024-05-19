export const welcomeComponent = `export const Welcome = (props) => {
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
`;

export const welcomeComponentAnnotated = `export const Welcome = (props) => {
  return (
    <div itemscope itemtype="https://schema.org/Product">
      <div>
        <p itemprop="name">dawwadwad</p>
        <div>
          <span>awdwad</span>
        </div>
      </div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
};

export default Welcome;
`;

export const customComponent = `export const Welcome = (props) => {
  return (
    <div>
      <div>
        <p>dawwadwad</p>
        <TestComponent>
          <span>awdwad</span>
        </TestComponent>
      </div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
};

export default Welcome;
`;

export const welcomeComponentHtml = `
<div itemscope itemtype="https://schema.org/Product">
  <div>
    <p itemprop="name">dawwadwad</p>
    <div>
      <span>awdwad</span>
    </div>
  </div>
  <h1>Hello, {props.name}</h1>
</div>
`
