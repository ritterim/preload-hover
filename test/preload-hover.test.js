import 'jest';
import PreloadHover from '../src/preload-hover';

beforeEach(() => {
  document.body.innerHTML = '';
});

it('should construct', () => {
  new PreloadHover();
});

it('should set expected link', () => {
  const a = document.createElement('a');
  a.href = 'https://www.google.com';
  document.body.appendChild(a);

  new PreloadHover({ defaultDomScope: [document.body]}).start();

  const mouseover = new MouseEvent('mouseover');
  a.dispatchEvent(mouseover);
  
  const preloadLinks = document.head.querySelectorAll('link');
  expect(preloadLinks.length).toBe(1);
  expect(preloadLinks[0].href).toBe('https://www.google.com/');
});