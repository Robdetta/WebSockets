import { io } from 'socket.io-client';
import { joinNs } from './joinNs';

// const userName = prompt('What is your username?');
// const password = prompt('What is your user password?');

const userName = 'Rob';
const password = 'x';

const socket = io('http://localhost:3000/');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});

//listen for the nsList event from the server which gives use the namespaces
socket.on('nsList', (nsData) => {
  const lastNs = localStorage.getItem('lastNs');
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces') as HTMLElement;
  nameSpacesDiv.innerHTML = '';
  nsData.forEach((ns: { endpoint: string; image: string; id: number }) => {
    //update the HTML with each ns
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    //initialize thisNS as its index
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      console.log(element);
      element.addEventListener('click', (/*e*/) => {
        joinNs(element, nsData);
      });
    },
  );
  //if lastNs is set, grab that element instead of zero
  if (lastNs) {
    const lastNsElement = document.querySelector(`[ns="${lastNs}"]`);
    if (lastNsElement) {
      joinNs(lastNsElement, nsData);
    }
  }
});
