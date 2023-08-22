import { io, Socket } from 'socket.io-client';
import { joinNs } from './joinNs';
import { setSelectedNsId, getSelectedNsId } from './sharedState';

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
const listeners: { nsChange: boolean[]; messageToRoom: boolean[] } = {
  nsChange: [],
  messageToRoom: [],
};

//a global variable we can update when the user clicks on a namespace
//we will use it to broadcast across the app
// let selectedNsId: number = 0;
setSelectedNsId(0);

//add a submit handler for the form
document
  .querySelector('#message-form')
  ?.addEventListener('submit', (e: Event) => {
    //keep the browser from submitting
    e.preventDefault();
    //grab the value of the input box
    const inputElement =
      document.querySelector<HTMLInputElement>('#user-message');
    const newMessage = inputElement?.value;
    console.log(newMessage, getSelectedNsId());
    nameSpaceSockets[getSelectedNsId()].emit('newMessageToRoom', {
      newMessage,
      date: Date.now(),
      avatar: 'https://via.placeholder.com/30',
      userName,
    });
  });

//add listeners job is to manage all listeners added to all names
//this prevents listeners being added multiple times, makes life better as dev
const addListeners = (nsId: number) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on('nsChange', (data) => {
      console.log('Namespace changed!');
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  }
  if (!listeners.messageToRoom[nsId]) {
    //add the nsId listener to this namespace!
    nameSpaceSockets[nsId].on('messageToRoom', (messageObj) => {
      console.log(messageObj);
    });
    listeners.messageToRoom[nsId] = true;
  }
};

//listen for the nsList event from the server which gives use the namespaces
socket.once('nsList', (nsData) => {
  const lastNs = localStorage.getItem('lastNs');
  //console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces') as HTMLElement;
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
