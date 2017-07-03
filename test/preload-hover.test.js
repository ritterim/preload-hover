import 'jest';
import PreloadHover from '../src/preload-hover';

jest.useFakeTimers();

beforeEach(() => {
  //document.body.innerHTML = '';
});

it('should construct', () => {
  new PreloadHover();
});

it('should set expected link', () => {
  const domScope = document.body; 
  // const a = document.createElement('a');
  // a.href = 'https://www.google.com';
  // domScope.appendChild(a);

  const preload = new PreloadHover({ defaultDomScope: [document.body], linkType: 'external'});
  console.log(document.body.outerHTML);
  //preload.start();

  const mouseover = new MouseEvent('mouseover');
  a.dispatchEvent(mouseover);
  jest.runTimersToTime(preload.configuration.debounceTime);

  const preloadLinks = document.head.querySelectorAll('link');
  expect(preloadLinks.length).toBe(1);
  expect(preloadLinks[0].href).toBe('https://www.google.com/');
});

// it('should create html link with href after timeout', () => {
//   const a = document.createElement('a');
//   a.href = 'https://www.google.com';
//   document.body.appendChild(a);

//   new PreloadHover({ defaultDomScope: [document.body]}).start();

//   const mouseover = new MouseEvent('mouseover');
//   a.dispatchEvent(mouseover);

//   const preloadLinks = document.head.querySelectorAll('link');
//   expect(preloadLinks[0].outerHTML).toBe("<link rel=\"preload\" href=\"https://www.google.com/\">");
// });

