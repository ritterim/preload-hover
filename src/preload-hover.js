export default class PreloadHover {
  constructor(configuration = null) {
    const defaultConfiguration = {
      defaultDomScope: [document.body],
    };

    this.configuration = defaultConfiguration;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }
  }

  start(domScope = this.configuration.defaultDomScope) {
    if (!domScope) { throw new Error('domScope must be provided.'); } 
    domScope = [...new Set(domScope)];
    domScope.forEach(domScope => {
      const head = document.getElementsByTagName('head')[0];
      const links = [...domScope.getElementsByTagName('a')];

      links.forEach(link => {
        link.addEventListener('mouseover', () => {
          const preload = document.createElement('link');

          preload.setAttribute('rel', 'preload');
          preload.setAttribute('href', link.href);

          head.appendChild(preload);
          console.log(preload);
        });
      });
    })
    
  }
}
