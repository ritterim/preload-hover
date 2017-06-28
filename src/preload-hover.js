import uniqBy from 'lodash.uniqby';

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

  start(domScopes = this.configuration.defaultDomScope) {
    if (!domScopes) { throw new Error('domScope must be provided.'); } 
    const head = document.getElementsByTagName('head')[0];

    domScopes.forEach(domScope => {
      const links = [...domScope.getElementsByTagName('a')];
      let timer;
      let uniqueLinks = uniqBy(links, 'href');

      uniqueLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
          timer = setTimeout(() =>{
            const preload = document.createElement('link');
            
            preload.setAttribute('rel', 'preload');
            preload.setAttribute('href', link.href);

            head.appendChild(preload);
            console.log(preload);
            }, 50);
        });

        link.addEventListener('mouseout', () => {
          clearTimeout(timer);
        });
      });
    })
    
  }
}
