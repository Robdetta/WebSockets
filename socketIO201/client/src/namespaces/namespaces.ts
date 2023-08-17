import { Namespace } from '../types';

const wikiNs: Namespace = {
  name: '/wiki',
  image:
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
};

const mozNs: Namespace = {
  name: '/mozilla',
  image:
    'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png',
};

const linuxNs: Namespace = {
  name: '/linux',
  image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
};

const namespaces: Namespace[] = [wikiNs, mozNs, linuxNs];

export { namespaces };
