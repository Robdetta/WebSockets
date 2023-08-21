import { Namespace } from '../classes/Namespace';
import { Room } from '../classes/Room';

const wikiNs = new Namespace(
  0,
  'Wikipedia',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
  '/wiki',
);

const mozNs = new Namespace(
  1,
  'Firefox',
  'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png',
  '/mozilla',
);

const linuxNs = new Namespace(
  2,
  'Linux',
  'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
  '/linux',
);

wikiNs.addRoom(new Room(0, 'New Articles', 0, true));
wikiNs.addRoom(new Room(1, 'Gamers', 0));
wikiNs.addRoom(new Room(2, 'Other', 0));

mozNs.addRoom(new Room(0, 'Firefox', 1));
mozNs.addRoom(new Room(1, 'Chrome', 1));
mozNs.addRoom(new Room(2, 'Brave', 1));
mozNs.addRoom(new Room(3, 'Go', 1));

linuxNs.addRoom(new Room(0, 'Debian', 2));
linuxNs.addRoom(new Room(1, 'Red Hat', 2));
linuxNs.addRoom(new Room(2, 'Ubuntu', 2));
linuxNs.addRoom(new Room(3, 'Mac', 2));

const namespaces: Namespace[] = [wikiNs, mozNs, linuxNs];

export { namespaces };
