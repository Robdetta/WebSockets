import { Namespace } from './classes/Namespace';
import { joinRoom } from './joinRoom';
import { getSelectedNsId } from './sharedState';

//we could ask the server for fresh info, THIS IS BAD
//we have Socket IO, and the server will tell us when something has happened
const joinNs = (element: Element, nsData: Namespace[]) => {
  const nsEndPoint = element.getAttribute('ns') ?? '';
  //console.log(nsEndPoint);

  const clickedNs = nsData.find(
    (ns) => ns.endpoint === nsEndPoint,
  ) as Namespace;
  //global so we can submit a new message to the right place
  let currentNsIs = getSelectedNsId();
  //global so we can submit the new message to the right place
  currentNsIs = clickedNs.id;
  const rooms = clickedNs.rooms;

  //get the room list div
  let roomList = document.querySelector('.room-list') as HTMLElement;
  //clear it out
  roomList.innerHTML = '';

  //Init first room variable
  let firstRoom: string | null = null;

  //loop through each room, and add it to the DOM
  rooms.forEach(
    (
      room: {
        roomTitle: string;
        privateRoom: boolean;
        namespaceId: number;
      },
      i,
    ) => {
      if (i === 0) {
        firstRoom = room.roomTitle;
      }
      roomList.innerHTML += `<li class="room" namespaceId =${room.namespaceId}>

    <span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>${
      room.roomTitle
    }
    </li>`;
    },
  );

  //init join first room
  if (firstRoom !== null) {
    joinRoom(firstRoom, clickedNs.id);
  }
  //add click listener to each room so the client can tell the server it wants to join
  const roomNodes: NodeList = document.querySelectorAll('.room');
  Array.from(roomNodes).forEach((elem) => {
    elem.addEventListener('click', (e: Event) => {
      const clickedElement = e.target as HTMLElement;
      //console.log('Someone clicked on ' + clickedElement.textContent);
      const namespaceId = clickedElement.getAttribute('namespaceId');
      joinRoom(clickedElement.textContent || '', Number(namespaceId));
    });
  });

  localStorage.setItem('lastNs', nsEndPoint);
};

export { joinNs };
