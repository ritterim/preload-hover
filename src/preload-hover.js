import uniqBy from 'lodash.uniqby';

export default class PreloadHover {
  constructor(configuration = null) {
    const defaultConfiguration = {
      defaultDomScope: [document.body],
      debounceTime: 50,
      linkType: ['local', 'external', 'both'], 
    };

    this.configuration = defaultConfiguration;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }
  }

  start(domScopes = this.configuration.defaultDomScope) {
    if (!domScopes) { throw new Error('domScopes must be provided.'); }
    const head = document.getElementsByTagName('head')[0];

    domScopes.forEach(domScope => {
      const links = [...domScope.getElementsByTagName('a')];
      let timer;
      let uniqueLinks = uniqBy(links, 'href');

      uniqueLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
          if(this.configuration.linkType === 'local' || this.configuration.linkType ==='both') {
            timer = setTimeout(() => {
              const preload = document.createElement('link');

              preload.setAttribute('rel', 'preload');
              preload.setAttribute('href', link.href);
              head.appendChild(preload);
              console.log(preload);
            }, this.configuration.debounceTime);
          } else if(this.configuration.linkType === 'external') {
            if(link.hostname != window.location.hostname){
              timer = setTimeout(() => {
                const preload = document.createElement('link');

                preload.setAttribute('rel', 'preload');
                preload.setAttribute('href', link.href);

                head.appendChild(preload);
                console.log(preload);
              }, this.configuration.debounceTime);
            }
          }
        });

        link.addEventListener('mouseout', () => {
          clearTimeout(timer);
        });
      });
    });

  }
}
