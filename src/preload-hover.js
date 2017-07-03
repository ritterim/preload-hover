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

  start(domScopes = this.configuration.defaultDomScope, domLinks = this.configuration.linkType) {
    if (!domScopes) { throw new Error('domScopes must be provided.'); }
    if (domLinks != 'local' && domLinks != 'external' && domLinks != 'both') { throw new Error('linkType must be local, external or both.'); }
    const head = document.getElementsByTagName('head')[0];

    document.getElementById('add-link').addEventListener('click', () => {
      const a = document.createElement('a');
      const link = document.createTextNode('Facebook');
      a.appendChild(link);
      a.title = 'New Button';
      a.href = 'https://www.facebook.com';
      document.getElementById('one').appendChild(a);
    });

    //create function
    const loadAttr = (preload, linkHref) => {
      preload.setAttribute('rel', 'preload');
      preload.setAttribute('href', linkHref.href);
      head.appendChild(preload);
    }

    domScopes.forEach(domScope => {
      const links = [...domScope.getElementsByTagName('a')];
      let timer;
      console.log(domScope)

     domScope.addEventListener('mouseover', (e) => {
        if (e.target.tagName.toLowerCase() == 'a'){
          if(domLinks === 'local') {
            if(e.target.hostname == window.location.hostname) {
              timer = setTimeout(() => {
                const preload = document.createElement('link');
                loadAttr(preload, e.target);
              }, this.configuration.debounceTime);
            }
          } else if(domLinks === 'external') {
            if(e.target.hostname != window.location.hostname){
              timer = setTimeout(() => {
                const preload = document.createElement('link');
                loadAttr(preload, e.target);
              }, this.configuration.debounceTime);
            }
          } else if(domLinks === 'both'){
            timer = setTimeout(() => {
              const preload = document.createElement('link');
              loadAttr(preload, e.target);
              console.log(preload);
            }, this.configuration.debounceTime);
          }
        }
      });

      domScope.addEventListener('mouseout', () => {
          clearTimeout(timer);
        });
    });

  }
}
