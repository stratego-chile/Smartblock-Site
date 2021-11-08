import { create as createRender } from 'react-test-renderer';
import App from 'App';

test('render initial component configuration', () => {
  const renderer = createRender(<App />);
  expect(renderer.toJSON()).not.toBeUndefined();
});
