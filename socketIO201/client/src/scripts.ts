import { io } from 'socket.io-client';
import { Namespace } from './types';

// const userName = prompt('What is your username?');
// const password = prompt('What is your user password?');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});
//listen for the nsList event from the server which gives use the namespaces
socket.on('nsList', (nsData: Namespace[]) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces') as HTMLElement;
  nsData.forEach((ns) => {
    //update the HTML with each ns
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`;
  });
});
