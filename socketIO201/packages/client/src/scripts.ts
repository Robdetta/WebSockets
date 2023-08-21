import { io, Socket } from 'socket.io-client';
import { joinNs } from './joinNs';

// const userName = prompt('What is your username?');
// const password = prompt('What is your user password?');

const userName = 'Rob';
const password = 'x';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});

//sockets will be put into this array, in the index of the ns.id
const nameSpaceSockets: Socket[] = [];
const listeners: { nsChange: boolean[] } = { nsChange: [] };

const addListeners = (nsId: number) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on('nsChange', (data) => {
      console.log('Namespace changed!');
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  } else {
    //nothing to do
  }
};

//listen for the nsList event from the server which gives use the namespaces
socket.on('nsList', (nsData) => {
  const lastNs = localStorage.getItem('lastNs');
  //console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces') as HTMLDivElement;
  nameSpacesDiv.innerHTML = '';
  nsData.forEach((ns: { endpoint: string; image: string; id: number }) => {
    //update the HTML with each ns
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    //initialize thisNs as its index in namespace socket
    //if the connection is new, this will be nul
    //if the connection has already been established, it will reconnect and remain in its spot
    //let thisNs = nameSpaceSockets[ns.id];

    if (!nameSpaceSockets[ns.id]) {
      //There is no socket at this
      //join this namespace with io()
      nameSpaceSockets[ns.id] = io(`http://localhost:3000${ns.endpoint}`);
    }
    addListeners(ns.id);

    //nameSpaceSockets[ns.id] = thisNs;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      console.log(element);
      element.addEventListener('click', (/*e*/) => {
        joinNs(element, nsData);
      });
    },
  );

  // on refesh the lobby is reset
  // joinNs(document.getElementsByClassName('namespace')[0], nsData);

  //if lastNs is set, grab that element instead of zero

  //Save last selected Room as the default
  if (lastNs) {
    const lastNsElement = document.querySelector(`[ns="${lastNs}"]`);
    if (lastNsElement) {
      joinNs(lastNsElement, nsData);
    }
  }
});

export { nameSpaceSockets };
