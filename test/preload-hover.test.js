import 'jest';
import PreloadHover from '../src/preload-hover';

beforeEach(() => {
  document.body.innerHTML = '';
});

it('should construct', () => {
  new PreloadHover();
});
