import 'jest';
import PreloadHover from '../src/preload-hover';

beforeEach(() => {
  document.body.innerHTML = '';
});

it('should construct', () => {
  new PreloadHover();
});

it('Creates link based on value passed from parameter', () => {
  const defaultScope = [document.querySelector('#one')]
  const preload = new PreloadHover({defaultDomScope: defaultScope});
  expect(preload.configuration.defaultDomScope).toEqual(defaultScope);
});

