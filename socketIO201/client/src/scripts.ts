import { io } from 'socket.io-client';
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

//listen for the nsList event from the server which gives use the namespaces
socket.on('nsList', (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces') as HTMLElement;
  nsData.forEach((ns: { endpoint: string; image: string }) => {
    //update the HTML with each ns
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      console.log(element);
      element.addEventListener('click', (e) => {
        joinNs(element, nsData);
      });
    },
  );
});
