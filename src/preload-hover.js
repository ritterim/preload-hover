import uniqBy from 'lodash.uniqby';

export default class PreloadHover {
  constructor(configuration = null) {
    const defaultConfiguration = {
      defaultDomScope: [document.body],
      debounceTime: 50,
      linkType: 'local', 
    };

    this.configuration = defaultConfiguration;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }
  }

  //create function

  start(domScopes = this.configuration.defaultDomScope, domLinks = this.configuration.linkType) {
    if (!domScopes) { throw new Error('domScopes must be provided.'); }
    if (domLinks != 'local' && domLinks != 'external' && domLinks != 'both') { throw new Error('linkType must be local, external or both.'); }
    const head = document.getElementsByTagName('head')[0];

    domScopes.forEach(domScope => {
      const links = [...domScope.getElementsByTagName('a')];
      let timer;
      let uniqueLinks = uniqBy(links, 'href');

      uniqueLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
          if(domLinks === 'local') {
            if(link.hostname == window.location.hostname) {
              timer = setTimeout(() => {
                const preload = document.createElement('link');

                preload.setAttribute('rel', 'preload');
                preload.setAttribute('href', link.href);
                head.appendChild(preload);
              }, this.configuration.debounceTime);
            }
          } else if(domLinks === 'external') {
            if(link.hostname != window.location.hostname){
              timer = setTimeout(() => {
                const preload = document.createElement('link');

                preload.setAttribute('rel', 'preload');
                preload.setAttribute('href', link.href);

                head.appendChild(preload);
              }, this.configuration.debounceTime);
            }
          } else if(domLinks === 'both'){
            timer = setTimeout(() => {
              const preload = document.createElement('link');

              preload.setAttribute('rel', 'preload');
              preload.setAttribute('href', link.href);

              head.appendChild(preload);
            }, this.configuration.debounceTime);
          }
        });

        link.addEventListener('mouseout', () => {
          clearTimeout(timer);
        });
      });
    });

  }
}
